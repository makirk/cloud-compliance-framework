import { NextResponse } from 'next/server';
import { getLocalFileContent } from '@/lib/fs/localClient';

export const dynamic = 'force-dynamic';

/**
 * GET /api/file-content?path={filePath}
 * Returns the content of a file from local file system
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get('path');

  if (!filePath) {
    return NextResponse.json(
      { error: 'Path parameter is required' },
      { status: 400 }
    );
  }

  try {
    const content = await getLocalFileContent(filePath);
    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  } catch (error) {
    console.error(`Error fetching file content for ${filePath}:`, error);

    if (error instanceof Error && error.message.includes('not found')) {
      return NextResponse.json(
        { error: 'File not found', path: filePath },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to read file',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
