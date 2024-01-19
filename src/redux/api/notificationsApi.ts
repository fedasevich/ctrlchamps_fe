import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from 'src/redux/rootReducer';
import { route } from 'src/redux/api/routes';

export type NotificationStatus =
  | 'REQUEST_ACCEPTED'
  | 'REQUEST_REJECTED'
  | 'REQUESTED_APPOINTMENT'
  | 'REJECTED_APPOINTMENT'
  | 'ACCEPTED_VA'
  | 'REJECTED_VA'
  | 'RESCHEDULE_VA'
  | 'SIGN_OFF'
  | 'ACTIVITY_LOG_REQUEST'
  | 'ACTIVITY_LOG_REVIEW'
  | 'ACTIVITY_LOG_APPROVED'
  | 'ACTIVITY_LOG_REJECTED'
  | 'INSUFFICIENT_FIRST_HOUR_PAYMENT';

export type Notification = {
  id: string;
  appointmentId: string;
  status: NotificationStatus;
  user: string;
};

export interface NotificationRespose {
  data: Notification[];
  count: number;
}

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
  refetchOnFocus: true,
  tagTypes: ['Notifications'],
  endpoints: (builder) => ({
    fetchNotifications: builder.query<NotificationRespose, string>({
      query: (userId) => ({ url: `${route.notifications}/${userId}` }),
      providesTags: ['Notifications'],
    }),
  }),
});

export const { useFetchNotificationsQuery } = notificationsApi;

export default notificationsApi;
