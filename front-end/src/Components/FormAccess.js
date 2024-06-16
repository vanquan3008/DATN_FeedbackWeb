import axios from "axios";
import { useSelector } from 'react-redux';

function FormAccess(
    {
        datadelete ,
        deleteClick,
        setDelete,
        formtype
    }
) {


    const user = useSelector((state)=> state.auth.login.currentUser)

    const deleteSuccess = async()=>{
        if(formtype === "history"){
            try{
                await axios.post(`http://127.0.0.1:8000/history/delete_text_history/${datadelete}` , {
                    "email" : user.userLogin?.email
                } , {
                    withCredentials : true, 
                    headers : {token : `Bearer ${user.jwt}`}
                })
                    window.location.reload();
            }
            catch(err){
                console.log(err)
            }      
        }
        else if(formtype === "filehistory"){
            try{
                await axios.post(`http://127.0.0.1:8000/history/delete_file_history/${datadelete}` , {
                    "email" : user.userLogin?.email
                } , {
                    withCredentials : true, 
                    headers : {token : `Bearer ${user.jwt}`}
                })
                    window.location.reload();
            }
            catch(err){
                console.log(err)
            }      
        }
        else if(formtype === "post"){
            try{
                const  idPost =  {
                    "id_post" : datadelete,
                    "user_id": user.userLogin?.user_id
                }
                    
                await axios.post(`http://127.0.0.1:8000/posts/delete_post`,idPost , {
                    withCredentials : true, 
                    headers : {token : `Bearer ${user.jwt}`}
                });
                window.location.reload();
                   
            }
            catch(err){
                console.log(err)
            }   
        }
        setDelete(false);
    }


    const noDelete = ()=>{
        setDelete(false);
    }


    return ( 
        <div className={`fixed ${deleteClick ? 'flex' :'hidden'} justify-center text-center items-center top-0 left-0  w-screen h-screen bg-color-background `}>
            <div className=" w-96 h-60 bg-white rounded-2xl flex flex-col overflow-hidden">
                <div className="border-b text-xl font-bold py-2">
                    Notifications
                </div>
                <div className="px-8 py-2 grow border-b flex justify-center items-center text-base font-medium">
                    What do you want to delete the {formtype} ? Can not restore the {formtype}.
                </div>
                <div className="flex flex-row justify-center h-8 items-center">
                    <div className="text-sm font-medium w-1/2 border-r hover:bg-slate-200 leading-8" onClick={deleteSuccess}>Yes</div>
                    <div className="text-sm font-medium w-1/2 leading-8 hover:bg-slate-200" onClick={noDelete}>No</div>
                </div>
            </div>
        </div>
     );
}

export default FormAccess;