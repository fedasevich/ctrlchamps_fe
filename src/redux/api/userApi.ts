import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'src/redux/rootReducer';
import { route } from './routes';

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string;
  isOpenToSeekerHomeLiving?: boolean;
  role: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  address: string;
  balance: number;
  avatar?: string;
}

export interface UpdateUser {
  id: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  isOpenToSeekerHomeLiving?: boolean;
  role?: string;
  country?: string;
  state?: string;
  city?: string;
  zipCode?: string;
  address?: string;
  avatar?: string | null;
}

interface UserPasswordData {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/${route.user}`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState() as RootState;
      const currentToken = token.token;

      if (currentToken) {
        headers.set('Authorization', `Bearer ${currentToken}`);
      }

      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUserInfo: builder.query<User, string | undefined>({
      query: (userId) => ({ url: `/${userId}`, method: 'GET', userId }),
      providesTags: ['User'],
    }),
    updateUser: builder.mutation<void, UpdateUser>({
      query: ({ id, ...userInfo }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: userInfo,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }, 'User'],
    }),
    uploadAvatar: builder.mutation<void, { file: File }>({
      query: ({ file }) => {
        const formData = new FormData();
        formData.append('file', file);

        return {
          url: `${route.uploadAvatar}`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: (result, error, { file }) => [{ type: 'User', file }, 'User'],
    }),
    updatePassword: builder.mutation<void, UserPasswordData>({
      query: ({ ...passwordData }) => ({
        url: `${route.changePassword}`,
        method: 'POST',
        body: passwordData,
      }),
    }),
  }),
});

export const {
  useGetUserInfoQuery,
  useUpdateUserMutation,
  useUploadAvatarMutation,
  useUpdatePasswordMutation,
} = userApi;

export default userApi;
