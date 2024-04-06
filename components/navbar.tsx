'use client';

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from '@nextui-org/navbar';
import { Link } from '@nextui-org/link';

import { link as linkStyles } from '@nextui-org/theme';

import { siteConfig } from '@/config/site';
import NextLink from 'next/link';
import clsx from 'clsx';

import { ThemeSwitch } from '@/components/theme-switch';
import { GithubIcon } from '@/components/icons';

import { Logo } from '@/components/icons';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';

export const Navbar = () => {
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
        </ul>
      </NavbarContent>

      <NavbarContent className='flex basis-full justify-end' justify='end'>
        <NavbarItem className='flex gap-2'>
          <Link isExternal href={siteConfig.links.github} aria-label='Github'>
            <GithubIcon className='text-default-500' />
          </Link>
          <ThemeSwitch />
          <Dropdown placement='bottom-end'>
            <DropdownTrigger>
              <Avatar
                as='button'
                className='transition-transform'
                color='secondary'
                name='Jason Hughes'
                size='sm'
              />
            </DropdownTrigger>
            <DropdownMenu aria-label='Profile Actions' variant='flat'>
              {siteConfig.dropdownMenuItems.map((item, index) => (
                <DropdownItem key={`${item}-${index}`}>
                  <Link
                    color={
                      index === 2
                        ? 'primary'
                        : index === siteConfig.dropdownMenuItems.length - 1
                        ? 'danger'
                        : 'foreground'
                    }
                    href={item.href}
                    size='sm'
                  >
                    {item.label}
                  </Link>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
