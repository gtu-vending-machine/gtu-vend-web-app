'use client';

import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react';
import { Query } from '@/types';

const usePageCallbacks = ({
  page,
  pages,
  setPage,
  setQuery,
  rowsPerPage,
  setRowsPerPage,
}: {
  page: number;
  pages: number;
  setPage: Dispatch<SetStateAction<number>>;
  setQuery: Dispatch<SetStateAction<Query>>;
  rowsPerPage: number;
  setRowsPerPage: Dispatch<SetStateAction<number>>;
}) => {
  const onNextPage = useCallback(() => {
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

  const onPreviousPage = useCallback(() => {
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

  const onRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
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

  const onPageChange = useCallback((page: number) => {
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
  return { onRowsPerPageChange, onPageChange, onPreviousPage, onNextPage };
};

export default usePageCallbacks;
