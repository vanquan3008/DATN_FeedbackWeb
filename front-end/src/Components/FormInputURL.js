import {  faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function FormInputUrl(
    {
        close,
        setCloseForm,
        option="File"
    }
) {
    const  [url , setUrl]  =useState("");
    const ref = useRef();
    const navigator = useNavigate();
    const onClickSentiment = ()=>{
        navigator("/DetailsFiles" , {
            state : {
                url ,
                type : "Url",
                option
            }
        })
    }

    

    return ( 
        <div className={` ${close === true?"hidden" : "flex fixed"} justify-center text-center items-center top-0 left-0  w-screen h-screen bg-color-background `}>
            <div className="w-[664px] flex flex-col h-60 bg-white rounded-xl relative">
                <div className="h-16 flex justify-center items-center text-xl text-color-basic font-medium text-co w-full border-b">
                    INPUT URL
                </div>
                <div className="grow flex flex-row justify-center items-center">
                    <div className="text-black font-medium h-10 p-2">
                        URL
                    </div>
                    <input ref={ref}  type="text" onChange={(e)=>{setUrl(e.target.value)}} className="border outline-none h-10 p-2 w-[400px] rounded-xl"></input>
                </div>
                <div className="flex grow-0 h-16 w-full justify-center items-center ">
                    <button className="h-10 rounded-xl text-white font-normal w-60 bg-blue-500" onClick={onClickSentiment}>Sentiment Analysis</button>
                </div>
                <div className="absolute top-5 right-5 text-color-basic " onClick={()=>{setCloseForm(true)}}>
                    <FontAwesomeIcon className="text-xl" icon={faClose} ></FontAwesomeIcon>
                </div>

            </div>
        </div>
     );
}

export default FormInputUrl;