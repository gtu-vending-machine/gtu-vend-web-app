'use client';
import VendingMachineTable from '@/components/admin/vending-machines';
import { AdminApiContext } from '@/context/admin-api-provider';
import { Column, Query } from '@/types';
import { VendingMachineListItem } from '@/types/vending-machines';
import { NextPage } from 'next';
import React, { useContext, useEffect, useState } from 'react';

const columns: Column<VendingMachineListItem>[] = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'NAME', uid: 'name', sortable: true },
  { name: 'SLOTS', uid: '_slotCount' },
  { name: 'ACTIONS', uid: 'actions' },
];

const VendingMachinePage: NextPage = () => {
  const { getVendingMachinesWithQuery } = useContext(AdminApiContext);
  const [vendingmachines, setVendingMachines] = useState<
    VendingMachineListItem[]
  >([]);
  const [query, setQuery] = useState<Query>({ query: {} });
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchVendingMachines = async (q: Query) => {
    setLoading(true);
    const data = await getVendingMachinesWithQuery(q);
    if (data) {
      setVendingMachines(data.vendingMachines);
      setCount(data._count);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVendingMachines(query);
  }, [query]);

  console.log(vendingmachines, 'vendingmachines');

  return (
    <>
      <VendingMachineTable
        data={vendingmachines}
        setData={setVendingMachines}
        loading={loading}
        columns={columns}
        count={count}
        query={query}
        setQuery={setQuery}
      />
    </>
  );
};

export default VendingMachinePage;
