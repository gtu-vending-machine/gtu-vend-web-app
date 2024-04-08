'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { Message } from '@/types';
import { AuthAction, User, UserResponse } from '@/types/user';
import toast from 'react-hot-toast';

export const useAuth = (): [
  user: UserResponse | null,
  login: AuthAction,
  logout: () => void,
  signUp: AuthAction,
] => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const pathname = usePathname();
  const authFetched = useRef(false);

  const axiosInstance = axios.create({
    baseURL,
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

  // expires date will be saved in local storage, if it is not expired, no need to '/auth' route
  const getAuthStatus = async () => {
    await axiosInstance
      .get('/auth')
      .then(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          if (pathname === '/login' || pathname === '/sign-up') {
            router.push('/');
          }
        }
      })
      .catch((error: AxiosError<Message>) => {
        console.error(error.response?.data);
        localStorage.removeItem('user');
        setUser(null);
        if (pathname !== '/login' && pathname !== '/sign-up') {
          router.push('/login');
        }
      });
  };

  // get auth status on page load by get method and /auth route
  useEffect(() => {
    if (!authFetched.current) {
      getAuthStatus();
      authFetched.current = true;
    }
    // don't update on axiosInstance. CAN delete pathname later
  }, [pathname]);

  const login: AuthAction = async (user) => {
    await axiosInstance
      .post('/login', user)
      .then((response) => {
        const userResponse: UserResponse = response.data.user;
        localStorage.setItem('user', JSON.stringify(userResponse));
        setUser(userResponse);
        router.push('/');
      })
      .catch((error: AxiosError<Message>) => {
        console.error(error.response?.data);
        toast.error(error.response?.data.message || 'Failed to login');
      });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  const signUp: AuthAction = async (user) => {
    await axiosInstance
      .post('/signup', user)
      .then((response) => {
        const userResponse: UserResponse = response.data.user;
        localStorage.setItem('user', JSON.stringify(userResponse));
        setUser(userResponse);
        router.push('/');
      })
      .catch((error: AxiosError<Message>) => {
        console.error(error.response?.data);
        toast.error(error.response?.data.message || 'Failed to sign up');
      });
  };

  return [user, login, logout, signUp];
};
