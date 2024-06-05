import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavbarDefaultLayout from "../../Components/Layouts/NavbarDefaultLayout";
import { faArrowAltCircleDown, faDownload } from "@fortawesome/free-solid-svg-icons";
import FooterDefaultLayout from "../../Components/Layouts/FooterDefaultLayout";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend,Bar,XAxis,YAxis,Tooltip,BarChart,CartesianGrid } from 'recharts';
import { useLocation } from "react-router-dom";




const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
function DetailFilesSentiment(
    {
        type = 'File'
    }
) {

    const {state} = useLocation();
    console.log(state)
    const data =[
        { name: 'Positive',value: 1},
        { name: 'Negative',value:2 },
        { name: 'Neutral', value: 3 },
    ]

    const data_emotion = [
        {
          "name": "Notsure",
          "attitude": 4000,
          "emotion":5000
        },
        {
          "name": "Like",
          "attitude": 3000,
        },
        {
          "name": "Hate",
          "attitude": 2000,
        },
        {
          "name": "Love",
          "attitude": 2780,
        },
        {
          "name": "Desire",
          "attitude": 1890,
        },
        {
          "name": "Value",
          "attitude": 2390,
        },
        {
          "name": "Angry",
          "emotion": 3490
        },
        {
            "name": "Joyful",
            "emotion": 3490
        },
        {
            "name": "Sad",
            "emotion": 3490
        },{
            "name": "Fearul",
            "emotion": 3490
        },
        {
            "name": "Ashame",
            "emotion": 3490
        },
        {
            "name": "Pround",
            "emotion": 3490
        },
        {
            "name": "Elated",
            "emotion": 3490
        }
      ]
    return (  
        <div className="p-8 w-full flex flex-col h-full  bg-color-background-main">
            <NavbarDefaultLayout type="Detail Files Sentiment"></NavbarDefaultLayout>
            <div className="flex flex-col w-full h-full rounded-md pt-4">
                <div className="w-full h-10 flex flex-row justify-between">
                    <div className="p-4 flex items-center">
                        <FontAwesomeIcon icon={faArrowAltCircleDown} className="p-4"></FontAwesomeIcon>    
                        Back to Home
                    </div>
                    <div className="p-4 flex items-center mr-12">
                        <FontAwesomeIcon icon={faDownload} className="p-4 "></FontAwesomeIcon>
                        Downloads 
                    </div>
                </div>
                <div className="w-full h-full">
                    <div className="h-20 text-2xl font-bold p-4 ml-6">
                        Detail Sentiment {type}
                    </div>
                    <div className="w-full h-full">
                        <div className="flex flex-row px-10">
                            <div className="flex flex-col bg-white rounded-2xl  w-1/2 mr-4 drop-shadow ">
                                <div className="text-xl font-semibold p-4 ">General information</div>
                                <div>
                                <div className=" text-base font-medium pl-6 pr-8 b h-6 w-full text-color-basic justify-between flex flex-row">
                                    <div className="w-3/5 h-6 flex flex-row pr-12">
                                        <div className="w-48">{type} information :</div> <div className="pl-4 h-6 w-full text-base text-black truncate ">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
                                    </div>
                                    <div className="w-2/5 flex flex-row">
                                        <div className="w-32">Date Sentiment :  </div><div className="pl-4 text-base">June 1, 2024</div>
                                    </div>
                                </div>
                                </div>
                                <div className="flex justify-center flex-col items-center pt-4 w-full h-full">
                                <div className="text-xl font-medium ">Sentiment Review Chart</div>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                         <Pie
                                            data={data}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            fill="#8884d8"
                                            label
                                        >
                                        {data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                       </Pie>
                                        <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            <div className="flex flex-col bg-white rounded-2xl justify-center items-center  w-1/2 ml-4 drop-shadow border ">
                                <div className="text-xl font-medium">
                                    <div>Emotion and Attitude Sentiment Count</div>
                                </div>
                                <div className="">                         
                                    <BarChart width={820} height={350} data={data_emotion}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                        <Bar dataKey="attitude" fill="#8884d8" />
                                        <Bar dataKey="emotion" fill="#82ca9d" />
                                    </BarChart>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterDefaultLayout></FooterDefaultLayout>
        </div>
    );
}

export default DetailFilesSentiment;