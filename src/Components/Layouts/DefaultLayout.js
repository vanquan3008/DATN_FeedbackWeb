import Sidebar from "./SidebarLayout";
import NavbarDefaultLayout from "./NavbarDefaultLayout";
import { bg_image } from "../../Assets/images";
import { useEffect, useState } from "react";
import FooterDefaultLayout from "./FooterDefaultLayout";
function DefaultLayout({children , type}) {
    const [height, setHeight] = useState(0);
    useEffect(() => {
        const img = document.getElementById('bg-profile');
        setHeight(img.clientHeight - 96);
    }, []);

    return (  
        <div className="flex flex-row w-screen h-screen bg-color-background-main ">
            <div className="w-1/4 h-full ">
                <Sidebar type={type}></Sidebar>
            </div>
           
            <div className="w-full relative flex flex-col"> 
                <div className={`${type==="Profile" ? "" :"hidden"} absolute z-0 rounded-xl`}>
                    <img id="bg-profile" alt="" src={bg_image.bgProfileImage}></img>
                </div>
                <div  className={`${type==="Profile" ? "relative bg-transparent " :"bg-color-background-main"} flex-grow-0`}>
                    <NavbarDefaultLayout tTitleColor={type === "Profile"?"text-white":"text-black"} type={type}></NavbarDefaultLayout>
                </div>
                <div className={`rounded-md w-full h-full grow ${type==="Profile" ? "relative -top-14 " :""} `} style={{paddingTop: `${type === "Profile" ? height + 'px' : ''}`}}>
                    {children}
                </div>

                <FooterDefaultLayout></FooterDefaultLayout>
            </div>
        </div>
    );
}

export  {DefaultLayout};