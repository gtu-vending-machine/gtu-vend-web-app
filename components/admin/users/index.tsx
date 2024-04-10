'use client';

import React, { Dispatch, SetStateAction, useState } from 'react';
import { TableBody, TableRow, TableCell, Spinner } from '@nextui-org/react';
import { Column, OptionType, Query } from '@/types';
import { UserListItem } from '@/types/user';

import useRenderUserTableCell from '../table/hooks/useRenderUserTableCell';
import UserDetailDrawer from './user-details';
import TableOutline from '../table/table-outline';

const searchOption: OptionType = { uid: 'name', name: 'name' };
// supports only two options for now
const selectionOptions: OptionType[] = [
  { uid: 'admin', name: 'admin' },
  { uid: 'user', name: 'user' },
];
const selectionOption: OptionType = { uid: 'role', name: 'role' };

export default function UserTable({
  data,
  setData,
  loading,
  count,
  columns,
  query,
  setQuery,
}: {
  data: UserListItem[];
  setData: Dispatch<SetStateAction<UserListItem[]>>;
  loading: boolean;
  count: number;
  columns: Column<UserListItem>[];
  query: Query;
  setQuery: Dispatch<SetStateAction<Query>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [clickedItemId, setClickedItemId] = useState<number>(0);

  const renderUserTableCell = useRenderUserTableCell({
    setClickedItemId,
    setIsOpen,
  });

  return (
    <>
      <TableOutline<UserListItem>
        columns={columns}
        count={count}
        query={query}
        setQuery={setQuery}
        options={selectionOptions}
        selectionOption={selectionOption}
        searchOption={searchOption}
      >
        <TableBody
          emptyContent={'No data found'}
          items={data}
          loadingContent={<Spinner />}
          loadingState={loading ? 'loading' : 'idle'}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderUserTableCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </TableOutline>
      <UserDetailDrawer
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        user={data.find((user) => user.id === clickedItemId)}
        setUsers={setData}
      />
    </>
  );
}
