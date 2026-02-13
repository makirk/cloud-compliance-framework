import { NextResponse } from 'next/server';
import { getLocalRepoTree } from '@/lib/fs/localClient';

export const dynamic = 'force-dynamic';

/**
 * GET /api/repo-tree
 * Returns the repository tree structure from local file system
 */
export async function GET() {
  try {
    const tree = await getLocalRepoTree();
    return NextResponse.json(tree);
  } catch (error) {
    console.error('Error fetching repository tree:', error);
    return NextResponse.json(
      {
        error: 'Failed to read repository tree',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
