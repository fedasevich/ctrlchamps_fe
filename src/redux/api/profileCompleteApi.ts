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

export interface Certificate {
  name: string;
  certificateId: string;
  link: string;
  dateIssued: Date;
  expirationDate?: Date;
}

export interface CertificateResponse {
  name: string;
  certificateId: string;
  link: string;
  dateIssued: string;
  expirationDate: string;
  caregiverInfo: {
    id: string;
    services: string[] | null;
    availability: TimeSlot[] | null;
    timeZone: string;
    hourlyRate: number | null;
    description: string | null;
    videoLink: string | null;
  };
  id: string;
}

export interface WorkExperience {
  workplace: string;
  qualifications: string;
  startDate: Date;
  endDate: Date;
}

export interface WorkExperienceResponse {
  workplace: string;
  qualifications: string;
  startDate: string;
  endDate: string;
  caregiverInfo: {
    id: string;
    services: string[] | null;
    availability: TimeSlot[] | null;
    timeZone: string | null;
    hourlyRate: number | null;
    description: string | null;
    videoLink: string | null;
  };
  id: string;
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

    createCertificate: builder.mutation<
      CertificateResponse[],
      { userId: string; certificates: Certificate[]; token: string }
    >({
      query: ({ userId, certificates, token }) => ({
        url: `${route.certificates}/${userId}`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { certificates },
      }),
    }),
    createWorkExperience: builder.mutation<
      WorkExperienceResponse[],
      { userId: string; workExperiences: WorkExperience[]; token: string }
    >({
      query: ({ userId, workExperiences, token }) => ({
        url: `${route.workExperience}/${userId}`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { workExperiences },
      }),
    }),
  }),
});

export const {
  useGetProfileInformationQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useUploadFileMutation,
  useCreateCertificateMutation,
  useCreateWorkExperienceMutation,
} = profileApi;

export default profileApi;
