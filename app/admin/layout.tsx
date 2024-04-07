'use client';

import '@/styles/globals.css';
import { withAuth } from '@/hocs/withAuth';
import { Role } from '@/types';
import { Layout as AdminLayout } from '@/components/admin/layout/layout';

function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}

const allowedRoles: Role[] = ['admin'];

export default withAuth(allowedRoles)(Layout);
