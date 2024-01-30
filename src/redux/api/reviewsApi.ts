import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from 'src/redux/rootReducer';
import { route } from 'src/redux/api/routes';

export type SeekerReview = {
  id: string;
  rating: number;
  review?: string;
  createdAt: string;
  caregiverInfoId: string;
  userId: string;
  user: {
    avatar?: string;
    firstName: string;
    lastName: string;
  };
};

interface ReviewsQuery {
  offset?: number;
  limit?: number;
  userId: string;
}

export interface ReviewsResponse {
  data: SeekerReview[];
  count: number;
}

type Review = {
  caregiverInfoId: string;
  rating: number | null;
  review?: string;
};

export const reviewsApi = createApi({
  reducerPath: 'reviewsApi',
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
  endpoints: (builder) => ({
    getReviews: builder.query<ReviewsResponse, ReviewsQuery>({
      query: ({ userId, limit, offset }) => ({
        url: `${route.reviews}/${userId}?limit=${limit}&offset=${offset}`,
      }),
    }),
    createReview: builder.mutation<void, Review>({
      query: (body) => ({
        url: route.reviews,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetReviewsQuery, useCreateReviewMutation } = reviewsApi;

export default reviewsApi;
