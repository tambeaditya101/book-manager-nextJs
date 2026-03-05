import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

import { ApiError } from '@/lib/apiError';
import { requireAuth } from '@/lib/requireAuth';
import { Book } from '@/models/Book';

type RouteContext = {
  params: Promise<{ id: string }>;
};

function handleError(error: unknown) {
  if (error instanceof ApiError) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: error.statusCode },
    );
  }

  if (error instanceof Error && error.name === 'ValidationError') {
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

async function validateBookAccess(userId: string, id: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError('Invalid book id', 400);
  }

  return {
    _id: id,
    userId,
  };
}

/* ---------------- PATCH BOOK ---------------- */

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const user = await requireAuth();
    const { id } = await context.params;

    const query = await validateBookAccess(user._id, id);

    const body = await req.json();

    const book = await Book.findOneAndUpdate(query, body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      throw new ApiError('Book not found', 404);
    }

    return NextResponse.json({
      success: true,
      data: { book },
    });
  } catch (error) {
    return handleError(error);
  }
}

/* ---------------- DELETE BOOK ---------------- */

export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    const user = await requireAuth();
    const { id } = await context.params;

    const query = await validateBookAccess(user._id, id);

    const book = await Book.findOneAndDelete(query);

    if (!book) {
      throw new ApiError('Book not found', 404);
    }

    return NextResponse.json({
      success: true,
      message: 'Book deleted successfully',
    });
  } catch (error) {
    return handleError(error);
  }
}
