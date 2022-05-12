import { Link } from "react-router-dom";
import useFetchAllEvents from "../hooks/use-fetch-all-events";
import config from "../config/config";
import { useState, useEffect } from "react";
import axios from "../context/axios";
import useFetchConferences from "../hooks/use-fetch-conferences";
// import useFetch from "./useFetch";
// import useFetchProjects from "../hooks/use-fetch-projects";


//List of events inside the conference day 
const EventList = ({cid}) => {
    const {events, loading,} = useFetchAllEvents();
    const {conferences} = useFetchConferences();
    

    console.log("event list events", events)
    // const {id} = useParams();
    //   const {data: events, isLoading} = useFetch('http://localhost:8000/events'); /* data is events because info is found in db within events */
    const getDate = (props) =>{
        const today = new Date(config.safariPolyfill(props));
        return today.toLocaleDateString('default', {month: 'long', day: 'numeric', year: 'numeric'});
      }

      
    const [conference, setConference] = useState();
   
    const getConference = async() =>{
        try{
        const result = await axios.get(`api/showroom/conference?conference_id=${cid}`,  //change to correct endpoint
        {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
        }) 
        setConference(result.data.payload);
        } catch(error) {
            console.error(error.response.status);
            if(error.response.status = '401'){
               
            }
        }
    };

    useEffect(()=>{
       getConference();
    }, []);

   
    return (

        <div className="event-list">
            {loading && <div> Loading...</div>}

           {/* {displayEvents(events)} */}

           {/* return(  */}
            
           {events && events.map((event) =>(
                <div className="c2" key ={event.meetid}>
                      
                    {conferences && conferences.map((conf)=>(
                            <div key={conf.cid}>          
                            {conf.cid === event.cid && (
                            <>
                                {conf.c_text}
                            </>
                            )}
                            </div> 
                    ))}
                   
                    <p>{getDate(event.e_date)}</p>
                       <text>{event.title}</text> 
                       <br/>
                        {/* <h2>Date {event.date}</h2> */}
                    {/* </Link> <br/> */}
                    {/* {event.projectid !== null && ( */}
                    <Link to ={`/schedule/${event.cid}/update_event/${event.meetid}`}>
                        <button>Update Event</button>
                    </Link>  
                    {/* )}        */}
                    {/* {event.projectid === null && (
                        <Link to={'/new_event'}>
                            <button>Update Event</button>
                        </Link>
                    )}    */}
                     {/* {event.projectid === null && (
                    <Link to ={`/update_event`}>
                        <button>Update Event</button>
                    </Link>  
                    )}       */}
                </div>     
                

           ))}
            
        </div>
    );
}
 
export default EventList;