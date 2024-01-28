import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { route } from 'src/redux/api/routes';
import { RootState } from 'src/redux/rootReducer';

type Review = {
  caregiverInfoId: string;
  rating: number | null;
  review?: string;
};

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState() as RootState;
      const currentToken = token.token;

      if (currentToken) {
        headers.set('Authorization', `Bearer ${currentToken}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    createReview: builder.mutation<void, Review>({
      query: (body) => ({
        url: route.review,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateReviewMutation } = reviewApi;

export default reviewApi;
