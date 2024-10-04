import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
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
    //     } catch (error) {
    //       console.error("Error parsing user object:", error);
    //     }
    //   }

    //   if (token) {
    //     headers.set('Authorization', `Bearer ${token}`);
    //   }

    //   headers.set("x-tenant-id", tenantId);
    // },
  }),
  tagTypes: ["Book"],
  endpoints: (builder) => ({
    getBooks: builder.query<any, void>({
      query: () => ({
        url: `/books`,
        method: `GET`,
      }),
      providesTags: ["Book"],
    }),
    getBookById: builder.query({
      query: (id) => ({
        url: `/books/${id}`,
        method: `GET`,
      }),
    }),
    getBooksByGenre: builder.query({
      query: (genreId) => ({
        url: `/books/genre/${genreId}`,
        method: `GET`,
      }),
    }),
    searchBooks: builder.query({
      query: (param) => ({
        url: `/search?query=${param}`,
        method: `GET`,
      }),
    }),
    deleteBook: builder.mutation<any, any>({
      query: (id) => ({
        url: `/books/${id}`,
        method: `DELETE`,
      }),
      invalidatesTags: ["Book"],
    }),
  }),
});

export const { useGetBooksQuery, useGetBookByIdQuery, useLazyGetBooksByGenreQuery, useDeleteBookMutation, useLazySearchBooksQuery } =
  bookApi;
