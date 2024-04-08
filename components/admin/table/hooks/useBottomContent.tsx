'use client';

import React, { useMemo } from 'react';
import { Button, Pagination, Selection } from '@nextui-org/react';

// const useBottomContent = ({
const useBottomContent = ({
  count,
  selectedKeys,
  page,
  pages,
  onPageChange,
  onPreviousPage,
  onNextPage,
}: {
  count: number;
  selectedKeys?: Selection;
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
}) => {
  const bottomContent = useMemo(() => {
    return (
      <div className='py-2 px-2 flex justify-between items-center'>
        {selectedKeys ? (
          <span className='w-[30%] text-small text-default-400'>
            {selectedKeys === 'all'
              ? 'All items selected'
              : `${selectedKeys.size} of ${count} selected`}
          </span>
        ) : (
          <span
            // to center the pagination
            className='w-[30%]'
          ></span>
        )}
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
  }, [
    selectedKeys,
    count,
    page,
    pages,
    onPageChange,
    onPreviousPage,
    onNextPage,
  ]);

  return bottomContent;
};

export default useBottomContent;
