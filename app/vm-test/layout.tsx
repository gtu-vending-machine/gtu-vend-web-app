'use client';

import { withAuth } from '@/hocs/withAuth';
import { Role } from '@/types';

function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

const allowedRoles: Role[] = ['machine'];

export default withAuth(allowedRoles)(Layout);
