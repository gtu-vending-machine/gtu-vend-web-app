'use client';

import { SlotDetail } from '@/types/vending-machines';
import {
  Avatar,
  AvatarGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from '@nextui-org/react';
import { NotExist } from '@/components/icons';
import BuyButton from './buy-button';
import { User } from '@/types/user';
import { Dispatch, SetStateAction } from 'react';

const Slots = ({
  slots,
  setUser,
}: {
  slots: SlotDetail[];
  setUser: Dispatch<SetStateAction<User | undefined>>;
}) => {
  return (
    <CardBody>
      <div className='w-full grid sm:grid-cols-3 gap-4 grid-cols-2'>
        {slots.map((slot, index) => {
          return (
            <Card
              key={slot.id}
              className={`flex flex-col p-0 min-h-36 ${
                slot.stock === 0 ? 'bg-default-100' : ''
              }`}
              shadow='sm'
            >
              <CardHeader className='flex flex-col  gap-4 w-full'>
                <p>{slot.index}</p>
                <Divider />
              </CardHeader>
              <CardBody className='pb-0 flex w-full items-center justify-center'>
                {slot.stock !== 0 ? (
                  <>
                    <div className='flex flex-col items-center w-full'>
                      <AvatarGroup>
                        <Avatar
                          radius='sm'
                          name={slot.stock.toString()}
                          isDisabled
                        />
                        <Avatar
                          radius='sm'
                          size='lg'
                          src={slot.product?.image}
                          name={slot.product?.name}
                          isBordered
                        />
                      </AvatarGroup>
                      <div className=''>
                        <p className='w-36 mt-4 text-ellipsis overflow-hidden whitespace-nowrap text-sm text-gray-500'>
                          {slot.product?.name}
                        </p>
                        <p className='w-36 text-ellipsis overflow-hidden whitespace-nowrap text-xs text-warning-500'>
                          {slot.product?.price},00 🪙
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className='flex flex-col items-center gap-4'>
                    <NotExist height='2em' width='2em' color='gray' />
                    <p className='text-ellipsis overflow-hidden whitespace-nowrap text-sm text-gray-500'>
                      No Product
                    </p>
                  </div>
                )}
              </CardBody>
              <CardFooter className='flex items-center justify-center w-full p-2 mt-4 pb-2'>
                <BuyButton slot={slot} setUser={setUser} />
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </CardBody>
  );
};

export default Slots;
