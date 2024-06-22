
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../Assets/icons/index.js";
import { images } from "../../Assets/images/index.js";
import {DefaultLayout} from "../../Components/Layouts/DefaultLayout.js";
import { useSelector } from 'react-redux'
import { faPen } from "@fortawesome/free-solid-svg-icons";
import PostUser from "../../Components/PostUser.js";
import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
    const userLogin = useSelector((state)=> state.auth.login.currentUser)
    const infoUser = userLogin?.userLogin;
    const [listPost , setListPost] = useState([]);

    useEffect(()=>{
        const renderPost = async () =>{
            const  idPost =  {
                "user_id": infoUser?.user_id
            }     
            const list = await axios.post(`http://127.0.0.1:8000/posts/get_all_post_by_userid`,idPost , {
                withCredentials : true, 
                headers : {token : `Bearer ${userLogin.jwt}`}
            });
            setListPost(list.data.message);
        };
        renderPost();
    },[])


    const renderPost = listPost.map((his , index)=>{
        return(
            <PostUser key={index} data={his}></PostUser>
        )
    });

    return ( 
       <DefaultLayout type={"Profile"}>
            <div className=" h-full flex flex-col justify-center items-center">
                <div className="h-profile w-11/12  rounded-2xl font-medium  bg-white  shadow-lg shadow-gray-300 opacity-85">
                    {/* Profile */}
                   <div className="flex flex-row justify-between w-full h-full pl-8 pr-8 py-4 items-center ">
                        <div className="flex flex-row"> 
                            <div className="w-20 h-20 shadow-lg shadow-gray-300 border p-4 rounded-xl ">
                                <img alt="" src={images.imgNoAvtar}></img>
                            </div>
                            <div className="flex flex-col  justify-center pl-2">
                                <span className="text-2xl font-bold ">{infoUser?.fullname}</span>
                                <span className="text-sm text-color-basic">{infoUser?.email}</span>
                            </div>

                        </div>
                        <div className="flex flex-row">
                            <div className="flex flex-row p-2">
                                <img alt="" src={icons.iconSignUpLogin}></img>
                                <span className="text-sm text-color-basic pl-2" >Overview</span>
                            </div>
                            <div className="flex flex-row p-2">
                                <img alt="" src={icons.iconSignInLogin}></img>
                                <span className="text-sm text-color-basic pl-2" >FeedBack</span>
                            </div>
                        </div>
                        
                   </div>
                </div>

                {/* Info */}
                <div className="grow w-full h-full pt-4 pl-16 pr-16 flex flex-row overflow-y-auto ">
                    <div className="w-1/3 h-full rounded-xl  bg-white flex flex-col shadow-sm border-2 shadow-gray-200">
                        <div className="flex flex-row justify-between p-4 border-b ">
                           <div className="text-xl font-medium text-color-basic"> Profile Information</div>
                           <div>
                             <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                           </div>
                        </div>
                        <div className="ml-8 text-base text-color-basic font-normal p-2"> 
                            Full name  : { infoUser?.fullname ?<span className="pl-2">{infoUser?.fullname}</span> : <span className="pl-2">(trống)</span>}
                        </div>
                        <div className="ml-8 text-base text-color-basic font-normal p-2">
                            Age  : <span className="pl-2">(trống)</span>
                        </div>
                        <div className="ml-8 text-base text-color-basic font-normal p-2"> 
                            Email  :{ infoUser?.email ?<span className="pl-2">{infoUser?.email}</span> : <span className="pl-2">(trống)</span>}
                        </div>
                        <div className="ml-8 text-base text-color-basic font-normal p-2"> 
                           Address  : <span className="pl-2">(trống)</span>
                        </div>
                        <div className="ml-8 text-base text-color-basic font-normal p-2"> 
                            Phone  : <span className="pl-2">(trống)</span>
                        </div>
                        
                    </div>
                    <div className="w-2/3 ml-4  bg-white h-full rounded-xl shadow-lg shadow-gray-300 overflow-hidden border-2">
                        <div className="flex flex-row justify-between p-4 border-b ">
                            <div className="text-xl font-medium text-color-basic"> Information Posts</div>
                        </div>
                        <div className="scroll-smooth overflow-auto w-full h-full">
                            {renderPost}
                        </div>
                    </div>
                    
                </div>
            </div>
       </DefaultLayout>
    );
}

export default Profile;