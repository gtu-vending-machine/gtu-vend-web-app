'use client';

import React, { useMemo } from 'react';
import { Button, Pagination, Selection } from '@nextui-org/react';
import { UserListItem } from '@/types';

const useBottomContent = ({
  selectedKeys,
  users,
  page,
  pages,
  onPageChange,
  onPreviousPage,
  onNextPage,
}: {
  selectedKeys: Selection;
  users: UserListItem[];
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
}) => {
  const bottomContent = useMemo(() => {
    return (
      <div className='py-2 px-2 flex justify-between items-center'>
        <span className='w-[30%] text-small text-default-400'>
          {selectedKeys === 'all'
            ? 'All items selected'
            : `${selectedKeys.size} of ${users.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color='primary'
          page={page}
          total={pages}
          onChange={onPageChange}
        />
        <div className='hidden sm:flex w-[30%] justify-end gap-2'>
          <Button
            isDisabled={pages === 1}
            size='sm'
            variant='flat'
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size='sm'
            variant='flat'
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, users.length, page, pages]);

  return bottomContent;
};

export default useBottomContent;
