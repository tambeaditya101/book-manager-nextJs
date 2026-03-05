'use client';

import { useState } from 'react';

interface Props {
  status: string;
  tag: string;
  onApply: (status: string, tag: string) => void;
}

export default function Filters({ status, tag, onApply }: Props) {
  const [statusInput, setStatusInput] = useState(status);
  const [tagInput, setTagInput] = useState(tag);

  return (
    <div className='flex flex-col md:flex-row md:items-end gap-4'>
      {/* Status Filter */}
      <div className='flex flex-col'>
        <label className='text-sm text-gray-500 mb-1'>Status</label>
        <select
          value={statusInput}
          onChange={(e) => setStatusInput(e.target.value)}
          className='border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400'
        >
          <option value=''>All Status</option>
          <option value='want_to_read'>Want to Read</option>
          <option value='reading'>Reading</option>
          <option value='completed'>Completed</option>
        </select>
      </div>

      {/* Tag Filter */}
      <div className='flex flex-col flex-1'>
        <label className='text-sm text-gray-500 mb-1'>Tag</label>
        <input
          type='text'
          placeholder='Search by tag'
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          className='border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400'
        />
      </div>

      {/* Buttons */}
      <div className='flex gap-2'>
        <button
          onClick={() => onApply(statusInput, tagInput)}
          className='bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition'
        >
          Apply
        </button>

        <button
          onClick={() => {
            setStatusInput('');
            setTagInput('');
            onApply('', '');
          }}
          className='border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition'
        >
          Clear
        </button>
      </div>
    </div>
  );
}
