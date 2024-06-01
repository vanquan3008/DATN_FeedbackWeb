import Moment from "react-moment";

function FileHistoryComponent() {
    return ( 
        <div>
            <div className="flex flex-grow h-12 w-full text-center items-center border-b">
                    <div className="w-1/12 ">0</div>
                    <div className="w-3/12  text-base text-color-basic text-start"> 
                        <div className=" pl-10 w-full overflow-hidden truncate ">
                            Hehee 1122 1
                        </div> 
                   </div>
                    <div className="p-4 w-1/12 flex justify-center text-green-500">
                        0
                    </div>
                    <div className="p-4 w-1/12 flex justify-center text-red-500">
                        0
                    </div>
                    <div className="p-4 w-1/12 flex justify-center text-gray-400">
                        0
                    </div>
                    <div className="p-4 w-3/12">
                        <Moment format="LL" className="text-base text-color-basic">11</Moment>
                    </div>
                    <div className=" w-1/12 flex items-center justify-center  ">
                        <button className="text-white font-semibold text-xs rounded-xl w-16 h-9 bg-sky-500">DETAIL</button>
                    </div>
                    <div className=" w-1/12 flex items-center justify-center  ">
                        <button className="text-white font-semibold text-xs rounded-xl  w-16 h-9 bg-red-500" >DELETE</button>
                    </div>
                </div>
        </div>
    );
}

export default FileHistoryComponent;