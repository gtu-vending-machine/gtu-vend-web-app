'use client';

import { Link, Navbar, NavbarContent } from '@nextui-org/react';
import React from 'react';
import { BurguerButton } from './burguer-button';
import { UserDropdown } from '../../user-dropdown';
import { GithubIcon } from '@/components/icons';
import { siteConfig } from '@/config/site';

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  return (
    <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
      <Navbar
        isBordered
        className='w-full md:justify-between'
        classNames={{
          wrapper: 'w-full max-w-full',
        }}
      >
        <NavbarContent
          className='md:hidden data-[justify=end]:flex-grow-0'
          justify='start'
        >
          <BurguerButton />
        </NavbarContent>
        <div
          // to align the user dropdown to the right on large screens
          // only shown in mid to large screens
          className='hidden md:block flex-grow-1'
        ></div>
        <NavbarContent
          justify='end'
          className='w-fit data-[justify=end]:flex-grow-0'
        >
          <Link isExternal href={siteConfig.links.github} aria-label='Github'>
            <GithubIcon className='text-default-500' />
          </Link>
          <NavbarContent>
            <UserDropdown />
          </NavbarContent>
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};
