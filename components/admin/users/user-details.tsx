'use client';

import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';
import {
  Spinner,
  Slider,
  Button,
  Card,
  Avatar,
  AvatarIcon,
  Chip,
  CardHeader,
  CardFooter,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react';
import { UserListItem } from '@/types/user';

import Drawer, {
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from '../drawer/drawer';
import { AdminApiContext } from '@/context/admin-api-provider';
import { UserIcon } from '@/components/icons';

const UserDetailDrawer = ({
  setIsOpen,
  isOpen,
  user,
  setUsers, // to update balance in the table
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  user: UserListItem | undefined;
  setUsers: Dispatch<SetStateAction<UserListItem[]>>;
}) => {
  const { addBalance, deleteUser, resetBalance } = useContext(AdminApiContext);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(50);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const addBalanceCallBack = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    const data = await addBalance(user.id, balance);
    setLoading(false);

    if (typeof data.balance === 'number') {
      const updatedUser = {
        ...user,
        balance: data.balance,
      };

      setUsers((prev) => prev.map((u) => (u.id === user.id ? updatedUser : u)));
    }
  }, [user, balance, addBalance, setUsers]);

  const deleteUserCallBack = useCallback(async () => {
    if (!user) return;

    setDeleteLoading(true);
    const data = await deleteUser(user.id);
    setDeleteLoading(false);

    if (data) {
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  }, [deleteUser, setIsOpen, setUsers, user]);

  const resetBalanceCallBack = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    const data = await resetBalance(user.id);
    setLoading(false);

    if (typeof data.balance === 'number') {
      const updatedUser = {
        ...user,
        balance: data.balance,
      };

      setUsers((prev) => prev.map((u) => (u.id === user.id ? updatedUser : u)));
    }
  }, [resetBalance, setUsers, user]);

  return (
    user && (
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
              <DrawerHeader>
                <div className='flex items-center justify-between w-full mt-2'>
                  <p>User Details</p>
                  <p className='text-sm text-gray-500'>{user.balance} 💰</p>
                </div>
              </DrawerHeader>
              <DrawerBody>
                <Card
                  // User info card
                  className='p-4 gap-4 w-full bg-secondary-100'
                >
                  <div className='w-full flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                      <Avatar
                        radius='sm'
                        size='lg'
                        icon={<AvatarIcon />}
                        color='secondary'
                      />
                      <div>
                        <p>{user.name}</p>
                        <p className='text-sm text-gray-500'>
                          @{user.username}
                        </p>
                      </div>
                    </div>
                    <Chip
                      className='capitalize'
                      color={user.role === 'admin' ? 'danger' : 'primary'}
                      size='lg'
                      variant='flat'
                    >
                      {user.role}
                    </Chip>
                  </div>
                </Card>
                <div className='mt-4'>
                  <Slider
                    size='md'
                    step={50}
                    color='foreground'
                    label='Add Balance'
                    showSteps={true}
                    maxValue={500}
                    minValue={50}
                    value={balance || 50}
                    className='max-w-md'
                    onChange={(value) => setBalance(Number(value))}
                    isDisabled={loading}
                  />
                  <Button
                    type='submit'
                    size='sm'
                    className='mt-4'
                    onClick={addBalanceCallBack}
                  >
                    {`Add ${balance} 💰`}
                  </Button>
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
                        <Button
                          color='danger'
                          size='sm'
                          variant='ghost'
                          startContent={<UserIcon size={16} />}
                        >
                          Delete User
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-[240px]'>
                        <div className='flex flex-col gap-4 p-2'>
                          <p className='text-sm text-danger-500'>
                            Are you sure you want to delete this user?
                          </p>
                          <Button
                            size='sm'
                            color='danger'
                            className='w-fit'
                            onClick={deleteUserCallBack}
                            isLoading={deleteLoading}
                          >
                            Delete
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Button
                      size='sm'
                      color='danger'
                      variant='light'
                      onClick={resetBalanceCallBack}
                    >
                      Reset Balance
                    </Button>
                  </CardFooter>
                </Card>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    )
  );
};

export default UserDetailDrawer;
