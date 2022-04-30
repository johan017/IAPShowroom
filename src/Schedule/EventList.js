import { Link } from "react-router-dom";
import useFetchEvents from "../hooks/use-fetch-events";
// import useFetch from "./useFetch";
// import useFetchProjects from "../hooks/use-fetch-projects";


//List of events inside the conference day 
const EventList = () => {
    const {events, loading,} = useFetchEvents();
    // const {id} = useParams();
    //   const {data: events, isLoading} = useFetch('http://localhost:8000/events'); /* data is events because info is found in db within events */

    return (

        <div className="event-list">
            {loading && <div> Loading...</div>}

           {/* {displayEvents(events)} */}

           {/* return(  */}
            
           {events && events.map((event) =>(
                <div className="c2" key ={event.meetid}>
                       {/* {project.projectid} */}
                    <Link to ={`/event_details/${event.meetid}`}>
                        {event.title}
                        {/* <h2>Date {event.date}</h2> */}
                    </Link> <br/>
                    <Link to ={`/update_event/${event.meetid}`}>
                        <button>Modify</button>
                    </Link>                
                </div>     
                

           ))}
        
        </div>
    );
}
 
export default EventList;