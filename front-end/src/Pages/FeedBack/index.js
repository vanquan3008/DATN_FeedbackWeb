
import CreatePost from "../../Components/CreatePost.js";
import InfoPost from "../../Components/InfoPost";
import { DefaultLayout } from "../../Components/Layouts/DefaultLayout";
import PostActivity from "../../Components/PostActivity.js";

import { useEffect, useState } from "react";
import DetailPost from "../../Components/DetailPost.js";
import axios from "axios";
function FeedBack() {
    const [createPost ,setCreatePost] = useState(false);
    const [currentPost , setCurrentPost] = useState(null);
    // Danh sach post render
    const [listPost , setListPost] = useState([]);

    useEffect(()=>{
        const renderPost = async () =>{
            const listPost = await axios.get('http://127.0.0.1:8000/get_all_post');
            setListPost(listPost.data.list_post);
        };
        renderPost();
    },[])

    const _listPost_line = listPost.map((cur, index) => {
        return listPost[listPost.length - index - 1];
    });
    const renderPostSentiment =  _listPost_line.map((post , index)=>{
        return (
            <InfoPost data={post} key={index} setCurrentPost={setCurrentPost} onClick={currentPost?.id_post ===post?.id_post ? true :false} ></InfoPost>
        )
    })

    //Generate Comment 

    return (
        <div>
        <DefaultLayout type={"FeedBack"}>
            <div className="flex flex-row w-full h-full justify-center   items-center">
                <div className="w-4/12 flex h-full m-2  flex-col">
                    <div className=" w-full ">
                        <PostActivity setCreatePost={setCreatePost}></PostActivity>
                    </div>
                    <div className="bg-white w-full h-full rounded overflow-y-auto "> 
                        {renderPostSentiment}                  
                    </div>
                </div>
                <div className="flex w-8/12 flex-col h-full m-2  grow justify-between ">
                    {/* <div className="w-full h-20 mb-2  bg-white rounded-3xl border-solid border-2">

                    </div> */}
                    <div className=" w-full h-full bg-white rounded-3xl border-solid border-8">
                        <div className="w-full h-full">
                            <DetailPost data = {currentPost} setCreatePost={setCreatePost}></DetailPost>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
        <CreatePost stateCreatePost={createPost} setCreatePost={setCreatePost} >

        </CreatePost>
        </div>
    );
}

export default FeedBack;