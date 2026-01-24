import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { userLoggedIn } from "../auth/authSlice";


export const apiSlice = createApi({
    
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_SERVER_URL }),
    tagTypes: ["Courses","Users","Banner","Faq","Categories","Orders"],
    endpoints: (builder) => ({
     
    refreshToken: builder.query({
      
    query: ( ) => ({

    url: "user/refresh-user-token",
    method:"GET",
    credentials: "include"

    }),
 }),
        
    loadUser: builder.query<any,void>({
      
    query: () => ({

    url:"user/get-login-user-info",
    method:"GET",
    credentials: "include"

    }),
    
     providesTags: [{ type: "Users", id: "me" }],      
        
    async onQueryStarted(arg, { queryFulfilled, dispatch }) {
              
    try {
                 
    const result = await queryFulfilled;

    dispatch(userLoggedIn({token:result.data.token,user:result.data.User}));    
         
    } catch (err:any) {
             
    console.log(err);
             
    };  
           
    } 

    })       
        
})
    })

export const { useRefreshTokenQuery,useLoadUserQuery } = apiSlice;