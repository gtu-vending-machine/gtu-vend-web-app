'use client';

import { Message, Query } from '@/types';
import { User, UserListItem, UserQueryResponse } from '@/types/user';
import axios, { Axios, AxiosError } from 'axios';
import { createContext } from 'react';
import toast from 'react-hot-toast';
// NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1 -> .env.local

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const user: Partial<User> = JSON.parse(storedUser);
    config.headers['Authorization'] = `Bearer ${user.token}`;
  }
  return config;
});

// get user
export const getUser = async (id: number): Promise<User | undefined> => {
  return axiosInstance
    .get(`/users/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError<Message>) => {
      toast.error(error.response?.data.message || 'Failed to get user');
      return;
    });
};

// get users from the server
export const getUsers = async (): Promise<UserListItem[] | undefined> => {
  return axiosInstance
    .get('/users')
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError<Message>) => {
      toast.error(error.response?.data.message || 'Failed to get users');
      return;
    });
};

// delete user
export const deleteUser = async (id: number): Promise<User | undefined> => {
  return axiosInstance
    .delete(`/users/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError<Message>) => {
      toast.error(error.response?.data.message || 'Failed to delete user');
      return;
    });
};

// get user with Query
export const getUsersWithQuery = async (
  query: Query<UserListItem>,
): Promise<UserQueryResponse | undefined> => {
  return axiosInstance
    .post('/users/query', query)
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError<Message>) => {
      toast.error(error.response?.data.message || 'Failed to get users');
      return;
    });
};

export const addBalance = async (
  id: number,
  amount: number,
): Promise<Pick<User, 'id' | 'balance'>> => {
  return axiosInstance
    .post(`/users/${id}/addBalance`, {
      amount,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError<Message>) => {
      toast.error(error.response?.data.message || 'Failed to add balance');
      return;
    });
};

export const AdminApiContext = createContext<{
  getUsers: typeof getUsers;
  getUser: typeof getUser;
  deleteUser: typeof deleteUser;
  getUsersWithQuery: typeof getUsersWithQuery;
  addBalance: typeof addBalance;
}>({
  getUsers: getUsers,
  getUser: getUser,
  deleteUser: deleteUser,
  getUsersWithQuery: getUsersWithQuery,
  addBalance: addBalance,
});

export const AdminApiProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <AdminApiContext.Provider
      value={{
        getUsers,
        getUser,
        deleteUser,
        getUsersWithQuery,
        addBalance,
      }}
    >
      {children}
    </AdminApiContext.Provider>
  );
};
