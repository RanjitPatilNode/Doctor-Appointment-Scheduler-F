import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const createAppointmentApi = createApi({
    reducerPath: "createAppointmentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
    }),
    endpoints: (builder) => ({
        getAllAppointments: builder.query({
            query: () => "/appointments",
        }),
        addAppointment: builder.mutation({
            query: (newAppointment) => ({
                url: "/createPatient",
                method: "POST",
                body: newAppointment,
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),
    }),
});

export const { useGetAllAppointmentsQuery, useAddAppointmentMutation } = createAppointmentApi;
