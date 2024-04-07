'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Spinner,
} from '@nextui-org/react';
import { capitalize } from '@/utils/utils';
import { SearchIcon } from '@/components/icons/table/search-icon';
import { ChevronDownIcon } from '@/components/icons/table/chevron-down-icon';
import { Column, Query, Role, UserListItem } from '@/types';
// import { PlusIcon } from '@/components/icons/table/plus-icon';

const roleColorMap: Record<string, ChipProps['color']> = {
  admin: 'danger',
  user: 'warning',
};

const roleOptions = [
  { uid: 'admin', name: 'admin' },
  { uid: 'user', name: 'user' },
];

export default function Users({
  users,
  loading,
  count,
  columns,
  query,
  setQuery,
}: {
  users: UserListItem[];
  loading: boolean;
  count: number;
  columns: Column[];
  query: Query<UserListItem>;
  setQuery: React.Dispatch<React.SetStateAction<Query<UserListItem>>>;
}) {
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState('');

  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(columns.map((column) => column.uid)),
  );

  const [roleFilter, setRoleFilter] = useState<Selection>('all');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({});

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const pages = Math.max(1, Math.ceil(count / rowsPerPage));

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
      setQuery((prev) => ({
        ...prev,
        query: {
          ...prev.query,
          pagination: {
            page: page + 1,
            pageSize: rowsPerPage,
          },
        },
      }));
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
      setQuery((prev) => ({
        ...prev,
        query: {
          ...prev.query,
          pagination: {
            page: page - 1,
            pageSize: rowsPerPage,
          },
        },
      }));
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
      setQuery((prev) => ({
        ...prev,
        query: {
          ...prev.query,
          pagination: {
            page: 1,
            pageSize: Number(e.target.value),
          },
        },
      }));
    },
    [],
  );

  const onPageChange = React.useCallback((page: number) => {
    setPage(page);
    setQuery((prev) => ({
      ...prev,
      query: {
        ...prev.query,
        pagination: {
          page,
          pageSize: rowsPerPage,
        },
      },
    }));
  }, []);

  const onSearchChange = React.useCallback(
    (value?: string) => {
      // update states
      setFilterValue(value || '');
      setPage(1);

      // get all filters except name
      const otherFilters =
        query.query?.filter?.filter((filter) => filter.field !== 'name') || [];

      // add name filter if value is exists
      const filters: typeof otherFilters = value
        ? [
            ...otherFilters,
            {
              field: 'name',
              option: 'contains',
              value,
            },
          ]
        : otherFilters;

      // update query
      setQuery((prev) => ({
        ...prev,
        query: {
          ...prev.query,
          filter: filters,
          pagination: {
            page: 1,
            pageSize: rowsPerPage,
          },
        },
      }));
    },
    [query.query?.filter, rowsPerPage, setQuery],
  );

  const onClear = React.useCallback(() => {
    setFilterValue('');
  }, []);

  const onRoleSelectionChange = React.useCallback(
    (selection: Selection) => {
      setRoleFilter(selection);
      setPage(1);
      // get selected roles
      const selectedRoles = Array.from(selection) as Role[];

      // get all filters except role
      const otherFilters =
        query.query?.filter?.filter((filter) => filter.field !== 'role') || [];

      // if all roles are selected, remove role filter
      const filters: typeof otherFilters =
        selectedRoles.length === roleOptions.length
          ? otherFilters
          : [
              ...otherFilters,
              {
                field: 'role',
                option: 'eq',
                value: selectedRoles[0],
              },
            ];

      // update query
      setQuery((prev) => ({
        ...prev,
        query: {
          ...prev.query,
          filter: filters,
          pagination: {
            page: 1,
            pageSize: rowsPerPage,
          },
        },
      }));
    },
    [rowsPerPage, query],
  );

  const topContent = useTopContent({
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
  });

  const bottomContent = useBottomContent({
    selectedKeys,
    users,
    page,
    pages,
    onPageChange,
    onPreviousPage,
    onNextPage,
  });

  const renderCell = useRenderCell({});

  const onSortChange = React.useCallback((descriptor: SortDescriptor) => {
    setSortDescriptor(descriptor);
    setQuery((prev) => ({
      ...prev,
      query: {
        ...prev.query,
        sort: {
          field: descriptor.column as keyof UserListItem,
          order: descriptor.direction === 'ascending' ? 'asc' : 'desc',
        },
      },
    }));
  }, []);

  return (
    <Table
      aria-label='Example table with custom cells, pagination and sorting'
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement='outside'
      classNames={{
        wrapper: 'max-h-[556px]',
      }}
      selectedKeys={selectedKeys}
      selectionMode='multiple'
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement='outside'
      onSelectionChange={setSelectedKeys}
      onSortChange={onSortChange}
      className='w-full p-4'
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={'No users found'}
        items={users}
        loadingContent={<Spinner />}
        loadingState={loading ? 'loading' : 'idle'}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

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
    columns,
    users.length,
    onRowsPerPageChange,
    onClear,
  ]);

  return topContent;
};

const useBottomContent = ({
  selectedKeys,
  users,
  page,
  pages,
  onPageChange,
  onPreviousPage,
  onNextPage,
}: {
  selectedKeys: Selection;
  users: UserListItem[];
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
}) => {
  const bottomContent = useMemo(() => {
    return (
      <div className='py-2 px-2 flex justify-between items-center'>
        <span className='w-[30%] text-small text-default-400'>
          {selectedKeys === 'all'
            ? 'All items selected'
            : `${selectedKeys.size} of ${users.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color='primary'
          page={page}
          total={pages}
          onChange={onPageChange}
        />
        <div className='hidden sm:flex w-[30%] justify-end gap-2'>
          <Button
            isDisabled={pages === 1}
            size='sm'
            variant='flat'
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size='sm'
            variant='flat'
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, users.length, page, pages]);

  return bottomContent;
};

const useRenderCell = ({}: {}) => {
  const renderCell = React.useCallback(
    (user: UserListItem, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof UserListItem];

      switch (columnKey) {
        case 'name':
          return (
            <User
              avatarProps={{
                radius: 'lg',
                name: user.name,
              }}
              description={user.username}
              name={cellValue}
            >
              {user.username}
            </User>
          );
        case 'role':
          return (
            <Chip
              className='capitalize'
              color={roleColorMap[user.role]}
              size='sm'
              variant='flat'
            >
              {cellValue}
            </Chip>
          );
        case 'actions':
          return (
            <div className='relative flex justify-start items-center gap-2'>
              <Button size='sm' variant='light'>
                View
              </Button>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [],
  );

  return renderCell;
};
