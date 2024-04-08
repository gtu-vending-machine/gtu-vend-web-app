'use client';

import React from 'react';
import { Button, Chip, User, ChipProps } from '@nextui-org/react';
import { UserListItem } from '@/types';

export const roleColorMap: Record<string, ChipProps['color']> = {
  admin: 'danger',
  user: 'warning',
};

const useRenderCell = ({
  setUserId,
  setIsOpen,
}: {
  setUserId: React.Dispatch<React.SetStateAction<number>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const renderCell = React.useCallback(
    (user: UserListItem, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof UserListItem];

      switch (columnKey) {
        case 'name':
          return (
            <User
              avatarProps={{
                radius: 'lg',
                name: user.name,
              }}
              description={user.username}
              name={cellValue}
            >
              {user.username}
            </User>
          );
        case 'role':
          return (
            <Chip
              className='capitalize'
              color={roleColorMap[user.role]}
              size='sm'
              variant='flat'
            >
              {cellValue}
            </Chip>
          );
        case 'actions':
          return (
            <div className='relative flex justify-start items-center gap-2'>
              <Button
                size='sm'
                variant='light'
                onClick={() => {
                  setUserId(user.id);
                  setIsOpen(true);
                }}
              >
                View
              </Button>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [],
  );

  return renderCell;
};

export default useRenderCell;
