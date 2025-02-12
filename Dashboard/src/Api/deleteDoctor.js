import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const deleteDoctorApi = createApi({
    reducerPath: "deleteDoctorApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL, 
    }),
    endpoints: (builder) => ({
        deleteDoctor: builder.mutation({
            query: (doctorId) => ({
                url: "/deleteDoctor", 
                method: "DELETE",
                body: { doctorId }, 
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),
    }),
});

export const { useDeleteDoctorMutation } = deleteDoctorApi;
