import { useState } from "react";
import { DefaultLayout } from "../../Components/Layouts/DefaultLayout";
import SentenceHistory from "../../Components/SentenceHistory";
import FormAccess from "../../Components/FormAccess";
import FileHistory from "../../Components/FileHistory";

function History() {
    const [dataHistoryText , setDataHistoryText] = useState(null);
    const [deleteClick , setDelete] = useState(false);
    // text sentiment
    const [postCurrent , setpostCurrent] = useState(null);
    const [dataHistoryFile , setDataHistoryFile] = useState(null);
    // file sentiment
    const [fileCurrent , setFileCurrent] = useState(null);

    // const [fileorTextDelete , setFileOrTextDelete] = useState(null);
    // if(fileCurrent !== null ){
    //     setFileOrTextDelete("history");
    // }
    
    // if(postCurrent !== null){
    //     setFileOrTextDelete("historyFile")
    // }
    

    return (
        <div className="w-screen h-screen">
            <DefaultLayout type={"History"}>
                    <div className="w-full h-full p-4">
                        <div className="w-full h-full bg-white flex flex-col">
                            <div className="h-1/2 m-4 flex flex-col">
                                <div className="text-xl font-semibold text-sky-700 ">
                                    Sentence History
                                </div> 
                                {
                                    dataHistoryText === false ?
                                    <div className="w-full grow h-full flex justify-center items-center font-bold text-2xl text-sky-700">
                                        NO HISTORY
                                    </div> :
                                    <div className="w-full grow h-full">
                                        <SentenceHistory 
                                            setDataHistoryText = {setDataHistoryText}
                                            setDelete={setDelete}
                                            setpostCurrent={setpostCurrent}
                                        ></SentenceHistory>
                                    </div>
                                }
                            </div>
                            <div className="h-4 w-full bg-color-background-main"></div>
                            <div className="h-1/2 m-4 flex flex-col">
                                
                                <div className="text-xl font-semibold text-sky-700 ">
                                    File
                                </div> 
                                    {dataHistoryFile===false? 
                                    <div className="w-full grow  flex justify-center items-center font-bold text-2xl text-sky-700 ">
                                        NO HISTORY
                                    </div> :
                                        <div className="w-full grow h-full bg-white">
                                            <FileHistory setDataHistoryFile = {setDataHistoryFile}
                                                        setDelete={setDelete}
                                                        setfileCurrent={setFileCurrent}
                                            >    
                                            </FileHistory>
                                        </div>
                                }
                            </div>
                        </div>
                       
                    </div>
                
            </DefaultLayout> 
            <FormAccess 
                deleteClick={deleteClick} 
                setDelete={setDelete}
                formtype={postCurrent !== null ? "history" : "filehistory"}
                datadelete = {postCurrent !==null ? postCurrent : fileCurrent}
            ></FormAccess>
        </div>
    );
};

export default History;