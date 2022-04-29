import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from '../useFetch';
// import ScrollToBottom from "react-scroll-to-bottom";
import axios from "../context/axios";
// import fetchAnnouncements from "../hooks/use-fetch-announcements";
import config from "../config/config";


//TODO: Find out why the fetch announcements API is not working


const ws = new WebSocket(config.WebSocketURL);
const Announcements = ({user_Role}) => {
    const Announcement_URL = "api/showroom/announcement"

    const fetchAnnouncements = async () => {
        try{
            console.log("before axios")
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
            if(error.response.status === 404) return {};
        }

       
    };
    //Fetch announcements for the first time
    const [announcements, setAnnouncements] = useState([]);
    const {id} = useParams();
    const [currentMess, setCurrentMess] = useState('');

    useEffect(() => {
        //Things from componentDidMount()
        console.log("component did mount");
        ws.onopen = () => {
            console.log('Announcements WebSocket Client Connected');
        };
        ws.onmessage = (message) => {
            console.log("WebSocket received message:", message.data)
            const dataFromServer = JSON.parse(message.data);
            if(dataFromServer.type === config.ws_announcement){
                fetchAnnouncements();
            }
        };
        ws.onclose = () => {
            console.log('Announcements WebSocket Client Disconnected');
            // ws.close();
        }

        fetchAnnouncements();

        return () => {
            //Things from componentWillUnmount()
            console.log("unmounted " + config.ws_announcement);
            ws.close();
        }
    }, []);
   
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
            <div className="home-container">
                <div className="ann-title">
                    <h2>Announcements</h2>
                </div>
                <div style={{marginBottom: "30px"}}  className="admin-ann">
                    {/* <ScrollToBottom> */}
                    {announcements && announcements.map((announce) => (
                        <div className="announce-body" key={announce.announcementid}>
                            <p>{announce.a_content}</p><br/> 
                            <text style={{marginLeft: "220px"}}>{getTime(announce.a_date)}</text>
                        </div>
                    ))}

                    {announcements.length === 0 && (
                        <div className="announce-body">
                            <p>No Announcemnts At The Moment</p>
                        </div>
                    )}
                {/* </ScrollToBottom> */}
                    
                </div>
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