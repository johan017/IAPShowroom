import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from '../useFetch';
import ScrollToBottom from "react-scroll-to-bottom";




const Announcements = ({user_Role}) => {

    const {id} = useParams();
    const {data: announcement} = useFetch('http://localhost:8000/announcements');

    const [currentMess, setCurrentMess] = useState('');
   
    
    const sendAnnouncement = async (event) =>{ 

        event.preventDefault();

        var messageData = {};
        const currentDate = new Date(Date.now());
        var currentHours = currentDate.getHours();
        const ampm = currentHours >=12? 'PM' : 'AM';
        currentHours = (currentHours%12) || 12;
        const currentMinutes = String(currentDate.getMinutes()).padStart(2, '0');
        const currentTime = currentHours+":"+currentMinutes+" "+ampm;

        if(currentMess !== ""){
            messageData ={
                message: currentMess,
                time: currentTime,
            };
            console.log("announcement", messageData);

        }
        fetch('http://localhost:8000/announcements', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(messageData)
        }).then (() => {
            console.log('new announcement added');
            // receiveAnnouncement();
            // setIsLoading(false); //when form is submitted; completed
        })
        setCurrentMess('');
    }




    // const receiveAnnouncement = () =>{
    //     // fetch('http://localhost:8000/announcements/'+ id, {
    //     //     method: 'GET',
           
    //     // }).then (() => {
    //     //     // setIsLoading(false); //when form is submitted; completed
    //     // })
    //     return(
    //         <div  className="admin-ann">
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
                <ScrollToBottom>
                    {announcement && announcement.map((announce) => (
                        <div className="announce-body" key={announce.id}>
                            <p>{announce.message}</p><br/>

                            <text>{announce.time}</text>
                                        {/* {receiveAnnouncement()} */}
                        </div>
                    ))}
               </ScrollToBottom>
                
            </div>

            {user_Role === "admin" && ( 
                    <div className="announce-footer">
                        <input 
                            type="text" 
                            placeholder="Enter Announcement" 
                            value={currentMess}
                            onChange={(event)=>{setCurrentMess(event.target.value)}}></input>
                        <button onClick={sendAnnouncement}>&#9658;</button>
                    </div>
            )}

        </div>
    );
}
 
export default Announcements;