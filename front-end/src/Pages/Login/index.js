import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bg_image } from "../../Assets/images";
import Footer from "../../Components/Layouts/FooterLayout";
import Navbar from "../../Components/Layouts/NavbarLayout";
import {Switch} from "antd"
import { loginUser } from "../../Redux/apiRequest";
import { useSelector } from "react-redux";


function Login(){
    const emailRef = useRef();
    const passwordRef = useRef();
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const [loading , setloading] = useState(false);
    
    const loginError = useSelector((state) => state.auth.login.isError);
    const handleLogin = async (e)=>{
        setloading(true);
        e.preventDefault();

        const data = {
            email : emailRef.current.value,
            password : passwordRef.current.value
        }
        
        loginUser(data,dispatch ,navigator,setloading )
    
    }

    console.log(loading);
    return(
        <div className="relative w-screen h-screen overflow-x-hidden">
            <Navbar></Navbar>
            <div className="flex flex-col w-full h-full">
                <div className="grow">
                    <div className="flex flex-row ">
                        <div className="flex flex-col w-1/2 grow items-center justify-center">
                            <div className="w-96">
                                <h1 className="text-4xl text-blue-title font-bold pb-6">Sign in</h1>
                                <span className="text-xl text-color-basic">Enter your email and password to sign in</span>
                            </div>
                            {/* form login  */}
                            <form className="w-96 pt-8 flex flex-col" >
                                <div className="flex flex-col pb-2">
                                    <span className="text-sm pb-4 text-color-basic font-medium">Email</span>
                                    <input ref={emailRef} type="email" className="outline-none border-solid border-2 h-10 rounded-lg text-sm pl-2 pr-2" placeholder="Email"></input>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm pb-4 text-color-basic font-medium ">Password</span>
                                    <input ref={passwordRef} type="Password" className="outline-none border-solid border-2 h-10 rounded-lg text-sm pl-2 pr-2" placeholder="Password"></input>
                                </div>
                                {
                                    loginError === true ?
                                    <div>
                                        <span className="text-base text-red-500"> Sorry, your password was incorrect. Please double-check your password.</span>
                                    </div> : 
                                    <div></div>
                                }
                                <div className="pt-4">
                                    <Switch className="w-8 bg-slate-400 mr-2"></Switch>
                                    Remember me
                                </div>
                                <button className={`w-96 h-8 bg-blue-400 flex flex-row justify-center items-center   text-white text-sm font-bold mt-10 rounded-md`} onClick={handleLogin}>
                                   { loading === true ?<svg width="20" height="20" fill="currentColor" class="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                                        </path>
                                    </svg> : <div></div>
                                    }
                                    SIGN IN
                                </button>
                                
                            </form>
                            <span className="text-sm pt-6 text-color-basic w-96 ">
                                Don't have an account? <a href="/register" className="text-blue-title font-bold z-10">Sign up</a>
                            </span>
                        </div>
                        <div className="w-1/2" >
                            <img min-width="876px"  alt="" src={bg_image.bgLoginImage}></img> 
                        </div>
                    </div>
                </div>
                <div className="pt-10">
                    <Footer></Footer>
                </div>
            </div>
        </div>
    );
}

export default Login;