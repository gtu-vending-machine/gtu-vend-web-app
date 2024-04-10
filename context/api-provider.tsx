'use client';

import { Transaction } from '@/types/transactions';
import { User } from '@/types/user';
import { SlotDetail } from '@/types/vending-machines';
import axios from 'axios';
import { createContext, useMemo } from 'react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const axiosInstance = axios.create({
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

// ---------- Slot API ----------

export const getSlotsByVendingMachineAndProductName = async ({
  vendingMachineId,
  productName,
}: {
  vendingMachineId: number;
  productName: string;
}): Promise<SlotDetail[] | undefined> => {
  return axiosInstance
    .post('/slots/by-vending-machine-and-product-name', {
      vendingMachineId,
      productName,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Failed to get slots by vending machine and product name');
      return;
    });
};

// ---------- Transaction API ----------
export const createTransaction = async ({
  userId,
  slotId,
}: {
  userId: number;
  slotId: number;
}): Promise<Transaction | undefined> => {
  return axiosInstance
    .post('/transactions', {
      slotId,
      userId,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      return;
    });
};

export const confirmTransaction = async ({
  code,
}: {
  code: string;
}): Promise<Pick<Transaction, 'hasConfirmed' | 'id'> | undefined> => {
  return axiosInstance
    .put('/transactions/confirm', {
      code,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      return;
    });
};

// cancel transaction cancel/:id
export const cancelTransaction = async (id: number): Promise<Transaction> => {
  return axiosInstance
    .delete(`/transactions/cancel/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const ApiContext = createContext({
  getSlotsByVendingMachineAndProductName,
  createTransaction,
  confirmTransaction,
  cancelTransaction,
});

export const AdminApiProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const contextValue = useMemo(
    () => ({
      getSlotsByVendingMachineAndProductName,
      createTransaction,
      confirmTransaction,
      cancelTransaction,
    }),
    [],
  );
  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  );
};
