import Moment from "react-moment";

function FileHistoryComponent(
    {
        data ,
        index ,
        setDelete,
        fileCurrent
        
    }
) {
    return ( 
        <div>
            <div className="flex flex-grow h-12 w-full text-center items-center border-b">
                    <div className="w-1/12 ">{index}</div>
                    <div className="w-4/12  text-base text-color-basic text-start"> 
                        <div className=" pl-10 max-w-[486px] overflow-hidden truncate ">
                            {data?.file_name}
                        </div> 
                   </div>
                    <div className="p-4 w-1/12 flex justify-center text-green-500">
                        {data?.number_pos}
                    </div>
                    <div className="p-4 w-1/12 flex justify-center text-red-500">
                        {data?.number_neg}
                    </div>
                    <div className="p-4 w-1/12 flex justify-center text-gray-400">
                        {data?.number_neu}
                    </div>
                    <div className="p-4 w-2/12">
                        <Moment format="LL" className="text-base text-color-basic">{data?.date_save}</Moment>
                    </div>

                    <div className=" w-2/12 flex items-center justify-center  ">
                        <button className="text-white font-semibold text-xs rounded-xl  w-16 h-9 bg-red-500"
                                onClick={()=>{
                                    setDelete(true);
                                    fileCurrent(data.id_file);
                                }} 
                        >DELETE</button>
                    </div>
                </div>
        </div>
    );
}

export default FileHistoryComponent;