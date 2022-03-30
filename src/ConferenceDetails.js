import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import EventList from "./EventList";
import { Link } from "react-router-dom";


const ConferenceDeatils = () => {

    const {id} = useParams();
    const {data: conference, error, isLoading} = useFetch('http://localhost:8000/conference-info/' + id); /* data is project because we want the id of a singular project */
    const history = useHistory();
    const {data: events} = useFetch('http://localhost:8000/events'); /* data is events because info is found in db within events */


    const handleClick = () =>{
        fetch('http://localhost:8000/conference-info/'+ conference.id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/schedule');
        })
    }

    const handleSchedule = (e) =>{
        e.preventDefault();
     
        history.push('/create_schedule');
    }

    return (  
        <div className = "event-details">
            {isLoading && <div> Loading... </div>}
            {error && <div> {error} </div>}
            {conference && (
                <div>
                     <h2>Calendar</h2>
                    <h2>Conference Day {conference.day}</h2>
                    <h2>Academic Session {conference.academicSession}</h2>
                    <h2>Date:{conference.date}</h2>
                    {/* <p> Start Time {event.startTime}</p>
                    <p> End Time {event.endTime}</p>
                    <div>Presented By: {event.presenters}</div> */}
                    {events && <EventList events={events} title="Events List"></EventList>}
                    <Link to="/new_event">
                        {!isLoading && <button>Add Event</button>} {/** adds the new event  */}
                        {/* {isLoading && <button disabled>Adding Event...</button>} * add event button disabled while loading  */}
                    </Link>
                    <button onClick = {handleClick}>Delete</button>
                    <button style={{ background: '#3B8D25' }} onClick = {handleSchedule}>Next</button>

                </div>
            )}

        </div>
    );
}
 
export default ConferenceDeatils;