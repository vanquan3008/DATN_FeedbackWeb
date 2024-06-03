
function ResultSentimentText(
    {color}
) {
    return ( 
        <div className="flex flex-col justify-center items-center h-full">
            <div className="w-48 h-48 rounded-full bg-red-500 flex justify-center items-center  ">
                <div className="w-40 h-40 rounded-full  bg-white z-50 flex justify-center items-center">
                    <div className="text-2xl font-semibold text-red-500">
                        Positive
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultSentimentText;