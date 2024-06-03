import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faDownload } from "@fortawesome/free-solid-svg-icons";
import NavbarDefaultLayout from "../../Components/Layouts/NavbarDefaultLayout";
import FooterDefaultLayout from "../../Components/Layouts/FooterDefaultLayout";
import ResultSentimentText from "../../Components/ResultSentimetText";
import CustomTag from "../../Components/CustomTagSentiment";

function DetailSentiment() {
    //const [typeHistory , setTypeHistory] = useState(null);
    return (
        <div className="p-8 w-full flex flex-col h-full  bg-color-background-main">
            <NavbarDefaultLayout type="Detail Sentiment"></NavbarDefaultLayout>
            <div className="flex flex-col w-full h-full rounded-md pt-4">
                <div className="w-full h-10 flex flex-row justify-between">
                    <div className="p-4 flex items-center">
                        <FontAwesomeIcon icon={faArrowAltCircleLeft} className="p-4"></FontAwesomeIcon>    
                        Back to Home
                    </div>
                    <div className="p-4 flex items-center mr-12">
                        <FontAwesomeIcon icon={faDownload} className="p-4 "></FontAwesomeIcon>
                        Downloads 
                    </div>
                </div>
                <div className="flex flex-col w-full h-full">
                    <div className="h-20 text-2xl font-bold p-4 ml-6">
                        Sentiment Details
                    </div>
                    <div className="w-full h-auto flex flex-row px-10">
                        <div className="w-5/12 mr-2 rounded-2xl bg-white h-72 border drop-shadow">
                            <div className="text-xl font-medium border-b items-center justify-center flex p-2"> Sentence </div>
                            <div className="w-full h-full p-4  text-xl font-thin text-color-basic">
                                <span className="w-8 py-1 px-2 h-8 text-base  text-white font-medium bg-sky-500 rounded mr-4">TEXT</span>
                                Aaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaa     aaaaaaaaaaa a a aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaaa
                            </div>
                        </div>
                        <div className="w-7/12 ml-2  flex flex-col rounded-2xl bg-white h-72 border drop-shadow ">
                            <div className="text-xl font-medium border-b flex items-center justify-center h-12 p-2"> Sentiment </div>
                            <div className="flex h-60  w-full">
                               <div className="w-1/3 h-full flex justify-center items-center pb-4">
                                    <ResultSentimentText></ResultSentimentText>
                               </div>
                               <div className="w-2/3 h-60 flex flex-col ">
                                    <div className="text-xl font-medium flex py-2 pr-2 border-b" >
                                        Base aspects
                                    </div>
                                    <div className="scroll-smooth overflow-auto">
                                        <div className="py-2 border-b">
                                            <div className="pl-4">
                                                <CustomTag></CustomTag>
                                            </div>
                                            <div className="flex flex-col pl-4">
                                                <div className="">
                                                    <CustomTag></CustomTag>
                                                </div>
                                                <div className="flex flex-row">
                                                    <CustomTag></CustomTag>
                                                    <CustomTag></CustomTag>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="py-2 border-b">
                                            <div className="pl-4">
                                                <CustomTag></CustomTag>
                                            </div>
                                            <div className="flex flex-col pl-4">
                                                <div className="">
                                                    <CustomTag></CustomTag>
                                                </div>
                                                <div className="flex flex-row">
                                                    <CustomTag></CustomTag>
                                                    <CustomTag></CustomTag>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                               </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-20 text-2xl font-bold p-4 ml-6 ">Hehe</div>
                   <div className="flex flex-col w-full px-10 h-full overflow-y-auto"> 

                        <div className="my-1"><CustomTag border={true}></CustomTag></div>
                        <div className="my-1"><CustomTag border={true}></CustomTag></div>
                        <div className="my-1"><CustomTag border={true} colorTag={"blue"}></CustomTag></div>
                        <div className="my-1"><CustomTag border={true}></CustomTag></div>
                        <div className="my-1"><CustomTag border={true} colorTag={"red"}></CustomTag></div>
                        <div className="my-1"><CustomTag border={true} colorTag={"sky"}></CustomTag></div>
                        <div className="my-1"><CustomTag border={true} colorTag={"pink"}></CustomTag></div>
                        <div className="my-1"><CustomTag border={true}></CustomTag></div>
                        <div className="my-1"><CustomTag border={true}></CustomTag></div>
                        <div className="my-1"><CustomTag border={true}></CustomTag></div>
                        <div className="my-1"><CustomTag border={true}></CustomTag></div>
                        <div className="my-1"><CustomTag border={true}></CustomTag></div>
                    </div>
                </div>
            </div> 
            <FooterDefaultLayout></FooterDefaultLayout>
        </div>
    );
}

export default DetailSentiment;