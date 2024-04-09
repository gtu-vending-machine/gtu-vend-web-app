'use client';
import UserTable from '@/components/admin/users';
import { AdminApiContext } from '@/context/admin-api-provider';
import { Column, Query } from '@/types';
import { UserListItem } from '@/types/user';
import { NextPage } from 'next';
import React, { useContext, useEffect, useState } from 'react';

const columns: Column<UserListItem>[] = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'NAME', uid: 'name', sortable: true },
  { name: 'ROLE', uid: 'role', sortable: true },
  { name: 'BALANCE', uid: 'balance', sortable: true },
  { name: 'ACTIONS', uid: 'actions' },
];

const UsersPage: NextPage = () => {
  const { getUsersWithQuery } = useContext(AdminApiContext);
  const [users, setUsers] = useState<UserListItem[]>([]);
  const [query, setQuery] = useState<Query>({ query: {} });
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUsers = async (q: Query) => {
    setLoading(true);
    const data = await getUsersWithQuery(q);
    if (data) {
      setUsers(data.users);
      setCount(data._count);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(query);
  }, [query]);

  return (
    <>
      <UserTable
        data={users}
        setData={setUsers}
        loading={loading}
        columns={columns}
        count={count}
        query={query}
        setQuery={setQuery}
      />
    </>
  );
};

export default UsersPage;
