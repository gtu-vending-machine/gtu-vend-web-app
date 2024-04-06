import React from 'react';

export const useKeyPress = (key: string, action: () => void) => {
  React.useEffect(() => {
    const onKeyup = (e: KeyboardEvent) => {
      if (e.key === key) {
        action();
      }
    };
    window.addEventListener('keyup', onKeyup);
    return () => window.removeEventListener('keyup', onKeyup);
  }, [key, action]);
};
