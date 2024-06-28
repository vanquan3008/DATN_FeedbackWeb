import { faEllipsis, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { images } from "../Assets/images";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
// Time
import Moment from 'react-moment';
import FormAccess from "./FormAccess";

function DetailPost(
        data,
    ) {
    const [textComment ,setTextComment] = useState("");
    const [listComment ,setListComment] = useState([]);
    const [sentimentPost ,setSentimentPost] = useState(null);
    const [deletePost , setDeletePost] = useState(false);
    const userLogin = useSelector((state)=> state.auth.login.currentUser)
    const infoUser = userLogin?.userLogin;


    const createComment = async (e)=>{
        e.preventDefault();
        const comment =  {
            "user_id" : infoUser.user_id ,
            "id_post": data.data?.id_post,
            "comment_content" : textComment
        }
        await axios.post(`http://127.0.0.1:8000/comments/create_comment_post`,comment);
        window.location.reload();
    }


   useEffect(()=>  {
        if(data.data !== null) {
            const getComment = async () => {
                const  idPost =  {
                    "id_post" : data.data?.id_post
                }
                const comment = await axios.post(`http://127.0.0.1:8000/comments/get_all_comments_on_post`,idPost);
                setListComment(comment.data.comments)

                const sentiment = await axios.post(`http://127.0.0.1:8000/posts/get_sentiment_comments_on_post`,idPost);
                setSentimentPost(sentiment.data.comments)
            }
            getComment();
        }
    },[data] )
    
    const _listComment = listComment.map((cur, index) => {
        return listComment[listComment.length - index - 1];
    });

    const renderComment  =  _listComment.map((comment , index)=>{
        return (
            <Comment  data={comment}></Comment>
        )
    })

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
                                        <div className="px-4 text-base font-medium text-sky-500">{data?.data?.user_post?.fullname}</div>
                                        <div className="p-2">•</div>
                                        <Moment format="LL" className="text-base text-color-basic">{data?.data.date_post}</Moment>
                                    </div>
                                    <div className="p-8">
                                        <FontAwesomeIcon icon={faEllipsis}></FontAwesomeIcon>
                                    </div>
                                </div>
                                {/*  */}
                                <div className="px-8 w-full h-auto font-normal">
                                    {data?.data?.content}
                                </div>{
                                    userLogin?.userLogin.user_id === data.data?.user_post.id?
                                    <div>
                                        <div className="w-full h-14 border-b flex flex-row text-color-basic pl-6">
                                            <div className="p-2 cursor-pointer hover:opacity-60">
                                                Edit Post
                                            </div>
                                            <div className="p-2 cursor-pointer hover:opacity-60 " onClick={()=>{
                                                setDeletePost(true);
                                            }} >
                                                Delete Post
                                            </div>
                                        </div>
                                    </div>:<div>
                                        <div className="w-full h-14 border-b flex flex-row text-color-basic pl-6">
                                                {/* <div className="p-2 cursor-pointer hover:opacity-60">
                                                    Info User
                                                </div> */}
                                                <div className="p-2 cursor-pointer hover:opacity-60 " >
                                                    Detail Post
                                                </div>
                                            </div>
                                    </div>
                                }
                            </div>
                            {/* Comment Post */}
                            <div className="grow overflow-y-auto">
                                {renderComment}
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
                                <button className="bg-sky-300 text-sm w-16 ml-4 rounded-md hover:opacity-60  p-2 font-medium text-white" onClick={createComment}>
                                    Sent
                                </button>
                            </div>
                        </div>
                        <div className="w-1/3"> 
                            <div className="p-4 font-medium text-xl"> 
                                Details 
                            </div>
                            <div className="pl-16 py-4 font-medium text-base text-green-700">
                                Positive : {sentimentPost?.positive }
                            </div>
                            <div className="pl-16 py-4 font-medium text-base text-red-700">
                                Negative : {sentimentPost?.negative}
                            </div>
                            <div className="pl-16 py-4 font-medium text-base text-gray-700">
                                Neutral : {sentimentPost?.neutral}
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

            <FormAccess 
                datadelete={data.data?.id_post} 
                deleteClick={deletePost} 
                setDelete={setDeletePost}
                formtype={"post"}
            ></FormAccess>
        </>
     );
}

export default DetailPost;