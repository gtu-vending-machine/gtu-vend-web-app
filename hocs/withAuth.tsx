'use client';

import { AuthContext } from '@/context/authProvider';
import { Role } from '@/types';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

// a higher order component that wraps a component with user role validation
export const withAuth =
  (allowedRoles: Role[]) => (WrappedComponent: React.FC<any>) => {
    const WithAuthComponent = (props: any) => {
      const { user } = useContext(AuthContext);
      const router = useRouter();

      if (!user) return null;
      if (!allowedRoles.includes(user.role)) return router.push('/401');
      return <WrappedComponent {...props} />;
    };

    WithAuthComponent.displayName = `WithAuth(${
      WrappedComponent.displayName || WrappedComponent.name || 'Component'
    })`;

    return WithAuthComponent;
  };
