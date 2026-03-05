import { ApiError } from '@/lib/apiError';
import { requireAuth } from '@/lib/requireAuth';
import { Book } from '@/models/Book';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const user = await requireAuth();

    const { title, author, tags, status } = await req.json();

    if (!title || !author) {
      throw new ApiError('Title and author are required', 400);
    }

    const book = await Book.create({
      userId: user._id,
      title,
      author,
      tags: tags || [],
      status: status || 'want_to_read',
    });

    return NextResponse.json(
      {
        success: true,
        data: { book },
      },
      { status: 201 },
    );
  } catch (error: any) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode },
      );
    }

    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    const user = await requireAuth();

    const { searchParams } = new URL(req.url);

    const status = searchParams.get('status');
    const tag = searchParams.get('tag');

    const query: any = {
      userId: user._id,
    };

    if (status) {
      query.status = status;
    }

    if (tag) {
      query.tags = {
        $regex: tag,
        $options: 'i',
      };
    }

    const books = await Book.find(query).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: {
        books,
        count: books.length,
      },
    });
  } catch (error: any) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode },
      );
    }

    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    );
  }
}
