'use client';

import React from 'react';
import { Sidebar } from './sidebar.styles';
import { CompaniesDropdown } from './companies-dropdown';
import { SidebarItem } from './sidebar-item';
import { SidebarMenu } from './sidebar-menu';
import { useSidebarContext } from '../layout/layout-context';
import { usePathname } from 'next/navigation';
import { HomeIcon } from '@/components/icons/sidebar/home-icon';
import { AccountsIcon } from '@/components/icons/sidebar/accounts-icon';
import { ProductsIcon } from '@/components/icons/sidebar/products-icon';

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className='h-screen z-[202] sticky top-0'>
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className='flex flex-col justify-between h-full'>
          <div className={Sidebar.Body()}>
            <SidebarItem
              title='Home'
              icon={<HomeIcon />}
              isActive={pathname === '/'}
              href='/'
            />
            <SidebarMenu title='Main Menu'>
              <SidebarItem
                isActive={pathname === '/accounts'}
                title='Accounts'
                icon={<AccountsIcon />}
                href='/accounts'
              />
              <SidebarItem
                isActive={pathname === '/products'}
                title='Products'
                icon={<ProductsIcon />}
                href='/products'
              />
            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};
