import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect ,useState } from "react";
import { useSelector } from 'react-redux';
import Moment from 'react-moment';

function capitalizeFirstLetter(str) {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
}

function SentenceHistory() {
    const [pageCurrent ,setPageCurrent] = useState(1);
    const [page ,setPage ] = useState(null);
    const [listHistory , setlistHistory] = useState([])

    const user = useSelector((state)=> state.auth.login.currentUser)

    
    useEffect(() => {
        const renderHistory = async ()=>{
            const data = {
                "user_id":user.userLogin?.user_id 
            }
            const listPost = await axios.post(`http://127.0.0.1:8000/history/get_list_history_sentiment/?page=${pageCurrent}` ,data);
            setPage(listPost.data.numberPage)
            setlistHistory(listPost.data.history)
        }
        renderHistory()
    },[pageCurrent])


    const _listHistory = listHistory.map((cur, index) => {
        return listHistory[listHistory.length - index - 1];
    });
    const renderHistory =  _listHistory.map((his , index)=>{
        return (
            <div className="flex flex-grow h-12 w-full text-center items-center border-b">
                    <div className="w-1/12 "> {index} </div>
                    <div className="w-5/12  text-base text-color-basic text-start"> 
                        <div className=" pl-10 w-max-96 overflow-hidden truncate ">
                            {his?.text_content}
                        </div> 
                   </div>
                    <div className="text-color-basic font-normal text-base  w-1/2 justify-between text-center flex flex-row">
                        <div className={`p-4 w-1/4 ${his?.sentiment === "neutral" ? "text-color-basic" : his.sentiment === "positive" ? "text-green-500"  : "text-red-500" } font-semibold`}>
                            {capitalizeFirstLetter(his?.sentiment)}
                        </div>
                        <div className="p-4 w-1/4">
                            <Moment format="LL" className="text-base text-color-basic">{his?.date_save}</Moment>
                        </div>
                        <div className=" w-1/4 flex items-center justify-center  ">
                            <button className="text-white font-semibold text-xs rounded-xl w-16 h-9 bg-sky-500">DETAIL</button>
                        </div>
                        <div className=" w-1/4 flex items-center justify-center  ">
                            <button className="text-white font-semibold text-xs rounded-xl  w-16 h-9 bg-red-500">DELETE</button>
                        </div>
                    </div>
                </div>
        )
    })

    
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
                {renderHistory}
            </div>
            <div className="h-10 w-full mb-4 flex justify-center items-center">
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