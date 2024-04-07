import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from '@nextui-org/react';
import React, { useContext } from 'react';
import { AuthContext } from '@/context/auth-provider';
import { ThemeSwitch } from '@/components/theme-switch';

export const UserDropdown = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <Dropdown placement='bottom-end'>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar
            as='button'
            color='secondary'
            size='sm'
            name={user?.username}
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label='User menu actions'
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownItem
          key='profile'
          className='flex flex-col justify-start w-full items-start'
        >
          <p className='text-sm font-light text-gray-500'>Signed in as</p>
          <p>@{user?.username}</p>
        </DropdownItem>

        <DropdownItem key='switch'>
          <ThemeSwitch />
        </DropdownItem>

        <DropdownItem
          key='logout'
          color='danger'
          className='text-danger '
          onClick={logout}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
