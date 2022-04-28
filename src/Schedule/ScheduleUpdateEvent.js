import { useState, useEffect } from "react";
import { useHistory, useParams, withRouter, Link } from "react-router-dom";
import useFetchProjects from "../hooks/use-fetch-projects";
import useFetch from "../useFetch";
import Calendar from './Calendar';
import axios from "../context/axios";





function ScheduleUpdateEvent (props) {
    // const {id} = useParams();
    // const {project_id} = useParams();

    // const {data: event }= useFetch('http://localhost:8000/events/' + id); /* data is project because we want the id of a singular project */
  
    const [title, setTitle] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [projectID, setProjectID] = useState('');

    // const [presenters, setPresenters] = useState('');
    // const [isLoading, setIsLoading] = useState(false); // when first loading the page the POST request is not being made; only after sumbitting form is when request is made
    const history = useHistory();

    // const [data, setData] = useState([]);
    const {projects} = useFetchProjects();
    var  pathArray = window.location.pathname.split('/');

    var eid = parseInt(pathArray[2]);
    console.log("url_id",eid)


    const handleEvent = async () =>{ 

        // event.preventDefault();

        var messageData = [{
                "projectid": projectID,
                "starttime": endTime,
                "title": title,
                "e_date": startTime,
                
            }];
            console.log("event", messageData);
        // }
        try{

        await axios.post('api/showroom/schedule/events', messageData, {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
            }).then((res) => {
                console.log(res.data)
            }).catch((error)=>{
                console.log(error)
        });
        }catch(err){

        }
        // setCurrentMess('');
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

    // useEffect(async ()=> {
    //     let result = await fetch(`http://localhost:8000/events/${props.match.params.id}`);
    //     result = await result.json();
    //     setData(result);
    // })

    return ( 
        <div className = "Event-information">
            <div className="addNewEvent">
                {projects && projects.map((project)=>(
                    <div key={project.project_id}> 

                    {project.project_id === eid &&(
                        <div>                        
                            

                         <h2>Event Information</h2>
                         <label>Event Title: </label>
                         <input 
                             type="text" 
                             defaultValue={project.title}
                             onChange = {(e) => setTitle(e.target.value)}
                         />
                         <label>Start Time: </label>
                         <input
                             type="datetime-local"
                             // required
                             value = {startTime}
                             onChange = {(e) => setStartTime(e.target.value)}
         
                         ></input>
                         <label>End Time: </label>
                         <input 
                             type="datetime-local" 
                             // required 
                             value = {endTime}
                             onChange = {(e) => setEndTime(e.target.value)}
                         ></input>
                     
                         <Link to ={"/cal"}>
                                 <button style={{ background: 'gray' }}>Cancel</button>
                         </Link>
                         <button style={{ background: '#3B8D25' }}  onClick={() => {handleEvent(); setProjectID(project.project_id); setTitle(project.title);}}>Update Event</button> 
                         <button>Delete Event</button>
                        </div>
                    )}
                    
                    </div>

                ))}
               
            </div>

            <div className="Event-information-calendar">
                <Calendar/>

            </div>
        </div>

    );
}
 
export default withRouter(ScheduleUpdateEvent);