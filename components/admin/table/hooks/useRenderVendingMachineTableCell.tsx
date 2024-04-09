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
  setData,
  setClickedItem,
  onOpen,
}: {
  setData: Dispatch<SetStateAction<VendingMachineListItem[]>>;
  setClickedItem: Dispatch<SetStateAction<Partial<VendingMachineListItem>>>;
  onOpen: () => void;
}) => {
  // const { deleteVendingMachine } = useContext(AdminApiContext);

  // const handleDeleteVendingMachine = async (id: number) => {
  //   await deleteVendingMachine(id).then((res) => {
  //     if (res) {
  //       setData((prev) =>
  //         prev.filter((vendingMachine) => vendingMachine.id !== id),
  //       );
  //       toast.success('VendingMachine deleted successfully');
  //     }
  //   });
  // };

  const renderVendingMachineCell = useCallback(
    (vendingMachine: VendingMachineListItem, columnKey: Key) => {
      const cellValue =
        vendingMachine[columnKey as keyof VendingMachineListItem];

      switch (columnKey as Column<VendingMachineListItem>['uid']) {
        case 'name':
          return (
            <User
              // just an avatar, not user
              avatarProps={{
                radius: 'lg',
                size: 'lg',
                name: vendingMachine.name,
              }}
              description={vendingMachine.name}
              name={vendingMachine.name}
            >
              {vendingMachine.name}
            </User>
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
            <div className='relative flex justify-start items-center w-full gap-4'>
              <span
                className='text-lg text-default-400 cursor-pointer active:opacity-50'
                onClick={() => {
                  onOpen();
                  setClickedItem(vendingMachine);
                }}
              >
                <EditIcon />
              </span>
              <Popover>
                <PopoverTrigger>
                  <span className='text-lg text-danger cursor-pointer active:opacity-50'>
                    <DeleteIcon />
                  </span>
                </PopoverTrigger>
                <PopoverContent>
                  <div className='p-2'>
                    <div className='text-small'>
                      Are you sure you want to delete this vendingMachine?
                    </div>
                    <div className='flex items-center mt-4 gap-2'>
                      <Button
                        size='sm'
                        variant='flat'
                        color='danger'
                        onClick={() =>
                          // handleDeleteVendingMachine(vendingMachine.id)
                          console.log('delete')
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
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
