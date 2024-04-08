import { SVGProps } from 'react';
import { UserListItem } from './user';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Message = {
  message: string;
};

type FilterOption = 'eq' | 'gt' | 'lt' | 'contains' | 'startsWith';
type OrderOption = 'asc' | 'desc';

export type OptionType = {
  uid: string;
  name: string;
};

export type Column = {
  name: string;
  uid: keyof UserListItem | 'actions';
  sortable?: boolean;
};

// Query type for the API
export type Query = {
  query: {
    filter?: {
      field: string;
      option: FilterOption;
      value: string | number;
    }[];
    sort?: {
      field: string;
      order: OrderOption;
    };
    pagination?: {
      page: number;
      pageSize: number;
    };
  };
};

export type Dispenser = {
  id: number;
  index: number;
  stock: number;
  productId?: number;
  vendingMachineId?: number;
};

export type Role = 'admin' | 'user' | 'vendingMachine';

export type VendingMachine = {
  id: number;
  name: string;
  dispensers: Dispenser[];
};
