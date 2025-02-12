import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appointmentApi = createApi({
    reducerPath: "appointmentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL, 
    }),
    endpoints: (builder) => ({
        getAllAppointments: builder.query({
            query: () => "/getAllAppointments",
        }),
    }),
});
  
export const { useGetAllAppointmentsQuery } = appointmentApi;
