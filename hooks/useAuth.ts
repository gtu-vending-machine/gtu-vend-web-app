'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { AuthAction, Message, User, UserResponse } from '@/types';

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
    try {
      // I don't know why but this executes twice
      await axiosInstance.get('/auth');

      // if not error, get user from local storage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        if (pathname === '/login' || pathname === '/sign-up') {
          router.push('/');
        }
      }
    } catch (error: AxiosError | any) {
      console.error((error as AxiosError)?.response?.data);
      localStorage.removeItem('user');
      setUser(null);
      if (pathname !== '/login' && pathname !== '/sign-up') {
        router.push('/login');
      }
    }
  };

  // get auth status on page load by get method and /auth route
  useEffect(() => {
    if (!authFetched.current) {
      getAuthStatus();
      authFetched.current = true;
    }
    // don't update on axiosInstance. no need to update on path change also;
    // since we alreaady have push (prevent one more render) - CAN delete pathname later
  }, [pathname]);

  const login: AuthAction = async (user, setError) => {
    try {
      const response = await axiosInstance.post('/login', user);
      const userResponse: UserResponse = response.data.user;
      localStorage.setItem('user', JSON.stringify(userResponse));
      setUser(userResponse);
      router.push('/');
    } catch (error: AxiosError | any) {
      console.error((error as AxiosError)?.response?.data);
      setError(error?.response?.data as Message);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  const signUp: AuthAction = async (user, setError) => {
    try {
      const response = await axios.post(`${baseURL}/signup`, user);
      const userResponse: UserResponse = response.data.user;
      localStorage.setItem('user', JSON.stringify(userResponse));
      setUser(userResponse);
      router.push('/');
    } catch (error: AxiosError | any) {
      console.error((error as AxiosError)?.response?.data);
      setError(error?.response?.data as Message);
    }
  };

  return [user, login, logout, signUp];
};
