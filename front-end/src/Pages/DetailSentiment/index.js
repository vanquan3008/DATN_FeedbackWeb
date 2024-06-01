import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DefaultLayout } from "../../Components/Layouts/DefaultLayout";
import { faArrowAltCircleLeft, faDownload } from "@fortawesome/free-solid-svg-icons";
import NavbarDefaultLayout from "../../Components/Layouts/NavbarDefaultLayout";
import FooterDefaultLayout from "../../Components/Layouts/FooterDefaultLayout";
import { useState } from "react";

function DetailSentiment() {
    const [typeHistory , setTypeHistory] = useState(null)
    return (
        <div className="p-8 w-full flex flex-col h-screen  bg-color-background-main">
            <NavbarDefaultLayout type="Detail Sentiment"></NavbarDefaultLayout>
            <div className="flex flex-col w-full h-full bg-white rounded-md pt-4">
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
                <div className="flex flex-col">
                    <div className="h-20 text-2xl font-bold p-4 ml-6">
                        Sentiment Details
                    </div>
                    <div>
                        
                    </div>

                </div>
            </div> 
            <FooterDefaultLayout></FooterDefaultLayout>
        </div>
    );
}

export default DetailSentiment;