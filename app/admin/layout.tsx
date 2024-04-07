'use client';

import '@/styles/globals.css';
import { withAuth } from '@/hocs/withAuth';
import { Role } from '@/types';
import { Layout as AdminLayout } from '@/components/admin/layout/layout';
import { AdminApiProvider } from '@/context/admin-api-provider';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminApiProvider>
      <AdminLayout>{children}</AdminLayout>
    </AdminApiProvider>
  );
}

const allowedRoles: Role[] = ['admin'];

export default withAuth(allowedRoles)(Layout);
