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
import CustomTag from "../../Components/CustomTagSentiment";




const COLORS = [ '#00FF00','#FF0000','#808080'];
function DetailFilesSentiment(

) {
    const {state} = useLocation();
    const navigate = useNavigate();
    const [dataSentiment , setDataSentiment] = useState(null);
    const userLogin = useSelector((state)=> state?.auth?.login.currentUser)
    const infoUser = userLogin?.userLogin;
    const [loadingDetail ,setloadingDetail] = useState(false);



    useEffect(() => {
        if (state?.type === "Url") {
            const data = {
                "url": state?.url, 
                "email": infoUser?.email
            };
            const fetchData = async () => {
                try{
                    setloadingDetail(true);
                    let getData;
                    if (state?.option === "Tiki") { // Assuming the other type is Tiki
                        getData = await axios.post("http://127.0.0.1:8000/others/comments_tiki_count_sentiments", data, {
                            withCredentials: true,
                            headers: { token: `Bearer ${userLogin?.jwt}` }
                        });
                    } else if (state?.option === "Shopee") {
                        getData = await axios.post("http://127.0.0.1:8000/others/comments_shopee_count_sentiments", data, {
                            withCredentials: true,
                            headers: { token: `Bearer ${userLogin?.jwt}` }
                        });
                    }
                    
                    if (getData) {
                        setDataSentiment(getData.data);   
                    }
                    setloadingDetail(false);
                }
                catch (e) {
                    setloadingDetail(false)
                }
                
            };
            fetchData();
        }
    }, []);
    
        
    const data =[
        { name: 'Positive',value: dataSentiment?.positive_count},
        { name: 'Negative',value:dataSentiment?.negative_count},
        { name: 'Neutral', value: dataSentiment?.neutral_count},
    ]


    const data_attiture = [
        {
            "name": "Notsure",
            "Attitude": dataSentiment?.attitude_sentiment['not sure'] ?? 0,
          },
          {
            "name": "Like",
            "Attitude": dataSentiment?.attitude_sentiment['liking'] ?? 0,
          },
          {
            "name": "Hate",
            "Attitude": dataSentiment?.attitude_sentiment['hating'] ??0,
          },
          {
            "name": "Love",
            "Attitude": dataSentiment?.attitude_sentiment['loving'] ??0,
          },
          {
            "name": "Desire",
            "Attitude": dataSentiment?.attitude_sentiment['desiring'] ?? 0,
          },
          {
            "name": "Value",
            "Attitude": dataSentiment?.attitude_sentiment['valuing'] ?? 0,
          }
    ]
    const data_emotion = [
        {
            "name": "Notsure",
            "Emotion":dataSentiment?.emotion_sentiment['not sure']??0
        },
        {
          "name": "Angry",
          "Emotion": dataSentiment?.emotion_sentiment['angry']??0
        },
        {
            "name": "Joyful",
            "Emotion": dataSentiment?.emotion_sentiment['joyful']??0
        },
        {
            "name": "Sad",
            "Emotion": dataSentiment?.emotion_sentiment['sad']??0
        },{
            "name": "Fearul",
            "Emotion": dataSentiment?.emotion_sentiment['fearful'] ??0
        },
        {
            "name": "Ashame",
            "Emotion": dataSentiment?.emotion_sentiment['ashame'] ?? 0
        },
        {
            "name": "Pround",
            "Emotion": dataSentiment?.emotion_sentiment['pround'] ?? 0
        },
        {
            "name": "Elated",
            "Emotion": dataSentiment?.emotion_sentiment['elated'] ?? 0
        }
      ]

      console.log(data_attiture)
    
    return (  
        <div className="p-8 w-full flex flex-col h-auto justify-center items-center  bg-color-background-main">
            <NavbarDefaultLayout type="Detail Files Sentiment"></NavbarDefaultLayout>
            <div className="flex flex-col w-full h-full rounded-md py-4">
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
                        Detail Sentiment {state?.type}
                    </div>
                    <div className="w-full h-full ">
                        {/* Row 1 */}
                        <div className="flex flex-row px-10">
                            <div className="flex flex-col bg-white rounded-2xl  w-1/2 mr-4 drop-shadow ">
                                <div className="text-xl font-semibold p-4 ">General information</div>
                                <div>
                                    <div className="text-base font-medium pl-6 pr-8 b h-6 w-full text-color-basic justify-between flex flex-row">
                                        <div className="w-3/5 h-6 flex flex-row pr-12">
                                            <div className="w-48">{state?.type} information :</div> <div className="pl-4 h-6 w-full text-base text-black truncate ">
                                               <a href={state?.url} className="text-blue-400 italic" target="_blank"> {state?.url}</a>
                                            </div>
                                        </div>
                                        <div className="w-2/5 flex flex-row">
                                            <div className="w-32">Date Sentiment :  </div>
                                            <Moment format="LL" className="text-base text-color-basic pl-4">{Date.now()}</Moment>
                                        </div>
                                    </div>
                                </div>    

                                {/* Loading  */}

                            <div class={`flex items-center flex-col  justify-center h-full ${loadingDetail=== true ? "" :"hidden"}`}>
                                                <div class="relative pb-4">
                                                    <div class="h-16 w-16 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                                                    <div class="absolute top-0 left-0 h-16 w-16 rounded-full border-t-8 border-b-8 border-blue-400 animate-spin">
                                                    </div>
                                                </div>
                                                <div className="text-xl text-sky-500">Processing data, please wait a few minutes.</div>
                                            </div>
                                <div className={`flex justify-center ${loadingDetail === true ? "hidden" :""}  flex-col items-center pt-4 w-full h-full`}>
                                   
                                    <div className={`text-xl font-medium `}>Sentiment Review Chart</div>
                                        <ResponsiveContainer width={820} height={300}>
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
                        
                            <div className="flex flex-col bg-white rounded-2xl justify-center items-center  w-1/2  drop-shadow border ">
                                <div className="text-xl font-medium">
                                    <div>Emotion and Attitude Sentiment Count</div>
                                </div>
                                <div>                         
                                    <BarChart width={820} height={350} data={data_emotion}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                        <Bar dataKey="Attitude" fill="#8884d8" />
                                        <Bar dataKey="emotion" fill="#82ca9d" />
                                    </BarChart>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Detail  */}
                    <div className="h-20 text-2xl font-bold p-4 ml-6">
                        Base Emotion
                    </div>
                    <div className="w-full h-full">
                        <div className="flex flex-row px-10 w-full">
                                <div className="flex flex-row bg-white w-full rounded-2xl items-center drop-shadow border justify-between px-20">
                                    {/* Attitude */}
                                    <div class={`flex items-center flex-col justify-center h-[350px] w-full ${loadingDetail=== true ? "" :"hidden"}`}>
                                                <div class="relative pb-4">
                                                    <div class="h-16 w-16 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                                                    <div class="absolute top-0 left-0 h-16 w-16 rounded-full border-t-8 border-b-8 border-blue-400 animate-spin">
                                                    </div>
                                                </div>
                                                <div className="text-xl text-sky-500">Processing data, please wait a few minutes.</div>
                                            </div>

                                    <div className={`flex flex-col p-6 justify-center items-center ${loadingDetail === true ?"hidden":""}`}>
                                        <div className="text-xl font-medium pb-2">
                                            <div>Attitude Sentiment Count</div>
                                        </div>
                                        <div>                         
                                            <BarChart width={700} height={350} data={data_attiture}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                                <Bar dataKey="Attitude" fill="#84ea40" />
                                            </BarChart>
                                        </div>
                                    </div>

                                    <div className={`flex flex-col p-6 justify-center items-center ${loadingDetail === true ?"hidden":""}`}>
                                        <div className="text-xl font-medium pb-2">
                                            <div>Emotion Sentiment Count</div>
                                        </div>
                                        <div>                         
                                            <BarChart width={700} height={350} data={data_emotion}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                                <Bar dataKey="Emotion" fill="#ee9af7" />
                                            </BarChart>
                                        </div>
                                    </div>
                                    
                                </div>
                        </div>
                    </div>

                    {/* Show Comment */}
                    <div className="h-20 text-2xl font-bold p-6 ml-6">
                        Detail Sentence Sentiment
                    </div>
                    <div className="h-full w-full">
                        <div className="flex flex-row px-10 w-full">
                            <div className="my-1 w-full flex flex-row justify-between">
                                <div className="w-10/12 pr-4"> 
                                    <CustomTag border={true} text={"Biến đổi khí hậu đã trở thành  và giao thông vận tải đã tăng cường lượng khí nhà kính trong bầu khí quyển, làm gia tăng hiệu ứng nhà kính và dẫn đến sự ấm lên toàn cầu. Hiệu ứng nhà kính xảy ra khi các khí như carbon dioxide (CO2), methane (CH4), và nitrous oxide (N2O) hấp thụ và phát lại bức xạ nhiệt từ mặt trời, giữ nhiệt trong bầu khí quyển và làm tăng nhiệt độ của Trái Đất."} nameTag={"Implicit"} colorTag={"bg-orange-500"}></CustomTag>
                                </div>
                                <div className="w-1/6"> 
                                    <CustomTag border={true} text={"123"} nameTag={"Implicit"} colorTag={"bg-orange-500"}></CustomTag>
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