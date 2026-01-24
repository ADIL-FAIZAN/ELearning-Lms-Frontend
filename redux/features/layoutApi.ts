import { fakeBaseQuery } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";



export const layoutApi = apiSlice.injectEndpoints({ 

    endpoints: (builder) => ({
    
        // endpoints here

        getLayout: builder.query({
    
            query: (type) => ({
    
                url: `layout/get-layout/${type}`,
                method: "GET",
                credentials: "include"
    
            }),
               
            providesTags: [{ type: "Banner", id: "LIST" },{ type: "Categories", id: "LIST" },{ type: "Faq", id: "LIST" }],

        }),


           editLayout: builder.mutation({
    
               query: ({ image, title, subTitle, type}) => ({
    
                url: `layout/edit-layout`,
                method: "PUT",
                body: { image, title, subTitle, type},
                credentials: "include"
    
               }),
               invalidatesTags: [{ type: "Banner", id: "LIST" }],

           }),
           
           editFaq: builder.mutation({
    
               query: ({type,faq}) => ({
    
                url: `layout/edit-layout`,
                method: "PUT",
                body: { type,faq},
                credentials: "include"
    
               }),
               invalidatesTags: [{ type: "Faq", id: "LIST" }],

           }),
           

               editCategories: builder.mutation({
    
               query: ({type,categories}) => ({
    
                url: `layout/edit-layout`,
                method: "PUT",
                body: { type,categories},
                credentials: "include"
    
               }),
               invalidatesTags: [{ type: "Categories", id: "LIST" }],

                   })




    })
    
});
    
export const { useGetLayoutQuery,useEditLayoutMutation,useEditFaqMutation,useEditCategoriesMutation } = layoutApi;