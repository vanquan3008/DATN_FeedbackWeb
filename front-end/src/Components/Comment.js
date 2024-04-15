import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { images } from "../Assets/images";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function Comment() {
    return ( 
        <div className="w-full h-40 py-2">
            <div className="flex flex-row justify-between p-4  ml-4 items-center">
                <div className="flex flex-row items-center">
                    <div className="flex justify-center items-center border w-12 h-12 rounded-full">
                        <img className="w-8 h-8" src={images.imgNoAvtar}></img>
                    </div>
                    <div className="text-base font-medium px-4 text-sky-500">Hello</div>
                </div>
                <div className="pr-4">
                    <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
                </div>
            </div>
            <div className="mx-4 h-auto pl-4">
                qqqqqqqqq sqqqqqq ldasioj doasd sdjaso pjdoap sdopjsao djas spdijaso pdjpoas sdpojas opdjopa ápodj aopjdopa
            </div>
            <div className="flex flex-row p-2 ml-6">
                <div className="text-base text-color-basic p-1">•<span className="pl-2">January 1,2024</span></div> 
                <div className="text-base text-color-basic p-1">•<span className="pl-2 underline ">Edit Comment</span></div>
                <div className="text-base h-auto text-color-basic p-1">•<span className="pl-2 underline ">Delete Comment</span></div>
            </div>
        </div>
     );
}

export default Comment;