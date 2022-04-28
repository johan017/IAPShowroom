import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from '../useFetch';
// import ScrollToBottom from "react-scroll-to-bottom";
import axios from "../context/axios";
import useFetchAnnouncements from "../hooks/use-fetch-announcements";
import useFetchServerSideEventsAnnouncements from "../hooks/use-fetch-server-side-events-announcement";


//TODO: Find out why the fetch announcements API is not working



const Announcements = ({user_Role}) => {

    const {id} = useParams();
    const {announcements, redirect, isLoading } = useFetchAnnouncements();
    const [currentMess, setCurrentMess] = useState('');
    // const announcements = new useFetchServerSideEventsAnnouncements();
   
    const handleDelete = async (itemToDelete) =>{
        // const itemToDelete = props;

        
        // props.preventDefault();

        try{

        await axios.delete(`api/showroom/announcement/${itemToDelete}`, {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
            }).then((res) => {
                console.log(res.data)
                console.log(`item  ${itemToDelete} deleted`)
            }).catch((error)=>{
                console.log(error)
        });
        }catch(err){

        }

    }
    
    const sendAnnouncement = async (event) =>{ 

        event.preventDefault();

        var messageData = {};
        const currentDate = new Date(Date.now()).toLocaleString('en-US');
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

    const getTime = (props) =>{
        const time = props;
        return(new Date(time).toLocaleTimeString('en-US', {hour: 'numeric', minute:'2-digit'}));
    }
  

    return ( 
        <div className="announcements" >
            {/* <div>{useFetchServerSideEventsAnnouncements()}</div> */}
            {user_Role !== "admin" && ( 
            <div className="admin-ann"> 
                {/* <ScrollToBottom> */}
                <h2>Announcements</h2>

                    {announcements && announcements.map((announce) => (
                        <div className="announce-body" key={announce.announcementid}>
                            <p>{announce.a_content}</p><br/>
                           

                            <text>{getTime(announce.a_date)}</text>
                        </div>
                    ))} 

                    {announcements.length === 0 && (
                        <div className="announce-body">
                            <p>No Announcemnts At The Moment</p>
                        </div>
                    )}
               {/* </ScrollToBottom> */}
                
            </div>
            )}

            {user_Role === "admin" && ( 
            <div className="home-container">
                <div className="ann-title">
                <h2>Announcements</h2>
                </div>
                <div className="admin-ann">
                    {/* <ScrollToBottom> */}
                    

                        {announcements && announcements.map((announce) => (
                            <div className="announce-body" key={announce.announcementid}>
                                <p>{announce.a_content}</p><br/> 
                                <button onClick={() => {handleDelete(announce.announcementid)}}>Delete</button>
                                <text>{getTime(announce.a_date)}</text>

                            </div>
                        ))}

                        {announcements.length === 0 && (
                            <div className="announce-body">
                                <p>No Announcemnts At The Moment</p>
                            </div>
                        )}
                {/* </ScrollToBottom> */}
                    
                    </div>
                    <div className="announce-footer">                    
                            <input 
                                type="text" 
                                placeholder="Enter Announcement" 
                                value={currentMess}
                                onChange={(event)=>{setCurrentMess(event.target.value)}}></input>
                            <button onClick={sendAnnouncement}>Send</button>
                </div>
            </div>
            )}

        </div>
    );
}
 
export default Announcements;