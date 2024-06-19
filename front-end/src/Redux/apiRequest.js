import axios from "axios";
import { loginError, loginStart, loginSuccess, logoutError, logoutStart, logoutSuccess} from "./authSlice";


//Login
export const loginUser = async (user , dispatch ,navigator,setloading ) =>{

    dispatch(loginStart());
    try{
        const res = await axios.post("http://localhost:8000/signin", user ,{
            withCredentials : true, 
        });
        dispatch(loginSuccess(res.data))
        navigator("/home")
    }
    catch(err){
        dispatch(loginError())
        setloading(false);

    }
}


export const logOut = async ( dispatch ,navigate ,infoUser )=>{
    dispatch(logoutStart())
    try{
        await axios.post('http://localhost:8000/logout',
            { "email" : infoUser.userLogin.email } ,
            {
                withCredentials : true, 
                headers : {token : `Bearer ${infoUser.jwt}`}
            } 
        );
        dispatch(logoutSuccess())
        navigate('/')
    }
    catch(error){
        dispatch(logoutError())
    }
}