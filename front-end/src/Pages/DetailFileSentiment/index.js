import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavbarDefaultLayout from "../../Components/Layouts/NavbarDefaultLayout";
import { faArrowAltCircleDown, faArrowAltCircleLeft, faDownload } from "@fortawesome/free-solid-svg-icons";
import FooterDefaultLayout from "../../Components/Layouts/FooterDefaultLayout";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend,Bar,XAxis,YAxis,Tooltip,BarChart,CartesianGrid } from 'recharts';
import { useLocation, useNavigate } from "react-router-dom";
import Moment from "react-moment";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";




const COLORS = [ '#00FF00','#FF0000','#808080'];
function DetailFilesSentiment(

) {

    const {state} = useLocation();
    const navigate = useNavigate();
    const [dataSentiment , setDataSentiment] = useState(null);
    const userLogin = useSelector((state)=> state.auth.login.currentUser)
    const infoUser = userLogin?.userLogin;
    const [loading ,setloading] = useState(false);



    useEffect(() => {
        if (state?.type === "Url") {
            const data = {
                "url": state?.url, 
                "email": infoUser?.email
            };
            setloading(true);
            const fetchData = async () => {
                let getData;
                if (state?.option === "Tiki") { // Assuming the other type is Tiki
                    getData = await axios.post("http://127.0.0.1:8000/others/comments_tiki_analysis", data, {
                        withCredentials: true,
                        headers: { token: `Bearer ${userLogin?.jwt}` }
                    });
                } else if (state?.option === "Shopee") {
                    getData = await axios.post("http://127.0.0.1:8000/others/comments_shopee_analysis", data, {
                        withCredentials: true,
                        headers: { token: `Bearer ${userLogin?.jwt}` }
                    });
                }
                
                if (getData) {
                    setDataSentiment(getData.data);   
                }
                
            };
    
            fetchData();
            
        }
        setloading(false);
    }, [state]);
    

        
    const data =[
        { name: 'Positive',value: dataSentiment?.positive_count},
        { name: 'Negative',value:dataSentiment?.negative_count},
        { name: 'Neutral', value: dataSentiment?.neutral_count},
    ]

    console.log(loading);

    const data_emotion = [
        {
          "name": "Notsure",
          "attitude": dataSentiment?.attitude_sentiment['not sure'] ?? 0,
          "emotion":dataSentiment?.emotion_sentiment['not sure']??0
        },
        {
          "name": "Like",
          "attitude": dataSentiment?.attitude_sentiment['liking'] ?? 0,
        },
        {
          "name": "Hate",
          "attitude": dataSentiment?.attitude_sentiment['hating'] ??0,
        },
        {
          "name": "Love",
          "attitude": dataSentiment?.attitude_sentiment['loving'] ??0,
        },
        {
          "name": "Desire",
          "attitude": dataSentiment?.attitude_sentiment['desiring'] ?? 0,
        },
        {
          "name": "Value",
          "attitude": dataSentiment?.attitude_sentiment['valuing'] ?? 0,
        },
        {
          "name": "Angry",
          "emotion": dataSentiment?.emotion_sentiment['angry']??0
        },
        {
            "name": "Joyful",
            "emotion": dataSentiment?.emotion_sentiment['joyful']??0
        },
        {
            "name": "Sad",
            "emotion": dataSentiment?.emotion_sentiment['sad']??0
        },{
            "name": "Fearul",
            "emotion": dataSentiment?.emotion_sentiment['fearful'] ??0
        },
        {
            "name": "Ashame",
            "emotion": dataSentiment?.emotion_sentiment['ashame'] ?? 0
        },
        {
            "name": "Pround",
            "emotion": dataSentiment?.emotion_sentiment['pround'] ?? 0
        },
        {
            "name": "Elated",
            "emotion": dataSentiment?.emotion_sentiment['elated'] ?? 0
        }
      ]
    return (  
        <div className="p-8 w-full flex flex-col h-screen justify-center items-center  bg-color-background-main">
            <NavbarDefaultLayout type="Detail Files Sentiment"></NavbarDefaultLayout>
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
                <div className="w-full h-full">
                    <div className="h-20 text-2xl font-bold p-4 ml-6">
                        Detail Sentiment {state.type}
                    </div>
                    <div className="w-full h-full pt-20">
                        <div className="flex flex-row px-10">
                            <div className="flex flex-col bg-white rounded-2xl  w-1/2 mr-4 drop-shadow ">
                                <div className="text-xl font-semibold p-4 ">General information</div>
                                <div>
                                <div className=" text-base font-medium pl-6 pr-8 b h-6 w-full text-color-basic justify-between flex flex-row">
                                    <div className="w-3/5 h-6 flex flex-row pr-12">
                                        <div className="w-48">{state.type} information :</div> <div className="pl-4 h-6 w-full text-base text-black truncate ">{state.url}</div>
                                    </div>
                                    <div className="w-2/5 flex flex-row">
                                        <div className="w-32">Date Sentiment :  </div>
                                        <Moment format="LL" className="text-base text-color-basic pl-4">{Date.now()}</Moment>
                                    </div>
                                </div>
                                </div>


                                <div class={`flex items-center flex-col pt-5 justify-center h-full ${loading=== true ? "" :"hidden"}`}>
                                    <div class="relative pb-4">
                                        <div class="h-16 w-16 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                                            <div class="absolute top-0 left-0 h-16 w-16 rounded-full border-t-8 border-b-8 border-blue-400 animate-spin">
                                            </div>
                                        </div>
                                    <div className="text-xl text-sky-500">Processing data, please wait a few minutes.</div>
                                </div>
                                

                                <div className={`flex justify-center ${loading === true ? "hidden" :""}  flex-col items-center pt-4 w-full h-full`}>
                                   
                                    <div className={`text-xl font-medium `}>Sentiment Review Chart</div>
                                        <ResponsiveContainer width="100%" height={300}>
                                            <PieChart>
                                            <Pie
                                                data={data}
                                                dataKey="value"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={80}
                                                fill="#8884d8"
                                                label
                                            >
                                            {data.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                            <Legend />
                                            </PieChart>
                                        </ResponsiveContainer>
                                </div>
                            </div>
                            <div className="flex flex-col bg-white rounded-2xl justify-center items-center  w-1/2 ml-2 drop-shadow border ">
                                <div className="text-xl font-medium">
                                    <div>Emotion and Attitude Sentiment Count</div>
                                </div>
                                <div className="">                         
                                    <BarChart width={820} height={350} data={data_emotion}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                        <Bar dataKey="attitude" fill="#8884d8" />
                                        <Bar dataKey="emotion" fill="#82ca9d" />
                                    </BarChart>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterDefaultLayout></FooterDefaultLayout>
        </div>
    );
}

export default DetailFilesSentiment;