import { User } from 'src/redux/api/userApi';

export type UserWithStatus = User & { status: string; date: Date };
