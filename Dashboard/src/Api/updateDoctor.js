import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const updateDoctorApi = createApi({
    reducerPath: "updateDoctorApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,  
    }),
    tagTypes: ["Doctors"], 
    endpoints: (builder) => ({
        updateDoctor: builder.mutation({
            query: ({ id, updatedDoctor }) => ({
                url: "/updateDoctor",  
                method: "PUT",
                body: { doctorId: id, ...updatedDoctor },
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: ["Doctors"], 
        }),
    }),
});

export const { useUpdateDoctorMutation } = updateDoctorApi;
