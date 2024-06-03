function CustomTag(
    {
        colorTag="blue" , 
        bgColor,
        border = false
    }
) {
    return ( 
        <div className={`w-full h-auto text-xl   ${border?"border drop-shadow-sm rounded-xl  p-4" :"p-2"} font-thin text-color-basic ${ bgColor ? "bg-"+ bgColor+ "-500" : "bg-white"}`}>
            <span className={`text-base  font-semibold rounded-md text-white w-min-40 py-1 p-2 mr-2  bg-${colorTag}-500`}>
                Emotion Analyzsss
            </span>
            oisnaiocs sicsaioncsioancsaionc sincaois hellllsoas sadosajdsa sadiosahdoias sdadhasodsa saidasoijdsa dsaidsaoijdsa ancc laosadonsa cisancoisnaiocs sics
        </div>
    );
}

export default CustomTag;