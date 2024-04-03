import { faComment, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function InfoPost({
    onClick = false ,
}) {
    return ( 
        <div className={`flex flex-col w-full p-2 ${onClick === true ? "border-l-8 border-l-sky-300" :"border-l-2"}  border-x border-y`}>
            <div className="text-xl font-bold p-2">
                Title
            </div>
            <div className="text-base text-color-basic w-11/12 truncate break-words p-2">
               aassdsdhsahd shdsahd sadasjdsadkjsadksad skdsadsahd skdsadsadksa
            </div>
            <div className="flex flex-row text-sm p-2">
                <div className="pr-2 text-basic">
                    <FontAwesomeIcon style={{color : "#979797"}} icon={faThumbsUp}></FontAwesomeIcon>
                    <span className="p-1 text-color-basic">0</span>
                </div>
                <div className="pr-2 text-basic">
                    <FontAwesomeIcon style={{color : "#979797"}} icon={faComment}></FontAwesomeIcon>
                    <span className="p-1 text-color-basic">0</span>
                </div>
            </div>
        </div>
        
   );
    
}

export default InfoPost;