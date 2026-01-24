import { apiSlice } from "../api/apiSlice";
import { userUpdate } from "../auth/authSlice";


export const userApi = apiSlice.injectEndpoints({

 endpoints: (builder) => ({

 updateUserAvatar: builder.mutation({
    
 query: ({avatar}) => ({

  url:"user/update-user-avatar",   
  method: "PUT",
    
  body: {
      
  avatar
    
  },
  
    credentials:"include"
      
 }),

   async onQueryStarted(arg,{queryFulfilled,dispatch}){
      
   try {
         
   const result = await queryFulfilled;
   dispatch(userUpdate({user:result.data.user}));    
 
   } catch (err: any) {
       
   console.log(err);
   
   };  
   
   },       
     
 }), // updateUserAvatar

     
  updateUserPssword: builder.mutation({
    
  query: ({oldPassword,newPassword}) => ({

  url:"user/update-user-password",   
  method: "PUT",
    
  body: {
  
    oldPassword,
    newPassword
    
  },
  
    credentials:"include"
      
 }),

   async onQueryStarted(arg,{queryFulfilled,dispatch}){
      
   try {
         
   const result = await queryFulfilled;
   dispatch(userUpdate({user:result.data.user}));    
 
   } catch (err: any) {
       
   console.log(err);
   
   };  
   
   },       
     
 }), 
   
   
   
  GetAllUsers: builder.query({
    
  query: () => ({

  url:"user/get-all-users",   
  method: "GET",
  credentials:"include"
      
 }),
   
    providesTags: [{ type: "Users", id: "LIST" }],
     
    }),
      
  deleteUser: builder.mutation({
          
      
        query: (id:any) => ({
        url: `user/delete-user/${id}`,
        method: "DELETE",
        credentials: "include"

            }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
  }),
  
      updateRole: builder.mutation({
          
        query: ({ email, role}) => ({
        url: `user/update-user-role`,
        method: "PUT",
        body: {
          email,
          role  
        },
        credentials: "include"

        }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),


  })




  });


export const { useUpdateUserAvatarMutation,useUpdateUserPsswordMutation,useGetAllUsersQuery,useDeleteUserMutation,useUpdateRoleMutation} = userApi;