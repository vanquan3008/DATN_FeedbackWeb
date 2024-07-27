function LoadingPage(
    {hidden = true}
) {
    return ( 
       
        <div className={`flex items-center w-screen bg-color-basic ${hidden ? "hidden" : ""} justify-center h-screen z-9999 fixed top-0 left-0 opacity-85 flex-col `}>
            <div class="relative">
                <div class="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                <div class="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
                </div>
               
            </div> 
            <div className="text-3xl text-blue-600 font-medium">Data is being fetched ...</div>
        </div>

     );
}
export default LoadingPage;