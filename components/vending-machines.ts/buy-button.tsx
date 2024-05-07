'use client';

import { SlotDetail } from '@/types/vending-machines';
import { useCallback, useContext, useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from '@nextui-org/react';
import { CartIcon } from '@/components/icons';
import { ApiContext } from '@/context/api-provider';
import { AuthContext } from '@/context/auth-provider';
import { Transaction } from '@/types/transactions';
import toast from 'react-hot-toast';

const BuyButton = ({ slot }: { slot: SlotDetail }) => {
  const { createTransaction, confirmTransaction, cancelTransaction } =
    useContext(ApiContext);
  const { user } = useContext(AuthContext);
  const [transaction, setTransaction] = useState<Transaction | undefined>(
    undefined,
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleTransactionConfirmation = async (transaction: Transaction) => {
    let confirmationResult:
      | Pick<Transaction, 'hasConfirmed' | 'id'>
      | undefined = undefined;

    const confirmationInterval = setInterval(async () => {
      confirmationResult = await confirmTransaction({
        code: transaction.code,
      });
      if (confirmationResult?.hasConfirmed) {
        clearInterval(confirmationInterval);
        toast.success('Transaction is confirmed');
        setIsOpen(false);
      }
    }, 5000);

    // Timeout for failed confirmation
    setTimeout(() => {
      if (!confirmationResult?.hasConfirmed) {
        clearInterval(confirmationInterval);
        toast.error('Transaction is not confirmed');
        setIsOpen(false);
        cancelTransaction(transaction.id);
      }
    }, 100100);
  };

  // callback function to create transaction
  const createTransactionCallback = useCallback(async () => {
    if (!slot.id || !user?.id) return;
    const data = await createTransaction({
      userId: user.id,
      slotId: slot.id,
    });
    if (data) {
      setTransaction(data);
      handleTransactionConfirmation(data);
    }
  }, [slot.id, user?.id]);

  const onBuy = () => {
    setIsOpen(true);
    createTransactionCallback();
  };

  return (
    <>
      <Button
        size='sm'
        color='primary'
        variant='light'
        startContent={<CartIcon />}
        isDisabled={slot.stock === 0}
        onPress={onBuy}
      >
        Buy
      </Button>
      <Modal isOpen={isOpen} placement='top-center'>
        <ModalContent>
          <ModalHeader>Enter the code to the machine!</ModalHeader>
          {transaction ? (
            <>
              <ModalBody className='flex  w-full justify-between items-center gap-4'>
                <p className='text-lg font-semibold'>{transaction.code}</p>
                <Spinner />
              </ModalBody>
              <ModalFooter className='flex justify-center items-center gap-4'>
                Waiting for confirmation...
              </ModalFooter>
            </>
          ) : (
            <Spinner />
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default BuyButton;
