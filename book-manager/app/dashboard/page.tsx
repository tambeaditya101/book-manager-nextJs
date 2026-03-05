'use client';

import { apiClient } from '@/lib/api-client';
import { useEffect, useState } from 'react';

import BookList from '@/app/components/BookList';
import DashboardStats from '@/app/components/DashboardStats';
import AddBookForm from '../components/AddBookForm';
import Filters from '../components/Filters';
import Modal from '../components/Modal';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [showModal, setShowModal] = useState(false);

  async function initialize() {
    try {
      await apiClient('/api/auth/me');

      let url = '/api/books';
      const params = new URLSearchParams();

      if (statusFilter) params.append('status', statusFilter);
      if (tagFilter) params.append('tag', tagFilter);

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const data = await apiClient(url);
      setBooks(data.data.books);
    } catch (err: any) {
      if (err.message !== 'Unauthorized') {
        alert(err.message);
      }
    }

    setLoading(false);
  }

  useEffect(() => {
    initialize();
  }, [statusFilter, tagFilter]);

  function handleUpdate(updatedBook: any) {
    setBooks((prev) =>
      prev.map((b) => (b._id === updatedBook._id ? updatedBook : b)),
    );
  }

  function handleBookAdded(book: any) {
    setBooks((prev) => [book, ...prev]);
  }

  function handleDelete(id: string) {
    setBooks((prev) => prev.filter((b) => b._id !== id));
  }

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200'>
        <p className='text-gray-600'>Loading your library...</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-100 to-slate-200'>
      <Navbar />

      <div className='max-w-5xl mx-auto px-6 py-8'>
        {/* Header */}
        <div className='flex justify-between items-center mb-6'>
          <div>
            <h1 className='text-2xl font-semibold text-gray-800'>
              Your Library
            </h1>
            <p className='text-sm text-gray-500'>
              Track and manage your reading collection
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className='bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition'
          >
            + Add Book
          </button>
        </div>

        {/* Stats */}
        <div className='mb-6'>
          <DashboardStats books={books} />
        </div>

        {/* Filters */}
        <div className='bg-white p-4 rounded-xl shadow-sm mb-6'>
          <Filters
            status={statusFilter}
            tag={tagFilter}
            onApply={(status, tag) => {
              setStatusFilter(status);
              setTagFilter(tag);
            }}
          />
        </div>

        {/* Book List */}
        <div className='bg-white p-6 rounded-xl shadow-sm'>
          <BookList
            books={books}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <AddBookForm
          onBookAdded={(book: any) => {
            handleBookAdded(book);
            setShowModal(false);
          }}
        />
      </Modal>
    </div>
  );
}
