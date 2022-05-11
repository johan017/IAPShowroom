import { useState, useEffect } from "react";
import axios from "../context/axios";
import config from "../config/config";

const ws = new WebSocket(config.WebSocketURL);
const Announcements = ({user_Role, aID}) => {
    const Announcement_URL = "api/showroom/announcement"

    const fetchAnnouncements = async () => {
        try{
            const result = await axios.get(Announcement_URL, 
            {
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            })
            console.log("fetch announcements", result.data.payload);
            setAnnouncements(result.data.payload);
        } catch (error) {
            console.log("error fetch announcements", error);
            console.log("error obj:");
            console.log(error);
            console.error(error.response.status);
            if(error.response.status === 404) return setAnnouncements([]);
        }

       
    };
    // Fetch announcements for the first time
    const [announcements, setAnnouncements] = useState([]);
    const [currentMess, setCurrentMess] = useState('');

    useEffect(() => {
        // Things from componentDidMount()
        ws.onmessage = (message) => {
            console.log("WebSocket received message:", message.data)
            const dataFromServer = JSON.parse(message.data);
            if(dataFromServer.type === config.ws_announcement) fetchAnnouncements();
            if(dataFromServer.type === config.ws_die) window.location.href = "/"; // reloads page after server is attempting close
        };

        fetchAnnouncements();

        return () => {
            //Things from componentWillUnmount()
            ws.close();
        }
    }, []);
   
    const handleDelete = async (itemToDelete) =>{
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
        }

        setCurrentMess('');

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
    }

    const getTime = (props) =>{
        const time = config.safariPolyfill(props);
        return(new Date(time).toLocaleTimeString('en-US', {hour: 'numeric', minute:'2-digit'}));
    }
  

    return ( 
        <div className="announcements" >
            {user_Role !== "admin" && ( 
            <div className="home-container">
                <div className="ann-title">
                    <h2>Announcements</h2>
                </div>
                <div style={{marginBottom: "30px"}}  className="admin-ann">
                    {announcements && announcements.map((announce) => (
                        <div className="announce-body" key={announce.announcementid}>
                            <p>{announce.a_content}</p>
                            <text style={{marginLeft: "220px"}}>{getTime(announce.a_date)}</text>
                        </div>
                    ))}

                    {announcements.length === 0 && (
                        <div className="announce-body">
                            <p>No Announcements At The Moment</p>
                        </div>
                    )}
                </div>
            </div>
            )}

            {user_Role === "admin" && ( 
            <div className="home-container">
                <div className="ann-title">
                <h2>Announcements</h2>
                </div>
                <div className="admin-ann">
                    {announcements && announcements.map((announce) => (
                        <div className="announce-body" key={announce.announcementid}>
                            <p>{announce.a_content}</p><br/> 
                       
                            <button onClick={() => {handleDelete(announce.announcementid)}}>Delete</button>
                            
                            <text>{getTime(announce.a_date)}</text>
                        </div>
                    ))}

                    {announcements.length === 0 && (
                        <div className="announce-body">
                            <p>No Announcements At The Moment</p>
                        </div>
                    )}
                </div>
        
                <div className="announce-footer">                    
                    <input 
                        type="text" 
                        placeholder="Enter Announcement" 
                        value={currentMess}
                        onChange={(event)=>{setCurrentMess(event.target.value)}}>
                    </input>
                    <button onClick={sendAnnouncement}>Send</button>
                </div>
            </div>
            )}
        </div>
    );
}
 
export default Announcements;