// src/services/agentsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const PORT = import.meta.env.VITE_SERVER_PORT
export const agentsApi = createApi({
    reducerPath: 'agentsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${PORT}`, // adjust as needed
    }),
    endpoints: (builder) => ({
        getAgentsByUser: builder.mutation({
            query: (userId) => ({
                url: 'agents/getAgents',
                method: 'POST',
                body: { userId },
            }),
        }),
    }),
});

export const { useGetAgentsByUserMutation } = agentsApi;
