
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
                await axios.post('http://127.0.0.1:8000/signup',data);
                setemailexists(false);
                navigate("/")
            }
            catch(e){
                setemailexists(true);
                
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
                                <img alt="" src={icons.iconApple}></img>
                            </div>
                            <div className="border-solid border-2 w-[76px] h-[56px] flex justify-center items-center rounded-lg ml-1 mr-1">
                                <img alt="" src={icons.iconFacebook}></img>
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
                        <button className={`w-full h-8 bg-color-button text-white text-sm font-bold mt-6 rounded-md  ${registerSuccess ? '' :'opacity-20'}`} disabled={!registerSuccess} onClick={Register}>
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