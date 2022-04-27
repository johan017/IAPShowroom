import { useHistory, useParams } from "react-router-dom";
// import useFetch from "./useFetch";
// import EventList from "./EventList";
// import {Link} from  "react-router-dom";
// import useFetchEvents from "../hooks/use-fetch-events";
// import axios from "./context/axios";
    import { useEffect, useState} from 'react';
    import useFetchProjects from "../hooks/use-fetch-projects";

const EventDetails = () => {
   
    const history = useHistory();
    const {projects, loading,} = useFetchProjects();


    const [isLoading, setLoading] = useState(false);
    var  pathArray = window.location.pathname.split('/');

    var eid = parseInt(pathArray[2]);
    // console.log(typeof eid);

    

    const handleClick = () =>{
        history.push("/cal");
    }

    // const handleDelete = (props) =>{
    //     const eventID = props;

    //     fetch('http://localhost:8000/events/'+ eventID, {
    //         method: 'DELETE'
    //     }).then(() => {
    //         history.push('/cal');
    //     })
    //     // isDeleted = true;
    // }

    // const eventInfo = getEvents(eid);

    // const handleSchedule = (e) =>{
    //     e.preventDefault();
    //     // history.push("/event_details/"+data.id);
    //     history.push("/conference_details/"+ conference.id);
    // }

    return (  
        <div className = "event-details">
        
            {isLoading && <div> Loading... </div>}
           
            {projects && projects.map((project) =>(
                
                    // console.log(typeof project.project_id )
                    // console.log(typeof eid )


                <div  key={project.project_id}>
               
                    {project.project_id === eid && (

                        <div>
                        <h1>Event Details</h1>
                        <h2>Title: </h2>{project.title}
                    
                        <h2>Start: </h2>
                        <input type="datetime-local"                 
                               defaultValue={project.starttime}
                               disabled = {true}
                        />
                        <h2>End: </h2>
                        <input type="datetime-local"                 
                               defaultValue={project.e_date}
                               disabled = {true}
                        />
                        <br/>
                       
                        <button style={{ background: '#3B8D25' }}>Delete Event</button>
                        <button style={{ background: '#3B8D25' }} onClick={handleClick}>Back</button>
                   
                </div> 
                 )} 
                </div>
             ))} 

        </div>
    );
}
 
export default EventDetails;