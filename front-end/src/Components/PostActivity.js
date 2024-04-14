import { faArrowUpShortWide, faDownload, faFilter, faPen, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function PostActivity({
    setCreatePost
}) {
    
    return (  
        <div className="w-full h-full flex flex-col justify-center items-center p-2 border-2 border-solid bg-white">
            <div className="flex flex-row w-full p-2 ">
                {/* Search */}
                <div className="relative w-full h-10 pr-4">
                    <input className=" w-full h-10 outline-none border-solid border-2 border-sky-300 rounded-xl pl-9 pr-4" placeholder="Search" type="search"></input>
                    <FontAwesomeIcon style={{color:"#00B2EE"}} className={`absolute  bottom-1/2 transform translate-y-1/2 left-3 text-black`} icon={faSearch}></FontAwesomeIcon>
                </div>
                {/* Post */}
                <div className="w-10 h-10 border-solid rounded-xl flex justify-center items-center border-sky-300 border-2 pt"
                    onClick={()=>{
                        setCreatePost(true);
                    }}
                >
                    <FontAwesomeIcon style={{color:"#00B2EE"}} icon={faPen}></FontAwesomeIcon>
                </div>
            </div>

            <div className="flex flex-row items-center w-full p-3"> 
                <div className="pl-2">
                    <FontAwesomeIcon style={{color:"#00B2EE"}} className="w-6 h-6 pr-2" icon={faFilter}></FontAwesomeIcon>
                    <span className="text-black font-medium">Default</span>
                </div>
                <div className="grow text-center">
                    <FontAwesomeIcon style={{color:"#00B2EE"}} className="w-6 h-6 pr-2" icon={faArrowUpShortWide}></FontAwesomeIcon>
                    <span className="text-black font-medium">Sort</span>
                </div>
                <div className="pr-2">
                    <FontAwesomeIcon style={{color:"#00B2EE"}} className="w-6 h-6" icon={faDownload}></FontAwesomeIcon>    
                </div>
            </div>
        </div>
    );
}

export default PostActivity;
