'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import {
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  useDisclosure,
} from '@nextui-org/react';
import { Column, OptionType, Query } from '@/types';

import TableOutline from '../table/table-outline';
import { ProductListItem } from '@/types/product';
import useRenderProductTableCell from '../table/hooks/useRenderProductTableCell';
import { AddProduct } from './add-product';
import { UpdateProductModal } from './update-product';

const searchOption: OptionType = { uid: 'name', name: 'name' };

export default function ProductTable({
  data,
  setData,
  loading,
  count,
  columns,
  query,
  setQuery,
}: {
  data: ProductListItem[];
  setData: Dispatch<SetStateAction<ProductListItem[]>>;
  loading: boolean;
  count: number;
  columns: Column<ProductListItem>[];
  query: Query;
  setQuery: Dispatch<SetStateAction<Query>>;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [clickedProduct, setClickedProduct] = useState<
    Partial<ProductListItem>
  >({
    id: 0,
    name: '',
    price: 0,
    image: '',
  });

  const renderProductTableCell = useRenderProductTableCell({
    setData,
    setClickedProduct,
    onOpen,
  });

  return (
    <>
      <TableOutline<ProductListItem>
        columns={columns}
        count={count}
        query={query}
        setQuery={setQuery}
        searchOption={searchOption}
        addItemComponent={<AddProduct setData={setData} />}
      >
        <TableBody
          emptyContent={'No data found'}
          items={data}
          loadingContent={<Spinner />}
          loadingState={loading ? 'loading' : 'idle'}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderProductTableCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </TableOutline>
      {clickedProduct && (
        <UpdateProductModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          setData={setData}
          clickedProduct={clickedProduct}
          setClickedProduct={setClickedProduct}
        />
      )}
    </>
  );
}
