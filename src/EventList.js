import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom";
import useFetch from "./useFetch";


//List of events inside the conference day 
const EventList = ({events, title}) => {
    // const {id} = useParams();

    // const {data: conference} = useFetch('http://localhost:8000/conference-info/' + id); /* data is project because we want the id of a singular project */

    return ( 

        <div className="event-list">
            <h2>{title}</h2>
            {events.map((event) =>(
                // Project list for schedule view in Lobby 
                <div className="c2" key ={event.id}>
                    <Link to ={`/event_details/${event.id}`}>
                        <h2>Title:  {event.title}</h2>
                        {/* <h2>Date {event.date}</h2> */}
                    </Link>
                    <Link to ={`/update_event/${event.id}`}>
                        <button style={{ background: 'blue' }}>Modify</button>
                    </Link>
                
                    {/* Button to enter that specific project room  */}
                    {/* <button onClick={() => handleRedirect(project.id)}> Project Room </button> */}
                
                </div>     
            ))}
        </div>
    );
}
 
export default EventList;