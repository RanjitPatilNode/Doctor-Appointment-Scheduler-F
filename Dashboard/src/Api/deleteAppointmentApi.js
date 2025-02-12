import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const deleteAppointmentApi = createApi({
    reducerPath: "deleteAppointmentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
    }),
    endpoints: (builder) => ({ 
        deleteAppointment: builder.mutation({
            query: (appointmentId) => {
                const formData = new FormData();
                formData.append("patientId", appointmentId); 

                return {
                    url: `/deletePatient`, 
                    method: "DELETE",
                    body: formData, 
                };
            },
        }),
    }),
});

export const { useDeleteAppointmentMutation } = deleteAppointmentApi;
