import {Link, useParams} from 'react-router-dom';
import { useState } from "react";
import Calendar from './Calendar';
import useFetch from "../useFetch";
import { useHistory, Redirect } from 'react-router-dom';
// import EventList from './EventList';
import useFetchEvents from "../hooks/use-fetch-events";
import config from "../config/config"
import { getDate } from '@progress/kendo-date-math';



const Schedule = ({adminID}) => {
    
    const history = useHistory();

    const handelSchedule = () =>{
        history.push('/cal');
    }

    const handleEdit =() =>{
        history.push('/cal');
    }
    const {events,redirect, loading} = useFetchEvents();

    if(!adminID) return <Redirect from="*" to ="/home"/>

    const displayEvents = (props) => {
        const e = props;
        if(e.length>0){
            // setScheduleDone(true);
          return(
            e.map((event) => {
              return (
              // event list for schedule view in Lobby 
              <>
              {/* <h2>{getDate()}</h2> */}
              <div className="schedule-prev" key ={event.projectid}>
                  <text>{getTime(event.starttime)}</text>
                  <h4>{event.title}</h4> 
                  
              </div>
              </>
              )
            })
            )
        } else {
            // setScheduleDone(false);
          <h3>No events currently available</h3>
        }
    }

    const getDate = () =>{
        // const today = props;
        return new Date().toLocaleDateString('default', {month: 'long', day: 'numeric', year: 'numeric'});
      }
    const getTime = (props) =>{
        const time = config.safariPolyfill(props);
        return(new Date(time).toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'}));
    }
    

    return ( 
        <div>   
            
            {events.length <=0 &&(
                // <Link to="/create_day">
                <div className="schedule-button"> 
                    
                    <button onClick={handelSchedule}>Create Schedule</button>
                  <h2>No Schedule Available</h2>
                </div>
                // </Link>
            )}
            {/* TODO ADD QUERY TO GET A LIST OF EVENTS FROM DB  */}

            {events.length>0 && (
                <div className="schedule-done"> 
                    <h1>Schedule Main</h1>  <button onClick={handleEdit} >Edit Schedule</button>
                    <h2>{getDate()}</h2>
                    
                    {displayEvents(events)}

                    {/* <EventList></EventList> */}
                    {/* <Calendar/> */}
                   
                </div>

            )}

            
        </div>
    );
}
 
export default Schedule;