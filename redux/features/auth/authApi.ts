import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut, userRegistration, userUpdate } from "./authSlice";

type RegistrationResponse = {
  message: string;
  token: string;
};

type RegistrationData = {};



export const authApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
    
    // endpoints here
    register: builder.mutation<RegistrationResponse,RegistrationData>({
    
    query: (data) => ({
    
    url:"user/create-user",
    method:"POST",
    body:data,
    credentials:"include"
    
    }),
        
    // onQueryStarted ye ek hook jaise function hai jo mutation Ya Query start hote hi run hota hai, aur tum backend response ke sath side effects kar sakte ho
    
    async onQueryStarted(arg,{queryFulfilled,dispatch}){
     
    try {
        
    const result = await queryFulfilled;
    dispatch(userRegistration({token:result.data.token}));    

    } catch (err:any) {
    
    console.log(err);
    
    };  
},    
    }), // register endpoint ends here
       
    activation: builder.mutation({
    
    query: ({activation_token,activation_code}) => ({
    
    url: "user/activation",
    method: "POST",
    body: {
        
    activation_Token:activation_token,
    ActivationCode:activation_code    
            
    },
    credentials:"include"
    
    }),      
    }), // activation End here
        
    login: builder.mutation({
      
    query: ({ email, password }) => ({

    url: "user/login-user",
    method: "POST",
    body: {
      
    email,
    password 
    
    },
    credentials:"include"

    }),

  async onQueryStarted(arg,{queryFulfilled,dispatch}){
     
  try {
        
  const result = await queryFulfilled;
  dispatch(userLoggedIn({token:result.data.AccessToken,user:result.data.User}));    

  } catch (err:any) {
  console.log(err);
  };  
  
  },    
  }),

    
    logout: builder.query({
      
    query: () => ({

    url:"user/logout",
    method:"GET",
    credentials:"include"

    }),

  async onQueryStarted(arg,{queryFulfilled,dispatch}){
     
  try {
        
  const result = await queryFulfilled;
  dispatch(userLoggedOut());    

  } catch (err:any) {
    
  console.log(err);
    
  };  
  
  },    
  }),  
    
    
    socialAuth: builder.mutation({
      
    query: ({ name, email,image }) => ({

    url: "user/social-Auth",
    method: "POST",
    body: {
     
    name,
    email,
    image 
    
    },
    credentials:"include"

    }),

  async onQueryStarted(arg,{queryFulfilled,dispatch}){
     
  try {
        
  const result = await queryFulfilled;
  dispatch(userLoggedIn({token:result.data.AccessToken,user:result.data.User}));    

  } catch (err:any) {
    
  console.log(err);
    
  };  
  
  },    

  }),
    
  UpdateUserName: builder.mutation({
      
    query: (FullName) => ({

    url: "user/update-user-info",
    method: "PUT",
    body: {
  
    name:FullName     
  
    },
    credentials:"include"

    }),

  async onQueryStarted(arg,{queryFulfilled,dispatch}){
     
  try {
        
  const result = await queryFulfilled;
  dispatch(userUpdate({user:result.data.User}));    

  } catch (err:any) {
  console.log(err);
  };  
  
  },    
  })
    
    
    
    }), // endPoints() End here
});

export const { useRegisterMutation,useActivationMutation,useLoginMutation,useSocialAuthMutation,useLogoutQuery,useUpdateUserNameMutation} = authApi;