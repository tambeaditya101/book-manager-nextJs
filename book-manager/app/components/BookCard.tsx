'use client';

import { apiClient } from '@/lib/api-client';
import { useState } from 'react';

interface Props {
  book: any;
  onDelete: (id: string) => void;
  onUpdate: (book: any) => void;
}

function getStatusStyles(status: string) {
  switch (status) {
    case 'reading':
      return 'bg-blue-100 text-blue-700';
    case 'completed':
      return 'bg-green-100 text-green-700';
    case 'want_to_read':
      return 'bg-yellow-100 text-yellow-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

export default function BookCard({ book, onDelete, onUpdate }: Props) {
  const [editing, setEditing] = useState(false);

  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [status, setStatus] = useState(book.status);
  const [tags, setTags] = useState(book.tags?.join(', ') || '');

  async function handleDelete() {
    if (!confirm('Delete this book?')) return;

    try {
      await apiClient(`/api/books/${book._id}`, {
        method: 'DELETE',
      });

      onDelete(book._id);
    } catch (err: any) {
      alert(err.message);
    }
  }

  async function handleUpdate() {
    try {
      const data = await apiClient(`/api/books/${book._id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          title,
          author,
          status,
          tags: tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      });

      onUpdate(data.data.book);
      setEditing(false);
    } catch (err: any) {
      alert(err.message);
    }
  }

  /* ---------------- EDIT MODE ---------------- */

  if (editing) {
    return (
      <div className='bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4'>
        <h3 className='text-lg font-semibold text-gray-800'>Edit Book</h3>

        <div className='space-y-1'>
          <label className='text-sm text-gray-500'>Title</label>
          <input
            className='w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className='space-y-1'>
          <label className='text-sm text-gray-500'>Author</label>
          <input
            className='w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div className='space-y-1'>
          <label className='text-sm text-gray-500'>Status</label>
          <select
            className='w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value='want_to_read'>Want to Read</option>
            <option value='reading'>Reading</option>
            <option value='completed'>Completed</option>
          </select>
        </div>
        <div className='space-y-1'>
          <label className='text-sm text-gray-500'>Tags</label>
          <input
            placeholder='Comma separated (e.g. productivity, mindset)'
            className='w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400'
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <div className='flex gap-3 pt-2'>
          <button
            onClick={handleUpdate}
            className='bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition'
          >
            Save
          </button>

          <button
            onClick={() => setEditing(false)}
            className='border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition'
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- VIEW MODE ---------------- */

  return (
    <div className='bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition'>
      {/* Header */}
      <div className='flex justify-between items-start'>
        <div>
          <h3 className='text-lg font-semibold text-gray-900'>{book.title}</h3>

          <p className='text-sm text-gray-500 mt-1'>{book.author}</p>
        </div>

        <span
          className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${getStatusStyles(
            book.status,
          )}`}
        >
          {book.status.replaceAll('_', ' ')}
        </span>
      </div>

      {/* Tags */}
      {book.tags?.length > 0 && (
        <div className='flex flex-wrap gap-2 mt-4'>
          {book.tags.map((tag: string) => (
            <span
              key={tag}
              className='text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full'
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className='flex justify-end gap-2 mt-5'>
        <button
          onClick={() => setEditing(true)}
          className='text-sm border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-100 transition'
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className='text-sm border border-red-200 text-red-600 px-3 py-1.5 rounded-md hover:bg-red-50 transition'
        >
          Delete
        </button>
      </div>
    </div>
  );
}
