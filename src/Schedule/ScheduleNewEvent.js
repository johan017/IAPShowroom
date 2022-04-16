import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "../useFetch";



const ScheduleNewEvent = () => {
    const {id} = useParams();
    // const {data: conference, error}= useFetch('http://localhost:8000/conference-info/' + id); /* data is project because we want the id of a singular project */
  
    const [title, setTitle] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [isLoading, setIsLoading] = useState(false); // when first loading the page the POST request is not being made; only after sumbitting form is when request is made
    const history = useHistory();



    const handleSubmit = (e) =>{
        e.preventDefault();
        const event = {title, start, end};
        setIsLoading(true); //before submitting

        fetch('http://localhost:8000/events', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(event)
        }).then (() => {
            console.log('new event added');
            setIsLoading(false); //when form is submitted; completed
        })
        //need to go back to a specific id of conference details(not working)
        history.push('/create_schedule');

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
                    type="time"
                    required
                    value = {start}
                    onChange = {(e) => setStart(e.target.value)}

                ></input>
                <label>End Time: </label>
                <input 
                    type="time" 
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