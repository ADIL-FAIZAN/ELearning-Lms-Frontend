import { createSlice } from "@reduxjs/toolkit";


const initialState= {
    
 token: "",
 user: ""

};

const authSlice = createSlice({

    name:"Auth",
    initialState,
    
    reducers: {      

    userRegistration: (state,action) => {
    state.token = action.payload.token;
    
    },   

    userLoggedIn: (state, action) => {
        
    state.token = action.payload.token;
    state.user = action.payload.user;
    
    },

    userLoggedOut: (state) => {
        
    state.token ="";
    state.user = "";
    
        },
    
    userUpdate: (state,action) => {
        
    
    state.user = action.payload.user;
    
    },

    },

});



export const { userRegistration, userLoggedIn, userLoggedOut,userUpdate } = authSlice.actions;
export default authSlice.reducer