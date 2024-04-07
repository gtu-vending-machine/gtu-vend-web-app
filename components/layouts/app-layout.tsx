'use client';

import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { Navbar } from '../navbar';
import { Route } from '@/config/routes';

// paths start with followings are not allowed to layout
const notAllowedPaths: Route[] = ['/login', '/sign-up', '/admin'];

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  // if pathname is starts with notAllowedPaths, return children
  const isNotAllowed = notAllowedPaths.some((path) =>
    pathname.startsWith(path),
  );
  if (isNotAllowed) return <>{children}</>;

  return (
    <div className='relative flex flex-col h-screen'>
      <Navbar />
      <main className='container mx-auto max-w-7xl px-6 flex-grow'>
        {children}
      </main>
    </div>
  );
};
