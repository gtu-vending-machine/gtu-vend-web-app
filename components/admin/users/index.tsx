'use client';

import React, { useMemo, useState } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Selection,
  SortDescriptor,
  Spinner,
} from '@nextui-org/react';
import { Column, Query, UserListItem } from '@/types';

import useRenderCell from './hooks/useRenderCell';
import useTopContent from './hooks/useTopContent';
import useBottomContent from './hooks/useBottomContent';
import useCallBacks from './hooks/useCallBacks';
import UserDetailDrawer from './user-details';

export default function Users({
  users,
  setUsers,
  loading,
  count,
  columns,
  query,
  setQuery,
}: {
  users: UserListItem[];
  setUsers: React.Dispatch<React.SetStateAction<UserListItem[]>>;
  loading: boolean;
  count: number;
  columns: Column[];
  query: Query<UserListItem>;
  setQuery: React.Dispatch<React.SetStateAction<Query<UserListItem>>>;
}) {
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const pages = Math.max(1, Math.ceil(count / rowsPerPage));
  const [roleFilter, setRoleFilter] = useState<Selection>('all');
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({});

  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(columns.map((column) => column.uid)),
  );

  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState<number>(0);

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const {
    onSearchChange,
    onRoleSelectionChange,
    onRowsPerPageChange,
    onClear,
    onPageChange,
    onPreviousPage,
    onNextPage,
    onSortChange,
  } = useCallBacks({
    page,
    pages,
    setPage,
    setQuery,
    rowsPerPage,
    setRowsPerPage,
    setFilterValue,
    query,
    setRoleFilter,
    setSortDescriptor,
  });

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

  const renderCell = useRenderCell({
    setUserId,
    setIsOpen,
  });

  return (
    <>
      <Table
        aria-label='Example table with custom cells, pagination and sorting'
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement='outside'
        classNames={{
          wrapper: 'max-h-[556px]',
        }}
        // selectedKeys={selectedKeys}
        // selectionMode='multiple'
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
      <UserDetailDrawer
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        user={users.find((user) => user.id === userId)}
        setUsers={setUsers}
      />
    </>
  );
}
