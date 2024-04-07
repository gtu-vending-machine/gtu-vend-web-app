'use client';

import { useAuth } from '@/hooks/useAuth';
import { AuthAction, UserResponse } from '@/types';
import { createContext } from 'react';

export const AuthContext = createContext<{
  user: UserResponse | null;
  login: AuthAction;
  signUp: AuthAction;
  logout: () => void;
}>({
  user: null,
  login: async () => {},
  signUp: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, login, logout, signUp] = useAuth();
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
