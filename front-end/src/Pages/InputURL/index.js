import { useState } from "react";
import { images } from "../../Assets/images";
import FormInputUrl from "../../Components/FormInputURL";
import { DefaultLayout } from "../../Components/Layouts/DefaultLayout";

function InputURL() {
    const [closeForm , setCloseForm] = useState(true);
    const [option,setOption] = useState("");

    return ( 
        <>
            <DefaultLayout type={"InputURL"}> 
                <div className="flex flex-col p-10 h-full w-full">
                    <div className="h-1/3 flex justify-center m-2 transition ease-in-out delay-150  hover:opacity-60 hover:-translate-y-1 hover:scale-105
                             rounded-3xl text-5xl text-white font-extrabold items-center bg-gradient-to-r from-blue-400 to-blue-700"
                             onClick={()=>{
                                setCloseForm(false);
                                setOption("Tiki")
                             }}
                    >
                        <img alt="" src={images.iconTiki} className="w-28 h-28 rounded-xl mr-4 "></img>
                        TIKI
                    </div>
                    <div className="h-1/3 flex justify-center m-2 transition ease-in-out delay-150 rounded-3xl hover:opacity-60  hover:-translate-y-1 
                    hover:scale-105 text-5xl text-white font-extrabold items-center bg-gradient-to-r from-red-400 to-red-600"
                            onClick={()=>{
                                setCloseForm(false);
                                setOption("Shopee")
                            }}
                    >
                    
                        <img alt="" src={images.iconShopee} className="w-28 h-28 rounded-xl mr-4"></img>
                        SHOPEE
                    </div>
                    <div className="h-1/3 flex justify-center m-2  transition ease-in-out delay-150 rounded-3xl hover:opacity-60 hover:-translate-y-1
                    hover:scale-105 text-5xl text-white font-extrabold items-center bg-gradient-to-r from-pink-400 to-pink-700"
                            onClick={()=>{
                                setCloseForm(false);
                                setOption("Other");
                            }}
                    >
                        URL OTHER ...
                    </div>
                </div>
            </DefaultLayout>
            <FormInputUrl close={closeForm} setCloseForm={setCloseForm}></FormInputUrl>
        </>

        
     );
}

export default InputURL;