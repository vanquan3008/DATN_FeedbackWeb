import { icons } from "../../Assets/icons";

function Sidebar() {
    return ( 
        <div className="flex flex-col ">
            <div className="flex flex-row p-8 m-2 text-black font-bold text-lg ">
                {/* Logo */}
                <div>
                                              
                </div>
                Sentiment Analysis Tool
            </div>
            <div className="border-b border-opacity-40 w-4/5 m-auto"></div>
            <div className="pl-8 pr-8">
                
                    {/* List page */}
                    <div className="flex flex-col mb-8">
                        <div className="text-sm font-bold text-color-title-main p-4">
                            <h1>PAGES</h1>
                        </div>
                        <div>
                            <div className="flex flex-row p-1.5 w-auto
                                bg-white font-medium 
                                border-solid border
                                shadow-lg shadow-gray-200
                                text-center  items-center rounded-2xl"
                            >
                                <img className="mt-2.5 mr-2" src={icons.iconDashboardPage}></img>
                                <span className="text-sm mt-1.5 mb-1.5">Dashboard</span>
                            </div>
                            <div className="flex flex-row p-1.5 w-auto   text-center  items-center rounded-2xl">
                                <img className="mt-2.5 mr-2" src={icons.iconDashboardPage}></img>
                                <span className="text-sm mt-1.5 mb-1.5">Dashboard</span>
                            </div>
                        </div>
                    </div>
                    {/* List Profile */}
                    <div className="flex flex-col">
                        <div className="text-sm font-bold text-color-title-main p-4 ">
                            <h1>ACCOUNT PAGES</h1>
                        </div>
                        <div>
                            <div className="flex flex-row p-1.5 w-auto  text-center  items-center rounded-2xl">
                                <img className="mt-2.5 mr-2" src={icons.iconDashboardPage}></img>
                                <span className="text-sm mt-1.5 mb-1.5">Dashboard</span>
                            </div>
                            <div className="flex flex-row p-1.5 w-auto  text-center  items-center rounded-2xl">
                                <img className="mt-2.5 mr-2" src={icons.iconDashboardPage}></img>
                                <span className="text-sm mt-1.5 mb-1.5">Dashboard</span>
                            </div>
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