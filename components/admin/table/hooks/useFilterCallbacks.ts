'use client';

import { Dispatch, SetStateAction, useCallback } from 'react';
import { Selection, SortDescriptor } from '@nextui-org/react';
import { OptionType, Query } from '@/types';

const useFilterCallbacks = ({
  setPage,
  setQuery,
  setsearchValue,
  setSortDescriptor,
  setOptionSelection,
  rowsPerPage,
  query,
  options,
  searchOption,
  selectionOption,
}: {
  setPage: Dispatch<SetStateAction<number>>;
  setQuery: Dispatch<SetStateAction<Query>>;
  setsearchValue: Dispatch<SetStateAction<string>>;
  setSortDescriptor: Dispatch<SetStateAction<SortDescriptor>>;
  setOptionSelection: Dispatch<SetStateAction<Selection>>;
  rowsPerPage: number;
  query: Query;
  options?: OptionType[];
  searchOption: OptionType;
  selectionOption?: OptionType;
}) => {
  const onSearchValueChange = useCallback(
    (value?: string) => {
      // update states
      setsearchValue(value || '');
      setPage(1);

      const otherFilters =
        query.query?.filter?.filter(
          (filter: any) => filter.field !== searchOption.uid,
        ) || [];

      const filters: typeof otherFilters = value
        ? [
            ...otherFilters,
            {
              field: searchOption.uid,
              option: 'contains',
              value,
            },
          ]
        : otherFilters;

      // update query
      setQuery((prev: any) => ({
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

  const onClear = useCallback(() => {
    setsearchValue('');
  }, []);

  const onOptionSelectionChange = useCallback(
    (selection: Selection) => {
      if (selectionOption && options) {
        setOptionSelection(selection);
        setPage(1);

        // get selected options
        const selectedOptions = Array.from(selection);

        // get all filters except selection option
        const otherFilters =
          query.query?.filter?.filter(
            (filter) => filter.field !== selectionOption.uid,
          ) || [];

        // if all options are selected, remove selected option filter
        const filters: typeof otherFilters =
          selectedOptions.length === options.length
            ? otherFilters
            : [
                ...otherFilters,
                {
                  field: selectionOption.uid,
                  option: 'eq',
                  value: selectedOptions[0],
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
      }
    },
    [query.query?.filter, setQuery, rowsPerPage],
  );

  const onSortChange = useCallback((descriptor: SortDescriptor) => {
    setSortDescriptor(descriptor);
    setQuery((prev: any) => ({
      ...prev,
      query: {
        ...prev.query,
        sort: {
          field: descriptor.column,
          order: descriptor.direction === 'ascending' ? 'asc' : 'desc',
        },
      },
    }));
  }, []);

  return {
    onSearchValueChange,
    onOptionSelectionChange,
    onClear,
    onSortChange,
  };
};

export default useFilterCallbacks;
