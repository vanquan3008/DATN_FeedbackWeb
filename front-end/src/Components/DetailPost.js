import { faEllipsis, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { images } from "../Assets/images";
import Comment from "./Comment";
import { useState } from "react";

function DetailPost(
        data
    ) {
    const [textComment ,setTextComment] = useState("");


    return (
        <>{
         data.data  ? 
            <div className="w-full h-full " >
                <div className="h-full w-full flex flex-col  ">
                    <div className="flex border-b h-16 w-full flex-row items-center p-4">
                        <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                        <div className="pl-4 font-medium text-xl" >
                            {data?.data?.title ? data?.data?.title : "No title"}
                        </div>
                    </div>
                    <div className="grow h-full overflow-hidden flex flex-row">
                        <div className="border-r w-2/3 h-full flex flex-col ">
                            {/* Content Post */}
                            <div className="w-full h-auto">
                                <div className="flex flex-row  items-center w-full h-24 p-4 ml-4 justify-between">
                                    <div className="flex flex-row items-center">
                                        <div className=" w-12 h-12 rounded-full border flex items-center justify-center object-contain" >
                                            <img alt="" className="w-8 h-8 " src={images.imgNoAvtar}></img>
                                        </div>
                                        <div className="px-4 text-base font-medium text-sky-500">Văn Quân</div>
                                        <div className="p-2">•</div>
                                        <div className="text-base text-color-basic">6h</div>
                                    </div>
                                    <div className="p-8">
                                        <FontAwesomeIcon icon={faEllipsis}></FontAwesomeIcon>
                                    </div>
                                </div>
                                {/*  */}
                                <div className="px-8 w-full h-auto font-normal">
                                    {data?.data?.content}
                                </div>
                                <div className="w-full h-14 border-b flex flex-row text-color-basic pl-6">
                                    <div className="p-2">
                                        Edit Post
                                    </div>
                                    <div className="p-2">
                                        Delete Post
                                    </div>
                                </div>
                            </div>
                            {/* Comment Post */}
                            <div className="grow overflow-y-auto">
                                <Comment></Comment>
                                <Comment></Comment>
                                <Comment></Comment>
                                <Comment></Comment>
                                <Comment></Comment>
                                <Comment></Comment>
                            </div>
                            {/* Writing Comment */}
                            <div className="flex flex-row p-2 rounded-b-3xl items-center border-t">
                                <div className=" w-12 h-12 rounded-full border flex items-center justify-center mr-2 object-contain" >
                                    <img alt="" className="w-8 h-8 " src={images.imgNoAvtar}></img>
                                </div>
                                <input type="text"
                                    onChange={(e)=>{ setTextComment(e.target.value)}} 
                                    className="grow outline-none" max={300} placeholder="Comment..."></input>
                                <div className="text-sm text-color-basic">{textComment.length}/300</div>
                                <button className="bg-sky-300 text-sm w-16 ml-4 rounded-md hover:opacity-60  p-2 font-medium text-white">
                                    Sent
                                </button>
                            </div>
                        </div>
                        <div className="w-1/3"> 
                            <div className="p-8 font-medium text-xl"> 
                                Details 
                            </div>
                            <div>

                            </div>

                        </div>
                    </div>
                
                </div>
                
            </div> :
            <div className="flex flex-col w-full h-full justify-center items-center">
                <div className="text-2xl text-sky-500 font-medium pb-4">CREATE A NEW POST</div>
                <div>
                    <div className="text-base bg-sky-300 rounded-xl text-white p-3 font-medium hover:opacity-60">CREATE POST</div>
                </div>
            </div>
        }
        </>
     );
}

export default DetailPost;