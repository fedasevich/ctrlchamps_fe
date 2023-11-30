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
  timeZone?: string;
  hourlyRate?: number;
  description?: string;
}

export interface UpdateProfileResponse {
  services: string[];
  availability: TimeSlot[];
  timeZone: string;
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
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/${route.profile}`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProfileInformation: builder.query({
      query: () => ({
        url: `/`,
      }),
    }),
    createProfile: builder.mutation<void, void>({
      query: () => ({
        url: `/`,
        method: 'POST',
      }),
    }),
    updateProfile: builder.mutation<
      UpdateProfileResponse,
      { updateProfileDto: UpdateProfileRequest }
    >({
      query: ({ updateProfileDto }) => ({
        url: `/`,
        method: 'PATCH',
        body: updateProfileDto,
      }),
    }),
    uploadFile: builder.mutation<void, { file: File }>({
      query: ({ file }) => {
        const formData = new FormData();
        formData.append('file', file);

        return {
          url: `${route.uploadFile}`,
          method: 'POST',
          body: formData,
        };
      },
    }),
    createCertificate: builder.mutation<CertificateResponse[], { certificates: Certificate[] }>({
      query: ({ certificates }) => ({
        url: `${route.certificates}`,
        method: 'POST',
        body: { certificates },
      }),
    }),
    createWorkExperience: builder.mutation<
      WorkExperienceResponse[],
      { workExperiences: WorkExperience[] }
    >({
      query: ({ workExperiences }) => ({
        url: `${route.workExperience}`,
        method: 'POST',
        body: { workExperiences },
      }),
    }),
    updateCertificate: builder.mutation<
      CertificateResponse,
      { certificateId: string; certificate: Certificate }
    >({
      query: ({ certificateId, certificate }) => ({
        url: `${route.certificates}/${certificateId}`,
        method: 'PATCH',
        body: certificate,
      }),
    }),

    deleteCertificate: builder.mutation<void, string>({
      query: (certificateId) => ({
        url: `${route.certificates}/${certificateId}`,
        method: 'DELETE',
      }),
    }),

    updateWorkExperience: builder.mutation<
      WorkExperienceResponse,
      { workExperienceId: string; workExperience: WorkExperience }
    >({
      query: ({ workExperienceId, workExperience }) => ({
        url: `${route.workExperience}/${workExperienceId}`,
        method: 'PATCH',
        body: workExperience,
      }),
    }),

    deleteWorkExperience: builder.mutation<void, string>({
      query: (workExperienceId) => ({
        url: `${route.workExperience}/${workExperienceId}`,
        method: 'DELETE',
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
  useUpdateCertificateMutation,
  useDeleteCertificateMutation,
  useUpdateWorkExperienceMutation,
  useDeleteWorkExperienceMutation,
} = profileApi;

export default profileApi;
