import { useParams } from "react-router";
import useFetch from "../useFetch";
import {Link} from  "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetchProjects from "../hooks/use-fetch-projects";
import useFetchEvents from "../hooks/use-fetch-events";
import axios from "../context/axios";
import StageLiveButton from "../StageArea/StageLiveButton";
import Announcements from "../HomeArea/Announcements";
import UpcomingEvents from "../StageArea/UpcomingEvents";

// TODO: figure out why info doesnt appear with fetch & ids 
const ProjectRoom = ({user_Role}) => {

    const history = useHistory();

    // const {id} = useParams();
    // const {data: event, error, isLoading} = useFetch('http://localhost:8000/projects/' + id); /* data is project because we want the id of a singular project */
    const {projects, isLoading} = useFetchProjects();
    const [event, setEvent] = useState({});
    const [bbbUrl, setBBBUrl] = useState();
    var  pathArray = window.location.pathname.split('/');

    var eid = parseInt(pathArray[2]);
    console.log ("url_eid", eid)
    console.log("event_Project_id", event.projectid)
    console.log("event_Meet_id", event.meetid)

    const [roomInfo, setRoomInfo] = useState('');
    // const {events, loading} = useFetchEvents();   
    console.log("event", event)
    // console.log("event id", event)
    const [popup, setPopup] = useState(false);
   
    const getEvents = async() =>{
        try{
        const result = await axios.get(`api/showroom/schedule/events/${eid}`, 
        {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
        }) 
        setEvent(result.data.payload);
        // setDefaultST(result.data.payload.starttime);
        } catch(error) {
            console.error(error.response.status);
            if(error.response.status = '401'){
               
            }
        }
        // setLoading(false);
    };

    useEffect(()=>{
        getEvents();
        getBBBUrl();
     }, []);
 
    /** los eventos que son projects no devuelven abstracts */
    const changePopup = () =>{
        console.log(popup);
        if(popup === false){
            setPopup(true);
        } else {
            setPopup(false);
        }
        
    }
   
  

    const getSpeakers = async(pID) => {
          try{
          const result = await axios.get(`api/showroom/qna/info/1?meeting_id=${pID}`, 
          {
              headers: {"Content-Type": "application/json"},
              withCredentials: true
          }) 
          setRoomInfo(result.data.payload.project_members);
        //   setModalTitle(title)
          } catch(error) {
              console.error(error.response.status);
          }
      }

    const getProject = (e) =>{
        var inputArr = new Array();
        for(var i = 0; i < projects.length; i++) {
            if(e == projects[i].project_id){
                inputArr.push(projects[i].title);
                inputArr.push(", ");
                inputArr.push(projects[i].abstract);

            }
            // console.log("project_id", projects[i].project_id)
        }
        
        console.log("PInfoArr", inputArr)
           
        return inputArr;  
     
    }
    var nArr = getProject(eid); //new Array();
    
    const handleStage = () =>{
        history.push('/stage');
    }

    const getBBBUrl = async() =>{
        try{
        const result = await axios.get(`/api/showroom/qna/info?meeting_id=${eid}&bbb=true`, 
        {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
        }) 
        setBBBUrl(result.data.payload.join_url);
        // setDefaultST(result.data.payload.starttime);
        } catch(error) {
            console.error(error.response.status);
            if(error.response.status = '401'){
               
            }
        }
        // setLoading(false);
    };
    
    return (  
        <div className = "project-room">
            {isLoading && <div> Loading... </div>}
            {/* {error && <div> {error} </div>} */}
           
            {event && (
                <div key={event.meetid}>     
                <div className="proj-room-2">            
                    {/* <div className="proj-room-1"> */}
                        <h1>{nArr[0]}</h1>  
                    {/* </div>   */}
                        {/* <div style={{marginLeft: "10px"}}> */}
                            <button onClick={()=>{changePopup(); getSpeakers(event.projectid)}}>Project Information</button>  
                        {/* </div> */}
                
                        {popup == true && (
                            <div className="p-room-1">
                                <h2>Team Members</h2>
                                <div className="proj-room-adv-stud">
                                    <div className="proj-room-studresearcher">
                                        <h3> Student Researcher </h3>
                                        {roomInfo && roomInfo.map((member)=> ( 
                                            <>
                                            {member.user_role === "Student Researcher" && (
                                            <li>{member.first_name} {member.last_name}</li>
                                            )}
                                            </>
                                        ))} 
                                    </div>
                                    <div className="proj-room-advisor">  
                                        <h3> Advisors </h3>
                                        {roomInfo && roomInfo.map((member)=> ( 
                                            <>
                                            {member.user_role === "Advisor" && (
                                            <li>{member.first_name} {member.last_name}</li>
                                            )}
                                            </>
                                        ))} 
                                    </div>
                                </div>
                                <h2>Abstract</h2>
                                <p>{nArr[2]}</p>                                  
                            </div>
                        )}

                        <div className="project-room-1">
                            <div className="bbb">
                                <iframe className="iframe" src={bbbUrl} allow="camera;microphone;display-capture" allowFullScreen></iframe>  
                            </div>
                            <div className="proj-r-1">
                                <StageLiveButton user_Role={user_Role} disable={true}/>

                                <div className="room-announcements">
                                    <Announcements user_Role={user_Role}/>   
                                </div>
                                <div className="room-upcoming">
                                    <h3>Schedule</h3> 
                                    <UpcomingEvents></UpcomingEvents>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Link to ="/rooms">
                <button> Back to Rooms</button>
            </Link>
        </div>
    );
}
 
export default ProjectRoom;