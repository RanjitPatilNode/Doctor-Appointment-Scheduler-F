import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL, 
    }),
    endpoints: (builder) => ({
        getDashboardStats: builder.query({
            query: () => "/getDashboardStats",
        }),
    }),
});

export const { useGetDashboardStatsQuery } = dashboardApi;
