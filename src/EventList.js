import { Link } from "react-router-dom";


const EventList = ({events, title}) => {

    return ( 

        <div className="event-list">
            <h2>{title}</h2>
            {events.map((event) =>(
                // Project list for schedule view in Lobby 
                <div className="event-list-preview" key ={event.id}>
                    <Link to ={`/events_details/${event.id}`}> 
                        <h2>{event.title}</h2>
                    </Link>
                
                    {/* Button to enter that specific project room  */}
                    {/* <button onClick={() => handleRedirect(project.id)}> Project Room </button> */}
                
                </div>     
            ))}
        </div>
    );
}
 
export default EventList;