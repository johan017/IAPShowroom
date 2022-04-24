import { Link } from "react-router-dom";
import useFetchEvents from "./hooks/use-fetch-events";
import useFetch from "./useFetch";


//List of events inside the conference day 
const EventList = () => {
    // const {events, loading,} = useFetchEvents();
    // const {id} = useParams();
      const {data: events, isLoading} = useFetch('http://localhost:8000/events'); /* data is events because info is found in db within events */


    // const displayEvents = (props) =>{
    //     const e = props;
    //     if(e.length>0){
    //     // <h2>{title}</h2>
    //         return( 
            
    //             e.map((event) =>{
    //                 return(
    //                     <div className="c2" key ={event.projectid}>
                           
    //                     <Link to ={`/event_details/${event.projectid}`}>
    //                         {event.title}
    //                         {/* <h2>Date {event.date}</h2> */}
    //                     </Link>
    //                     <Link to ={`/update_event/${event.projectid}`}>
    //                         <button style={{ background: 'blue' }}>Modify</button>
    //                     </Link>                
    //                 </div>     
    //                 )

    //             })
    //         )
    //     }else{
    //         <h3>No events currently available</h3>

    //     }

    // }
    

    return ( 

        <div className="event-list">
            {isLoading && <div> Loading...</div>}

           {/* {displayEvents(events)} */}

           {/* return(  */}
            
           {events && events.map((event) =>(
                <div className="c2" key ={event.id}>
                       
                    <Link to ={`/event_details/${event.id}`}>
                        {event.title}
                        {/* <h2>Date {event.date}</h2> */}
                    </Link>
                    <Link to ={`/update_event/${event.id}`}>
                        <button style={{ background: 'blue' }}>Modify</button>
                    </Link>                
                </div>     
                

           ))}
        
        </div>
    );
}
 
export default EventList;