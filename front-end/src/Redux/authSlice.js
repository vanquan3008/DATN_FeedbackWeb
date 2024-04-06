import { createSlice } from '@reduxjs/toolkit'


const authSlice = createSlice({
    name :"auth",
    initialState :{
        login:{
            currentUser :null ,
            isFetching :false ,
            isError : false,
        },
        logout:{
            isFetching :false ,
            isError : false
        }
    },
    reducers : {
        loginStart :(state )=>{
            state.login.isFetching = true;

        },
        loginSuccess :(state,action)=>{
            state.login.isFetching =false;
            state.login.isError =false;
            state.login.currentUser = action.payload;
        },
        loginError :(state)=>{
            state.login.isFetching =false;
            state.login.isError =true;

        },

        logoutStart:(state)=>{
            state.logout.isFetching =true;
        },
        logoutSuccess:(state)=>{
            state.logout.isFetching =false;
            state.logout.isError =false;
            state.login.currentUser= null;
        },
        logoutError:(state)=>{
            state.logout.isFetching =false;
            state.logout.isError = true;
        }
    }
})

export const { loginError, loginStart, loginSuccess ,logoutStart ,logoutError ,logoutSuccess} = authSlice.actions;
export default authSlice.reducer