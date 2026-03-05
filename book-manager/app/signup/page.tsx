'use client';

import { apiClient } from '@/lib/api-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !email || !password) {
      alert('All fields are required');
      return;
    }

    setLoading(true);

    try {
      await apiClient('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      router.push('/dashboard');
    } catch (err: any) {
      alert(err.message);
    }

    setLoading(false);
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4'>
      <div className='bg-white w-full max-w-md p-8 rounded-2xl shadow-lg'>
        <div className='mb-6 text-center'>
          <h1 className='text-2xl font-semibold text-gray-800'>
            Create Your Account
          </h1>
          <p className='text-sm text-gray-500 mt-1'>
            Start tracking your reading journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='text-sm text-gray-600 block mb-1'>Name</label>
            <input
              type='text'
              placeholder='Your name'
              className='w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className='text-sm text-gray-600 block mb-1'>Email</label>
            <input
              type='email'
              placeholder='you@example.com'
              className='w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className='text-sm text-gray-600 block mb-1'>Password</label>
            <input
              type='password'
              placeholder='Create a password'
              className='w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            disabled={loading}
            className='w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition'
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className='text-sm text-center text-gray-500 mt-6'>
          Already have an account?{' '}
          <Link
            href='/login'
            className='text-indigo-600 hover:underline font-medium'
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
