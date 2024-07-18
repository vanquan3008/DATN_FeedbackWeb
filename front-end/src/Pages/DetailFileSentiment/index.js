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
import { Pagination, Stack } from "@mui/material";
import Overall from "../../Components/Overall";
import { images } from "../../Assets/images";




const COLORS = [ '#00FF00','#FF0000','#808080'];
function DetailFilesSentiment(

) {
    const {state} = useLocation();
    const navigate = useNavigate();
    const [dataSentiment , setDataSentiment] = useState(null);
    const userLogin = useSelector((state)=> state?.auth?.login.currentUser)
    const infoUser = userLogin?.userLogin;
    const [loadingDetail ,setloadingDetail] = useState(false);

    const [pageCurrent , setPageCurrent] = useState(1);
    const [page ,setPage] = useState(null);
    const [comment ,setComment] = useState([]);
    const [loadingComment ,setLoadingComment] = useState(false);
    const [reportProduct,setReportProduct] = useState({});
    const [reportService,setReportService] = useState({});



    useEffect(()=>{
        if (state?.type === "Url") {
            const data = {
                "url": state?.url
            }
            try{
                let dataReport ;
                const getDataReport = async ()=>{
                    if(state?.option === "Tiki"){
                        dataReport = await axios.post(`http://127.0.0.1:8000/others/comments_tiki_to_report`,data);
                    }
                    else if (state?.option === "Shopee") {
                        dataReport = await axios.post(`http://127.0.0.1:8000/others/comments_shopee_to_report`,data)
                    }
                    setReportProduct(dataReport?.data["Product"]);
                    setReportService(dataReport?.data["Service"]);
                }
                getDataReport()
            }
            catch(err){
                navigate("/Error" ,{
                    state:{
                        error : "Can't get report sentiment from data.",
                    }
                })
            }
        }
        else{
            const file = state.file;
            const reportData = async()=>{ 
                const filename = file['0']?.name;
                const extension = filename.split('.').pop();
                const data = new FormData();
                data.append("email",infoUser?.email);
                try{
                    let dataReport;
                    if(extension === 'txt'){
                        data.append("file[]",file[0]);
                        dataReport = await axios.post('http://localhost:8000/posts/txt_report',data ,{
                            headers: {
                                "Content-Type": "multipart/form-data",
                                "withCredentials": true,
                                "token": `Bearer ${userLogin?.jwt}`
                            }
                        });
                    }
                    else if(extension === 'json'){
                        data.append("file[]",file[0]);
                        dataReport = await axios.post('http://localhost:8000/posts/json_report',data,{
                            headers: {
                                "Content-Type": "multipart/form-data",
                                'Accept': 'application/json',
                                "withCredentials": true,
                                "token": `Bearer ${userLogin?.jwt}`
                            }
                        });
                        
                    }
                    else if(extension === 'csv'){
                        data.append("file[]",file[0]);
                        dataReport = await axios.post('http://localhost:8000/posts/csv_report',data ,
                            {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                    "withCredentials": true,
                                    "token": `Bearer ${userLogin?.jwt}`
                                }        
                            }
                        );
                    }
                    setReportProduct(dataReport?.data["Product"]);
                    setReportService(dataReport?.data["Service"]);
                
                
                }
                catch(err){
                    navigate("/Error" ,{
                        state:{
                            error : "Can't get report sentiment from data."
                        }
                    })
                }
            }
            reportData()

        }
    },[state]);



    // Sentimet
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
                    }
                    else if (state?.option === "Shopee") {
                        getData = await axios.post("http://127.0.0.1:8000/others/comments_shopee_count_sentiments", data, {
                            withCredentials: true,
                            headers: { token: `Bearer ${userLogin?.jwt}` }
                        });
                    }
                    else if( state?.option === "Other"){
                        getData = await axios.post("http://127.0.0.1:8000/ollama_models/comments_count_sentiment_ollama", data, {
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
                    navigate("/Error" ,{
                        state:{
                            error : "Wrong error url or url import not found"
                        }
                    })
                }
                
            };
            fetchData();
        }
        else{
            const file = state.file;
            const sentimentFile = async()=>{ 
                const filename = file['0']?.name;
                const extension = filename.split('.').pop();
                const data = new FormData();
                data.append("user_id",infoUser.user_id);
                try{
                   setloadingDetail(true);
                    if(extension === 'txt'){
                        data.append("file[]",file[0]);
                        const generation_stm = await axios.post('http://localhost:8000/posts/txt_analysis',data ,{headers: { "Content-Type": "multipart/form-data" }});
                        setDataSentiment(generation_stm.data);
                        
                    }
                    else if(extension === 'json'){
                        data.append("file[]",file[0]);
                        const generation_stm = await axios.post('http://localhost:8000/posts/json_analysis',data,{
                            'Accept': 'application/json',
                            'Content-Type': 'multipart/form-data',
                        });
                        setDataSentiment(generation_stm.data);
                    }
                    else if(extension === 'csv'){
                        data.append("file[]",file[0]);
                        const generation_stm = await axios.post('http://localhost:8000/posts/csv_analysis',data ,
                            {
                                headers: {
                                 "Content-Type": "multipart/form-data"
                            }
                        });
                        setDataSentiment(generation_stm.data)
                    }
                    setloadingDetail(false);
                
                }
                catch(err){
                    navigate("/Error" ,{
                        state:{
                            error : "Wrong error file or file port not found"
                        }
                    })
                }
            }
            sentimentFile();
        }
    }, []);
    



    useEffect(()=>{
        if (state?.type === "Url") {
            const data = {
                "url": state?.url, 
                "email": infoUser?.email
            };
            const fetchData = async () => {
                try{
                    setLoadingComment(true);
                    let getData;
                    if (state?.option === "Tiki") { 
                        getData = await axios.post(`http://127.0.0.1:8000/others/comments_tiki_analysis?page=${pageCurrent}`, data, {
                            withCredentials: true,
                            headers: { token: `Bearer ${userLogin?.jwt}` }
                        });
                    }
                    else if (state?.option === "Shopee") {
                        getData = await axios.post(`http://127.0.0.1:8000/others/comments_shopee_analysis?page=${pageCurrent}`, data, {
                            withCredentials: true,
                            headers: { token: `Bearer ${userLogin?.jwt}` }
                    });
                    }
                    else if(state?.option === "Other"){
                        getData = await axios.post(`http://127.0.0.1:8000/ollama_models/comments_detail_sentiment_ollama?page=${pageCurrent}`, data, {
                            withCredentials: true,
                            headers: { token: `Bearer ${userLogin?.jwt}` }
                    });
                    }
                    setComment(getData.data['sentiment_detail_comments'])
                    setPage(getData.data['page']);
                    setLoadingComment(false);
                }
                catch (err) {
                    setLoadingComment(false)
                    navigate("/Error" ,{
                        state:{
                            error : "Wrong error url or url import not found"
                        }
                    })
                }
            }
            fetchData();
        }
        else{
            const file = state.file;
            const GenerateComment = async()=>{ 
                const filename = file['0'].name;
                const extension = filename.split('.').pop();
                const data = new FormData();
                data.append("user_id",infoUser.user_id);
                try{
                   setLoadingComment(true);
                    if(extension === 'txt'){
                        data.append("file[]",file[0]);
                        const commentFile = await axios.post('http://localhost:8000/posts/txt_detail_analysis',data ,{headers: { "Content-Type": "multipart/form-data" }});
                        setComment(commentFile.data['sentiment_detail_comments'])
                        setPage(commentFile.data['page']);
                    }
                    else if(extension === 'json'){
                        data.append("file[]",file[0]);
                        const commentFile = await axios.post('http://localhost:8000/posts/json_detail_analysis',data,{
                            'Accept': 'application/json',
                            'Content-Type': 'multipart/form-data',
                        });
                        setComment(commentFile.data['sentiment_detail_comments'])
                        setPage(commentFile.data['page']);
                    }
                    else if(extension === 'csv'){
                        data.append("file[]",file[0]);
                        const commentFile = await axios.post('http://localhost:8000/posts/csv_detail_analysis',data ,
                            {headers: {
                                 "Content-Type": "multipart/form-data"
                         }
                        });
                        setComment(commentFile.data['sentiment_detail_comments'])
                        setPage(commentFile.data['page']);
                    }
                    setLoadingComment(false);
                }
                catch(err){
                   setLoadingComment(false);
                   navigate("/Error" ,{
                    state:{
                        error : "Wrong error file or file port not found"
                    }})
                }
            }

            GenerateComment();
        }
    },[pageCurrent]);
    const handleChange = (event, value) => {
        setPageCurrent(value);
    };



    const colorTagComment = {
        
            'Strong negative' :'bg-red-600',
            'Negative': 'bg-red-500',
            'Light negative':'bg-red-400',
            'Neutral negative' :'bg-red-300',
            'Neutral' : 'bg-gray-500',
            'Neutral positive' :' bg-green-300',
            'Light positive' :'bg-green-400',
            'Positive' : 'bg-green-500',
            'Strong positive' :'bg-green-600'
        
    }

    
    const renderComment = comment.map((value ,index)=>{
        return(
            <div className={`flex flex-row px-10 w-full `}>
                <div className={`my-1 w-full flex flex-row drop-shadow rounded-sm  border-spacing-y-0.5 justify-between ${loadingComment === true ? "hidden" :""}`}>
                    <div className="w-10/12 pr-4"> 
                        <CustomTag border={true}  text={value?.text} nameTag={"Text"} ></CustomTag>
                            </div>
                        <div className="w-2/12"> 
                        <CustomTag border={true} text={""} nameTag={value?.sentiment} colorTag={colorTagComment[value?.sentiment]}></CustomTag>
                    </div>
                </div>
            </div>
        );
    })
        
    const data =[
        { name: 'Positive',value: dataSentiment?.positive_count},
        { name: 'Negative',value:dataSentiment?.negative_count},
        { name: 'Neutral', value: dataSentiment?.neutral_count},
    ]

    const dataDetailSentiment = [ 
        {
            "name": "S_Pos",
            "S-Pos": dataSentiment?.detail_sentiment['strong_positive'] ?? 0,
          },
        {
            "name": "Positive",
            "Pos": dataSentiment?.detail_sentiment['positive'] ?? 0,
          }
          ,{
            "name": "L-Pos",
            "L-Pos": dataSentiment?.detail_sentiment['light_positive'] ?? 0,
          }, 
          {
            "name": "N-Pos",
            "N-Pos": dataSentiment?.detail_sentiment['neutral_positive'] ?? 0,
          },
         
          {
            "name": "Neutral",
            "Neu": dataSentiment?.detail_sentiment['neutral'] ??0,
          }, 
          {
            "name": "N-Neg",
            "N-Neg": dataSentiment?.detail_sentiment['neutral_negative'] ?? 0,
          },
         {
            "name": "L-Neg",
            "L-Neg": dataSentiment?.detail_sentiment['light_negative'] ?? 0,
          },
          
           {
            "name": "Negative",
            "Neg": dataSentiment?.detail_sentiment['negative'] ?? 0,
          },

          {
            "name": "S-Neg",
            "S-Neg": dataSentiment?.detail_sentiment['strong_negative'] ??0,
          },
         
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
                                            <div className="w-48">{state?.type} information :</div>
                                             <div className="pl-4 h-6 w-full text-base text-black truncate ">
                                                {state.type ==="File"? <div className="text-blue-400 italic">{state?.file[0].name}</div>:
                                               <a href={state?.url} className="text-blue-400 italic" target="_blank"> {state?.url}</a>}
                                            </div>
                                        </div>
                                        <div className="w-2/5 flex flex-row">
                                            <div className="w-32">Date Sentiment :  </div>
                                            <Moment format="LL" className="text-base text-color-basic pl-4">{Date.now()}</Moment>
                                        </div>
                                    </div>
                                </div>    

                                {/* Loading  */}

                            <div class={`flex items-center flex-col  justify-center h-[350px] ${loadingDetail=== true ? "" :"hidden"}`}>
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
                                <div class={`flex items-center flex-col h-[350px]  justify-center  ${loadingDetail=== true ? "" :"hidden"}`}>
                                    <div class="relative pb-4">
                                        <div class="h-16 w-16 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                                            <div class="absolute top-0 left-0 h-16 w-16 rounded-full border-t-8 border-b-8 border-blue-400 animate-spin">
                                            </div>
                                        </div>
                                    <div className="text-xl text-sky-500">Processing data, please wait a few minutes.</div>
                                </div>
                                <div className={`text-xl font-medium ${loadingDetail !== true ? "" :"hidden"}`}>
                                    <div>Sentiment Count</div>
                                </div>
                                <div className={`text-xl font-medium ${loadingDetail !== true ? "" :"hidden"}`}>                         
                                    <BarChart width={820} height={350} data={dataDetailSentiment}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend /> 
                                        <Bar dataKey="S-Neg" fill="#FF0000" stackId="a" />
                                        <Bar dataKey="Neg" fill="#f8321e" stackId="a" />
                                        <Bar dataKey="L-Neg" fill="#f56e60" stackId="a" />
                                        <Bar dataKey="N-Neg" fill="#f56e60" stackId="a" />
                                        <Bar dataKey="Neu" fill="#808080" stackId="a" />
                                        <Bar dataKey="L-Pos" fill="#67f951" stackId="a" />
                                        <Bar dataKey="N-Pos" fill="#82ca9d" stackId="a" />
                                        <Bar dataKey="Pos" fill="#3af81e" stackId="a" />
                                        <Bar dataKey="S-Pos" fill="#00FF00" stackId="a" />
                                    </BarChart>
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* Overall */}
                    <div className="w-full h-full px-10 py-4">

                        <div className="flex flex-col px-6 6 bg-white  drop-shadow border p-4 mb-4 rounded-2xl">
                            <div className="flex flex-row font-normal text-base items-center pb-2">
                                <div className="underline text-base  items-center font-medium text-blue-500 flex flex-row px-2">
                                    <img alt="" src={images.iconAI} className="w-8 bg-white"></img >
                                    Trợ lý AI 
                                </div>
                                <span className="italic">Đánh giá tổng quan bình luận người dùng</span>
                            </div>
                            <div className="flex flex-row">
                                <Overall report={reportProduct} >
                                </Overall>
                                <Overall report={reportService} >
                                </Overall>
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

                                    <div className={`flex flex-col p-6  justify-center items-center ${loadingDetail === true ?"hidden":""}`}>
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
                        <div className="h-full w-full flex flex-col items-center justify-center">
                            <div class={`border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600 ${loadingComment === true ? "" :"hidden"}`} />
                        
                            {/*  */}
                            {renderComment}
                        </div>
                        <div className="w-full text-2xl  flex justify-end items-center py-4 pr-20">
                        <Stack spacing={pageCurrent}>
                            <Pagination count={page}  color="primary" onChange={handleChange}/>
                        </Stack>
                    </div>
                    </div>
                </div>
            </div>
            <FooterDefaultLayout></FooterDefaultLayout>
        </div>
    );
}

export default DetailFilesSentiment;