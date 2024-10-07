import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  tagTypes: ["Review"],
  endpoints: (builder) => ({
    // addReview: builder.mutation<any, any>({
    //   query: (body) => ({
    //     url: `/reviews`,
    //     method: `POST`,
    //     body: {
    //       userId: body.userId, username: body.username, book: body.book, body: body.body
    //     },
    //   }),
    // }),
    getReviews: builder.query<any, void>({
      query: () => ({
        url: `/reviews`,
        method: `GET`,
      }),
      providesTags: ["Review"],
    }),
    getReviewsByBook: builder.query({
      query: (bookId) => ({
        url: `/reviews/book/${bookId}`,
        method: `GET`,
      }),
    }),
    getReviewsByUser: builder.query({
      query: (userId) => {
        let token = "";
        if (typeof window !== "undefined") {
          token = localStorage.getItem("token") || "";
        }

        return {
          url: `/reviews/user/${userId}`,
          method: `GET`,
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : undefined,
        };
      },
    }),

    deleteReview: builder.mutation<any, any>({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: `DELETE`,
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const {
  useAddReviewMutation,
  useGetReviewsQuery,
  useGetReviewsByUserQuery,
  useGetReviewsByBookQuery,
  useDeleteReviewMutation,
} = reviewApi;
