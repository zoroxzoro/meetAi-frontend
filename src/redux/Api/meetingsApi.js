// src/redux/Api/MeetingApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const meetingApi = createApi({
    reducerPath: "meetingApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_SERVER_PORT, // Make sure this env is defined properly
    }),
    tagTypes: ["Meeting"],
    endpoints: (builder) => ({
        // Create Meeting
        createMeeting: builder.mutation({
            query: (data) => ({
                url: "/meetings/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Meeting"],
        }),

        // Get Meetings by Clerk ID (userId from Clerk)
        getMeetingsByUser: builder.mutation({
            query: (userId) => ({
                url: "/meetings/get",
                method: "POST",
                body: { userId },
            }),
            providesTags: ["Meeting"],
        }),
    }),
});

// ✅ Export hooks
export const {
    useCreateMeetingMutation,
    useGetMeetingsByUserMutation,
} = meetingApi;
