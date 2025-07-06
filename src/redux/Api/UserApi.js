import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "https://your-backend-url.com" }),
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (id) => `/api/user/${id}`,
        }),
        // Add other endpoints here...
    }),
});

export const { useGetUserQuery } = api;
