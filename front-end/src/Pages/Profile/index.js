
import { icons } from "../../Assets/icons/index.js";
import { images } from "../../Assets/images/index.js";
import {DefaultLayout} from "../../Components/Layouts/DefaultLayout.js";
import { useSelector } from 'react-redux'

function Profile() {


    const userLogin = useSelector((state)=> state.auth.login.currentUser)
    const infoUser = userLogin?.userLogin;
    return ( 
       <DefaultLayout type={"Profile"}>
            <div className=" h-full flex flex-col justify-center items-center">
                <div className="h-profile w-11/12  rounded-2xl font-medium  bg-white  shadow-lg shadow-gray-300 opacity-85">
                    {/* Profile */}
                   <div className="flex flex-row justify-between w-full h-full pl-8 pr-8 items-center ">
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
                <div className="grow ">
                    <div>

                    </div>
                    
                </div>
            </div>
       </DefaultLayout>
    );
}

export default Profile;