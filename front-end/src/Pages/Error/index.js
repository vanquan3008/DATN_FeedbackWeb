
import { useLocation, useNavigate } from "react-router-dom";
import NavbarDefaultLayout from "../../Components/Layouts/NavbarDefaultLayout";
import { faArrowAltCircleDown, faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ErrorPage() {
    const {state} = useLocation();
    const navigate = useNavigate();

    return ( 
       <div className="h-full w-full p-10">
            <NavbarDefaultLayout type={"Error"}>
                
            </NavbarDefaultLayout>
            <div className="w-full h-10 flex flex-row justify-between">
                    <div className="p-2 flex items-center  hover:bg-sky-200 hover:rounded-lg hover:text-white cursor-pointer " onClick={()=> navigate("/")}>
                        <FontAwesomeIcon icon={faArrowAltCircleLeft} className="pl-2 pr-4"></FontAwesomeIcon>    
                        Back to Home
                    </div>
                </div>
            <div class="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 h-full items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
                <div class="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
                    <div class="relative">
                        <div class="absolute">
                            <div class="">
                                <h1 class="my-2 text-gray-800 font-bold text-2xl">
                                    Looks like you've found the
                                    doorway to the great nothing
                                </h1>
                                <h1 class="my-2 text-red-600 font-medium text-xl">
                                    Error : {state.error}
                                </h1>
                                <p class="my-2 text-gray-800">Sorry about that! Please visit our hompage to get where you need to go.</p>
                                <button class="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50" onClick={()=> navigate("/")}>HomePage!</button>
                            </div>
                        </div>
                        <div>
                            <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
                        </div>
                    </div>
                </div>
                <div>
                    <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
            </div>
            </div>
       </div>
    );
}

export default ErrorPage;