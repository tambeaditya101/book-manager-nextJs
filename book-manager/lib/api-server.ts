import { cookies } from 'next/headers';

export async function apiServer(url: string) {
  const cookieStore = await cookies();

  const res = await fetch(url, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: 'no-store',
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
}
