import { verifyToken } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import { cookies } from 'next/headers';
import { ApiError } from './apiError';

export async function requireAuth() {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    throw new ApiError('Unauthorized', 401);
  }

  try {
    const decoded = verifyToken(token) as { userId: string };

    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      throw new ApiError('User not found', 404);
    }

    return user;
  } catch (error) {
    throw new ApiError('Invalid or expired token', 401);
  }
}
