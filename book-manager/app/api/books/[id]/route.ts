import { ApiError } from '@/lib/apiError';
import { requireAuth } from '@/lib/requireAuth';
import { Book } from '@/models/Book';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const user = await requireAuth();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError('Invalid book id', 400);
    }

    const body = await req.json();

    const book = await Book.findOneAndUpdate(
      {
        _id: id,
        userId: user._id,
      },
      body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!book) {
      throw new ApiError('Book not found', 404);
    }

    return NextResponse.json({
      success: true,
      data: { book },
    });
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
      { success: false, error: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const user = await requireAuth();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError('Invalid book id', 400);
    }

    const book = await Book.findOneAndDelete({
      _id: id,
      userId: user._id,
    });

    if (!book) {
      throw new ApiError('Book not found', 404);
    }

    return NextResponse.json({
      success: true,
      message: 'Book deleted successfully',
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
