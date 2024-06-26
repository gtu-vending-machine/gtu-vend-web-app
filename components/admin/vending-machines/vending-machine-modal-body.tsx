import { CreateVendingMachinePayload } from '@/types/vending-machines';
import { Input, ModalBody } from '@nextui-org/react';
import React, { Dispatch, SetStateAction } from 'react';

export const VendingMachineModalBody = ({
  vendingMachine,
  setVendingMachine,
}: {
  vendingMachine: CreateVendingMachinePayload;
  setVendingMachine: Dispatch<SetStateAction<CreateVendingMachinePayload>>;
}) => {
  return (
    <ModalBody className='gap-4'>
      <Input
        label='Name'
        placeholder='Vending Machine name'
        variant='flat'
        value={vendingMachine.name}
        onChange={(e) =>
          setVendingMachine({ ...vendingMachine, name: e.target.value })
        }
        isRequired
      />
      <Input
        label='Slot Count'
        variant='flat'
        value={String(vendingMachine.slotCount)}
        onChange={(e) =>
          setVendingMachine({ ...vendingMachine, slotCount: +e.target.value })
        }
        isRequired
      />
    </ModalBody>
  );
};
