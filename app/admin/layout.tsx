'use client';

import '@/styles/globals.css';
import { Providers } from './providers';
import { withAuth } from '@/hocs/withAuth';
import { Role } from '@/types';

function Layout({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}

const allowedRoles: Role[] = ['admin'];

export default withAuth(allowedRoles)(Layout);
