import {  useEffect, useRef, useState } from "react";
import {DefaultLayout} from "../../Components/Layouts/DefaultLayout.js";
// Rechard
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
        }
        catch(err){
            setSentimentSuccess(false);
        }
    }


    const sentimentFile = async()=>{ 
    
        const filename = file['0'].name;
        const extension = filename.split('.').pop();
        const data = new FormData();
        data.append("user_id",infoUser.user_id);

        console.log(file[0]);
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
            
        }
        catch(err){
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
                                    <div>{
                                        options === "textarea" ?
                                        <div>
                                            {textSentiment ?
                                            <>
                                                <div className="flex flex-col ml-8 pl-12 py-8">
                                                    <div className="text-2xl text-sky-500 font-semibold ">Sentence</div>
                                                    <span className="text-xl p-4  ml-4 font-normal">{text}</span>
                                                    </div> <div className={`${sentiment ? "flex flex-col" : "hidden"} ml-8 pl-12 `}>
                                                    <div className="text-2xl text-sky-500 font-semibold ">Sentiment</div>
                                                    <div className="text-xl p-4 ml-4 font-normal">{sentiment}</div>
                                                </div>
                                            </>
                                            :
                                                <div className="flex justify-center font-bold text-center text-2xl text-sky-500">No Content</div>
                                            }
                                        </div> :
                                        <div>
                                            <div className={`${file && sentimentSuccess?'hidden':"flex flex-col"} justify-center font-bold text-center text-2xl text-sky-500`}>No Content</div>
                                            <div className={`${file && sentimentSuccess ?"flex flex-col" :'hidden'} flex flex-col  justify-center text-center `}>
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