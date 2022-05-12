import { Link } from "react-router-dom";
import useFetchEvents from "../hooks/use-fetch-events";
// import useFetch from "./useFetch";
// import useFetchProjects from "../hooks/use-fetch-projects";


//List of events inside the conference day 
const EventList = ({cid}) => {
    const {events, loading,} = useFetchEvents();
    

    console.log("event list events", events)
    // const {id} = useParams();
    //   const {data: events, isLoading} = useFetch('http://localhost:8000/events'); /* data is events because info is found in db within events */
    const getDate = (props) =>{
        const today = new Date(props);
        return today.toLocaleDateString('default', {month: 'long', day: 'numeric', year: 'numeric'});
      }
    return (

        <div className="event-list">
            {loading && <div> Loading...</div>}

           {/* {displayEvents(events)} */}

           {/* return(  */}
            
           {events && events.map((event) =>(
                <div className="c2" key ={event.meetid}>
                      
                        {event.title}
                        <br/>
                      
                    <Link to ={`/schedule/${cid}/update_event/${event.meetid}`}>
                        <button>Update Event</button>
                    </Link>     
                 

                </div>     
                

           ))}
        
        </div>
    );
}
 
export default EventList;