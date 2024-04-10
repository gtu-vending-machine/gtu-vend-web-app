import { Product } from './product';

export type Slot = {
  id: number;
  index: number;
  stock: number;
  product: Product | null;
};

export type AddProductToSlotPayload = {
  productId: number;
  stock: number;
};

export type VendingMachine = {
  id: number;
  name: string;
  slots: Slot[];
};

export type VendingMachineListItem = Pick<VendingMachine, 'id' | 'name'> & {
  _slotCount: number;
};

export type VendingMachineQueryResponse = {
  vendingMachines: VendingMachineListItem[];
  _count: number;
};

export type CreateVendingMachinePayload = Pick<VendingMachine, 'name'> & {
  slotCount: number;
};

export type UpdateVendingMachinePayload = Partial<CreateVendingMachinePayload>;
