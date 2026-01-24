import { apiSlice } from "../api/apiSlice";


export const notificationApi = apiSlice.injectEndpoints({ 

    endpoints: (builder) => ({
    
        // endpoints here
        updateNotificationStatus: builder.mutation({
    
            query: (id:number) => ({
    
                url: `notification/update-notification-status/${id}`,
                method: "PUT",
                credentials: "include"
    
            }),

        }),
        
        getAllNotifications: builder.query({
    
            query: () => ({
    
            url: "notification/get-all-notification",
            method: "GET",
            credentials: "include"
    
            }),
               
        }),    
              
      })
});
    
export const { useUpdateNotificationStatusMutation,useGetAllNotificationsQuery} = notificationApi;