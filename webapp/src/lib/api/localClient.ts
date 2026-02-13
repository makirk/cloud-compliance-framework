import { GitHubTreeResponse, CacheEntry } from '@/types';

const CACHE_TTL = 15 * 60 * 1000; // 15 minutes
const CACHE_PREFIX = 'ccf_local_cache_';

/**
 * Local API Client
 * Mirrors the GitHubClient interface but fetches data from local API routes
 * Includes the same caching mechanism for performance
 */
class LocalAPIClient {
  private cachePrefix = CACHE_PREFIX;

  private getCacheKey(key: string): string {
    return `${this.cachePrefix}${key}`;
  }

  private getFromCache<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;

    const cacheKey = this.getCacheKey(key);
    const cached = localStorage.getItem(cacheKey);

    if (!cached) return null;

    try {
      const entry: CacheEntry<T> = JSON.parse(cached);
      if (Date.now() - entry.timestamp > CACHE_TTL) {
        localStorage.removeItem(cacheKey);
        return null;
      }
      return entry.data;
    } catch {
      localStorage.removeItem(cacheKey);
      return null;
    }
  }

  private setCache<T>(key: string, data: T): void {
    if (typeof window === 'undefined') return;

    const cacheKey = this.getCacheKey(key);
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
    };

    try {
      localStorage.setItem(cacheKey, JSON.stringify(entry));
    } catch {
      // Cache full, clear old entries
      this.clearOldCache();
      try {
        localStorage.setItem(cacheKey, JSON.stringify(entry));
      } catch {
        // Still can't save, ignore
      }
    }
  }

  private clearOldCache(): void {
    if (typeof window === 'undefined') return;

    const keys = Object.keys(localStorage).filter(k => k.startsWith(this.cachePrefix));
    keys.forEach(key => {
      try {
        const entry = JSON.parse(localStorage.getItem(key) || '{}');
        if (Date.now() - entry.timestamp > CACHE_TTL) {
          localStorage.removeItem(key);
        }
      } catch {
        localStorage.removeItem(key);
      }
    });
  }

  /**
   * Fetch data from local API route
   */
  private async fetch<T>(endpoint: string, cacheKey?: string): Promise<T> {
    if (cacheKey) {
      const cached = this.getFromCache<T>(cacheKey);
      if (cached) return cached;
    }

    const response = await fetch(endpoint);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (cacheKey) {
      this.setCache(cacheKey, data);
    }

    return data;
  }

  /**
   * Get the full repository tree structure
   */
  async getRepoTree(): Promise<GitHubTreeResponse> {
    return this.fetch<GitHubTreeResponse>('/api/repo-tree', 'tree');
  }

  /**
   * Get file content by path
   * @param path - Relative path from repository root
   */
  async getFileContent(path: string): Promise<string> {
    const cacheKey = `file_${path}`;
    const cached = this.getFromCache<string>(cacheKey);
    if (cached) return cached;

    const response = await fetch(`/api/file-content?path=${encodeURIComponent(path)}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${path}`);
    }

    const content = await response.text();
    this.setCache(cacheKey, content);
    return content;
  }

  /**
   * Clear all cached data
   */
  clearCache(): void {
    if (typeof window === 'undefined') return;

    const keys = Object.keys(localStorage).filter(k => k.startsWith(this.cachePrefix));
    keys.forEach(key => localStorage.removeItem(key));
  }
}

export const localClient = new LocalAPIClient();
export { LocalAPIClient };
