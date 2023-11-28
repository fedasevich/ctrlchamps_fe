import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { route } from './routes';

export interface UploadVideoRequest {
  userId: string;
  file: File;
}

export interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
}

export interface UpdateProfileRequest {
  services?: string[];
  availability?: TimeSlot[];
  hourlyRate?: number;
  description?: string;
}

export interface UpdateProfileResponse {
  services: string[];
  availability: TimeSlot[];
  hourlyRate: number;
  description: string;
}

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/${route.profile}` }),
  endpoints: (builder) => ({
    getProfileInformation: builder.query({
      query: ({ userId, token }) => ({
        url: `${userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    createProfile: builder.mutation<void, { userId: string; token: string }>({
      query: ({ userId, token }) => ({
        url: `/${userId}`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updateProfile: builder.mutation<
      UpdateProfileResponse,
      { userId: string; token: string; updateProfileDto: UpdateProfileRequest }
    >({
      query: ({ userId, token, updateProfileDto }) => ({
        url: `/${userId}`,
        method: 'PATCH',
        body: updateProfileDto,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    uploadFile: builder.mutation<void, { userId: string; token: string; file: File }>({
      query: ({ userId, token, file }) => {
        const formData = new FormData();
        formData.append('file', file);

        return {
          url: `${route.uploadFile}/${userId}`,
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useGetProfileInformationQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useUploadFileMutation,
} = profileApi;

export default profileApi;
