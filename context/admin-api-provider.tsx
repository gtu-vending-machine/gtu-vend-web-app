'use client';

import { Message, Query } from '@/types';
import {
  CreateProductPayload,
  ProductListItem,
  ProductQueryResponse,
} from '@/types/product';
import { User, UserListItem, UserQueryResponse } from '@/types/user';
import axios, { AxiosError } from 'axios';
import { createContext, useMemo } from 'react';
import toast from 'react-hot-toast';

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

// ------------------ User API ------------------
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

// get user by id
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

// get users with Query
export const getUsersWithQuery = async (
  query: Query,
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

// ------------------ Product API ------------------
// get products from the server
export const getProducts = async (): Promise<ProductListItem[] | undefined> => {
  return axiosInstance
    .get('/products')
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError<Message>) => {
      toast.error(error.response?.data.message || 'Failed to get products');
      return;
    });
};

// get product by id
export const getProduct = async (
  id: number,
): Promise<ProductListItem | undefined> => {
  return axiosInstance
    .get(`/products/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError<Message>) => {
      toast.error(error.response?.data.message || 'Failed to get product');
      return;
    });
};

// delete product
export const deleteProduct = async (
  id: number,
): Promise<ProductListItem | undefined> => {
  return axiosInstance
    .delete(`/products/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError<Message>) => {
      toast.error(error.response?.data.message || 'Failed to delete product');
      return;
    });
};

// get products with Query
export const getProductsWithQuery = async (
  query: Query,
): Promise<ProductQueryResponse | undefined> => {
  return axiosInstance
    .post('/products/query', query)
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError<Message>) => {
      toast.error(error.response?.data.message || 'Failed to get products');
      return;
    });
};

// create product
export const createProduct = async (
  product: CreateProductPayload,
): Promise<ProductListItem | undefined> => {
  return axiosInstance
    .post('/products', product)
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError<Message>) => {
      toast.error(error.response?.data.message || 'Failed to create product');
      return;
    });
};

// update product
export const updateProduct = async (
  id: number,
  product: CreateProductPayload,
): Promise<ProductListItem | undefined> => {
  return axiosInstance
    .put(`/products/${id}`, product)
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError<Message>) => {
      toast.error(error.response?.data.message || 'Failed to update product');
      return;
    });
};

export const AdminApiContext = createContext({
  getUsers: getUsers,
  getUser: getUser,
  deleteUser: deleteUser,
  getUsersWithQuery: getUsersWithQuery,
  addBalance: addBalance,
  getProducts: getProducts,
  getProduct: getProduct,
  deleteProduct: deleteProduct,
  getProductsWithQuery: getProductsWithQuery,
  createProduct: createProduct,
  updateProduct: updateProduct,
});

export const AdminApiProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const contextValue = useMemo(
    () => ({
      getUsers,
      getUser,
      deleteUser,
      getUsersWithQuery,
      addBalance,
      getProducts,
      getProduct,
      deleteProduct,
      getProductsWithQuery,
      createProduct,
      updateProduct,
    }),
    [],
  );
  return (
    <AdminApiContext.Provider value={contextValue}>
      {children}
    </AdminApiContext.Provider>
  );
};
