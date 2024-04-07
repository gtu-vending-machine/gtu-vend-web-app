'use client';
import Users from '@/components/admin/users';
import { AdminApiContext } from '@/context/admin-api-provider';
import { Query, User, UserListItem } from '@/types';
import { NextPage } from 'next';
import React, { useContext, useEffect, useRef, useState } from 'react';

type Column = {
  name: string;
  uid: keyof UserListItem | 'actions';
  sortable?: boolean;
};

const columns: Column[] = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'NAME', uid: 'name', sortable: true },
  { name: 'ROLE', uid: 'role', sortable: true },
  { name: 'BALANCE', uid: 'balance', sortable: true },
  { name: 'ACTIONS', uid: 'actions' },
];

const UsersPage: NextPage = () => {
  const { getUsersWithQuery } = useContext(AdminApiContext);
  const [users, setUsers] = useState<UserListItem[]>([]);
  const hasFetched = useRef(false);
  const [query, setQuery] = useState<Query<UserListItem>>({ query: {} });
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUsers = async () => {
    const data = await getUsersWithQuery(query);
    if (data) {
      setUsers(data.users);
      setCount(data.count);
    }
  };

  useEffect(() => {
    // if (!hasFetched.current) {
    setLoading(true);
    fetchUsers();
    setLoading(false);
    hasFetched.current = true;
    // }
  }, [query]);

  return (
    <>
      <Users
        users={users}
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
