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
  clickedProduct,
  setData,
  onOpenChange,
  setClickedProduct,
}: {
  isOpen: boolean;
  clickedProduct: Partial<ProductListItem>;
  setData: Dispatch<SetStateAction<ProductListItem[]>>;
  onOpenChange: () => void;
  setClickedProduct: Dispatch<SetStateAction<Partial<ProductListItem>>>;
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
              product={clickedProduct}
              setProduct={setClickedProduct}
            />
            <ModalFooter>
              <Button color='danger' variant='flat' onClick={onClose}>
                Close
              </Button>
              <Button
                color='primary'
                isLoading={isLoading}
                isDisabled={isLoading}
                onClick={() => {
                  if (clickedProduct && clickedProduct.id) {
                    handleUpdateProduct(
                      clickedProduct.id,
                      clickedProduct,
                      onClose,
                    );
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
