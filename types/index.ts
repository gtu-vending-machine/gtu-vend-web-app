import { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Role = 'admin' | 'user' | 'vendingMachine';

type FilterOption = 'eq' | 'gt' | 'lt' | 'contains' | 'startsWith';
type OrderOption = 'asc' | 'desc';

// Query type for the API
export type Query<T> = {
  query: {
    filter?: {
      field: keyof T;
      option: FilterOption;
      value: T[keyof T];
    }[];
    sort?: {
      field: keyof T;
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

export type User = {
  id: number;
  username: string;
  password?: string;
  name?: string;
  token?: string;
  role: Role;
  balance?: number;
};

export type UserListItem = Pick<User, 'id' | 'username' | 'role'> & {
  // to make them mandatory
  name: string;
  balance: number;
};

export type UserQueryResponse = {
  users: UserListItem[];
  count: number;
};

export type Column = {
  name: string;
  uid: keyof UserListItem | 'actions';
  sortable?: boolean;
};

export type UserCredentials = Pick<User, 'username' | 'password' | 'name'>;
export type UserResponse = Pick<User, 'id' | 'username' | 'role' | 'token'>;
export type Message = {
  message: string;
};

export type AuthAction = (
  newUser: UserCredentials,
  setError: React.Dispatch<React.SetStateAction<Message>>,
) => Promise<void>;

export type VendingMachine = {
  id: number;
  name: string;
  dispensers: Dispenser[];
};
