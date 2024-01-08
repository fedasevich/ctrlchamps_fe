import { User } from 'src/redux/api/userApi';

export type SearchUser = {
  query: string;
};

export type UserWithStatus = User & { status: string; date: Date };
