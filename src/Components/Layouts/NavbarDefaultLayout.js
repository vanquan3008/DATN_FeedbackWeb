import { faBell, faGear, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../Assets/icons";

function NavbarDefaultLayout() {
    return ( 
        <div className="flex flex-row justify-between h-full w-full items-center pl-4">
            <div className="text-sm">
                <div className="text-color-basic">
                    Page / <span className="text-black">Dashboard</span>
                </div>
                <h2 className="text-base font-bold">Dashboard</h2>
            </div>
            <div className="flex flex-row items-center h-full">
                {/* Search */}
                <div className="relative h-10 w-56" >
                    <input className="w-56 h-10  outline-none border-solid border-2 rounded-xl pl-9 pr-4" placeholder="Search" type="search"></input>
                    <FontAwesomeIcon className="absolute bottom-1/2 transform translate-y-1/2 left-3" icon={faSearch}></FontAwesomeIcon>
                </div>
                <div className="flex flex-row pl-4 pr-4" >
                    <img className="w-6 h-6 mr-2" src={icons.iconProfileLogin}></img>
                    <span>Sign in</span>
                </div>
                <div className="p-2">
                    <FontAwesomeIcon className="w-4 h-4" icon={faGear}></FontAwesomeIcon>
                </div>
                <div className="p-2 mr-10">
                    <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
                </div>
            </div>
        </div>
     );
}

export default NavbarDefaultLayout;