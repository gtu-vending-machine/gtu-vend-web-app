'use client';

import React, { ChangeEvent, Dispatch, SetStateAction, useMemo } from 'react';
import {
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Selection,
} from '@nextui-org/react';
import { capitalize, lowercase } from '@/utils/utils';
import { SearchIcon } from '@/components/icons/table/search-icon';
import { ChevronDownIcon } from '@/components/icons/table/chevron-down-icon';
import { Column, OptionType } from '@/types';

const useTopContent = <T,>({
  count,
  columns,
  searchValue,
  options,
  optionSelection,
  visibleColumns,
  searchOption,
  selectionOption,
  onClear,
  onSearchValueChange,
  onOptionSelectionChange,
  onRowsPerPageChange,
  setVisibleColumns,
  addItemComponent,
}: {
  count: number;
  columns: Column<T>[];
  searchValue: string;
  options?: OptionType[];
  optionSelection?: Selection;
  visibleColumns: Selection;
  searchOption: OptionType;
  selectionOption?: OptionType;
  onClear: () => void;
  onSearchValueChange: (value?: string) => void;
  onOptionSelectionChange?: (selection: Selection) => void;
  onRowsPerPageChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  setVisibleColumns: Dispatch<SetStateAction<Selection>>;
  addItemComponent?: React.ReactNode;
}) => {
  const topContent = useMemo(() => {
    return (
      <div className='flex flex-col gap-4 mt-4'>
        <div className='flex justify-between gap-3 items-end'>
          <Input
            isClearable
            className='w-full sm:max-w-[44%]'
            placeholder={`Search by ${lowercase(searchOption.name)}...`}
            startContent={<SearchIcon />}
            value={searchValue}
            onClear={() => onClear()}
            onValueChange={onSearchValueChange}
          />
          <div className='flex gap-3'>
            {selectionOption && options && (
              <Dropdown>
                <DropdownTrigger className='hidden sm:flex'>
                  <Button
                    endContent={<ChevronDownIcon className='text-small' />}
                    variant='flat'
                  >
                    {capitalize(selectionOption.name)}
                  </Button>
                </DropdownTrigger>

                <DropdownMenu
                  disallowEmptySelection
                  aria-label='Table Columns'
                  closeOnSelect={false}
                  selectedKeys={optionSelection}
                  selectionMode='multiple'
                  onSelectionChange={onOptionSelectionChange}
                >
                  {options.map((options) => (
                    <DropdownItem key={options.uid} className='capitalize'>
                      {capitalize(options.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            )}
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
                  <DropdownItem
                    key={column.uid as string}
                    className='capitalize'
                  >
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {/* <Button color='primary' endContent={<PlusIcon />}>
              Add New
            </Button> */}
            {addItemComponent ?? null}
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-default-400 text-small'>
            Total {count} data
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
    searchOption.name,
    searchValue,
    onSearchValueChange,
    selectionOption,
    options,
    optionSelection,
    onOptionSelectionChange,
    visibleColumns,
    setVisibleColumns,
    columns,
    count,
    onRowsPerPageChange,
    onClear,
  ]);

  return topContent;
};

export default useTopContent;
