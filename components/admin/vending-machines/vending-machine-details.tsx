'use client';

import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  Spinner,
  Button,
  Card,
  Avatar,
  CardHeader,
  CardFooter,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useDisclosure,
} from '@nextui-org/react';

import Drawer, {
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from '../drawer/drawer';
import { AdminApiContext } from '@/context/admin-api-provider';
import {
  Slot,
  VendingMachine,
  VendingMachineListItem,
} from '@/types/vending-machines';
import { VendingMachineIcon } from '@/components/icons/sidebar/vending-machine-icon';
import { Product } from '@/types/product';
import SlotModal from './slot-modal';
import { EmptySlot, FullSlot } from './slot-card-body';

const VendingMachineDetailDrawer = ({
  setIsOpen,
  isOpen,
  vendingMachineId,
  setVendingMachines, // to update if it is deleted
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  vendingMachineId: number | undefined;
  setVendingMachines: Dispatch<SetStateAction<VendingMachineListItem[]>>;
}) => {
  const { deleteVendingMachine, getVendingMachine, getProducts } =
    useContext(AdminApiContext);
  const [vendingMachineDetails, setVendingMachineDetails] =
    useState<VendingMachine>();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const { isOpen: isSlotModalOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedSlot, setSelectedSlot] = useState<Slot>();

  const getVendingMachineCallback = useCallback(async () => {
    // to get vending machine details
    if (!vendingMachineId) return;
    setLoading(true);
    const data = await getVendingMachine(vendingMachineId);
    setLoading(false);
    if (data) {
      setVendingMachineDetails(data);
    }
  }, [vendingMachineId]);

  const deleteVendingMachineCallback = useCallback(async () => {
    if (!vendingMachineId) return;
    setDeleteLoading(true);
    const data = await deleteVendingMachine(vendingMachineId);
    setDeleteLoading(false);
    if (data) {
      setVendingMachines((prev) =>
        prev.filter((vendingMachine) => vendingMachine.id !== vendingMachineId),
      );
      setIsOpen(false);
    }
  }, [vendingMachineId]);

  const getProductsCallback = useCallback(async () => {
    // to select products for slots
    const data = await getProducts();
    if (data) {
      setProducts(data);
    }
  }, []);

  useEffect(() => {
    if (!vendingMachineId) return;
    getVendingMachineCallback();
  }, [vendingMachineId]);

  useEffect(() => {
    if (!products.length) {
      getProductsCallback();
    }
  }, []);

  return vendingMachineId ? (
    <>
      <Drawer
        onClose={() => {
          setIsOpen(false);
        }}
        isOpen={isOpen}
      >
        <DrawerContent>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <DrawerHeader className='flex flex-col gap-4'>
                <div className='flex items-center justify-between w-full mt-2'>
                  <p>Vending Machine Details</p>
                  <p className='text-sm text-gray-500'>
                    {vendingMachineDetails?.slots.length} slots
                  </p>
                </div>
                <Card
                  // User info card
                  className='p-4 gap-4 w-full bg-secondary-100'
                >
                  <div className='w-full flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                      <Avatar
                        radius='sm'
                        size='lg'
                        icon={
                          <VendingMachineIcon
                            width={32}
                            height={32}
                            fill='#e3d2f3'
                          />
                        }
                        color='secondary'
                      />
                      <div>
                        <p>{vendingMachineDetails?.name}</p>
                        <p className='text-sm text-gray-500'>
                          ID {vendingMachineDetails?.id}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </DrawerHeader>
              <DrawerBody>
                <div className='w-full flex flex-col gap-4'>
                  <div
                    // Slots header
                    className='flex items-center bottom-border border-b-1 border-gray-300 pb-1'
                  >
                    Slots
                  </div>
                  {vendingMachineDetails?.slots && (
                    <div className='grid grid-cols-3 gap-8 p-4 max-h-[440px] overflow-y-auto'>
                      {vendingMachineDetails.slots.map((slot, index) => (
                        <Card
                          key={slot.id}
                          // if there is a product class is 'bg-primary-100'
                          className={`flex flex-col gap-4 p-4 min-h-36 ${
                            slot.stock === 0 ? 'bg-default-50' : ''
                          }`}
                          shadow='sm'
                        >
                          <FullSlot
                            setSelectedSlot={setSelectedSlot}
                            slot={slot}
                            onOpen={onOpen}
                          />
                          <EmptySlot
                            setSelectedSlot={setSelectedSlot}
                            slot={slot}
                            onOpen={onOpen}
                          />
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </DrawerBody>
              <DrawerFooter>
                <Card className='w-full justify-between p-2 gap-4 bg-danger-100'>
                  <CardHeader>
                    <p className='text-sm text-danger-500'>Danger Zone</p>
                  </CardHeader>
                  <CardFooter className='flex justify-between'>
                    <Popover showArrow placement='bottom' backdrop={'opaque'}>
                      <PopoverTrigger>
                        <Button color='danger' size='sm' variant='ghost'>
                          Delete
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-[240px]'>
                        <div className='flex flex-col gap-4 p-2'>
                          <p className='text-sm text-danger-500'>
                            Are you sure you want to delete this vending
                            machine?
                          </p>
                          <Button
                            size='sm'
                            color='danger'
                            className='w-fit'
                            onClick={deleteVendingMachineCallback}
                            isLoading={deleteLoading}
                          >
                            Delete
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </CardFooter>
                </Card>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
      {selectedSlot && (
        <SlotModal
          isSlotModalOpen={isSlotModalOpen}
          onOpenChange={onOpenChange}
          slot={selectedSlot}
          products={products}
          getVendingMachineCallback={getVendingMachineCallback}
        />
      )}
    </>
  ) : null;
};

export default VendingMachineDetailDrawer;
