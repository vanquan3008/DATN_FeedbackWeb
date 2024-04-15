import {  useState } from "react";
import {DefaultLayout} from "../../Components/Layouts/DefaultLayout.js";
// Rechard
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

// Data biểu đồ tròn
const data =[
    { name: 'Positive', value: 400 },
    { name: 'Negative', value: 300 },
    { name: 'Neutral', value: 200 },
]
const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

function Home() {
    const [options,setOption] =useState("textarea"); 
    const [textLength , setTextLength] = useState(0);


    const handleChange = (event) => {
        setOption(event.target.value);
    };

    const handleChangeText = (event) => { 
        const textInput = event.target.value;
        setTextLength(textInput.length);
    };

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
                                        <textarea onChange={handleChangeText} maxLength={300} className="w-11/12 h-5/6 border-solid border-2 rounded-xl outline-none p-4"  placeholder="Input sentence ..." autoComplete="off"></textarea>
                                        <div className=" text-color-basic">{textLength} / 300</div>
                                    </div>
                                    :
                                    <div className=" flex justify-center items-center w-11/12 h-5/6 border-solid border-2 rounded-xl ">
                                        <input accept=".json , .xls" className=" outline-none " type={options}></input>
                                    </div>
                                }
                            </div>
                            <div className="flex justify-center ">
                            <button className="w-11/12 h-10 bg-sky-300 mb-10 rounded-lg text-white font-medium hover:opacity-70">Check</button></div>
                        </div>
                        <div className=" w-10"></div>
                        <div className=" m-10 bg-white h-auto rounded-xl border-solid border-2  text-3xl font-bold flex flex-col  w-full overflow-hidden">
                            <div className="text-sky-300 border-b text-center p-8">Result</div>
                            {/* Nội dung */}
                            <div className="grow overflow-y-auto h-full">
                                {/* Phân tích chung */}
                                <div>
                                    <div className="w-full pt-4 pb-4 pl-12">
                                       <label className="border-b-2 font-semibold text-sky-300"> Overview</label>
                                    </div>
                                    <div className="flex flex-col justify-center text-center">
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
                            
                            </div>
                            <button className="bg-sky-300 text-lg text-white font-medium p-1 m-10 float-right rounded-lg">
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