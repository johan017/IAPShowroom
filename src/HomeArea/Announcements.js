import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from '../useFetch';
// import ScrollToBottom from "react-scroll-to-bottom";
import axios from "../context/axios";
import useFetchAnnouncements from "../hooks/use-fetch-announcements";
// import useFetchServerSideEventsAnnouncements from "./hooks/use-fetch-server-side-events-announcement";


//TODO: Find out why the fetch announcements API is not working



const Announcements = ({user_Role}) => {

    const {id} = useParams();
    const {data: announcement} = useFetch('http://localhost:8000/announcements');
    // const {announcements, redirect, isLoading } = useFetchAnnouncements();

    const [currentMess, setCurrentMess] = useState('');
   
    
    const sendAnnouncement = async (event) =>{ 

        event.preventDefault();

        var messageData = {};
        const currentDate = new Date(Date.now());
        if(currentMess !== ""){
            messageData ={
                "message": currentMess,
                "date": currentDate,
            };
            console.log("announcement", messageData);
        

        }
        try{

        await axios.post('api/showroom/announcement', messageData, {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
            }).then((res) => {
                console.log(res.data)
            }).catch((error)=>{
                console.log(error)
        });
        }catch(err){

        }

        setCurrentMess('');
    }

    // const getTime = (props) =>{
    //     const time = props;
    
    //     const eventDate = new Date(time);
    //     var eventHours = eventDate.getHours();
    //     const ampm = eventHours >=12? 'PM' : 'AM';
    //     eventHours = (eventHours%12) || 12;
    //     const eventMinutes = String(eventDate.getMinutes()).padStart(2, '0');
    //     const eventTime = eventHours+":"+eventMinutes+" "+ampm;
    
    //     // var eventMinute =new Date(time).getMinutes;
    //     console.log("hours", eventTime);
    //     return(eventTime);
    // }


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
            {/* <div>{useFetchServerSideEventsAnnouncements()}</div> */}

            <div className="admin-ann"> 
                {/* <ScrollToBottom> */}
                    {announcement && announcement.map((announce) => (
                        <div className="announce-body" key={announce.announcementid}>
                            {/* <p>{announce.a_content}</p><br/> */}
                            <p>{announce.message}</p><br/>

                            <text>{announce.time}</text>

                            {/* <text>{getTime(announce.a_date)}</text> */}
                                        {/* {receiveAnnouncement()} */}
                        </div>
                    ))}
               {/* </ScrollToBottom> */}
                
            </div>

            {user_Role === "admin" && ( 
                    <div className="announce-footer">
                        <input 
                            type="text" 
                            placeholder="Enter Announcement" 
                            value={currentMess}
                            onChange={(event)=>{setCurrentMess(event.target.value)}}></input>
                        <button onClick={sendAnnouncement}>Send</button>
                    </div>
            )}

        </div>
    );
}
 
export default Announcements;