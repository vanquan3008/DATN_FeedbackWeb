import axios from "axios";
import { loginError, loginStart, loginSuccess, logoutError, logoutStart, logoutSuccess } from "./authSlice";


//Login
export const loginUser = async (user , dispatch ,navigator) =>{
    dispatch(loginStart());
    try{
        const res = await axios.post("http://localhost:8000/signin", user);
        dispatch(loginSuccess(res.data))
        navigator("/home")
    }
    catch(err){
        dispatch(loginError())
    }
}



// export const logOut = async ( dispatch ,navigate )=>{
//     dispatch(logoutStart())
//     try{
//         await axios.get('http://localhost:8000/logout');
//         dispatch(logoutSuccess())
//         navigate('/')
//     }
//     catch(error){
//         dispatch(logoutError())
//     }
// }