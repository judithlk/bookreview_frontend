import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers) => {
      let token = "";
        if (typeof window !== "undefined") {
          token = localStorage.getItem("token") || "";
        }

      headers.set("Authorization", `Bearer ${token}`);
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<any, void>({
      query: () => ({
        url: `/users`,
        method: `GET`,
      }),
      providesTags: ["User"],
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: `GET`,
      }),
    }),
    deleteUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: `DELETE`,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery, useDeleteUserQuery } = userApi;