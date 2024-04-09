'use client';

import React from 'react';
import { Sidebar } from './sidebar.styles';
import { SidebarHeader } from './sidebar-header';
import { SidebarItem } from './sidebar-item';
import { SidebarMenu } from './sidebar-menu';
import { useSidebarContext } from '../layout/layout-context';
import { usePathname } from 'next/navigation';
import { HomeIcon } from '@/components/icons/sidebar/home-icon';
import { AccountsIcon } from '@/components/icons/sidebar/accounts-icon';
import { ProductsIcon } from '@/components/icons/sidebar/products-icon';
import { Route } from '@/config/site';

export const SidebarWrapper = () => {
  const pathname = usePathname() as Route;

  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className='h-screen z-[50] sticky top-0'>
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <SidebarHeader />
        </div>
        <div className='flex flex-col justify-between h-full'>
          <div className={Sidebar.Body()}>
            <SidebarItem
              title='Home'
              icon={<HomeIcon />}
              isActive={pathname === '/admin'}
              href='/admin'
            />
            <SidebarMenu title='Main Menu'>
              <SidebarItem
                isActive={pathname === '/admin/users'}
                title='Users'
                icon={<AccountsIcon />}
                href='/admin/users'
              />
              <SidebarItem
                isActive={pathname === '/admin/products'}
                title='Products'
                icon={<ProductsIcon />}
                href='/admin/products'
              />
            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};
