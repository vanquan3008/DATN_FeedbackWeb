import axios from "axios";
import { useEffect, useState } from "react";

function ResultSentimentText(
    {
        sentimentdetail =""
    }
) {
    const [sentiment ,setSentiment] = useState("");

    // useEffect(() =>{
    //     const senti= async ()=>{
    //         const data = {
    //             text : text
    //         }
    //         const stm = await axios.post("http://127.0.0.1:8000/models/response_score_sentiment" , data);
    //         setSentiment(stm);
    //     };
    //     senti();
            
    // },[text])
    return ( 
        <div className="flex flex-col justify-center items-center h-full">
            <div className="w-52 h-52 rounded-full bg-red-500 flex justify-center items-center  ">
                <div className="w-48 h-48 rounded-full  bg-white z-50 flex justify-center items-center">
                    <div className="text-2xl font-semibold text-red-500 flex justify-center items-center">
                        {sentimentdetail}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultSentimentText;