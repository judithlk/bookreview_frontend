import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    // prepareHeaders: (headers) => {
    //     let token = localStorage.getItem("token");

    //   const userString = localStorage.getItem("userInfo");
    //   let tenantId = "";

    //   if (userString) {
    //     try {
    //       const userObject = JSON.parse(userString);
    //       tenantId = userObject.tenantId || "";
    //     } catch (error: any) {
    //       console.error("Error parsing user object:", error);
    //     }
    //   }

    //   if (token) {
    //     headers.set('Authorization', `Bearer ${token}`);
    //   }

    //   headers.set("x-tenant-id", tenantId);
    // },
  }),
  tagTypes: ["Review"],
  endpoints: (builder) => ({
    addReview: builder.mutation<any, any>({
      query: (body) => ({
        url: `/reviews`,
        method: `POST`,
        body: {
          userId: body.userId, username: body.username, book: body.book, body: body.body
        },
      }),
    }),
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
      query: (userId) => ({
        url: `/reviews/user/${userId}`,
        method: `GET`,
      }),
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
  useLazyGetReviewsByUserQuery,
  useGetReviewsByBookQuery,
  useDeleteReviewMutation,
} = reviewApi;
