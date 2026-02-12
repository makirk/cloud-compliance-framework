import { GitHubTreeResponse, GitHubFile, CacheEntry } from '@/types';

const GITHUB_API_BASE = 'https://api.github.com';
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

// Default repo configuration - can be overridden
const DEFAULT_OWNER = 'makirk';
const DEFAULT_REPO = 'cloud-compliance-framework';
const DEFAULT_BRANCH = 'main';

interface GitHubClientConfig {
  owner?: string;
  repo?: string;
  branch?: string;
  token?: string;
}

class GitHubClient {
  private owner: string;
  private repo: string;
  private branch: string;
  private token?: string;
  private cachePrefix = 'ccf_cache_';

  constructor(config: GitHubClientConfig = {}) {
    this.owner = config.owner || DEFAULT_OWNER;
    this.repo = config.repo || DEFAULT_REPO;
    this.branch = config.branch || DEFAULT_BRANCH;
    this.token = config.token;
  }

  configure(config: GitHubClientConfig) {
    if (config.owner) this.owner = config.owner;
    if (config.repo) this.repo = config.repo;
    if (config.branch) this.branch = config.branch;
    if (config.token) this.token = config.token;
  }

  private getCacheKey(key: string): string {
    return `${this.cachePrefix}${this.owner}_${this.repo}_${key}`;
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

  private async fetch<T>(endpoint: string, cacheKey?: string): Promise<T> {
    if (cacheKey) {
      const cached = this.getFromCache<T>(cacheKey);
      if (cached) return cached;
    }

    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, { headers });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('GitHub API rate limit exceeded. Consider adding a GitHub token.');
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (cacheKey) {
      this.setCache(cacheKey, data);
    }

    return data;
  }

  async getRepoTree(): Promise<GitHubTreeResponse> {
    return this.fetch<GitHubTreeResponse>(
      `/repos/${this.owner}/${this.repo}/git/trees/${this.branch}?recursive=1`,
      'tree'
    );
  }

  async getDirectoryContents(path: string): Promise<GitHubFile[]> {
    return this.fetch<GitHubFile[]>(
      `/repos/${this.owner}/${this.repo}/contents/${path}?ref=${this.branch}`,
      `dir_${path}`
    );
  }

  async getFileContent(path: string): Promise<string> {
    const cacheKey = `file_${path}`;
    const cached = this.getFromCache<string>(cacheKey);
    if (cached) return cached;

    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3.raw',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${this.owner}/${this.repo}/contents/${path}?ref=${this.branch}`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${path}`);
    }

    const content = await response.text();
    this.setCache(cacheKey, content);
    return content;
  }

  getRateLimitInfo(): { remaining: number; reset: Date } | null {
    // This would require storing rate limit headers from responses
    return null;
  }

  clearCache(): void {
    if (typeof window === 'undefined') return;

    const keys = Object.keys(localStorage).filter(k => k.startsWith(this.cachePrefix));
    keys.forEach(key => localStorage.removeItem(key));
  }
}

export const githubClient = new GitHubClient();
export { GitHubClient };
