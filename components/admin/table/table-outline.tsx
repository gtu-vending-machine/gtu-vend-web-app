'use client';

import React, {
  Dispatch,
  JSXElementConstructor,
  ReactElement,
  SetStateAction,
  useMemo,
  useState,
} from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  Selection,
  SortDescriptor,
  TableBodyProps,
  Button,
} from '@nextui-org/react';
import { Column, OptionType, Query } from '@/types';

import useTopContent from './hooks/useTopContent';
import useBottomContent from './hooks/useBottomContent';
import useFilterCallbacks from './hooks/useFilterCallbacks';
import usePageCallbacks from './hooks/usePageCallbacks';

// export default function UserTable({
export default function TableOutline<T extends { id: number; name: string }>({
  count,
  columns,
  query,
  setQuery,
  options,
  searchOption,
  selectionOption,
  children,
  addItemComponent,
}: {
  count: number;
  columns: Column<T>[];
  query: Query;
  setQuery: Dispatch<SetStateAction<Query>>;
  options?: OptionType[]; // option for filtering (on header)
  searchOption: OptionType;
  selectionOption?: OptionType;
  children: ReactElement<
    TableBodyProps<object>,
    string | JSXElementConstructor<any>
  >;
  addItemComponent?: React.ReactNode;
}) {
  const [page, setPage] = useState(1);
  const [searchValue, setsearchValue] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const pages = Math.max(1, Math.ceil(count / rowsPerPage));
  const [optionSelection, setOptionSelection] = useState<Selection>('all');
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({});

  // const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(columns.map((column) => column.uid as string)),
  );

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid as string),
    );
  }, [visibleColumns]);

  const { onRowsPerPageChange, onPageChange, onPreviousPage, onNextPage } =
    usePageCallbacks({
      page,
      pages,
      setPage,
      setQuery,
      rowsPerPage,
      setRowsPerPage,
    });

  const {
    onSearchValueChange,
    onOptionSelectionChange,
    onClear,
    onSortChange,
  } = useFilterCallbacks({
    setPage,
    setQuery,
    rowsPerPage,
    setsearchValue,
    query,
    setOptionSelection,
    setSortDescriptor,
    options,
    searchOption,
    selectionOption,
  });

  const topContent = useTopContent<T>({
    count,
    columns,
    options, // optional
    searchValue,
    optionSelection, // optional
    visibleColumns,
    searchOption,
    selectionOption,
    onSearchValueChange,
    onOptionSelectionChange, // optional
    onRowsPerPageChange,
    onClear,
    setVisibleColumns,
    addItemComponent,
  });

  const bottomContent = useBottomContent({
    // selectedKeys, // optional
    count,
    page,
    pages,
    onPageChange,
    onPreviousPage,
    onNextPage,
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
        // onSelectionChange={setSelectedKeys}
        onSortChange={onSortChange}
        className='w-full p-4'
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid as string}
              align={column.uid === 'actions' ? 'center' : 'start'}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        {children}
      </Table>
    </>
  );
}
