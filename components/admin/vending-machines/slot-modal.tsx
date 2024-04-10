'use client';

import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  Button,
  Avatar,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  SelectItem,
} from '@nextui-org/react';

import { AdminApiContext } from '@/context/admin-api-provider';
import { AddProductToSlotPayload, Slot } from '@/types/vending-machines';
import { Product } from '@/types/product';
import { ProductsIcon } from '@/components/icons/sidebar/products-icon';

const SlotModal = ({
  isSlotModalOpen,
  onOpenChange,
  slot,
  products,
  getVendingMachineCallBack,
}: {
  isSlotModalOpen: boolean;
  onOpenChange: () => void;
  slot: Slot;
  products: Product[];
  getVendingMachineCallBack: () => Promise<void>; // to update vending machine details
}) => {
  const { addProductToSlot, deleteProductFromSlot } =
    useContext(AdminApiContext);

  const [productSelection, setProductSelection] = useState<number | undefined>(
    slot?.product?.id,
  );
  const [stock, setStock] = useState<number | undefined>(slot?.stock);

  // callback for add/update product for slot
  const addProductToSlotCallBack = useCallback(async () => {
    if (!productSelection || !slot) return;

    const payload: AddProductToSlotPayload = {
      productId: productSelection,
      stock: stock || 0,
    };

    const data: Slot | undefined = await addProductToSlot(slot.id, payload);
    if (data) {
      getVendingMachineCallBack();
      onOpenChange();
    }
  }, [productSelection, slot, stock]);

  const deleteProductCallBack = useCallback(async () => {
    if (!slot || !slot.product) return;
    const data = await deleteProductFromSlot(slot.id);
    if (data) {
      getVendingMachineCallBack();
      onOpenChange();
    }
  }, [slot]);

  // when slot.id is changed, update stock and product selection
  useEffect(() => {
    setStock(slot?.stock);
    setProductSelection(slot?.product?.id);
  }, [slot.id]);

  return (
    <Modal
      isOpen={isSlotModalOpen}
      onOpenChange={onOpenChange}
      backdrop='transparent'
      size='sm'
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Add a product to slot-{slot?.index + 1}</ModalHeader>
            <ModalBody>
              <Select
                items={products}
                label='Product'
                placeholder='Select a product'
                labelPlacement='outside'
                className='max-w-xs'
                selectedKeys={
                  productSelection ? [String(productSelection)] : []
                }
                onChange={(e) => setProductSelection(Number(e.target.value))}
              >
                {(product) => (
                  <SelectItem key={product.id} textValue={product.name}>
                    <div className='flex gap-2 items-center'>
                      <Avatar
                        alt={product.name}
                        className='flex-shrink-0'
                        size='sm'
                        src={product.image}
                        icon={<ProductsIcon />}
                      />
                      <div className='flex flex-col'>
                        <span className='text-small'>{product.name}</span>
                        <span className='text-tiny text-default-400'>
                          {product.price} 🪙
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                )}
              </Select>
              <Input
                label='Stock'
                placeholder='Enter stock count'
                labelPlacement='outside'
                className='max-w-xs'
                type='number'
                value={String(stock)}
                // onChange={(e) => setStock(Number(e.target.value))} min value is 0
                onChange={(e) => setStock(Number(e.target.value))}
                min={0}
              />
            </ModalBody>
            <ModalFooter
              // if there is a product class is 'flex justify-between'
              className={`flex ${
                slot.product ? 'justify-between' : 'justify-end'
              }`}
            >
              {slot.product && (
                <Button
                  color='danger'
                  variant='light'
                  size='sm'
                  onPress={deleteProductCallBack}
                >
                  Remove
                </Button>
              )}
              <div className='flex gap-2'>
                <Button
                  color='danger'
                  variant='light'
                  size='sm'
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  color='primary'
                  size='sm'
                  onPress={addProductToSlotCallBack}
                >
                  {slot.product ? 'Update' : 'Add'}
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SlotModal;
