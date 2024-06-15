import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faDownload } from "@fortawesome/free-solid-svg-icons";
import NavbarDefaultLayout from "../../Components/Layouts/NavbarDefaultLayout";
import FooterDefaultLayout from "../../Components/Layouts/FooterDefaultLayout";
import ResultSentimentText from "../../Components/ResultSentimetText";
import CustomTag from "../../Components/CustomTagSentiment";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";



  

function DetailSentiment() {
    //const [typeHistory , setTypeHistory] = useState(null);
    const navigate = useNavigate();
    const [implicit , setImplicit] = useState("");
    const [hate ,setHate] = useState("");
    const [odetection ,  setODetection] = useState("");
    const [ idetection , setIDetection] = useState("");
    const [ emotion , setEmotion] = useState("");
    const [sentiment , setSentiment] = useState("");
    const {state} = useLocation();
    const [detailsSen , setDetail] = useState(null);
    useEffect(() =>{
        const Sentiment = async() =>{
            const data = {
                "text" : state
            }
            const Implicit = await axios.post("http://127.0.0.1:8000/models/implicit_sentiment" , data);
            const Hate = await axios.post("http://127.0.0.1:8000/models/hate_detection" , data);
            const odetec = await axios.post("http://127.0.0.1:8000/models/offensive_detection" , data);
            const idetec = await axios.post("http://127.0.0.1:8000/models/irony_detection" , data);
            const emo = await axios.post("http://127.0.0.1:8000/models/emotion_recognition" , data);
            setImplicit(Object(Implicit.data).message)
            setHate(Object(Hate.data).message)
            setODetection(Object(odetec.data).message)
            setIDetection(Object(idetec.data).message)
            setEmotion(Object(emo.data).message)
        }
        Sentiment();
    },[]);


    useEffect(() =>{
        const Sentiment = async () =>{
            const data = {
                "text" : state
            }
            const stm = await axios.post("http://127.0.0.1:8000/models/response_score_sentiment" , data);
            setSentiment(Object(stm.data).message)
           
        }
        Sentiment();
    },[]);

    // useEffect(() =>{
    //     const data = {
    //         "text" : String(state)
    //     }

    //     const Sentiment = async() =>{
            
    //         const detailstm = await axios.post("http://127.0.0.1:8000/models/response_baseaspects" , data);
    //         setDetail(JSON.parse(detailstm.data))
    //         console.log(JSON.parse(detailstm.data.message))
    //     }
    //     Sentiment();
    // },[]);

    // const renderAsp = detailsSen.results.map((data,index)=>{
    //     return(
    //         <div className="py-2 border-b">
    //             <div className="pl-4">
    //                 <CustomTag nameTag={"Sentence"} text={"Hihi"}></CustomTag>
    //                 </div>
    //                     <div className="flex flex-col pl-4">
    //                 <div className="">
    //                     <CustomTag nameTag={"Sentiment"} data={data.sentiment} colorTag={"bg-cyan-500"}></CustomTag>
    //                     </div>
    //                         <div className="flex flex-row">
    //                             <CustomTag nameTag={"Aspect"} colorTag={"bg-yellow-500"}></CustomTag>
    //                         <CustomTag nameTag={"Opinion"} colorTag={"bg-orange-500"}></CustomTag>
    //                     </div>
    //             </div>
    //         </div>
    //     )
    // })
    return (
        <div className="p-8 w-full flex flex-col h-full  bg-color-background-main">
            <NavbarDefaultLayout type="Detail Sentiment"></NavbarDefaultLayout>
            <div className="flex flex-col w-full h-full rounded-md pt-4">
                <div className="w-full h-10 flex flex-row justify-between">
                    <div className="p-2 flex items-center hover:bg-sky-200 hover:rounded-lg hover:text-white " onClick={()=> navigate("/")}>
                        <FontAwesomeIcon icon={faArrowAltCircleLeft} className="pl-2 pr-4"></FontAwesomeIcon>    
                        Back to Home
                    </div>
                    <div className="p-4 flex items-center mr-12">
                        <FontAwesomeIcon icon={faDownload} className="p-4 "></FontAwesomeIcon>
                        Downloads 
                    </div>
                </div>
                <div className="flex flex-col w-full h-full">
                    <div className="h-20 text-2xl font-bold p-4 ml-6">
                        Sentiment Details
                    </div>
                    <div className="w-full h-auto flex flex-row px-10">
                        <div className="w-5/12 mr-2 rounded-2xl bg-white min-h-72 border drop-shadow">
                            <div className="text-xl font-medium border-b items-center justify-center flex p-2"> Sentence </div>
                            <div className="w-full h-full p-4  text-xl font-thin text-color-basic">
                                <span className="w-8 py-1 px-2 h-8 text-base  text-white font-medium bg-sky-500 rounded mr-4">TEXT</span>
                                {state.text}
                            </div>
                        </div>
                        <div className="w-7/12 ml-2  flex flex-col rounded-2xl bg-white h-72 border drop-shadow ">
                            <div className="text-xl font-medium border-b flex items-center justify-center h-12 p-2"> Sentiment </div>
                            <div className="flex h-60  w-full">
                               <div className="w-1/3 h-full flex justify-center items-center pb-4">
                                    <ResultSentimentText sentimentdetail={sentiment}></ResultSentimentText>
                               </div>
                               <div className="w-2/3 h-60 flex flex-col ">
                                    <div className="text-xl font-medium flex py-2 pr-2 border-b" >
                                        Base aspects
                                    </div>
                                    <div className="scroll-smooth overflow-auto">
                                        <div className="py-2 border-b">
                                            <div className="pl-4">
                                                <CustomTag nameTag={"Sentence"}></CustomTag>
                                            </div>
                                            <div className="flex flex-col pl-4">
                                                <div className="">
                                                    <CustomTag nameTag={"Sentiment"} colorTag={"bg-cyan-500"}></CustomTag>
                                                </div>
                                                <div className="flex flex-row">
                                                    <CustomTag nameTag={"Aspect"} colorTag={"bg-yellow-500"}></CustomTag>
                                                    <CustomTag nameTag={"Opinion"} colorTag={"bg-orange-500"}></CustomTag>
                                                </div>
                                            </div>
                                        </div>
                                        {/* {renderAsp} */}
                                    </div>
                               </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-20 text-2xl font-bold p-4 ml-6 ">Hehe</div>
                   <div className="flex flex-col w-full px-10 h-full overflow-y-auto"> 
                        <div className="my-1"><CustomTag border={true} text={implicit} nameTag={"Implicit"} colorTag={"bg-orange-500"}></CustomTag></div>
                        <div className="my-1"><CustomTag border={true} text={hate} nameTag={"Hate Detection"} colorTag={"bg-red-500"}></CustomTag></div>
                        <div className="my-1"><CustomTag border={true} text={odetection} nameTag={"Offensive Detection"} colorTag={"bg-blue-500"}></CustomTag></div>
                        <div className="my-1"><CustomTag border={true} text={idetection} nameTag={"Irony Detection"} colorTag={"bg-cyan-500"}></CustomTag></div>
                        <div className="my-1"><CustomTag border={true} text={emotion} nameTag={"Emotion Recognition"} colorTag={"bg-green-500"}></CustomTag></div>

                    </div>
                </div>
            </div> 
            <FooterDefaultLayout></FooterDefaultLayout>
        </div>
    );
}

export default DetailSentiment;