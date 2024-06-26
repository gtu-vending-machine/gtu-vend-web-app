'use client';

import { SlotDetail } from '@/types/vending-machines';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingFull from '@/components/loading-full';
import { Card, CardFooter, CardHeader, Input } from '@nextui-org/react';
import { SearchIcon } from '@/components/icons';
import { VendingMachineLayout } from '@/components/layouts/vending-machines-layout';
import { ApiContext } from '@/context/api-provider';
import Slots from '@/components/vending-machines/slots';
import { User } from '@/types/user';

// vending machine details page
export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const { getSlotsByVendingMachineAndProductName } = useContext(ApiContext);
  const [search, setSearch] = useState('');
  const [slots, setSlots] = useState<SlotDetail[] | undefined>(undefined);
  const { getMe } = useContext(ApiContext);
  const [user, setUser] = useState<User>();

  const getSlotsByVendingMachineAndProductNameCallback =
    useCallback(async () => {
      if (!id) return;
      const data = await getSlotsByVendingMachineAndProductName({
        vendingMachineId: Number(id),
        productName: search,
      });
      if (data) {
        setSlots(data);
      }
    }, [id, search]);

  useEffect(() => {
    if (!id) return;
    if (isNaN(Number(id))) router.push('/404');

    getSlotsByVendingMachineAndProductNameCallback();
  }, [id, search]);

  useEffect(() => {
    getMe().then((data) => setUser(data));
  }, []);

  return slots ? (
    <VendingMachineLayout>
      <Input
        placeholder='Search a product...'
        startContent={<SearchIcon color='gray' />}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className='flex flex-col justify-center items-center gap-5'>
        <Card shadow='none' className='border border-gray-200 w-full '>
          <CardHeader className='flex items-center justify-between w-full'>
            <p>Products</p>
            <p className='text-sm text-warning-500'>{user?.balance},00 🪙</p>
          </CardHeader>
          {/* content */}
          <Slots slots={slots} setUser={setUser} />
          <CardFooter>
            <div className='flex w-full mt-4'>
              <p className='text-xs text-gray-400 text-center'>
                Total{' '}
                {slots.map((slot) => slot.stock).reduce((a, b) => a + b, 0)}{' '}
                products
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </VendingMachineLayout>
  ) : (
    <LoadingFull />
  );
}
