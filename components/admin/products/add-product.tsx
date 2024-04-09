import { AdminApiContext } from '@/context/admin-api-provider';
import { CreateProductPayload, ProductListItem } from '@/types/product';
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { ProductModalBody } from './product-modal-body';

export const AddProduct = ({
  setData,
}: {
  setData: Dispatch<SetStateAction<ProductListItem[]>>;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { createProduct } = useContext(AdminApiContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [product, setProduct] = useState<Partial<ProductListItem>>({
    name: '',
    price: 0,
    image: '', // base64
  });

  const handleAddProduct = async () => {
    setIsLoading(true);
    await createProduct(product as CreateProductPayload)
      .then((data) => {
        if (data) {
          setData((prev) => [...prev, data]);
          onOpenChange();
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <>
        <Button onPress={onOpen} color='primary'>
          Add Product
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement='top-center'
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className='flex flex-col gap-1'>
                  Add Product
                </ModalHeader>
                <ProductModalBody product={product} setProduct={setProduct} />
                <ModalFooter>
                  <Button color='danger' variant='flat' onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    color='primary'
                    onPress={handleAddProduct}
                    isLoading={isLoading}
                  >
                    Add
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
