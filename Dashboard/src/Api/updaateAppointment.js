import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const updateAppointmentApi = createApi({
    reducerPath: "updateAppointmentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
    }),
    endpoints: (builder) => ({
        updatePatient: builder.mutation({
            query: (data) => ({
                url: `/updatePatient/${data.patientId}`, 
                method: "PUT",
                body: data
            }),
        }),
    }),
});

export const { useUpdatePatientMutation } = updateAppointmentApi;
