import {  useState } from "react";
import {DefaultLayout} from "../../Components/Layouts/DefaultLayout.js";

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
                <div className="grow  flex justify-center ">
                    <div className="flex flex-row rounded-3xl m-4 w-full h-full  justify-between">
                        <div className="w-1/3 h-auto m-10 -mr-10  bg-white rounded-xl border-solid border-2 flex flex-col ">
                            <div className="w-full text-center text-3xl p-8 font-bold text-sky-300">
                                Data
                            </div>
                            <div>
                                <form className="text-xl p-4">
                                    <label className="text-xl text-color-basic font-bold">Choose type data :  </label>
                                    <select id="Data" name="Data" className="border-2 border-solid rounded-xl bg-white text-color-basic" onChange={handleChange}>
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
                        <div className="grow m-10 bg-white rounded-xl border-solid border-2 text-center text-3xl font-bold p-8">
                            <label className="text-sky-300 ">Result</label>
                        </div>
                    </div>
                </div>
            </div>
       </DefaultLayout>
    );
}

export default Home;