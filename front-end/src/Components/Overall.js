import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";

function Overall(
    {
        report
    }
) {


    return (
        <>
        {/* Product */}
        <div className="w-1/2 h-full px-6">
            {/* Title */}
            <h1 className="text-base font-normal py-2 italic"><span className="font-bold text-color-basic text-xl not-italic ">Về sản phẩm:
                
            </span>
                ({report["n_pos"] ?? null} tích cực , {report["n_neg"] ?? null} bình thường , {report["n_neg"] ?? null} tiêu cực)
            </h1>    
            <div className="flex flex-col">
                <div className="w-full flex flex-row py-1  ">
                    <FontAwesomeIcon className="px-2 py-1"  icon={faPlus} style={{color: "#1ef50f"}} />
                    <span className="text-base font-normal space-x-1">
                        {report["positive"] ?? report["positive_generality"] ?? "Không có phản hồi tích cực về sản phẩm."}
                    </span>
                </div>
                <div className="w-full flex flex-row py-1 ">
                    <FontAwesomeIcon className="px-2 py-1" icon={faPlus}  style={{color: "#1ef50f"}} />
                    <span className="text-base font-normal space-x-1">
                        
                        {report["neutral"]??report["neutral_generality"]??"Không có phản hồi trung lập về sản phẩm."}
                    </span>
                </div>
                <div className="w-full flex flex-row py-1 "> 
                    <FontAwesomeIcon className="px-2 py-1" icon={faMinus}  style={{color: "#fd0820"}} />
                    <span className="text-base font-normal space-x-1">
                        {report["negative"]??report["negative_generality"] ?? "Không có phản hồi tiêu cực về sản phẩm."}
                    </span>
                </div>
            </div>
        </div>  

{/* Service */}
        {/* <div className="w-1/2 h-full px-6">
            <h1 className="text-base font-normal py-2  italic"><span className="font-bold text-color-basic text-xl not-italic ">Về sản phẩm: </span>
            ({reportService["n_pos"] ?? 0} tích cực , {reportService["n_neg"] ?? 0} bình thường , {reportService["n_neg"] ?? 0} tiêu cực)
            </h1>    
            <div className="flex flex-col">
                <div className="w-full flex flex-row py-1  ">
                    <FontAwesomeIcon className="px-2 py-1"  icon={faPlus} style={{color: "#1ef50f"}} />
                    <span className="text-base font-normal space-x-1">
                        {reportService["positive_generality"] ?? "Không có phản hồi tích cực về dịch vụ."}
                    </span>
                </div>
                <div className="w-full flex flex-row py-1 ">
                    <FontAwesomeIcon className="px-2 py-1" icon={faPlus}  style={{color: "#1ef50f"}} />
                    <span className="text-base font-normal space-x-1">
                        {reportService["neutral_generality"] ?? "Không có phản hồi trung lập về dịch vụ."}
                    </span>
                </div>
                <div className="w-full flex flex-row py-1 "> 
                    <FontAwesomeIcon className="px-2 py-1" icon={faMinus}  style={{color: "#fd0820"}} />
                    <span className="text-base font-normal space-x-1">
                        {reportService["negative_generality"] ?? "Không có phản hồi tiêu cực về sản phẩm."}
                    </span>
                </div>
            </div>
        </div>   */}
        </>
    );
}

export default Overall;