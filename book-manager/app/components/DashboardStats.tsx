interface Props {
  books: any[];
}

export default function DashboardStats({ books }: Props) {
  const total = books.length;

  const reading = books.filter((b) => b.status === 'reading').length;
  const completed = books.filter((b) => b.status === 'completed').length;
  const want = books.filter((b) => b.status === 'want_to_read').length;

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6'>
      <div className='bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition'>
        <p className='text-sm text-gray-500 mb-1'>Total Books</p>
        <p className='text-2xl font-semibold text-gray-800'>{total}</p>
      </div>

      <div className='bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition'>
        <p className='text-sm text-gray-500 mb-1'>Want to Read</p>
        <p className='text-2xl font-semibold text-yellow-600'>{want}</p>
      </div>

      <div className='bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition'>
        <p className='text-sm text-gray-500 mb-1'>Reading</p>
        <p className='text-2xl font-semibold text-blue-600'>{reading}</p>
      </div>

      <div className='bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition'>
        <p className='text-sm text-gray-500 mb-1'>Completed</p>
        <p className='text-2xl font-semibold text-green-600'>{completed}</p>
      </div>
    </div>
  );
}
