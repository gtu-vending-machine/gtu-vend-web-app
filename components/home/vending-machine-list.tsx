'use client';

import { VendingMachineListItem } from '@/types/vending-machines';
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from '@nextui-org/react';
import Link from 'next/link';
import { VendingMachineIcon } from '../icons/sidebar/vending-machine-icon';
import { PAGE_SIZE } from '.';

const HasVendingMachine = ({
  vendingmachines,
  page,
}: {
  vendingmachines: VendingMachineListItem[];
  page: number;
}): JSX.Element => {
  if (vendingmachines.length === 0) return <></>;

  return (
    <div className='w-full grid sm:grid-cols-3 gap-4 mt-4 grid-cols-2'>
      {vendingmachines.map((vendingmachine, index) => {
        return (
          <Card
            shadow='sm'
            className='cursor-pointer transition-colors duration-300 ease-in-out hover:bg-default-100'
            key={vendingmachine.id}
          >
            <Link
              href={`/vending-machines/${vendingmachine.id}`}
              // transition on hover
              className='w-full h-full'
            >
              <CardHeader>
                <p
                  title={vendingmachine.name}
                  className='overflow-ellipsis overflow-hidden whitespace-nowrap'
                >
                  {vendingmachine.name}
                </p>
              </CardHeader>
              <CardBody>
                <div className='flex flex-col gap-4'>
                  <div className='flex items-center justify-center'>
                    <Avatar
                      size='lg'
                      radius='sm'
                      name={vendingmachine.name}
                      fallback={<VendingMachineIcon />}
                    />
                  </div>
                  <p>
                    <span className='font-light'>
                      slots: {vendingmachine._slotCount}
                    </span>
                  </p>
                </div>
              </CardBody>
              <CardFooter>
                <div className='flex flex-col w-full items-center'>
                  <Divider />
                  {/* {index + 1} */}
                  {index + 1 + (page - 1) * PAGE_SIZE}
                </div>
              </CardFooter>
            </Link>
          </Card>
        );
      })}
    </div>
  );
};

const NoVendingMachine = ({
  vendingmachines,
}: {
  vendingmachines: any[];
}): JSX.Element => {
  if (vendingmachines.length > 0) return <></>;
  return (
    <div className='flex justify-center items-center w-full mt-20'>
      <h1>No vending machines found</h1>
    </div>
  );
};

export { HasVendingMachine, NoVendingMachine };
