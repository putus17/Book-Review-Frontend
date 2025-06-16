import { create } from 'zustand'
import { toast } from 'react-toastify'
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from '../api/BookApi' // You should have these API functions created.

import type {
  BookType,
  BookPayload,
  BookUpdateType,
} from '../types'

type BookStore = {
  books: BookType[]
  loading: boolean
  error: string | null
  fetchBooks: () => Promise<void>
  addBook: (payload: BookPayload) => Promise<void>
  updateBook: (id: string, payload: BookUpdateType) => Promise<void>
  deleteBook: (id: string) => Promise<void>
}

export const useBookStore = create<BookStore>((set) => ({
  books: [],
  loading: false,
  error: null,

  fetchBooks: async () => {
    set({ loading: true, error: null })
    try {
      const res = await getBooks()
      set({ books: res.data, loading: false })
    } catch (err: any) {
      const message = err.message || 'Failed to fetch books'
      toast.error(message)
      set({ error: message, loading: false })
    }
  },

  addBook: async (payload) => {
    set({ loading: true, error: null })
    try {
      const res = await createBook(payload)
      set((state) => ({
        books: [res.data, ...state.books],
        loading: false,
      }))
      toast.success('Book added successfully!')
    } catch (err: any) {
      const message = err.message || 'Failed to add book'
      toast.error(message)
      set({ error: message, loading: false })
    }
  },

  updateBook: async (id, payload) => {
    set({ loading: true, error: null })
    try {
      const res = await updateBook(id, payload)
      set((state) => ({
        books: state.books.map((book) =>
          book._id === id ? res.data : book
        ),
        loading: false,
      }))
      toast.success('Book updated successfully!')
    } catch (err: any) {
      const message = err.message || 'Failed to update book'
      toast.error(message)
      set({ error: message, loading: false })
    }
  },

  deleteBook: async (id) => {
    set({ loading: true, error: null })
    try {
      await deleteBook(id)
      set((state) => ({
        books: state.books.filter((book) => book._id !== id),
        loading: false,
      }))
      toast.success('Book deleted successfully!')
    } catch (err: any) {
      const message = err.message || 'Failed to delete book'
      toast.error(message)
      set({ error: message, loading: false })
    }
  },
}))