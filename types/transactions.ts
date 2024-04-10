export type Transaction = {
  id: number;
  createdAt: Date;
  userId: number;
  productId: number;
  slotId: number;
  vendingMachineId: number;
  hasConfirmed: boolean;
  code: string;
};
