import type { GetUsersResponse, UpdateUsersResponse } from './../types/index.d';
import api from '../lib/api'
import axios from 'axios'
import type { LoginType, RegisterResponse, RegisterType, } from '../types'

export const register = async (
  payload: RegisterType
): Promise<RegisterResponse> => {
  try {
    const { data } = await api.post<RegisterResponse>('/auth/register', payload)
    return data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {    
      console.error('Register error response:', error.response)
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        'Registration failed'
      throw new Error(
        typeof message === 'string' ? message : JSON.stringify(message)
      )
    }
    throw error
  }
}

export const login = async (payload: LoginType) => {
  try {
    const { data } = await api.post('/auth/login', payload)
    return data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Login error response:', error.response)
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        'Login failed. Please try again.'
      throw new Error(
        typeof message === 'string' ? message : JSON.stringify(message)
      )
    }
    throw error
  }
}

export const fetchme = async () => {
  try {
    const { data } = await api.get('/auth/me')
    return data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Fetch user info error response:', error.response)
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        'Failed to fetch user information.'
      throw new Error(
        typeof message === 'string' ? message : JSON.stringify(message)
      )
    }
    throw error
  }
}


// ✅ Get users
export const getUsers = async (): Promise<GetUsersResponse> => {
  try {
    const { data } = await api.get<GetUsersResponse>("/users");
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "Fetching users failed";
    }
    throw error;
  }
};

// ✅ Update a user
export const updateUser = async (
  id: string,
  payload: FormData
): Promise<UpdateUsersResponse> => {
  try {
    const { data } = await api.patch<UpdateUsersResponse>(
      `/user/${id}`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "Updating user failed";
    }
    throw error;
  }
};

// ✅ Delete a user
export const deleteUser = async (
  id: string
): Promise<{ message: string }> => {
  try {
    const { data } = await api.delete<{ message: string }>(`/user/${id}`);
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "Deleting user failed";
    }
    throw error;
  }
};
