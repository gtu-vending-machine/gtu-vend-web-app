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
import useRenderVendingMachineTableCell from '../table/hooks/useRenderVendingMachineTableCell';
import { VendingMachineListItem } from '@/types/vending-machines';
import { AddVendingMachine } from './add-vending-machine';
import VendingMachineDetailDrawer from './vending-machine-details';

const searchOption: OptionType = { uid: 'name', name: 'name' };

export default function VendingMachineTable({
  data,
  setData,
  loading,
  count,
  columns,
  query,
  setQuery,
}: {
  data: VendingMachineListItem[];
  setData: Dispatch<SetStateAction<VendingMachineListItem[]>>;
  loading: boolean;
  count: number;
  columns: Column<VendingMachineListItem>[];
  query: Query;
  setQuery: Dispatch<SetStateAction<Query>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [clickedItemId, setClickedItemId] = useState<number>(0);

  const renderVendingMachineTableCell = useRenderVendingMachineTableCell({
    setClickedItemId,
    setIsOpen,
  });

  return (
    <>
      <TableOutline<VendingMachineListItem>
        columns={columns}
        count={count}
        query={query}
        setQuery={setQuery}
        searchOption={searchOption}
        addItemComponent={<AddVendingMachine setData={setData} />}
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
                <TableCell>
                  {renderVendingMachineTableCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </TableOutline>
      <VendingMachineDetailDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setVendingMachines={setData}
        vendingMachineId={clickedItemId}
      />
    </>
  );
}
