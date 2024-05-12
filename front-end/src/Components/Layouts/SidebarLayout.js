import { icons } from "../../Assets/icons";
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../Redux/apiRequest";
function Sidebar({type}) {
    const userLogin = useSelector((state)=>
        state.auth.login.currentUser
    )
    const dispatch= useDispatch();
    const navigate = useNavigate();
    
    const handleLogout = (e)=>{
        logOut(dispatch,navigate, userLogin)
    }
    return ( 
        <div className="flex flex-col h-full">
            <div className="flex flex-row p-8 m-2  text-black font-bold text-lg ">
                {/* Logo */}
                <div>
                                              
                </div>
                Sentiment Analysis Tool
            </div>
            <div className="border-b border-opacity-40 w-4/5 m-auto"></div>
            <div className="pl-8 pr-8 h-full overflow-y-auto">
                    {/* List page */}
                    <div className="flex flex-col mb-8 ">
                        <div className="text-sm font-bold text-color-title-main p-4">
                            <h1>PAGES</h1>
                        </div>
                        <div className=" ">
                            <a className={`flex flex-row p-1.5 w-auto hover:bg-sky-200
                                ${type === "Dashboard" ? 'font-medium border-solid border bg-sky-300 text-white shadow-lg shadow-gray-200' :''} text-center  items-center rounded-2xl`} 
                                href="/home"
                            >
                                <img alt="" className="mt-2 mr-2" src={icons.iconDashboardPage}></img>
                                <span className="text-sm mt-1.5 mb-1.5">Dashboard</span>
                            </a>
                            <a className={`flex flex-row p-1.5 w-auto hover:bg-sky-200
                                ${type === "History" ? 'font-medium border-solid border bg-sky-300 text-white shadow-lg shadow-gray-200' :''} 
                                ${userLogin?"" :'hidden'}
                                text-center  items-center rounded-2xl`} 
                                href="/history"
                                
                            >
                                <img alt="" className="mt-2 mr-2" src={icons.iconDashboardPage}></img>
                                <span className="text-sm mt-1.5 mb-1.5">History</span>
                            </a>
                            <a href="/FeedBack" className={`flex flex-row p-1.5 w-auto  hover:bg-sky-200
                             ${type === "FeedBack" ? 'font-medium border-solid border bg-sky-300 text-white shadow-lg shadow-gray-200' :''}
                             ${userLogin?"" :'hidden'}
                            text-center  items-center rounded-2xl`} >
                                <img alt="" className="mt-2 mr-2" src={icons.iconTablePage}></img>
                                <span className="text-sm mt-1.5 mb-1.5">FeedBack</span>
                            </a>

                        </div>
                       
                    </div>
                    <div className="border-b border-opacity-40 w-full m-auto"></div>
                    {/* List Profile */}
                    <div className="flex flex-col">
                        <div className="text-sm font-bold text-color-title-main p-4 ">
                            <h1>ACCOUNT PAGES</h1>
                        </div>
                        <div>
                            <a href="/profile"  className={`flex flex-row p-1.5 w-auto  text-center hover:bg-sky-200
                                        ${type === "Profile" ? 'border-solid border bg-sky-300 text-white shadow-lg shadow-gray-200' :''}
                                        ${userLogin?'':'hidden'}
                                        items-center rounded-2xl`} >
                                <img alt="" className="mt-2 mr-2" src={icons.iconProfilePage}></img>
                                <span className="text-sm mt-1.5 mb-1.5">Profile</span>
                            </a>
                            {/* Logout */}
                            <div className={`flex flex-row p-1.5 w-auto  text-center hover:bg-sky-200  items-center rounded-2xl
                                    ${userLogin?'':'hidden'}
                            `}  onClick={handleLogout}>
                                <img alt="" className="mt-2 mr-2" src={icons.iconSignUpPage}></img>
                                <span className="text-sm mt-1.5 mb-1.5">Logout</span>
                            </div>
                            {/* Login and Register */}
                            <a href="/" className={`flex flex-row p-1.5 w-auto  text-center hover:bg-sky-200 items-center rounded-2xl
                                        ${userLogin ? 'hidden':''}
                            `}>
                                <img alt="" className="mt-2 mr-2" src={icons.iconSignInPage}></img>
                                <span className="text-sm mt-1.5 mb-1.5">Sign In</span>
                            </a>
                            <a href="/register" className={`flex flex-row p-1.5 w-auto  text-center hover:bg-sky-200  items-center rounded-2xl
                                        ${userLogin ? 'hidden':''}
                            `}>
                                <img alt="" className="mt-2 mr-2" src={icons.iconSignUpPage}></img>
                                <span className="text-sm mt-1.5 mb-1.5">Sign Up</span>
                            </a>
                            
                            
                        </div>
                    </div>
                </div>
            {/* Help */}
            <div>

            </div>
        </div>
     );
}

export default Sidebar;