import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const genreApi = createApi({
  reducerPath: "genreApi",
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
  tagTypes: ["Genre"],
  endpoints: (builder) => ({
    addGenre: builder.mutation<any, any>({
      query: (body) => ({
        url: `/genres`,
        method: `POST`,
        body: {
          title: body.title
        },
      }),
    }),
    getGenres: builder.query<any, void>({
      query: () => ({
        url: `/genres`,
        method: `GET`,
      }),
      providesTags: ["Genre"],
    }),
    getGenresById: builder.query({
      query: (id) => ({
        url: `/genres/${id}`,
        method: `GET`,
      }),
    }),
    // deleteGenre: builder.mutation<any, any>({
    //   query: (id) => ({
    //     url: `/reviews/${id}`,
    //     method: `DELETE`,
    //   }),
    //   invalidatesTags: ["Review"],
    // }),
  }),
});

export const {
  useAddGenreMutation, useGetGenresByIdQuery, useGetGenresQuery
} = genreApi;
