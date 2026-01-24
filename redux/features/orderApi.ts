import { apiSlice } from "./api/apiSlice";



export const orderApi = apiSlice.injectEndpoints({ 

    endpoints: (builder) => ({
    
        // endpoints here
    
        getAllOrders: builder.query({
    
        query: (data) => ({
    
        url: "order/get-all-orders",
        method: "GET",
        credentials: "include"
    
        }),
           
        providesTags: [{ type: "Orders", id: "LIST" }],
        
        }),
   
        // Get Stripe Publishable Key
        
        getStripePublishableKey: builder.query({
    
        query: () => ({
    
                url: "payment/stripe-Publishable-Api-Key",
                method: "GET",
                credentials: "include"
    
            }),
         
        }),
  
         // Get Stripe Publishable Key
        
        CreatePaymentIntent: builder.mutation({
    
        query: (amount) => ({
    
                url: "payment/new-payment",
                method: "POST",
                body: {
                amount
                },
                credentials: "include"
    
            }),
         
        }),


        CreateOrder: builder.mutation({
    
        query: ({courseId,payment_info }) => ({
    
                url: "order/create-order",
                method: "POST",
                body: {
                courseId,
                payment_info 
                },
                credentials: "include"
    
            }),
         
            
            invalidatesTags: [{ type: "Courses", id: "LIST" },{ type: "Users", id: "me" }],

        }),

 })
});
    
export const { useGetAllOrdersQuery,useGetStripePublishableKeyQuery,useCreateOrderMutation,useCreatePaymentIntentMutation} = orderApi;