import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "../useFetch";
import axios from "../context/axios";
import useGetRole from "../hooks/use-get-role";

const EVENTS_URL = "api/showroom/schedule/events"

const ScheduleNewEvent = () => {
    const {uID}  = useGetRole();
    const {id} = useParams();
    const adminid = uID;
    const [title, setTitle] = useState('');
    const [starttime, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [isLoading, setIsLoading] = useState(false); // when first loading the page the POST request is not being made; only after sumbitting form is when request is made
    const history = useHistory();
    const projectid= null;


    const handleSubmit = async(e) =>{
        e.preventDefault();
        var difference = new Date(end) - new Date(starttime);
        let duration = Math.floor((difference / (1000 * 60)));

        var e_date = starttime;

        const event = [{adminid,  starttime, duration, title, projectid, e_date}];
        //const event = {title, starttime, end};
        setIsLoading(true); //before submitting

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
            <h2>Add a New Event</h2>
            <form onSubmit = {handleSubmit}>
                <label>Event Title: </label>
                <input 
                    type="text" 
                    required 
                    value = {title}
                    onChange = {(e) => setTitle(e.target.value)}
                />
                <label>Start Time: </label>
                <input
                    type="datetime-local"
                    required
                    value = {starttime}
                    onChange = {(e) => setStart(e.target.value)}

                ></input>
                <label>End Time: </label>
                <input 
                    type="datetime-local" 
                    required 
                    value = {end}
                    onChange = {(e) => setEnd(e.target.value)}
                ></input>
               
                {!isLoading && <button>Add Event</button>} {/** adds the new event  */}
                {isLoading && <button disabled>Adding Event...</button>} {/** add event button disabled while loading  */}

            </form>
        </div>
                       /**select & option is a dropdown */


     );
}
 
export default ScheduleNewEvent;