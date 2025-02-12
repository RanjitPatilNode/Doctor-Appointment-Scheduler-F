import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL, 
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        loginAdmin: builder.mutation({
            query: (credentials) => ({
                url: "/LoginApis", 
                method: "POST",
                body: credentials,
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),
    }),
});

export const { useLoginAdminMutation } = authApi;
