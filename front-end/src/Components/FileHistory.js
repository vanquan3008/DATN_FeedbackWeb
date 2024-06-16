import { Pagination, Stack } from "@mui/material";
import FileHistoryComponent from "./FileHistoryComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function FileHistory(
    {
        setDataHistoryFile,
        setDelete,
        setfileCurrent
    }
) {
    const [page ,setPage] = useState(0);
    const [listHistory ,setlistHistory] = useState([]);
    //const [length,setLength] = useState(0);
    const [pageCurrent,setPageCurrent] = useState(1);
    const user = useSelector((state)=> state.auth.login.currentUser);

    useEffect(() => {
        const renderHistory = async ()=>{
            const listPost = await axios.post(`http://127.0.0.1:8000/history/get_list_file_history_sentiment/?page=${pageCurrent}` ,{"user_id":user.userLogin?.user_id});
            
                setPage(listPost.data.numberPage)
                setlistHistory(listPost.data.history)
                setlistHistory(listPost.data.history)
            if(listPost.data.history.length === 0 ){
                setDataHistoryFile(false)
            }
            
           
        }
        renderHistory()
    },[pageCurrent])

    console.log(user)
    const render =  listHistory.map((data , index)=>{
        return (
            <FileHistoryComponent 
                data={data} 
                index={index} 
                setDelete={setDelete} 
                fileCurrent={setfileCurrent}
            ></FileHistoryComponent>
        )
    });

    const handleChange = (event, value) => {
        setPageCurrent(value);
    };
    return ( 
        <div className="w-full h-full flex flex-col">
            <div className="flex flex-row w-full h-12 border-b items-center justify-center">
                <div className="text-color-basic font-normal text-base w-1/12 text-center">
                    STT
                </div>
                <div className="text-color-basic font-normal text-base w-4/12 text-center">
                    File Name
                </div>

                    <div className="p-4 w-1/12 text-green-500 font-normal text-base  text-center">
                        Positive
                    </div>
                    <div className="p-4 w-1/12 text-red-500 font-normal text-base  text-center">
                        Negative
                    </div>
                    <div className="p-4 w-1/12 text-gray-400 font-normal text-base  text-center">
                        Neutral
                    </div>
                    <div className="p-4 w-2/12 text-color-basic font-normal text-base  text-center">
                        Date Save
                    </div>
                    <div className="p-4 w-2/12 text-color-basic font-normal text-base text-center">
                    
                    </div>
                
            </div>
            <div className=" w-full grow h-auto">
              {render}
            </div>
            <div className="w-full  flex justify-center items-center">
                <Stack spacing={pageCurrent}>
                    <Pagination count={page}  color="primary" onChange={handleChange}/>
                </Stack>
            </div>
        </div>
     );
}

export default FileHistory;