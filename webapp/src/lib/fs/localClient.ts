import fs from 'fs/promises';
import path from 'path';
import { GitHubTreeResponse, GitHubTreeItem, GitHubFile } from '@/types';
import crypto from 'crypto';

// Directories to exclude from scanning
const EXCLUDED_DIRS = new Set([
  '.git',
  'node_modules',
  '.next',
  'out',
  'dist',
  'build',
  '.turbo',
  'coverage',
  '.cache',
  'webapp' // Exclude webapp from the scan as we only want cloud provider data
]);

// File extensions to exclude
const EXCLUDED_EXTENSIONS = new Set([
  '.log',
  '.tmp',
  '.temp',
  '.DS_Store',
  '.env',
  '.env.local'
]);

/**
 * Get the repository root path (parent of webapp directory)
 */
function getRepoRootPath(): string {
  return path.join(process.cwd(), '..');
}

/**
 * Generate a mock SHA hash for file content
 * This mimics GitHub's SHA for compatibility
 */
function generateSha(content: string): string {
  return crypto.createHash('sha1').update(content).digest('hex');
}

/**
 * Check if a path should be excluded from scanning
 */
function shouldExclude(itemPath: string, itemName: string): boolean {
  // Check if directory is excluded
  if (EXCLUDED_DIRS.has(itemName)) {
    return true;
  }

  // Check if file extension is excluded
  const ext = path.extname(itemName);
  if (EXCLUDED_EXTENSIONS.has(ext) || EXCLUDED_EXTENSIONS.has(itemName)) {
    return true;
  }

  return false;
}

/**
 * Recursively walk directory tree and build file list
 */
async function walkDirectory(
  dirPath: string,
  relativePath: string = ''
): Promise<GitHubTreeItem[]> {
  const items: GitHubTreeItem[] = [];

  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      const relPath = relativePath ? `${relativePath}/${entry.name}` : entry.name;

      // Skip excluded items
      if (shouldExclude(fullPath, entry.name)) {
        continue;
      }

      if (entry.isDirectory()) {
        // Add directory entry
        items.push({
          path: relPath,
          mode: '040000',
          type: 'tree',
          sha: generateSha(relPath),
          url: `file://${fullPath}`
        });

        // Recursively walk subdirectories
        const subItems = await walkDirectory(fullPath, relPath);
        items.push(...subItems);
      } else if (entry.isFile()) {
        // Get file stats for size
        const stats = await fs.stat(fullPath);

        // Add file entry
        items.push({
          path: relPath,
          mode: '100644',
          type: 'blob',
          sha: generateSha(fullPath),
          size: stats.size,
          url: `file://${fullPath}`
        });
      }
    }
  } catch (error) {
    console.error(`Error walking directory ${dirPath}:`, error);
  }

  return items;
}

/**
 * Get the repository tree structure
 * Returns data in the same format as GitHub's tree API
 */
export async function getLocalRepoTree(): Promise<GitHubTreeResponse> {
  const rootPath = getRepoRootPath();
  const tree = await walkDirectory(rootPath);

  return {
    sha: generateSha(rootPath),
    url: `file://${rootPath}`,
    tree,
    truncated: false
  };
}

/**
 * Read file content from local file system
 * @param filePath - Relative path from repository root
 */
export async function getLocalFileContent(filePath: string): Promise<string> {
  const rootPath = getRepoRootPath();
  const fullPath = path.join(rootPath, filePath);

  try {
    // Security check: ensure the resolved path is within the repo
    const resolvedPath = path.resolve(fullPath);
    const resolvedRoot = path.resolve(rootPath);

    if (!resolvedPath.startsWith(resolvedRoot)) {
      throw new Error('Invalid file path: outside repository');
    }

    const content = await fs.readFile(fullPath, 'utf-8');
    return content;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      throw new Error(`File not found: ${filePath}`);
    }
    throw error;
  }
}

/**
 * Get directory contents (non-recursive)
 * Returns data in the same format as GitHub's contents API
 */
export async function getLocalDirectoryContents(dirPath: string): Promise<GitHubFile[]> {
  const rootPath = getRepoRootPath();
  const fullPath = path.join(rootPath, dirPath);

  try {
    // Security check
    const resolvedPath = path.resolve(fullPath);
    const resolvedRoot = path.resolve(rootPath);

    if (!resolvedPath.startsWith(resolvedRoot)) {
      throw new Error('Invalid directory path: outside repository');
    }

    const entries = await fs.readdir(fullPath, { withFileTypes: true });
    const files: GitHubFile[] = [];

    for (const entry of entries) {
      const entryPath = path.join(fullPath, entry.name);
      const relativePath = dirPath ? `${dirPath}/${entry.name}` : entry.name;

      // Skip excluded items
      if (shouldExclude(entryPath, entry.name)) {
        continue;
      }

      const stats = await fs.stat(entryPath);

      files.push({
        name: entry.name,
        path: relativePath,
        type: entry.isDirectory() ? 'dir' : 'file',
        sha: generateSha(relativePath),
        size: entry.isFile() ? stats.size : undefined,
        download_url: entry.isFile() ? `file://${entryPath}` : undefined
      });
    }

    return files;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      throw new Error(`Directory not found: ${dirPath}`);
    }
    throw error;
  }
}
