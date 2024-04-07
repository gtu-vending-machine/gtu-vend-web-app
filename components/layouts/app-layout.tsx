'use client';

import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { Navbar } from '../navbar';

// paths start with followings are not allowed to application layout
const notAllowedPaths = ['/login', '/sign-up', '/admin'];

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
      <footer className='w-full flex items-center justify-center py-3 bottom-0'>
        <p className='text-sm text-center text-gray-500'>
          GTUVend © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};
