import { Role } from '.';

export type User = {
  id: number;
  username: string;
  password?: string;
  name?: string;
  token?: string;
  role: Role;
  balance?: number;
};

export type UserResponse = Pick<
  User,
  'id' | 'username' | 'role' | 'token' | 'balance'
>;

export type UserListItem = UserResponse & {
  // to make them mandatory
  name: string;
  balance: number;
};

export type UserQueryResponse = {
  users: UserListItem[];
  count: number;
};

export type UserCredentials = Pick<User, 'username' | 'password' | 'name'>;

export type AuthAction = (newUser: UserCredentials) => Promise<void>;
