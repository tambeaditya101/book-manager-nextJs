'use client';

import { apiClient } from '@/lib/api-client';
import { useState } from 'react';

interface Props {
  onBookAdded: (book: any) => void;
}

export default function AddBookForm({ onBookAdded }: Props) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('want_to_read');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title || !author) {
      alert('Title and author are required');
      return;
    }

    setLoading(true);

    try {
      const data = await apiClient('/api/books', {
        method: 'POST',
        body: JSON.stringify({
          title,
          author,
          tags: tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
          status,
        }),
      });

      onBookAdded(data.data.book);

      setTitle('');
      setAuthor('');
      setTags('');
      setStatus('want_to_read');
    } catch (err: any) {
      alert(err.message);
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='border rounded-lg p-4 mb-6 space-y-3 bg-white shadow-sm'
    >
      <h2 className='text-xl font-semibold mb-2'>Add a New Book</h2>
      <p className='text-sm text-gray-500 mb-3'>Track what you're reading.</p>

      <input
        className='w-full border p-2 rounded'
        placeholder='Book title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className='w-full border p-2 rounded'
        placeholder='Author'
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <input
        className='w-full border p-2 rounded'
        placeholder='Tags (comma separated)'
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <select
        className='w-full border p-2 rounded'
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value='want_to_read'>Want to Read</option>
        <option value='reading'>Reading</option>
        <option value='completed'>Completed</option>
      </select>

      <button
        disabled={loading}
        className='bg-black text-white px-4 py-2 rounded w-full'
      >
        {loading ? 'Adding...' : 'Add Book'}
      </button>
    </form>
  );
}
