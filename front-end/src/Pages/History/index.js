import { useState } from "react";
import { DefaultLayout } from "../../Components/Layouts/DefaultLayout";
import SentenceHistory from "../../Components/SentenceHistory";
import FormAccess from "../../Components/FormAccess";
import FileHistory from "../../Components/FileHistory";

function History() {
    const [dataHistoryText , setDataHistoryText] = useState(null);
    const [deleteClick , setDelete] = useState(false);
    const [postCurrent , setpostCurrent] = useState(null);

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
                                            deleteClick={deleteClick}
                                            setDelete={setDelete}
                                            setpostCurrent={setpostCurrent}
                                        ></SentenceHistory>
                                    </div>
                                }
                            </div>
                            <div className="h-4 w-full bg-color-background-main"></div>
                            <div className="h-1/2 m-4">
                                <div className="text-xl font-semibold text-sky-700 ">
                                    File
                                </div> 
                                <div className="w-full h-full bg-white">
                                    <FileHistory>
                                    </FileHistory>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                
            </DefaultLayout> 
            <FormAccess 
                deleteClick={deleteClick} 
                setDelete={setDelete}
                formtype={"history"}
                datadelete = {postCurrent}
            ></FormAccess>
        </div>
    );
};

export default History;