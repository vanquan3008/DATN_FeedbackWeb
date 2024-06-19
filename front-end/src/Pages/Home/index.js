import {  useEffect, useRef, useState } from "react";
import {DefaultLayout} from "../../Components/Layouts/DefaultLayout.js";
// Rechard
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ResultSentimentText from "../../Components/ResultSentimetText.js";

// Data biểu đồ tròn

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
function capitalizeFirstLetter(str) {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
  }
  
function Home() {
    const [options,setOption] =useState("textarea"); 
    const [textLength , setTextLength] = useState(0);
    const [sentimentSuccess ,setSentimentSuccess] = useState(null);
    const [sentiment ,setSentiment] = useState("");
    const [textSentiment ,setTextSentiment] = useState("");
    const [sentimentF ,setSentimentF] = useState(null);
    const [text ,setText] = useState(null);
    const textRef = useRef();
    const [file ,setFile] = useState(null);
    const navigator = useNavigate();
    const [loading ,setLoading] = useState(false);

    const handleChange = (event) => {
        setOption(event.target.value);
    };


    const handleChangeText = (event) => { 
        const textInput = event.target.value;
        setTextLength(textInput.length);
    };

    const userLogin = useSelector((state)=> state.auth.login.currentUser)
    const infoUser = userLogin?.userLogin;

    useEffect(()=>{
        setSentimentSuccess(false);
    },[options])

    const sentimentText = async ()=>{ 
        let user_id = null;
        if(infoUser?.user_id){
            user_id = infoUser.user_id;
        }

        setText(textRef.current?.value);
        setLoading(true);
        try{
            const text =
            {
                "text" : textRef.current?.value,
                "user_id" : user_id
            }
            const generation_stm = await axios.post('http://127.0.0.1:8000/posts/text_analysis',text);
            setTextSentiment(textRef.current?.value)
            setSentimentSuccess(true);
            setSentiment(capitalizeFirstLetter(generation_stm.data.message));
            setLoading(false);
        }
        catch(err){
            setSentimentSuccess(false);
            setLoading(false);
        }
    }


    const sentimentFile = async()=>{ 
        setLoading(true);
        const filename = file['0'].name;
        const extension = filename.split('.').pop();
        const data = new FormData();
        data.append("user_id",infoUser.user_id);
        try{
           
            if(extension === 'txt'){
                data.append("file",file);
                const generation_stm = await axios.post('http://localhost:8000/posts/txt_analysis',data ,{headers: { "Content-Type": "multipart/form-data" }});
                setSentimentF(generation_stm.data.message)
            }
            else if(extension === 'json'){
                data.append("file[]",file[0]);
                const generation_stm = await axios.post('http://localhost:8000/posts/json_analysis',data,{
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
            });
                setSentimentF(generation_stm.data.message)
            }
            else if(extension === 'csv'){
                data.append("file[]",file[0]);
                const generation_stm = await axios.post('http://localhost:8000/posts/csv_analysis',data ,
                    {headers: {
                         "Content-Type": "multipart/form-data"
                 }
                });
                setSentimentF(generation_stm.data.message)
            }
            setSentimentSuccess(true);
            setLoading(false);
        }
        catch(err){
            setLoading(false);
            setSentimentSuccess(false);
        }
    }


    const data =[
        { name: 'Positive', value:sentimentF?.positive},
        { name: 'Negative', value: sentimentF?.negative },
        { name: 'Neutral', value: sentimentF?.neutral },
    ]
    return ( 
       <DefaultLayout type={"Dashboard"}>
            <div className="flex flex-col w-full h-full">
                <div className="grow  flex justify-center w-full h-full">
                    <div className="flex flex-row rounded-3xl m-4 w-full h-full  justify-between">
                        <div className="w-2/5 h-auto m-10 -mr-10  bg-white rounded-xl border-solid border-2 flex flex-col ">
                            <div className="w-full text-center text-3xl p-8 font-bold text-sky-300 border-b">
                                Data
                            </div>
                            <div>
                                <form className="text-xl p-4">
                                    <label className="text-xl text-color-basic font-bold">Choose type data :  </label>
                                    <select id="Data" name="Data" className="border-2 border-solid rounded-xl bg-white text-color-basic outline-none" onChange={handleChange}>
                                        <option disabled>--- Data type ---</option>
                                        <option value="textarea">Text</option>
                                        <option value="file">File</option>
                                    </select>
                                </form>
                            </div>
                            <div className="grow flex items-center justify-center">
                                {
                                    options === "textarea"?<div className="w-full h-full flex justify-center items-center flex-col">
                                        <textarea ref={textRef} onChange={handleChangeText} maxLength={1000} className="w-11/12 h-5/6 border-solid border-2 rounded-xl outline-none p-4"  placeholder="Input sentence ..." autoComplete="off"></textarea>
                                        <div className=" text-color-basic">{textLength} / 1000</div>
                                    </div>
                                    :
                                    <div className=" flex justify-center items-center w-11/12 h-5/6 border-solid border-2 rounded-xl ">
                                        <input accept=".json , .csv , .txt" label='Upload'  className=" outline-none " onChange={(e)=>{setFile(e.target.files)}} type={options}></input>
                                    </div>
                                }
                            </div>
                            <div className="flex justify-center ">
                                <button className={`w-11/12 h-10 mb-10 rounded-lg text-white font-medium ${textLength === 0 && file ===null  ?"bg-sky-200" :"bg-sky-500 hover:opacity-70" }`} 
                                        onClick={options==="textarea" ? sentimentText :sentimentFile}
                                        disabled={textLength === 0 && file === null ? true : false}
                                >Check</button></div>
                        </div>
                        <div className=" w-10"></div>
                        <div className=" m-10 bg-white h-auto rounded-xl border-solid border-2  text-3xl font-bold flex flex-col  w-full overflow-hidden">
                            <div className="text-sky-300 border-b text-center p-8">Result</div>
                            {/* Nội dung */}
                            <div className="grow overflow-y-auto h-full">
                                {/* Phân tích chung */}
                                <div>
                                    <div className="w-full pt-4 pb-4 pl-12">
                                       <label className="border-b-2 font-semibold text-sky-500"> Overview</label>
                                    </div>
                                    <div className="h-full">{
                                        options === "textarea" ?
                                        <div>
                                            {textSentiment ?
                                            <>
                                                <div className="flex flex-col ml-8 pl-12 py-8">
                                                    <div className="text-2xl text-sky-500 font-semibold ">Sentence</div>
                                                    <span className="text-xl p-4  ml-4 font-normal">{text}</span>
                                                </div> 
                                                <div className={`${sentiment ? "flex flex-col" : "hidden"} mx-8 px-12 `}>
                                                    <div className="text-2xl text-sky-500 font-semibold  float-left">Sentiment</div>
                                                    <div className="w-full h-full flex justify-center items-center">
                                                    {
                                                    loading === false?
                                                    <ResultSentimentText sentimentdetail={sentiment}></ResultSentimentText>
                                                    :
                                                    <div aria-label="Loading..." role="status" class="flex items-center space-x-2 ">
                                                        <svg class="h-20 w-20 animate-spin stroke-sky-500" viewBox="0 0 256 256">
                                                            <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                                                            <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                                                                stroke-width="24"></line>
                                                            <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                                                            </line>
                                                            <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                                                                stroke-width="24"></line>
                                                            <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                                                            </line>
                                                            <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                                                                stroke-width="24"></line>
                                                            <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                                                            <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                                                            </line>
                                                        </svg>
                                                        <span class="text-4xl font-medium text-blue-300">Loading...</span>
                                                    </div>
                                                    }
                                                    </div>
                                                </div>
                                            </>
                                            :
                                                <div className="flex justify-center font-bold text-center text-2xl text-sky-500">No Content</div>
                                            }
                                        </div> :
                                        <div className="h-full">
                                            <div className={`${(file && sentimentSuccess) || loading===true?'hidden':"flex flex-col"} justify-center font-bold text-center text-2xl text-sky-500`}>No Content</div>
                                            <div class={`flex items-center flex-col pt-40 justify-center h-full ${loading=== true ? "" :"hidden"}`}>
                                                <div class="relative pb-4">
                                                    <div class="h-16 w-16 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                                                    <div class="absolute top-0 left-0 h-16 w-16 rounded-full border-t-8 border-b-8 border-blue-400 animate-spin">
                                                    </div>
                                                </div>
                                                <div className="text-xl text-sky-500">Processing data, please wait a few minutes.</div>
                                            </div>

                                            <div className={`${file && sentimentSuccess && loading === false ?"flex flex-col" :'hidden'} flex flex-col  justify-center text-center `}>
                                                <div>Sentiment Review Chart</div>
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
                                        }
                                    </div>
                                </div>
                            
                            </div>
                            <button className="bg-sky-500 hover:opacity-60 text-lg text-white font-medium p-1 m-10 float-right rounded-lg" 
                                disabled={textLength === 0 && file === null ? true : false}
                                onClick={()=>{
                                    if(options === "textarea"){
                                        navigator("/Details" , 
                                        {
                                            state: {
                                                text
                                            }
                                          }
                                        )
                                    }  
                                    else{
                                        navigator("/DetailsFiles")
                                    }
                                }}
                            >
                                Detail 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
       </DefaultLayout>
    );
}

export default Home;