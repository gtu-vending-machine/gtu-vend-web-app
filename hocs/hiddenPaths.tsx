'use client';

import { usePathname } from 'next/navigation';

// path options
type Paths = '';

// a higher order component to hide a component for specific roles
export const hiddenPaths =
  (hiddenPaths: Paths[]) => (WrappedComponent: React.FC<any>) => {
    const HiddenPathsComponent = (props: any) => {
      const pathname = usePathname();

      if (hiddenPaths.includes(pathname as Paths)) return null;
      return <WrappedComponent {...props} />;
    };

    HiddenPathsComponent.displayName = `HiddenPaths(${
      WrappedComponent.displayName || WrappedComponent.name || 'Component'
    })`;

    return HiddenPathsComponent;
  };
