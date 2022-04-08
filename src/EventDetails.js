import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import EventList from "./EventList";
import {Link} from  "react-router-dom";

const EventDetails = () => {

    const {id} = useParams();
    const {data: event, error, isLoading} = useFetch('http://localhost:8000/events/' + id); /* data is project because we want the id of a singular project */
    const history = useHistory();
    // const {data: conference} = useFetch('http://localhost:8000/conference-info/' + id); /* data is project because we want the id of a singular project */

    // const {data: events, isLoading, error} = useFetch('http://localhost:8000/events'); /* data is events because info is found in db within events */
    // console.log(event);


    const handleClick = () =>{
        history.push("/cal");
    //     fetch('http://localhost:8000/events/'+ event.id, {
    //         method: 'DELETE'
    //     }).then(() => {
    //         history.push('/schedule');
    //     })
    }

    // const handleSchedule = (e) =>{
    //     e.preventDefault();
    //     // history.push("/event_details/"+data.id);
    //     history.push("/conference_details/"+ conference.id);
    // }

    return (  
        <div className = "event-details">
            {isLoading && <div> Loading... </div>}
            {error && <div> {error} </div>}
            {/* {events && (events.map((event) =>( */}
            {event && (

                <div  key={event.id}>
           
                        <h1>Event Details</h1>
                        <h2>Title: </h2>{event.title}
                    
                        <h2>Start: </h2>
                        <input type="datetime-local"                 
                               defaultValue={event.start}
                               disabled = {true}
                        />
                        <h2>End: </h2>
                        <input type="datetime-local"                 
                               defaultValue={event.end}
                               disabled = {true}
                        />
                        <br/>
                       
                        <button style={{ background: '#3B8D25' }} onClick={handleClick}>Back</button>
                       
                </div>
            )}
            {/* )))} */}

        </div>
    );
}
 
export default EventDetails;