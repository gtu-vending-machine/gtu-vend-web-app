'use client';

import { Message, Query } from '@/types';
import {
  CreateProductPayload,
  ProductListItem,
  ProductQueryResponse,
  UpdateProductPayload,
} from '@/types/product';
import { User, UserListItem, UserQueryResponse } from '@/types/user';
import {
  AddProductToSlotPayload,
  CreateVendingMachinePayload,
  Slot,
  VendingMachine,
  VendingMachineListItem,
  VendingMachineQueryResponse,
} from '@/types/vending-machines';
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

export const resetBalance = async (
  id: number,
): Promise<Pick<User, 'id' | 'balance'>> => {
  return axiosInstance
    .post(`/users/${id}/resetBalance`)
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError<Message>) => {
      toast.error(error.response?.data.message || 'Failed to reset balance');
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
  product: UpdateProductPayload,
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

// ------------------ Vending Machine API ------------------
// get vending machines from the server
export const getVendingMachines = async (): Promise<
  VendingMachineListItem[] | undefined
> => {
  return axiosInstance
    .get('/vendingMachines')
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError<Message>) => {
      toast.error(
        error.response?.data.message || 'Failed to get vending machines',
      );
      return;
    });
};

// get vending machine by id
export const getVendingMachine = async (
  id: number,
): Promise<VendingMachine | undefined> => {
  return axiosInstance
    .get(`/vendingMachines/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError<Message>) => {
      toast.error(
        error.response?.data.message || 'Failed to get vending machine',
      );
      return;
    });
};

// get vending machine by query
export const getVendingMachinesWithQuery = async (
  query: Query,
): Promise<VendingMachineQueryResponse | undefined> => {
  return axiosInstance
    .post('/vendingMachines/query', query)
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError<Message>) => {
      toast.error(
        error.response?.data.message || 'Failed to get vending machines',
      );
      return;
    });
};

// crete vending machine
export const createVendingMachine = async (
  vendingMachine: CreateVendingMachinePayload,
): Promise<VendingMachineListItem | undefined> => {
  return axiosInstance
    .post('/vendingMachines', vendingMachine)
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError<Message>) => {
      toast.error(
        error.response?.data.message || 'Failed to create vending machine',
      );
      return;
    });
};

// delete vending machine
export const deleteVendingMachine = async (
  id: number,
): Promise<VendingMachineListItem | undefined> => {
  return axiosInstance
    .delete(`/vendingMachines/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError<Message>) => {
      toast.error(
        error.response?.data.message || 'Failed to delete vending machine',
      );
      return;
    });
};

// ------------------ Slots API ------------------
export const addProductToSlot = async (
  id: number,
  payload: AddProductToSlotPayload,
): Promise<Slot | undefined> => {
  return axiosInstance
    .post(`/slots/${id}/product`, payload)
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError<Message>) => {
      toast.error(
        error.response?.data.message || 'Failed to add product to slot',
      );
      return;
    });
};

export const deleteProductFromSlot = async (
  id: number,
): Promise<Slot | undefined> => {
  return axiosInstance
    .delete(`/slots/${id}/product`)
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError<Message>) => {
      toast.error(
        error.response?.data.message || 'Failed to delete product from slot',
      );
      return;
    });
};

export const AdminApiContext = createContext({
  getUsers,
  getUser,
  deleteUser,
  getUsersWithQuery,
  addBalance,
  resetBalance,
  getProducts,
  getProduct,
  deleteProduct,
  getProductsWithQuery,
  createProduct,
  updateProduct,
  getVendingMachines,
  getVendingMachine,
  getVendingMachinesWithQuery,
  createVendingMachine,
  deleteVendingMachine,
  addProductToSlot,
  deleteProductFromSlot,
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
      resetBalance,
      getProducts,
      getProduct,
      deleteProduct,
      getProductsWithQuery,
      createProduct,
      updateProduct,
      getVendingMachines,
      getVendingMachine,
      getVendingMachinesWithQuery,
      createVendingMachine,
      deleteVendingMachine,
      addProductToSlot,
      deleteProductFromSlot,
    }),
    [],
  );
  return (
    <AdminApiContext.Provider value={contextValue}>
      {children}
    </AdminApiContext.Provider>
  );
};
