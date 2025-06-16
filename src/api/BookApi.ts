import api from '../lib/api'
import axios from 'axios'
import type {
  BookPayload,
  BookUpdateType,
  CreateBookResponse,
  GetBooksResponse,
  UpdateBooksResponse,
} from '../types'

// Get all books
export const getBooks = async (): Promise<GetBooksResponse> => {
  try {
    const { data } = await api.get<GetBooksResponse>('/book')
    return data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Fetching books failed'
    }
    throw error
  }
}

// Create a new book
export const createBook = async (
  payload: BookPayload
): Promise<CreateBookResponse> => {
  try {
    const { data } = await api.post<CreateBookResponse>('/book', payload)
    return data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Creating book failed'
    }
    throw error
  }
}

// Update a book by ID
export const updateBook = async (
  id: string,
  payload: BookUpdateType
): Promise<UpdateBooksResponse> => {
  try {
    const { data } = await api.patch<UpdateBooksResponse>(`/book/${id}`, payload)
    return data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Updating book failed'
    }
    throw error
  }
}

// Delete a book by ID
export const deleteBook = async (
  id: string
): Promise<{ message: string }> => {
  try {
    const { data } = await api.delete<{ message: string }>(`/book/${id}`)
    return data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Deleting book failed'
    }
    throw error
  }
}