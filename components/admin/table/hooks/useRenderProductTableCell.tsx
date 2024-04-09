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
} from '@nextui-org/react';
import { ProductListItem } from '@/types/product';
import { Column } from '@/types';
import { DeleteIcon, EditIcon } from '@/components/icons';
import { AdminApiContext } from '@/context/admin-api-provider';
import toast from 'react-hot-toast';

const useRenderProductTableCell = ({
  setData,
  setClickedItem,
  onOpen,
}: {
  setData: Dispatch<SetStateAction<ProductListItem[]>>;
  setClickedItem: Dispatch<SetStateAction<Partial<ProductListItem>>>;
  onOpen: () => void;
}) => {
  const { deleteProduct } = useContext(AdminApiContext);

  const handleDeleteProduct = async (id: number) => {
    await deleteProduct(id).then((res) => {
      if (res) {
        setData((prev) => prev.filter((product) => product.id !== id));
        toast.success('Product deleted successfully');
      }
    });
  };

  const renderProductTableCell = useCallback(
    (product: ProductListItem, columnKey: Key) => {
      const cellValue = product[columnKey as keyof ProductListItem];

      switch (columnKey as Column<ProductListItem>['uid']) {
        case 'name':
          return (
            <User
              // just an avatar, not user
              avatarProps={{
                radius: 'lg',
                size: 'lg',
                name: product.name,
                src: product.image,
              }}
              name={cellValue}
            />
          );
        case 'price':
          return <p>{cellValue}💰</p>;

        case 'actions':
          return (
            <div className='relative flex justify-start items-center w-full gap-4'>
              <span
                className='text-lg text-default-400 cursor-pointer active:opacity-50'
                onClick={() => {
                  onOpen();
                  setClickedItem(product);
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
                      Are you sure you want to delete this product?
                    </div>
                    <div className='flex items-center mt-4 gap-2'>
                      <Button
                        size='sm'
                        variant='flat'
                        color='danger'
                        onClick={() => handleDeleteProduct(product.id)}
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

  return renderProductTableCell;
};

export default useRenderProductTableCell;
