import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query: (body) => ({
        url: `auth/login`,
        method: `POST`,
        body: { 
          email: body.email, 
          password: body.password },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
