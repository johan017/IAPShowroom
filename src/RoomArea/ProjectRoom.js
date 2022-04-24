import { useParams } from "react-router";
import useFetch from "../useFetch";
import {Link} from  "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState } from "react";


const ProjectRoom = ({checked}) => {

    const history = useHistory();

    const {id} = useParams();
    const {data: event, error, isLoading} = useFetch('http://localhost:8000/projects/' + id); /* data is project because we want the id of a singular project */
    
    const [popup, setPopup] = useState(false);

    const changePopup = () =>{
        console.log(popup);
        if(popup === false){
            setPopup(true);
        } else {
            setPopup(false);
        }
        
    }
   
    // const ROOM_INFO_URL = "";

// const {events} = useFetchEvents();
//STILL WORKING ON IT 
    // const {events} = useFetchEvents();
   
    // const [roomInfo, setRoomInfo] = useState([]);
    // // const [redirect, setRedirect] = useState(false);
    // const [isLoading, setLoading] = useState(false);
    // TODO: CONNECT WITH API
    // const result = "";
    
    //     // <div key={event.projectid}>
    //     useEffect(()=>{
    //         {events && events.map((event) => (

    //             result = axios.get(`api/showroom/qna/info/${event.projectid}`, 
    //             {
    //                 headers: {"Content-Type": "application/json"},
    //                 withCredentials: true
    //             });
    //         setRoomInfo(result.data.payload);
    //         // console.log(result.data.payload)
    //         ))}
    //     }, []);
    //     // </div>
    
    const handleStage = () =>{
        history.push('/stage');
    }
    
    return (  
        <div className = "project-room">
            {isLoading && <div> Loading... </div>}
            {error && <div> {error} </div>}
            {/* {events && events.map((event) =>( */}
              

            {event &&(
            <div key={event.projectid}>   

                <div style={{marginLeft: "1000px"}}>
                {checked && (<button onClick={handleStage} style={{backgroundColor: 'red'}}>STAGE LIVE</button>)}
                {!checked && (<button onClick={handleStage}>STAGE LIVE</button>)}   
                </div>

                <div style={{marginLeft: "10px"}}>
                    <button onClick={changePopup}>Project Information</button>  
                </div>
                
                
                {popup == true && (
                    <div>
                        <h2>{event.title}</h2>
                        <h3>{event.abstract}</h3> <br/>
                        <h4>{event.author}</h4> 
                    </div>
                )}                          {/* {roomInfo && roomInfo.map((roomI)=> (    
                        <div key={roomI.projectid}>
                            {event.title === roomI.title && (
                            <div> */}
                    <div className="bbb">
                        {/* Update to get src url from the backend. Temporarily Hardcoded to get a view working  */}
                        <iframe className="temp" src="https://iapstream.ece.uprm.edu/bigbluebutton/api/create?name=DemoMeeting&meetingID=DemoMeeting&attendeePW=ap&moderatorPW=mp&checksum=f5e85d6b55189f228cf06e4791736e44b63282f1"></iframe> {/*TODO Remove after changes to incorporate backend url*/}
                        <br></br>
                        <iframe className="iframe" src="https://iapstream.ece.uprm.edu/bigbluebutton/api/join?fullName=w1&meetingID=DemoMeeting&password=mp&role=moderator&checksum=62dcc9207e6fbaef56223b4f4b0dcd5abcad159e" allow="camera;microphone;display-capture" allowFullScreen></iframe> 
                    </div>
                              
                                {/* <p> Wrritten by {roomI.author}</p> */}
                           {/* </div>
                            )}
                    
                        </div>
                    
                    ))} */}

                </div>
            )} 
            <Link to ="/rooms">
                <button> Back to Rooms</button>
            </Link>
        </div>
    );
}
 
export default ProjectRoom;