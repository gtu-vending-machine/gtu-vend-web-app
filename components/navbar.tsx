'use client';

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from '@nextui-org/navbar';

import { link as linkStyles } from '@nextui-org/theme';

import { siteConfig } from '@/config/site';
import NextLink from 'next/link';
import clsx from 'clsx';

import { GithubIcon } from '@/components/icons';

import { Logo } from '@/components/icons';
import { Link } from '@nextui-org/react';
import { UserDropdown } from './user-dropdown';
import { useContext } from 'react';
import { AuthContext } from '@/context/auth-provider';

export const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <NextUINavbar maxWidth='xl' position='sticky'>
      <NavbarContent className='basis-1/5 sm:basis-full' justify='start'>
        <NavbarBrand as='li' className='gap-3 max-w-fit'>
          <NextLink className='flex justify-start items-center gap-1' href='/'>
            <Logo />
          </NextLink>
        </NavbarBrand>
        <ul className='hidden lg:flex gap-4 justify-start ml-2'>
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:text-primary data-[active=true]:font-medium',
                )}
                color='foreground'
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
          {user?.role === 'admin' && (
            <>
              <NavbarItem>
                <NextLink
                  className={clsx(
                    linkStyles({ color: 'foreground' }),
                    'data-[active=true]:text-primary data-[active=true]:font-medium',
                  )}
                  color='foreground'
                  href='/admin'
                >
                  Admin Dashboard
                </NextLink>
              </NavbarItem>
            </>
          )}
        </ul>
      </NavbarContent>

      <NavbarContent className='flex basis-full justify-end' justify='end'>
        <NavbarItem className='flex gap-4'>
          <div className='flex gap-2 items-center'>
            <Link isExternal href={siteConfig.links.github} aria-label='Github'>
              <GithubIcon className='text-default-500' />
            </Link>
          </div>
        </NavbarItem>
        <UserDropdown />
      </NavbarContent>
    </NextUINavbar>
  );
};
