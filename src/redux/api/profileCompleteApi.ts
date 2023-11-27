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
  services?: string[];
  availability?: TimeSlot[];
  hourlyRate?: number;
  description?: string;
}

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/${route.profile}` }),
  endpoints: (builder) => ({
    getProfileInformation: builder.query({
      query: (userId) => `${userId}`,
    }),
    createProfile: builder.mutation<void, { userId: string }>({
      query: ({ userId }) => ({
        url: `/${userId}`,
        method: 'POST',
      }),
    }),
    updateProfile: builder.mutation<
      UpdateProfileResponse,
      { userId: string; updateProfileDto: UpdateProfileRequest }
    >({
      query: ({ userId, updateProfileDto }) => ({
        url: `/${userId}`,
        method: 'PATCH',
        body: updateProfileDto,
      }),
    }),

    uploadFile: builder.mutation<void, { userId: string; file: File }>({
      query: ({ userId, file }) => {
        const formData = new FormData();
        formData.append('file', file);

        return {
          url: `${route.uploadFile}/${userId}`,
          method: 'POST',
          body: formData,
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
