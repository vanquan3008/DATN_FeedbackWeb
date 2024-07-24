import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";

function Overall(
    {
        report,
        title,
        loading
    }
) {

    return (
        <>
        {/* Product */}
        <div className="w-1/2 h-full px-6">
            {/* Title */}
            <h1 className="text-base font-normal py-2 italic"><span className="font-bold text-color-basic text-xl not-italic ">
                {title} :              
            </span>
                ({report["n_pos"] ?? 0} tích cực , {report["n_neg"] ?? 0} bình thường , {report["n_neg"] ?? 0} tiêu cực)
            </h1>    
            <div className="flex flex-col">
                <div className="w-full flex flex-row py-1  ">
                {
                        report["positive"] === undefined || report["positive_generality"] ===undefined || report["positive generality"] ===undefined || report["positive"]?.length === 0||report["positive_generality"]?.length === 0|| report["positive generality"]?.length === 0 ?
                        <div></div>:
                        <div>
                            <FontAwesomeIcon className="px-2 py-1" icon={faPlus}  style={{color: "#00f576"}} />
                            <span className="text-base font-normal space-x-1">
                                {report["positive"]  ?? report["positive_generality"] ?? report["positive generality"] ?? "Không có phản hồi tiêu cực về sản phẩm."} 
                            </span>
                        </div>
                    }
                </div>
                <div className="w-full flex flex-row py-1 ">

                    {
                        report["neutral"] === undefined || report["neutral_generality"] ===undefined || report["neutral generality"] ===undefined || report["neutral"]?.length=== 0 || report["neutral_generality"]?.length ===0 || report["neutral generality"]?.length ===0 ?
                        <div></div>:<div>
                            <FontAwesomeIcon className="px-2 py-1" icon={faPlus}  style={{color: "#00f576"}} />
                            <span className="text-base font-normal space-x-1">
                                {report["neutral"]  ?? report["neutral_generality"] ?? report["neutral generality"] ?? "Không có phản hồi tiêu cực về sản phẩm."} 
                            </span>
                        </div>
                    }
                </div>
                <div className="w-full flex flex-row py-1 "> 
                    {
                        report["negative"] === undefined ||report["negative_generality"] ===undefined || report["negative generality"] ===undefined || report["negative"]?.length === 0 ||report["negative_generality"]?.length ===0 || report["negative generality"]?.length === 0 ?
                        <div></div>:<div>
                            <FontAwesomeIcon className="px-2 py-1" icon={faMinus}  style={{color: "#fd0820"}} />
                            <span className="text-base font-normal space-x-1">
                                {report["negative"]  ?? report["negative_generality"] ?? report["negative generality"] ?? "Không có phản hồi tiêu cực về sản phẩm."} 
                            </span>
                        </div>
                    }
                </div>
            </div>
        </div>  
        </>
    );
}

export default Overall;