import { faChevronLeft, faChevronRight, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SentenceHistory() {
    return (
        <div className="w-full h-full flex flex-col ">
            <div className="flex flex-row w-full h-12 border-b items-center">
                <div className="text-color-basic font-normal text-base w-1/12 text-center">
                    STT
                </div>
                <div className="text-color-basic font-normal text-base  w-5/12 text-center">
                    Sentence
                </div>
                <div className="text-color-basic font-normal text-base  w-1/2 justify-between text-center flex flex-row">
                    <div className="p-4 w-1/4">
                        Sentiment
                    </div>
                    <div className="p-4 w-1/4">
                        DateTime
                    </div>
                    <div className="p-4 w-1/4">

                    </div>
                    <div className="p-4 w-1/4">
                    
                    </div>
                </div>
            </div>
            <div className="grow w-full ">
                {/*  */}
                <div className="flex flex-grow h-12 w-full text-center items-center border-b">
                    <div className="w-1/12 "> 1 </div>
                    <div className="w-5/12  text-base text-color-basic text-start"> 
                        <div className="max-w-80  overflow-hidden truncate ">
                            111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
                        </div> 
                   </div>
                    <div className="text-color-basic font-normal text-base  w-1/2 justify-between text-center flex flex-row">
                        <div className="p-4 w-1/4 text-red-500 font-semibold">
                            Negative
                        </div>
                        <div className="p-4 w-1/4">
                            January 1, 2024
                        </div>
                        <div className=" w-1/4 flex items-center justify-center  ">
                            <button className="text-white font-semibold text-xs rounded-xl w-16 h-9 bg-sky-500">DETAIL</button>
                        </div>
                        <div className=" w-1/4 flex items-center justify-center  ">
                            <button className="text-white font-semibold text-xs rounded-xl  w-16 h-9 bg-red-500">DELETE</button>
                        </div>
                    </div>
                </div>
{/*  */}
                <div className="flex flex-grow h-12 w-full text-center items-center border-b">
                    <div className="w-1/12 "> 1 </div>
                    <div className="w-5/12  text-base text-color-basic text-start"> 
                        <div className="max-w-80  overflow-hidden truncate ">
                            111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
                        </div> 
                   </div>
                    <div className="text-color-basic font-normal text-base  w-1/2 justify-between text-center flex flex-row">
                        <div className="p-4 w-1/4 text-green-500 font-semibold">
                            Positive
                        </div>
                        <div className="p-4 w-1/4">
                            January 1, 2024
                        </div>
                        <div className=" w-1/4 flex items-center justify-center  ">
                            <button className="text-white font-semibold text-xs rounded-xl w-16 h-9 bg-sky-500">DETAIL</button>
                        </div>
                        <div className=" w-1/4 flex items-center justify-center  ">
                            <button className="text-white font-semibold text-xs rounded-xl  w-16 h-9 bg-red-500">DELETE</button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-grow h-12 w-full text-center items-center border-b">
                    <div className="w-1/12 "> 1 </div>
                    <div className="w-5/12  text-base text-color-basic text-start"> 
                        <div className="max-w-80  overflow-hidden truncate ">
                            111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
                        </div> 
                   </div>
                    <div className="text-color-basic font-normal text-base  w-1/2 justify-between text-center flex flex-row">
                        <div className="p-4 w-1/4 text-green-500 font-semibold">
                            Positive
                        </div>
                        <div className="p-4 w-1/4">
                            January 1, 2024
                        </div>
                        <div className=" w-1/4 flex items-center justify-center  ">
                            <button className="text-white font-semibold text-xs rounded-xl w-16 h-9 bg-sky-500">DETAIL</button>
                        </div>
                        <div className=" w-1/4 flex items-center justify-center  ">
                            <button className="text-white font-semibold text-xs rounded-xl  w-16 h-9 bg-red-500">DELETE</button>
                        </div>
                    </div>
                </div>


                <div className="flex flex-grow h-12 w-full text-center items-center border-b">
                    <div className="w-1/12 "> 1 </div>
                    <div className="w-5/12  text-base text-color-basic text-start"> 
                        <div className="max-w-80  overflow-hidden truncate ">
                            111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
                        </div> 
                   </div>
                    <div className="text-color-basic font-normal text-base  w-1/2 justify-between text-center flex flex-row">
                        <div className="p-4 w-1/4  font-semibold">
                            Neutarl
                        </div>
                        <div className="p-4 w-1/4">
                            January 1, 2024
                        </div>
                        <div className=" w-1/4 flex items-center justify-center  ">
                            <button className="text-white font-semibold text-xs rounded-xl w-16 h-9 bg-sky-500">DETAIL</button>
                        </div>
                        <div className=" w-1/4 flex items-center justify-center  ">
                            <button className="text-white font-semibold text-xs rounded-xl  w-16 h-9 bg-red-500">DELETE</button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-grow h-12 w-full text-center items-center border-b">
                    <div className="w-1/12 "> 1 </div>
                    <div className="w-5/12  text-base text-color-basic text-start"> 
                        <div className="max-w-80  overflow-hidden truncate ">
                            111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
                        </div> 
                   </div>
                    <div className="text-color-basic font-normal text-base  w-1/2 justify-between text-center flex flex-row">
                        <div className="p-4 w-1/4 text-green-500 font-semibold">
                            Positive
                        </div>
                        <div className="p-4 w-1/4">
                            January 1, 2024
                        </div>
                        <div className=" w-1/4 flex items-center justify-center  ">
                            <button className="text-white font-semibold text-xs rounded-xl w-16 h-9 bg-sky-500">DETAIL</button>
                        </div>
                        <div className=" w-1/4 flex items-center justify-center  ">
                            <button className="text-white font-semibold text-xs rounded-xl  w-16 h-9 bg-red-500">DELETE</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-8 w-full pb-4 flex flex-grow justify-center items-center">
               <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
               <div className="px-4 font-normal text-base text-color-basic">
                1
               </div>
               <div className="px-5 font-normal text-base text-color-basic">2</div>
               <div className="px-5 font-normal text-base text-color-basic">...</div>
               <div className="px-5 font-normal text-base text-color-basic">5</div>
               <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
            </div>
        </div>
    );
}

export default SentenceHistory;