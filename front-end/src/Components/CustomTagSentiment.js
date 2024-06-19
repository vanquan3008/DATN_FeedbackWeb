function CustomTag(
    {
        colorTag="bg-blue-500" , 
        bgColor,
        border = false,
        nameTag = "No Tag",
        text ="No Text"
    }
) {
    return ( 
        <div className={`w-full h-auto text-xl  ${border?"border drop-shadow-sm rounded-xl  p-4" :"p-2"} font-thin text-color-basic ${ bgColor ? "bg-"+ bgColor+ "-500" : "bg-white"}`}>
            <span className={`text-base  font-semibold rounded-md text-white w-min-40 py-1 p-2 mr-2  ${colorTag}`}>
                {nameTag}
            </span>
            {text}
        </div>
    );
}

export default CustomTag;