import { faComment, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Moment from "react-moment";

function PostUser(
    data
) {

    return ( 
        <div className="flex flex-row w-full border h-20 border-l-8 border-r-8">
            <div className="flex flex-col w-4/5 py-2 pl-6 justify-center">
                <div className="text-xl text-gray-500 font-semibold truncate">
                    {data?.data.title ? data.data.title :"No title"}
                </div>
                <div className="text-base font-normal truncate text-color-basic ">
                    {data?.data.content ? data.data.content :"No content"}
                </div>
            </div>
            <div className="flex flex-col w-1/5 justify-center">
                <div className="flex flex-row px-2 pt-2 text-base">
                    <div className="flex flex-row pr-4 ">
                        <FontAwesomeIcon icon={faThumbsUp} className="text-xl text-gray-400"></FontAwesomeIcon>
                        1
                    </div>
                    <div className=" flex flex-row">
                        <FontAwesomeIcon icon={faComment} className="text-xl text-gray-400"></FontAwesomeIcon>
                        1
                    </div>
                </div>
                <div className="p-2 text-base text-color-basic">
                    Date Post : 
                    <Moment format="LL" className="italic pl-2">{data?.data.date_post ? data.data.date_post :"1 January , 2024"}</Moment>
                </div>
            </div>
        </div>
    );
}

export default PostUser;