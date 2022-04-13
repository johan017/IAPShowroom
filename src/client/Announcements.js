import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from '../useFetch';





const Announcements = ({user_Role}) => {

    const {id} = useParams();
    const {data: announcement} = useFetch('http://localhost:8000/announcements');

    const [currentMess, setCurrentMess] = useState('');
   
    
    const sendAnnouncement = async (event) =>{ 

        event.preventDefault();

        var messageData = {};


        if(currentMess !== ""){
            messageData ={
                message: currentMess,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };
            console.log("announcement", messageData);

        }
        fetch('http://localhost:8000/announcements', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(messageData)
        }).then (() => {
            console.log('new announcement added');
           
            // setIsLoading(false); //when form is submitted; completed
        })
     
    }

    // const receiveAnnouncement = async () =>{
    //     // fetch('http://localhost:8000/announcements/'+ id, {
    //     //     method: 'GET',
           
    //     // }).then (() => {
    //     //     // setIsLoading(false); //when form is submitted; completed
    //     // })
    //     return(
    //         <div>
    //         {announcement && announcement.map((announce) => (
    //             <div  key={announce.id}>
    //                 <p>Message: {announce.message}</p>

    //                 <p>Time: {announce.time}</p>
    //                     {/* {receiveAnnouncement()} */}
    //             </div>
    //         ))}
    //         </div>
    //     );
    // }


    return ( 
        <div className="announcements" >
            <div className="admin-ann"> 
            
                {announcement && announcement.map((announce) => (
                    <div className="announce-body" key={announce.id}>
                        <h2>{announce.message}</h2>

                        <p>{announce.time}</p>
                                    {/* {receiveAnnouncement()}*/}
                    </div>
                ))}
               
                
            </div>

            {user_Role === "admin" && ( 
                    <div className="announce-footer">
                        <input 
                            type="text" 
                            placeholder="Enter Announcement" 
                            onChange={(event)=>{setCurrentMess(event.target.value)}}></input>
                        <button onClick={sendAnnouncement}>&#9658;</button>
                    </div>
            )}

        </div>
    );
}
 
export default Announcements;