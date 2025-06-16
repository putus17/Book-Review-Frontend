import { CiEdit } from "react-icons/ci"
import { MdDeleteForever } from "react-icons/md"
import { Card } from './ui/card'
import type { BookType } from '../types'

interface BookCardProps {
  book: BookType
  onEdit: (book: BookType) => void
  onDelete: (id: string) => void
}

const BookCard: React.FC<BookCardProps> = ({ book, onEdit, onDelete }) => {
  return (
    <Card className="flex flex-col gap-2 p-4 bg-white shadow-sm rounded-xl w-full">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold">{book.title}</h2>
          <p className="text-sm text-gray-600">by {book.author}</p>
        </div>
        <div className="flex gap-2">
          <CiEdit
            size={28}
            onClick={() => onEdit(book)}
            className="cursor-pointer rounded border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 p-1 transition"
          />
          <MdDeleteForever
            size={28}
            onClick={() => onDelete(book._id)}
            className="cursor-pointer rounded border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 p-1 transition"
          />
        </div>
      </div>

      <p className="text-sm text-gray-700">{book.description}</p>

      <div className="flex flex-wrap gap-2 text-xs text-gray-500">
        {book.genre.map((g, i) => (
          <span key={i} className="px-2 py-0.5 bg-gray-100 rounded-full">
            {g}
          </span>
        ))}
      </div>

      <p className="text-xs text-gray-400">Published: {new Date(book.publishedYear).getFullYear()}</p>
    </Card>
  )
}

export default BookCard