'use client';

import React, {
  Dispatch,
  Key,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';
import {
  Button,
  User,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
  Chip,
} from '@nextui-org/react';
import { Column } from '@/types';
import { DeleteIcon, EditIcon } from '@/components/icons';
import { AdminApiContext } from '@/context/admin-api-provider';
import toast from 'react-hot-toast';
import { VendingMachineListItem } from '@/types/vending-machines';

const useRenderVendingMachineTableCell = ({
  setClickedItemId,
  setIsOpen,
}: {
  setClickedItemId: Dispatch<SetStateAction<number>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const renderVendingMachineCell = useCallback(
    (vendingMachine: VendingMachineListItem, columnKey: Key) => {
      const cellValue =
        vendingMachine[columnKey as keyof VendingMachineListItem];

      switch (columnKey as Column<VendingMachineListItem>['uid']) {
        case 'name':
          return (
            // <User
            //   // just an avatar, not user
            //   avatarProps={{
            //     radius: 'lg',
            //     size: 'lg',
            //     name: vendingMachine.name,
            //   }}
            //   description={vendingMachine.name}
            //   name={vendingMachine.name}
            // >
            //   {vendingMachine.name}
            // </User>
            <div className='flex items-center gap-2'>{vendingMachine.name}</div>
          );
        case '_slotCount':
          return (
            <Chip
              color={
                vendingMachine._slotCount < 6
                  ? 'warning'
                  : vendingMachine._slotCount < 11
                  ? 'secondary'
                  : 'danger'
              }
              variant='flat'
              size='sm'
              className='min-w-16'
            >
              <div className='flex justify-center items-center w-full h-full'>
                {vendingMachine._slotCount}
              </div>
            </Chip>
          );

        case 'actions':
          return (
            <div className='relative flex justify-start items-center gap-2'>
              <Button
                size='sm'
                variant='light'
                onClick={() => {
                  setClickedItemId(vendingMachine.id);
                  setIsOpen(true);
                }}
                color='primary'
              >
                View
              </Button>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [],
  );

  return renderVendingMachineCell;
};

export default useRenderVendingMachineTableCell;
