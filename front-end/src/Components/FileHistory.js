import { Pagination, Stack } from "@mui/material";
import FileHistoryComponent from "./FileHistoryComponent";

function FileHistory() {
    return ( 
        <div className="w-full h-full flex flex-col">
            <div className="flex flex-row w-full h-12 border-b items-center justify-center">
                <div className="text-color-basic font-normal text-base w-1/12 text-center">
                    STT
                </div>
                <div className="text-color-basic font-normal text-base w-3/12 text-center">
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
                    <div className="p-4 w-3/12 text-color-basic font-normal text-base  text-center">
                        Date Save
                    </div>
                    <div className="p-4 w-2/12 text-color-basic font-normal text-base text-center">
                    
                    </div>
                
            </div>
            <div className="grow w-full overflow-y-auto">
               <FileHistoryComponent></FileHistoryComponent>
               <FileHistoryComponent></FileHistoryComponent>
               <FileHistoryComponent></FileHistoryComponent>
               <FileHistoryComponent></FileHistoryComponent>
            </div>
            <div className="h-10 w-full  flex justify-center items-center">
                <Stack spacing={2}>
                    <Pagination count={10}  color="primary" />
                </Stack>
            </div>
        </div>
     );
}

export default FileHistory;