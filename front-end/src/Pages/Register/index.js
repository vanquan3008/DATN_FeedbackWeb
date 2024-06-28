
import { useEffect, useRef ,useState } from "react";
import { icons } from "../../Assets/icons";
import { bg_image } from "../../Assets/images";
import Footer from "../../Components/Layouts/FooterLayout";
import Navbar from "../../Components/Layouts/NavbarLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
    const emailRef = useRef();
    const [pass ,setPass]= useState("");
    const fullnameRef = useRef();
    const [repass ,setRepass] = useState("");
    const passRef = useRef();
    const [emailexists ,setemailexists] = useState(false);
    const [registerSuccess ,getRegisterSuccess] = useState(false);
    const [checkbox,setCheckbox] = useState(false);
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();

    const Register = async (e) =>{    
        e.preventDefault();
        if (pass !== repass) {
            passRef.current.setCustomValidity("Password don't match!")
        } 
        else{
            const data = {
                email : emailRef.current.value,
                fullname :fullnameRef.current.value,
                password : pass
            }
            try{
                setLoading(true);
                await axios.post('http://127.0.0.1:8000/signup',data);
                setemailexists(false);
                setLoading(false);
                navigate("/")
            }
            catch(e){
                setemailexists(true);
                setLoading(false);
                
            }
        }
    }

    const handlePass  = (e)=>{
        setPass(e.target.value);
    }
    const handleRePass = (e)=>{
        setRepass(e.target.value);
    }
    useEffect(() => {
    
        if (pass === repass && checkbox === true && pass !== "" ) {
            getRegisterSuccess(true);
        } else {
            getRegisterSuccess(false);
        }
    }, [pass, repass, checkbox]);
    
    return ( 
        <div className="w-screen h-screen relative flex flex-col items-center justify-center pt-80 overflow-x-hidden">
            <Navbar 
            className="pl"
                page={"Register"} 
                bgColor={"bg-transparent"} 
                tSubjectColor={"text-white"}
                tDloadColor={"text-black"}
                tItemsColor={"text-white"}
                bgDloadColor={"bg-white"}
            ></Navbar>
            <div className="w-screen h-screen absolute top-0 left-0 -z-10">
                <img alt="" className="h-2/3 w-screen" src={bg_image.bgRegisterImage}></img>
            </div>
            {/* Register */} 
            <div className="w-screen z-0 grow flex flex-col items-center justify-center ">
                <div className="w-2/5 text-center mb-4 ">
                    <h1 className="text-6xl font-bold text-white h-auto">Sign Up</h1>
                    <div className="h-6 "></div>
                    <span className="text-sm text-white">
                        Use these awesome forms to login or create new account in your project for free.
                    </span>
                </div>
                <div className="bg-white w-[409px] h-[620px] rounded-xl border-solid border-2 shadow-lg shadow-gray-200 mb-8">
                    <div className="flex flex-col w-full text-center items-center">
                        <h3 className="text-2xl text-color-text-download font-bold pt-6 pb-6">Register with</h3>
                        <div className="flex flex-row">
                            <div className="border-solid border-2 w-[76px] h-[56px] flex justify-center items-center rounded-lg ml-1 mr-1" >
                                <img alt="" src={icons.iconFacebook}></img>
                            </div>
                            <div className="border-solid border-2 w-[76px] h-[56px] flex justify-center items-center rounded-lg ml-1 mr-1 ">
                                <img alt="" src="https://th.bing.com/th?id=ODLS.2c7081e6-f447-4ee8-95d5-8078b7672447&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2"></img>
                            </div>
                        </div>
                        <span className="text-lg text-color-basic font-semibold p-4">or</span>
                    </div>
                    <form className="flex flex-col p-4">
                        <input ref={emailRef} type="Email" required className="outline-none border-solid border-2 h-10 rounded-lg text-sm pl-2 pr-2 mb-4" placeholder="Email"></input>
                        <input ref={fullnameRef} type="text" required className="outline-none border-solid border-2 h-10 rounded-lg text-sm pl-2 pr-2 mb-4" placeholder="Name"></input>
                        <input ref={passRef} type="Password" onChange={handlePass} required className="outline-none border-solid border-2 h-10 rounded-lg text-sm pl-2 pr-2 mb-4" placeholder="Password"></input>
                        <input  type="Password" onChange={handleRePass} required className="outline-none border-solid border-2 h-10 rounded-lg text-sm pl-2 pr-2 mb-4" placeholder="Confirm password"></input>
                        <div className={`${emailexists === true ? '' :"hidden"}`}>
                            <span className="text-red-500 font-medium">
                                Email already exists
                            </span>
                        </div>
                        <div className="text-sm flex flex-row mt-4">
                            <div className="pt-0.5">
                                <input type="checkbox" onChange={()=>{setCheckbox(!checkbox)}} className="w-4 h-4 text-color-checkbox mr-2"></input>
                            </div>
                            I agree the <a href="/" className="font-bold ml-1"> Terms and Conditions</a>
                        </div>
                        <button className={`w-full h-8 bg-color-button text-white text-sm font-bold mt-6 rounded-md flex flex-row justify-center items-center  ${registerSuccess ? '' :'opacity-20'}`} disabled={!registerSuccess} onClick={Register}>
                        { loading === true ?<svg width="20" height="20" fill="currentColor" class="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                                        </path>
                                    </svg> : <div></div>
                                    }
                            SIGN UP
                        </button>
                    </form> 
                    <div className="h-20">
                        <span className="w-full h-8 flex justify-center" >Already have an account ? <a href="/" className="font-bold ml-1">Sign in</a></span>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
     );
}

export default Register;