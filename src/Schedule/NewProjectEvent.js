import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "../useFetch";
import axios from "../context/axios";
import useGetRole from "../hooks/use-get-role";
import useFetchProjects from "../hooks/use-fetch-projects";

const EVENTS_URL = "api/showroom/schedule/events"

const NewProjectEvent = () => {
    const {uID}  = useGetRole();
    const adminid = uID;
    const [title, setTitle] = useState('');
    const [starttime, setStart] = useState('');
    const [duration, setDuration] = useState(15);
    const [isLoading, setIsLoading] = useState(false); // when first loading the page the POST request is not being made; only after sumbitting form is when request is made
    const history = useHistory();
    const {projects, loading,} = useFetchProjects();


    var  pathArray = window.location.pathname.split('/');

    var projectid=parseInt(pathArray[2]);

    const formatDate2 = (date) =>{
        const splitDate = date.split('T');
        const sdate = splitDate[0].toString();
        console.log("date", sdate)
        const stime = "00:00:00";
        console.log("time", stime)

        return `${sdate}`+" "+`${stime}`;
    }

    const handleSubmit = async(defaultTitle, inputTitle) =>{
        // e.preventDefault();
        // var difference = new Date(end) - new Date(starttime);
        // let duration = Math.floor((difference / (1000 * 60)));

        var e_date = formatDate2(starttime);
        if(inputTitle === "") { 
            inputTitle = defaultTitle;
        }

        const event = [{adminid,  starttime, "duration": parseInt(duration), "title": inputTitle, projectid, e_date}];
        //const event = {title, starttime, end};
        setIsLoading(true); //before submitting
        console.log("new project event", event )

        try{
            await axios.post(EVENTS_URL, 
                event,
                {
                    headers: {"Content-Type": "application/json"},
                    withCredentials: true
                }).then(() =>{
                    history.push('/cal');
                });
                
        }catch(err){
            console.log(err);
        }

    }

    return ( 
        <div className = "addNewEvent">
             {projects && projects.map((project) =>(
                <div key ={project.project_id}>
                    {projectid === project.project_id && (
                        <>
            <h2>Add a New Event</h2>
            <form onSubmit = {()=>{handleSubmit(project.title, title);}}>
                <label>Event Title: </label>
                <input 
                    type="text" 
                    required 
                    defaultValue = {project.title}
                    onChange = {(e) => setTitle(e.target.value)}
                />
                <label>Start Time: </label>
                <input
                    type="datetime-local"
                    required
                    value = {starttime}
                    onChange = {(e) => setStart(e.target.value)}

                ></input>
                <label>Duration (in minutes): </label>
                <input 
                    type="number" 
                    required 
                    value = {duration}
                    onChange = {(e) => setDuration(e.target.value)}
                ></input>
               
                {!isLoading && <button>Add Event</button>} {/** adds the new event  */}
                {isLoading && <button disabled>Adding Event...</button>} {/** add event button disabled while loading  */}

            </form>
            </>
            )}
            </div>
            ))}
        </div>
                       /**select & option is a dropdown */


     );
}
 
export default NewProjectEvent;