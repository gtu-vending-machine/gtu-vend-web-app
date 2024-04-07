'use client';

import { Query, User, UserListItem, UserQueryResponse } from '@/types';
import axios from 'axios';
import { createContext } from 'react';
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
export const getUser = async (id: number): Promise<User> => {
  const response = await axiosInstance.get(`/users/${id}`);
  return response.data;
};

// get users from the server
export const getUsers = async (): Promise<UserListItem[]> => {
  const response = await axiosInstance.get('/users');
  return response.data;
};

// get user with Query
export const getUsersWithQuery = async (
  query: Query<UserListItem>,
): Promise<UserQueryResponse> => {
  const response = await axiosInstance.post('/users/query', query);
  return response.data;
};

export const AdminApiContext = createContext<{
  getUsers: typeof getUsers;
  getUser: typeof getUser;
  getUsersWithQuery: typeof getUsersWithQuery;
}>({
  getUsers: getUsers,
  getUser: getUser,
  getUsersWithQuery: getUsersWithQuery,
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
        getUsersWithQuery,
      }}
    >
      {children}
    </AdminApiContext.Provider>
  );
};
