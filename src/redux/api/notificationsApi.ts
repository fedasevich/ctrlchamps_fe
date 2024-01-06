import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from 'src/redux/rootReducer';
import { route } from 'src/redux/api/routes';

export type NotificationStatus =
  | 'appoinmentRequested'
  | 'appointmentRejected'
  | 'appointmentRequestAccepted'
  | 'appointmentRequestRejected'
  | 'virtualAssessmentAccepted'
  | 'virtualAssessmentRejected'
  | 'virtualAssessmentRescheduled'
  | 'agreementSignOff'
  | 'activityLogCompletionRequest'
  | 'activityLogReviewRequest'
  | 'activityLogApprove'
  | 'activityLogReject';

export type Notification = {
  id: string;
  appointmentId: string;
  status: NotificationStatus;
  user: string;
};

export const notificationsApi = createApi({
  reducerPath: 'notificationsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState() as RootState;
      const currentToken: string = token.token;

      if (currentToken) {
        headers.set('Authorization', `Bearer ${currentToken}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Notifications'],
  endpoints: (builder) => ({
    fetchNotifications: builder.query<Notification[], string>({
      query: (userId) => ({ url: `${route.notifications}/${userId}` }),
      providesTags: ['Notifications'],
    }),
  }),
});

export const { useFetchNotificationsQuery } = notificationsApi;

export default notificationsApi;
