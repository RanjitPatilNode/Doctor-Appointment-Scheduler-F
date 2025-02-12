import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const createDoctorApi = createApi({
    reducerPath: "createDoctorApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
    }),
    endpoints: (builder) => ({
        getAllDoctors: builder.query({
            query: () => "/doctors",
        }),
        addDoctor: builder.mutation({
            query: (newDoctor) => ({
                url: "/createDoctor",
                method: "POST",
                body: newDoctor,
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),
    }),
});

export const { useGetAllDoctorsQuery, useAddDoctorMutation } = createDoctorApi;
