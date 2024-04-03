import InfoPost from "../../Components/InfoPost";
import { DefaultLayout } from "../../Components/Layouts/DefaultLayout";
import PostActivity from "../../Components/PostActivity.js";
function FeedBack() {
    return (
        <DefaultLayout type={"FeedBack"}>
            <div className="flex flex-row w-full h-full justify-center   items-center">
                <div className="w-4/12 flex h-full m-2  flex-col">
                    <div className=" w-full ">
                        <PostActivity></PostActivity>
                    </div>
                    <div className="bg-white w-full h-full rounded overflow-y-auto "> 
                        <InfoPost onClick={true}></InfoPost>
                        <InfoPost></InfoPost>
                        <InfoPost></InfoPost>
                        <InfoPost></InfoPost>                  
                    </div>
                </div>
                <div className="flex w-8/12 flex-col h-full m-2  grow justify-between ">
                    <div className="w-full h-20 mb-2  bg-white rounded-3xl border-solid border-2">

                    </div>
                    <div className="grow bg-white rounded-3xl border-solid border-8">

                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default FeedBack;