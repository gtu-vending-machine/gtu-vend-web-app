import { AdminApiContext } from '@/context/admin-api-provider';
import { CreateProductPayload } from '@/types/product';
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { VendingMachineModalBody } from './vending-machine-modal-body';
import {
  CreateVendingMachinePayload,
  VendingMachineListItem,
} from '@/types/vending-machines';
import { PlusIcon } from '@/components/icons';

export const AddVendingMachine = ({
  setData,
}: {
  setData: Dispatch<SetStateAction<VendingMachineListItem[]>>;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  ``;
  const { createVendingMachine } = useContext(AdminApiContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [vendingMachine, setVendingMachine] =
    useState<CreateVendingMachinePayload>({
      name: '',
      slotCount: 0,
    });

  const handleAddVendingMachine = async () => {
    setIsLoading(true);
    await createVendingMachine(vendingMachine as CreateVendingMachinePayload)
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
        <Button onPress={onOpen} color='primary' startContent={<PlusIcon />}>
          Add
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
                  Add Vending Machine
                </ModalHeader>
                <VendingMachineModalBody
                  vendingMachine={vendingMachine}
                  setVendingMachine={setVendingMachine}
                />
                <ModalFooter>
                  <Button color='danger' variant='flat' onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    color='primary'
                    onPress={handleAddVendingMachine}
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
