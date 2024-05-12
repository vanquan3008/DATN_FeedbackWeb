import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { images } from "../Assets/images";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import InfoPost from "./InfoPost";
import { useRef, useState } from "react";
import { useSelector } from 'react-redux'
import axios from "axios";


function CreatePost(
    {
        stateCreatePost,
        setCreatePost,
        
    }
) {
    const [createPostSuccess,setCreatePostSuccess] = useState(null);
    const userLogin = useSelector((state)=> state.auth.login.currentUser)
    const infoUser = userLogin?.userLogin;
    const wrapRef = useRef();
    const titleRef = useRef();
    const contentRef = useRef();

    // Create post
    const handleCreatePost = async ()=>{
        const createPost ={
            "user_id" : infoUser.user_id,
            "content" :contentRef.current.value,
            "title": titleRef.current.value,
        }
        try{
            await axios.post(`http://127.0.0.1:8000/posts/create_post`, createPost ,{
                withCredentials : true, 
                headers : {token : `Bearer ${userLogin.jwt}`}
            });
            setCreatePost(false);
            setCreatePostSuccess(true);
            window.location.reload();
        }
        catch(e){
            setCreatePostSuccess(false);
        } 
    }


    return ( 
        <div
            ref={wrapRef} 
            className={`fixed justify-center text-center items-center top-0 left-0  w-screen h-screen bg-color-background z-auto ${stateCreatePost === true?"flex" :"hidden"}`}
            onClick={(e)=>{
                if(e.target === wrapRef.current){
                    setCreatePost(false);
                }
            }}
        
        >
            <div className="w-[958px] h-auto relative opacity-100 bg-white rounded-3xl overflow-hidden">
                <div className="w-full h-20 flex items-center pl-4 pr-4 justify-between border border-b ">
                    <div className="flex flex-row p-4 item-center">
                        <div className="border p-2 rounded-full object-contain">
                            <img alt="" src={infoUser?.url_image ? infoUser?.url_image : images.imgNoAvtar} className="w-10 h-10"></img>
                        </div>
                        <span className="text-base p-4 font-medium">
                          {infoUser.fullname}
                        </span>
                    </div>
                    <div className="p-4 hover:opacity-50" onClick={()=>{
                        setCreatePost(false);
                    }}>
                        <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
                    </div>
                </div>
                <div className="w-full h-96 flex flex-row">
                    <div className="flex flex-col h-full justify-start w-1/2 border-r">
                        <div className="px-8 py-4 flex flex-col w-full">
                            <div className="text-start py-3 font-medium text-base">
                                TITLE
                            </div>
                            <input ref={titleRef} type="text" placeholder="Short, descriptive title" className="border-solid border-2 rounded-xl outline-none p-4">

                            </input>
                        </div>
                        <div className="px-8 py-4 flex flex-col w-full">
                            <div className="text-start py-3 font-medium text-base">
                                CONTENT
                            </div>
                            <textarea ref={contentRef} placeholder="Any additional details..." className="border-solid border-2 rounded-xl outline-none p-4 h-40">
                            </textarea>
                        </div>
                    </div>
                    <div className="w-1/2 h-full overflow-hidden">
                        <div className="text-start px-8 py-4 text-base font-normal">
                            OR add their vote to an existing post...
                        </div>
                        <div className="text-start px-8 py-4 text-base font-normal">
                            No post successfully 
                        </div>
                        <div className="w-full overflow-y-auto h-full scroll-p-0 hidden">
                            <InfoPost></InfoPost>
                            <InfoPost></InfoPost>
                            <InfoPost></InfoPost>
                            <InfoPost></InfoPost>
                            <InfoPost></InfoPost>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end items-center w-full h-20 border border-t">
                    <button className=" rounded-xl bg-sky-400 p-4 mr-10 text-white font-bold hover:opacity-40" onClick={handleCreatePost}>CREATE POST</button>
                </div>
            </div>
        </div>
     );
}

export default CreatePost;