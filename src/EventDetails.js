import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import EventList from "./EventList";
import {Link} from  "react-router-dom";

const EventDetails = () => {

    const {id} = useParams();
    const {data: event, error, isLoading} = useFetch('http://localhost:8000/events/' + id); /* data is project because we want the id of a singular project */
    const history = useHistory();
    const {data: conference} = useFetch('http://localhost:8000/conference-info/' + id); /* data is project because we want the id of a singular project */

    // const {data: events} = useFetch('http://localhost:8000/events'); /* data is events because info is found in db within events */


    const handleClick = () =>{
        fetch('http://localhost:8000/events/'+ event.id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/schedule');
        })
    }

    const handleSchedule = (e) =>{
        e.preventDefault();
        // history.push("/event_details/"+data.id);
        history.push("/conference_details/"+ conference.id);
    }

    return (  
        <div className = "event-details">
            {isLoading && <div> Loading... </div>}
            {error && <div> {error} </div>}
            {event && (
                <div>
                    <h2>Event Details</h2>
                    <h2>{event.title}</h2>
                    {/* <h2>Academic Session {event.academicSession}</h2> */}
                    <h2>Date: {event.date}</h2>
                    <h2>Start: {event.startTime}</h2>
                    {/* <p> Start Time {event.startTime}</p>
                    <p> End Time {event.endTime}</p>
                    <div>Presented By: {event.presenters}</div> */}
                    {/* {events && <EventList events={events} title="Events List"></EventList>} */}

                    <button onClick = {handleClick}>Delete</button>
                    {/* <Link to ={`/event_details/${event.id}`}> */}
                        <button onClick={handleSchedule} style={{ background: '#3B8D25' }}>Back</button>
                    {/* </Link> */}

                     <Link to ={"/update_event/"+event.id}>
                     <button style={{ background: 'blue' }}>Modify</button>
                    </Link>
                </div>
            )}

        </div>
    );
}
 
export default EventDetails;