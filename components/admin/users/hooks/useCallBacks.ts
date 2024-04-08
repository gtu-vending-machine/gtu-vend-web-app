'use client';

import React from 'react';
import { Selection, SortDescriptor } from '@nextui-org/react';
import { Query, Role, UserListItem } from '@/types';

const roleOptions = [
  { uid: 'admin', name: 'admin' },
  { uid: 'user', name: 'user' },
];

const useCallBacks = ({
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
}: {
  page: number;
  pages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setQuery: React.Dispatch<React.SetStateAction<Query<UserListItem>>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  setFilterValue: React.Dispatch<React.SetStateAction<string>>;
  query: Query<UserListItem>;
  setRoleFilter: React.Dispatch<React.SetStateAction<Selection>>;
  setSortDescriptor: React.Dispatch<React.SetStateAction<SortDescriptor>>;
}) => {
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
    [query.query?.filter, setQuery, rowsPerPage],
  );

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

  return {
    onSearchChange,
    onRoleSelectionChange,
    onRowsPerPageChange,
    onClear,
    onPageChange,
    onPreviousPage,
    onNextPage,
    onSortChange,
  };
};

export default useCallBacks;
