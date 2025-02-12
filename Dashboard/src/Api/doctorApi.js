import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const doctorApi = createApi({
    reducerPath: "doctorApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL, 
    }),
    endpoints: (builder) => ({
        getAllDoctors: builder.query({
            query: () => "/getAllDoctors",
        }),
        getDoctorById: builder.query({  
            query: (id) => `/getDoctor/${id}`,
        }),
    }),
});

export const { useGetAllDoctorsQuery, useGetDoctorByIdQuery } = doctorApi;
