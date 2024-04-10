'use client';

import { Dispatch, SetStateAction, useContext, useState } from 'react';
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';

import { ProductListItem, UpdateProductPayload } from '@/types/product';
import { AdminApiContext } from '@/context/admin-api-provider';
import toast from 'react-hot-toast';
import { ProductModalBody } from './product-modal-body';

export const UpdateProductModal = ({
  isOpen,
  clickedItem,
  setData,
  onOpenChange,
  setClickedItem,
}: {
  isOpen: boolean;
  clickedItem: Partial<ProductListItem>;
  setData: Dispatch<SetStateAction<ProductListItem[]>>;
  onOpenChange: () => void;
  setClickedItem: Dispatch<SetStateAction<Partial<ProductListItem>>>;
}) => {
  const { updateProduct } = useContext(AdminApiContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateProduct = async (
    id: number,
    product: UpdateProductPayload,
    onClose: () => void,
  ) => {
    setIsLoading(true);
    await updateProduct(id, product).then((res) => {
      if (res) {
        setData((prev) =>
          prev.map((p) => (p.id === id ? { ...p, ...product } : p)),
        );
        toast.success('Product updated successfully');
        setIsLoading(false);
        onClose();
      }
    });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              Update Product
            </ModalHeader>
            <ProductModalBody
              product={clickedItem}
              setProduct={setClickedItem}
            />
            <ModalFooter>
              <Button color='danger' variant='light' onClick={onClose}>
                Close
              </Button>
              <Button
                color='primary'
                isLoading={isLoading}
                isDisabled={isLoading}
                onClick={() => {
                  if (clickedItem && clickedItem.id) {
                    handleUpdateProduct(clickedItem.id, clickedItem, onClose);
                  }
                }}
              >
                Update
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
