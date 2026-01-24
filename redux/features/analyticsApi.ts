import { apiSlice } from "./api/apiSlice";



export const analyticsApi = apiSlice.injectEndpoints({ 

    endpoints: (builder) => ({
    
        // endpoints here

        getCoursesAnalytics: builder.query({
    
            query: (data) => ({
    
                url: "analytics/get-courses-analytics",
                method: "GET",
                credentials: "include"
    
            }),
              
        }),

        getUsersAnalytics: builder.query({
    
            query: (data) => ({
    
                url: "analytics/get-users-analytics",
                method: "GET",
                credentials: "include"
    
            }),
              
        }),
        
         getOrdersAnalytics: builder.query({
    
            query: (data) => ({
    
                url: "analytics/get-orders-analytics",
                method: "GET",
                credentials: "include"
    
            }),
              
        })




 })
});
    
export const { useGetCoursesAnalyticsQuery,useGetUsersAnalyticsQuery,useGetOrdersAnalyticsQuery} = analyticsApi;