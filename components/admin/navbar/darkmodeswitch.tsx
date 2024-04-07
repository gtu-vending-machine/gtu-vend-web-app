import React from 'react';
import { useTheme } from 'next-themes';
import { Switch } from '@nextui-org/react';
import { MoonFilledIcon, SunFilledIcon } from '@/components/icons';

export const DarkModeSwitch = () => {
  const { setTheme, resolvedTheme } = useTheme();
  return (
    <Switch
      isSelected={resolvedTheme === 'dark' ? true : false}
      onValueChange={(e) => setTheme(e ? 'dark' : 'light')}
      thumbIcon={
        resolvedTheme === 'dark' ? <SunFilledIcon /> : <MoonFilledIcon />
      }
    />
  );
};
