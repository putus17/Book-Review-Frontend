import type { BookFormValues, BookType } from '../types'
import BookCard from './BookCard'

interface BookListProps {
  books: BookType[]
  onEdit: React.Dispatch<React.SetStateAction<BookFormValues | null>>
  onDelete: (id: string) => void
}

const BookList: React.FC<BookListProps> = ({ books, onEdit, onDelete }) => {
  if (books.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-center">
        <div className="max-w-md">
          <h3 className="text-lg font-semibold text-gray-900">No books found</h3>
          <p className="mt-2 text-sm text-gray-500">Add a new book to begin building your library.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {books.map((book) => (
        <BookCard
          key={book._id}
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default BookList