'use client';

import { SearchIcon } from '@/components/icons';
import { AdminApiContext } from '@/context/admin-api-provider';
import { Query } from '@/types';
import { VendingMachineListItem } from '@/types/vending-machines';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Pagination,
  Spinner,
} from '@nextui-org/react';
import { useContext, useEffect, useState } from 'react';
import { HasVendingMachine, NoVendingMachine } from './vending-machine-list';
import { VendingMachineLayout } from '../layouts/vending-machines-layout';

export const PAGE_SIZE = 6;

export const Content = () => {
  const { getVendingMachinesWithQuery } = useContext(AdminApiContext);
  const [vendingmachines, setVendingMachines] = useState<
    VendingMachineListItem[]
  >([]);
  const [query, setQuery] = useState<Query>({
    query: {
      pagination: { page: 1, pageSize: PAGE_SIZE },
    },
  });
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

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

  return (
    <VendingMachineLayout>
      <Input
        placeholder='Search a vending machine...'
        startContent={<SearchIcon color='gray' />}
        value={(query.query?.filter?.[0]?.value as string) || ''}
        onChange={(e) =>
          setQuery({
            query: {
              pagination: { page: 1, pageSize: PAGE_SIZE },
              filter: [
                {
                  field: 'name',
                  option: 'contains',
                  value: e.target.value,
                },
              ],
            },
          })
        }
      />
      <div className='flex flex-col justify-center items-center gap-5'>
        <Card shadow='none' className='border border-gray-200 w-full'>
          <CardHeader>Vending Machines</CardHeader>
          <CardBody>
            {loading ? (
              <div className='flex justify-center items-center  mt-20'>
                <Spinner />
              </div>
            ) : (
              <>
                <HasVendingMachine
                  vendingmachines={vendingmachines}
                  page={query.query.pagination?.page as number}
                />
                <NoVendingMachine vendingmachines={vendingmachines} />
              </>
            )}
          </CardBody>
          <CardFooter className='flex flex-col gap-4'>
            <div className='flex w-full mt-4'>
              <p className='text-xs text-gray-400 text-center'>
                Total {count} vending machines.
              </p>
            </div>
            {count > 0 && (
              <div>
                <Pagination
                  onChange={(page) =>
                    setQuery({
                      query: {
                        ...query.query,
                        pagination: { page, pageSize: PAGE_SIZE },
                      },
                    })
                  }
                  showControls
                  initialPage={1}
                  total={Math.ceil(count / PAGE_SIZE)}
                />
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </VendingMachineLayout>
  );
};
