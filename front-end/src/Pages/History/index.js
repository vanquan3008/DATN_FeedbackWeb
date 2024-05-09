import { useState } from "react";
import { DefaultLayout } from "../../Components/Layouts/DefaultLayout";
import SentenceHistory from "../../Components/SentenceHistory";

function History() {
    return (
        <DefaultLayout type={"History"}>
                <div className="w-full h-full p-4">
                    <div className="w-full h-full bg-white flex flex-col">
                        <div className="h-1/2 m-4">
                            <div className="text-xl font-semibold text-sky-700 ">
                                Sentence History
                            </div>
                            <div className="w-full h-full">
                                <SentenceHistory></SentenceHistory>
                            </div>
                        </div>
                        <div className="h-4 w-full bg-color-background-main"></div>
                        <div className="h-1/2 m-4">
                            <div className="text-xl font-semibold text-sky-700 ">
                                File
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-20 bg-white">

                    </div>
                </div>
        </DefaultLayout>
    );
};

export default History;