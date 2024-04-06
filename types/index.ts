import { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Role = 'admin' | 'user' | 'vendingMachine';

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
