import axios from "axios";


function ResultSentimentText(
    {
        sentimentdetail = "neutral"
    }
) {
    const colorSentiment = {
        'Strong negative' :'bg-red-500',
        'Negative': 'bg-red-400',
        'Light negative':'bg-red-300',
        'Neutral negative' :'bg-red-100',
        'Neutral' : 'bg-gray-500',
        'Neutral positive' :' bg-green-100',
        'Light positive' :'bg-green-300',
        'Positive' : 'bg-green-400',
        'Strong positive' :'bg-green-500'
    }

    const textColorSentiment = {
        'Strong negative' :'text-red-500',
        'Negative': 'text-red-400',
        'Light negative':'text-red-300',
        'Neutral negative' :'text-red-100',
        'Neutral' : 'text-gray-500',
        'Neutral positive' :' text-green-100',
        'Light positive' :'text-green-300',
        'Positive' : 'text-green-400',
        'Strong positive' :'text-green-500'
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