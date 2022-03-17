import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const EventDeatils = () => {

    const {id} = useParams();
    const {data: event, error, isLoading} = useFetch('http://localhost:8000/events/' + id); /* data is project because we want the id of a singular project */
    const history = useHistory()

    const handleClick = () =>{
        fetch('http://localhost:8000/events/'+ event.id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/schedule');
        })
    }

    return (  
        <div className = "event-details">
            {isLoading && <div> Loading... </div>}
            {error && <div> {error} </div>}
            {event && (
                <article>
                    <h2>{event.title}</h2>
                    <p> Start Time {event.startTime}</p>
                    <p> End Time {event.endTime}</p>
                    <div>Presented By: {event.presenters}</div>
                    <button onClick = {handleClick}>Delete</button>
                </article>
            )}

        </div>
    );
}
 
export default EventDeatils;