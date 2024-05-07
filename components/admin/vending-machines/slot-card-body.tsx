'use client';

import {
  Button,
  Avatar,
  CardHeader,
  CardFooter,
  Divider,
  CardBody,
  Badge,
} from '@nextui-org/react';

import { PlusIcon } from '@/components/icons';
import { Slot } from '@/types/vending-machines';

const FullSlot = ({
  setSelectedSlot,
  slot,
  onOpen,
}: {
  setSelectedSlot: React.Dispatch<React.SetStateAction<Slot | undefined>>;
  slot: Slot;
  onOpen: () => void;
}) => {
  if (!slot.product) {
    return null;
  }
  return (
    <>
      <CardHeader className='p-0 flex w-full items-center justify-center'>
        <div
          className='transition-transform transform hover:scale-110 cursor-pointer'
          onClick={() => {
            setSelectedSlot(slot);
            onOpen();
          }}
        >
          <Badge
            color='default'
            className='flex items-center justify-center w-6 h-6'
            content={slot.stock > 9 ? '9+' : slot.stock}
            title='Stock'
          >
            <Avatar
              radius='sm'
              src={slot.product?.image}
              name={slot.product?.name}
              isBordered
            />
          </Badge>
        </div>
      </CardHeader>
      <CardBody className='p-0'>
        <p className='text-ellipsis overflow-hidden whitespace-nowrap text-sm text-gray-500'>
          {slot.product?.name}
        </p>
      </CardBody>
      <CardFooter className='flex items-center justify-center p-0'>
        <div className='flex w-full flex-col justify-center items-center'>
          <Divider />
          {slot.index}
        </div>
      </CardFooter>
    </>
  );
};

const EmptySlot = ({
  setSelectedSlot,
  slot,
  onOpen,
}: {
  setSelectedSlot: React.Dispatch<React.SetStateAction<Slot | undefined>>;
  slot: Slot;
  onOpen: () => void;
}): JSX.Element => {
  if (slot.product) {
    return <></>;
  }
  return (
    <>
      <CardBody className='p-0 flex items-center justify-between'>
        <Button
          variant='light'
          onClick={() => {
            setSelectedSlot(slot);
            onOpen();
          }}
        >
          <PlusIcon />
        </Button>
        <p className='text-ellipsis overflow-hidden whitespace-nowrap text-sm text-gray-500'>
          Empty
        </p>
      </CardBody>
      <CardFooter className='flex items-center justify-center p-0'>
        <div className='flex w-full flex-col justify-center items-center'>
          <Divider />
          {slot.index}
        </div>
      </CardFooter>
    </>
  );
};

export { FullSlot, EmptySlot };
