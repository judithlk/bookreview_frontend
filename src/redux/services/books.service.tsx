import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
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
