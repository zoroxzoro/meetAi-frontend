// src/services/agentsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const PORT = import.meta.env.VITE_SERVER_PORT; // e.g. http://localhost:5000/api

export const agentsApi = createApi({
    reducerPath: 'agentsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: PORT,
    }),
    tagTypes: ['Agents'],
    endpoints: (builder) => ({
        // Fetch all agents for a user
        getAgentsByUser: builder.mutation({
            query: (userId) => ({
                url: 'agents/getAgents',
                method: 'POST',
                body: { userId },
            }),
            providesTags: ['Agents'],
        }),

        // Create a new agent
        createAgent: builder.mutation({
            query: ({ name, instruction, user }) => ({
                url: '/agents/createAgent',
                method: 'POST',
                body: { name, instruction, user },
            }),
            invalidatesTags: ['Agents'],
        }),
        deleteAgent: builder.mutation({
            query: ({ agentId, userId }) => ({
                url: '/agents/delete-agent',
                method: 'POST',
                body: { agentId, userId },
            }),
            invalidatesTags: ['Agent'],
        }),

        updateAgent: builder.mutation({
            query: ({ agentId, name, instruction }) => ({
                url: '/agents/update-agent',
                method: 'POST',
                body: { agentId, name, instruction },
            }),
            invalidatesTags: ['Agent'],
        }),
    }),
});

export const { useGetAgentsByUserMutation, useCreateAgentMutation, useDeleteAgentMutation, useUpdateAgentMutation } = agentsApi;
