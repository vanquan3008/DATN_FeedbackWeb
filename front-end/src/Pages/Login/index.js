import { useRef } from "react";
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
    
    const loginError = useSelector((state) => state.auth.login.isError);

    console.log(loginError);
    const handleLogin = async (e)=>{
        e.preventDefault();

        const data = {
            email : emailRef.current.value,
            password : passwordRef.current.value
        }
        
        loginUser(data,dispatch ,navigator)
    }
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
                            <form className="w-96 pt-8 flex flex-col" onClick={handleLogin}>
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
                                <button className="w-96 h-8 bg-blue-400 text-white text-sm font-bold mt-10 rounded-md">
                                    SIGN IN
                                </button>
                                <span className="text-sm pt-6 text-color-basic">
                                    Don't have an account? <a href="/Register" className="text-blue-title font-bold">Sign up</a>
                                </span>
                            </form>
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