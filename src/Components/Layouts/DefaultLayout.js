import Sidebar from "./SidebarLayout";
import NavbarDefaultLayout from "./NavbarDefaultLayout";
function DefaultLayout({children}) {
    return (  
        <div className="flex flex-row w-screen h-screen bg-color-background-main">
            <div className="w-1/5 ">
                <Sidebar></Sidebar>
            </div>
            <div className="bg-white w-full"> 
                <div className="h-24 bg-color-background-main">
                    <NavbarDefaultLayout></NavbarDefaultLayout>
                </div>
                <div className="rounded-md w-8/12 h-11/12">
                    {children}
                </div>
            </div>
        </div>
    );
}

export  {DefaultLayout};