
import { icons } from "../../Assets/icons";
import { bg_image } from "../../Assets/images";
import Footer from "../../Components/Layouts/FooterLayout";
import Navbar from "../../Components/Layouts/NavbarLayout";

function Register() {
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
                <div className="bg-white w-[409px] h-[600px] rounded-xl border-solid border-2 shadow-lg shadow-gray-200 mb-8">
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
                        <input type="Email" className="outline-none border-solid border-2 h-10 rounded-lg text-sm pl-2 pr-2 mb-4" placeholder="Email"></input>
                        <input type="" className="outline-none border-solid border-2 h-10 rounded-lg text-sm pl-2 pr-2 mb-4" placeholder="Name"></input>
                        <input type="Password" className="outline-none border-solid border-2 h-10 rounded-lg text-sm pl-2 pr-2 mb-4" placeholder="Password"></input>
                        <input type="Password" className="outline-none border-solid border-2 h-10 rounded-lg text-sm pl-2 pr-2 mb-4" placeholder="Confirm password"></input>
                        <div className="text-sm flex flex-row mt-4">
                            <div className="pt-0.5">
                                <input type="checkbox" className="w-4 h-4 text-color-checkbox mr-2"></input>
                            </div>
                            I agree the <a href="/" className="font-bold ml-1"> Terms and Conditions</a>
                        </div>
                        <button className="w-96 h-8 bg-color-button text-white text-sm font-bold mt-6 rounded-md">
                            SIGN UP
                        </button>
                    </form> 
                    <span className="w-full h-8 flex justify-center" >Already have an account ? <a href="/" className="font-bold ml-1">Sign in</a></span>
                </div>
            </div>
            <Footer></Footer>
        </div>
     );
}

export default Register;