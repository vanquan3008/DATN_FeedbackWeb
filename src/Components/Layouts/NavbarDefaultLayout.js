import { faBell, faGear, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../Assets/icons";

function NavbarDefaultLayout(
    {
        tTitleColor = "text-black",
        type="Dashhboard"
    }
    ) {
    return ( 
        <div className="flex flex-row justify-between  w-full items-center pl-4 h-24 ">
            <div className="text-sm">
                <div className="text-color-basic">
                    Page / <span className={`${tTitleColor}`}>{type}</span>
                </div>
                <h2 className={`text-base font-bold ${tTitleColor}`}>{type}</h2>
            </div>
            <div className="flex flex-row items-center h-full">
                {/* Search */}
                <div className="relative h-10 w-56" >
                    <input className="w-56 h-10  outline-none border-solid border-2 rounded-xl pl-9 pr-4" placeholder="Search" type="search"></input>
                    <FontAwesomeIcon className={`absolute  bottom-1/2 transform translate-y-1/2 left-3 text-black`} icon={faSearch}></FontAwesomeIcon>
                </div>
                <div className="flex flex-row pl-4 pr-4" >
                    <img alt="" className={`w-6 h-6 mr-2  `} src={tTitleColor ==="text-black" ? icons.iconProfileLogin : icons.iconProfileSignUp}></img>
                    <span className={`${tTitleColor}`}>Sign in</span>
                </div>
                <div className="p-2">
                    <FontAwesomeIcon className={`${tTitleColor}`} icon={faGear}></FontAwesomeIcon>
                </div>
                <div className="p-2 mr-10">
                    <FontAwesomeIcon className={`${tTitleColor}`} icon={faBell}></FontAwesomeIcon>
                </div>
            </div>
        </div>
     );
}

export default NavbarDefaultLayout;