interface Props {
  filter: string
  setFilter: (filter: string) => void
}

const genres = ["all", "Fiction", "Non-fiction", "Mystery", "Fantasy", "Science", "Romance"]

const BookFilter = ({ filter, setFilter }: Props) => {
  return (
    <div className="flex justify-center my-4 flex-wrap gap-2">
      {genres.map((genre) => (
        <button
          key={genre}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            filter === genre
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          onClick={() => setFilter(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  )
}

export default BookFilter