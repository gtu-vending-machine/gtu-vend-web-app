'use client';

import React, { useMemo } from 'react';
import {
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Selection,
} from '@nextui-org/react';
import { capitalize } from '@/utils/utils';
import { SearchIcon } from '@/components/icons/table/search-icon';
import { ChevronDownIcon } from '@/components/icons/table/chevron-down-icon';
import { Column, UserListItem } from '@/types';

const roleOptions = [
  { uid: 'admin', name: 'admin' },
  { uid: 'user', name: 'user' },
];

const useTopContent = ({
  filterValue,
  onSearchChange,
  roleFilter,
  onRoleSelectionChange,
  visibleColumns,
  columns,
  users,
  onRowsPerPageChange,
  onClear,
  setVisibleColumns,
}: {
  filterValue: string;
  onSearchChange: (value?: string) => void;
  roleFilter: Selection;
  onRoleSelectionChange: (selection: Selection) => void;
  visibleColumns: Selection;
  columns: Column[];
  users: UserListItem[];
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onClear: () => void;
  setVisibleColumns: React.Dispatch<React.SetStateAction<Selection>>;
}) => {
  const topContent = useMemo(() => {
    return (
      <div className='flex flex-col gap-4 mt-4'>
        <div className='flex justify-between gap-3 items-end'>
          <Input
            isClearable
            className='w-full sm:max-w-[44%]'
            placeholder='Search by name...'
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className='flex gap-3'>
            <Dropdown>
              <DropdownTrigger className='hidden sm:flex'>
                <Button
                  endContent={<ChevronDownIcon className='text-small' />}
                  variant='flat'
                >
                  Role
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label='Table Columns'
                closeOnSelect={false}
                selectedKeys={roleFilter}
                selectionMode='multiple'
                onSelectionChange={onRoleSelectionChange}
              >
                {roleOptions.map((role) => (
                  <DropdownItem key={role.uid} className='capitalize'>
                    {capitalize(role.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className='hidden sm:flex'>
                <Button
                  endContent={<ChevronDownIcon className='text-small' />}
                  variant='flat'
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label='Table Columns'
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode='multiple'
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className='capitalize'>
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {/* <Button color='primary' endContent={<PlusIcon />}>
              Add New
            </Button> */}
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-default-400 text-small'>
            Total {users.length} users
          </span>
          <label className='flex items-center text-default-400 text-small'>
            Rows per page:
            <select
              className='bg-transparent outline-none text-default-400 text-small'
              onChange={onRowsPerPageChange}
            >
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='15'>15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    onSearchChange,
    roleFilter,
    onRoleSelectionChange,
    visibleColumns,
    setVisibleColumns,
    columns,
    users.length,
    onRowsPerPageChange,
    onClear,
  ]);

  return topContent;
};

export default useTopContent;
