'use client';

import { apiClient } from '@/lib/api-client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  async function loadUser() {
    try {
      const data = await apiClient('/api/auth/me');
      setUser(data.data.user);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleLogout() {
    try {
      await apiClient('/api/auth/logout', {
        method: 'POST',
      });

      router.push('/login');
    } catch (err: any) {
      alert(err.message);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className='bg-white shadow-sm border-b'>
      <div className='max-w-5xl mx-auto px-6 py-4 flex justify-between items-center'>
        {/* Logo / Title */}
        <h1 className='text-lg font-semibold text-gray-800 flex items-center gap-2'>
          📚 <span>Personal Book Manager</span>
        </h1>

        {/* User + Logout */}
        <div className='flex items-center gap-4'>
          {user && (
            <span className='text-sm text-gray-600'>
              Hello,{' '}
              <span className='font-medium text-gray-800'>{user.name}</span>
            </span>
          )}

          <button
            onClick={handleLogout}
            className='text-sm px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-100 transition'
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
