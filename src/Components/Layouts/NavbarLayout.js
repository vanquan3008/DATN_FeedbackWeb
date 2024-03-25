
import React from 'react';
import { icons } from '../../Assets/icons';


function Navbar(
    {
        page="login",
        bgColor = "bg-color-navbar-login" , 
        tSubjectColor="text-color-text-subject" , 
        bgDloadColor="bg-color-text-download" ,
        tItemsColor = "text-color-basic",
        tDloadColor="text-white",
    }
) 
{
    return ( 
        <div className={`flex flex-row w-4/5 p-4 ${bgColor} rounded-full absolute  z-10 right-1/2 transform translate-x-1/2 top-4`}
        >
            <div className="font-bold ">
                <span className={`text-sm leading-8 ${tSubjectColor}`}>FeedBack Sentiment </span>
            </div>
            <div className="grow flex items-center justify-center leading-8">
                <a href="/" className={`pl-1 pr-4 flex flex-row ${tItemsColor}`}>
                    {/* <FontAwesomeIcon className='pr-1 text-sm ' icon={faHouse}/> */}
                    <img 
                        alt=''
                        className='pr-1 text-sm' 
                        src={page === "login"?icons.iconDashboardLogin : icons.iconDashboardRgt}
                    />
                     Dashboard  
                </a>
                <a href="/" className={`pl-1 pr-4 flex flex-row ${tItemsColor}`}>
                    {/* <FontAwesomeIcon className='pr-1 text-sm ' icon={faUser}/>    */}
                    <img 
                        alt=''
                        className='pr-1 text-sm' 
                        src={page === "login" ? icons.iconProfileLogin :icons.iconProfileRgt}
                    />
                    Profile  
                </a>
                <a href="/" className={`pl-1 pr-4 flex flex-row ${tItemsColor}`} >
                    {/* <FontAwesomeIcon className='pr-1 text-sm ' icon={faHouse}/> */}
                    <img 
                        alt=''
                        className='pr-1 text-sm' 
                        src={page === "login"?icons.iconSignUpLogin:icons.iconSignUpRgt}
                    />
                    Sign Up 
                </a>
                <a href="/" className={`pl-1 pr-4 flex flex-row ${tItemsColor}`}>
                    {/* <FontAwesomeIcon className='pr-1 text-sm ' icon={faHouse}/> */}
                    <img 
                        alt=''
                        className='pr-1 text-sm' 
                        src={ page === "login"?icons.iconSignInLogin:icons.iconSignInRgt}
                    />
                    Sign in
                </a>
            </div>
            <div className={`flex font-bold ${bgDloadColor} h-8 items-center rounded-2xl p-1`}>
                <span className={`text-xs h-auto p-1 ${tDloadColor}`}>FREE DOWNLOAD</span>
            </div>
       </div> 
    );
}

export default Navbar;