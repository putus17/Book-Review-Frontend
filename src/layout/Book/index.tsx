import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useBookStore } from "../../store/useBookStore";
import type { BookFormValues } from "../../types";
import BookForm from "../../components/BookForm";
import BookFilter from "../../components/BookFilter";

const Book: React.FC = () => {
  const [filter, setFilter] = useState("all");
  const [editingBook, setEditingBook] = useState<BookFormValues | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<BookFormValues | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const { books, fetchBooks, addBook, updateBook, deleteBook } = useBookStore();

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (data: BookFormValues) => {
    if (data._id) {
      await updateBook(data._id, data);
    } else {
      await addBook(data);
    }
    setEditingBook(null);
  };

  const handleDeleteConfirmed = async () => {
    if (deleteTarget?._id) {
      await deleteBook(deleteTarget._id);
      setDeleteTarget(null);
    }
  };

  const filteredBooks =
    filter === "all" ? books : books.filter((book) => book.genre.includes(filter));

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-pink-50 via-purple-100 to-indigo-200 text-pink-900 font-sans overflow-hidden">

      {/* Sticky Top Header */}
      <header
        className={`bg-white/90 backdrop-blur-md border-b sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "py-2 shadow-md" : "py-4 shadow-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center transition-all duration-300">
          <Link
            to="/"
            className="text-3xl font-extrabold text-purple-700 tracking-tight relative group"
          >
            📚 ReadSphere
            <span className="absolute left-0 -bottom-1 w-0 h-1 bg-gradient-to-r from-purple-500 via-purple-700 to-purple-900 rounded-full group-hover:w-full transition-all"></span>
          </Link>

          <nav className="space-x-6 text-sm hidden md:flex">
            {[
              { to: "/", label: "Home" },
              { to: "/profile", label: "Profile" },
              { to: "/sign-up", label: "Sign Up" },
              { to: "/login", label: "Login" },
            ].map(({ to, label }, i) => (
              <Link
                key={i}
                to={to}
                className="relative text-gray-700 hover:text-purple-700 font-medium tracking-wide uppercase px-2 transition-all duration-300 group"
              >
                <span>{label}</span>
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-purple-700 group-hover:w-full transition-all duration-300 rounded-full"></span>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Floating pastel bubbles */}
      {[...Array(18)].map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full opacity-30 pointer-events-none"
          style={{
            backgroundColor: `hsl(${Math.random() * 360}, 70%, 85%)`,
            width: `${Math.random() * 20 + 10}px`,
            height: `${Math.random() * 20 + 10}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `floatSoft ${6 + Math.random() * 6}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 6}s`,
            filter: "blur(4px)",
          }}
          aria-hidden="true"
        />
      ))}

      {/* Book Header + Filter */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between bg-pink-300 bg-opacity-70 backdrop-blur-md rounded-3xl shadow-lg px-8 py-6 select-none">
          <h1 className="text-3xl font-extrabold tracking-wider mb-4 md:mb-0">
            📚 Book Garden
          </h1>
          <BookFilter filter={filter} setFilter={setFilter} />
        </div>
      </div>

      {/* Book List + Form */}
      <main className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 px-6 pb-16">
        <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book) => (
            <article
              key={book._id}
              className="bg-white bg-opacity-90 backdrop-blur-xl rounded-2xl shadow-lg p-6 flex flex-col hover:shadow-2xl transition-shadow cursor-pointer ring-2 ring-pink-200"
              onClick={() => setEditingBook(book)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setEditingBook(book);
                }
              }}
              role="button"
              aria-label={`Edit book titled ${book.title}`}
            >
              <h3 className="text-xl font-bold text-pink-700 mb-1">{book.title}</h3>
              <p className="text-pink-600 italic mb-3">by {book.author}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {book.genre.map((g, i) => (
                  <span
                    key={i}
                    className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {g}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex justify-between items-center text-sm">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingBook(book);
                  }}
                  className="text-purple-600 hover:underline font-semibold"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteTarget(book);
                  }}
                  className="text-red-500 hover:underline font-semibold"
                >
                  🗑 Delete
                </button>
              </div>
            </article>
          ))}
        </section>

        <aside className="w-full md:w-96 bg-white bg-opacity-90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-pink-300 ring-4 ring-pink-200 sticky top-24 self-start">
   <h2 className="text-3xl font-extrabold text-pink-600 mb-4 text-center font-cute animate-pulse">
  {editingBook ? "✏️ Update Book" : "🧸 SphereDrop"}
</h2>


          <p className="text-purple-500 text-center mb-8 font-semibold">
            {editingBook ? "Make your changes sparkle ✨" : "Start a new story in your garden!"}
          </p>
          <BookForm onSubmit={handleSubmit} initialValues={editingBook} />
        </aside>
      </main>

      {/* Delete Confirmation Dialog */}
      {deleteTarget && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
          tabIndex={-1}
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-pink-700 mb-4" id="delete-dialog-title">
              Confirm Delete
            </h3>
            <p className="mb-6 text-pink-900" id="delete-dialog-description">
              Are you sure you want to delete <strong>{deleteTarget.title}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition font-semibold"
                autoFocus
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-purple-700 text-white py-6 mt-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm">
            © {new Date().getFullYear()} ReadSphere. Read better, live brighter.
          </div>
          <nav className="flex space-x-6 text-sm">
            <Link to="/privacy" className="hover:text-purple-300 transition">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-purple-300 transition">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:text-purple-300 transition">
              Contact
            </Link>
          </nav>
        </div>
      </footer>

      {/* Animations */}
      <style>{`
        @keyframes floatSoft {
          0%, 100% { transform: translateY(0); opacity: 0.25; }
          50% { transform: translateY(-15px); opacity: 0.6; }
        }
      `}</style>
    </section>
  );
};

export default Book;
