import BookCard from './BookCard';

interface Props {
  books: any[];
  onDelete: (id: string) => void;
  onUpdate: (book: any) => void;
}

export default function BookList({ books, onDelete, onUpdate }: Props) {
  if (!books.length) {
    return (
      <div className='text-center py-12 text-gray-500'>
        <p className='text-lg mb-2'>📚 Your shelf is empty</p>
        <p>Add your first book to begin your reading journey.</p>
      </div>
    );
  }

  return (
    <div className='grid gap-4'>
      {books.map((book) => (
        <BookCard
          key={book._id}
          book={book}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}
