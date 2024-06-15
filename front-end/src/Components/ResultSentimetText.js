import axios from "axios";
import { useEffect, useState } from "react";

function ResultSentimentText(
    {
        sentimentdetail = "neutral"
    }
) {
    const colorSentiment = {
        'strong negative' :'bg-red-500',
        'negative': 'bg-red-400',
        'light negative':'bg-red-300',
        'neutral negative' :'bg-red-100',
        'neutral' : 'bg-gray-500',
        'neutral positive' :' bg-green-100',
        'light positive' :'bg-green-300',
        'positive' : 'bg-green-400',
        'strong positive' :'bg-green-500'
    }

    const textColorSentiment = {
        'strong negative' :'text-red-500',
        'negative': 'text-red-400',
        'light negative':'text-red-300',
        'neutral negative' :'text-red-100',
        'neutral' : 'text-gray-500',
        'neutral positive' :' text-green-100',
        'light positive' :'text-green-300',
        'positive' : 'text-green-400',
        'strong positive' :'text-green-500'
    }
    return ( 
        <div className="flex flex-col justify-center items-center h-full">
            <div className={`w-52 h-52 rounded-full ${colorSentiment[sentimentdetail]} flex justify-center items-center  `}>
                <div className="w-48 h-48 rounded-full  bg-white z-50 flex justify-center items-center">
                    <div className={`text-2xl font-semibold ${textColorSentiment[sentimentdetail]} flex justify-center items-center`}>
                        {sentimentdetail}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultSentimentText;