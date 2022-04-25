import {Link, useParams} from 'react-router-dom';
import { useState } from "react";
import Calendar from './Calendar';
import useFetch from "../useFetch";
import { useHistory } from 'react-router-dom';
import EventList from './EventList';
import useFetchEvents from "../hooks/use-fetch-events";



const Schedule = () => {
    
    const history = useHistory();

    const handelSchedule = () =>{
        history.push('/cal');
    }

    const handleEdit =() =>{
        history.push('/cal');
    }
    const {events,redirect, loading} = useFetchEvents();

    const displayEvents = (props) => {
        const e = props;
        if(e.length>0){
            // setScheduleDone(true);
          return(
            e.map((event) => {
              return (
              // event list for schedule view in Lobby 
              <div className="schedule-prev" key ={event.projectid}>
                    <p>{getTime(event.starttime)}</p>
                  <h2>{event.title}</h2> 
                  
              </div>
              )
            })
            )
        } else {
            // setScheduleDone(false);
          <h3>No events currently available</h3>
        }
    }

    const getTime = (props) =>{
        const time = props;
    
        const eventDate = new Date(time);
        var eventHours = eventDate.getHours();
        const ampm = eventHours >=12? 'PM' : 'AM';
        eventHours = (eventHours%12) || 12;
        const eventMinutes = String(eventDate.getMinutes()).padStart(2, '0');
        const eventTime = eventHours+":"+eventMinutes+" "+ampm;
    
        // var eventMinute =new Date(time).getMinutes;
        console.log("hours", eventTime);
        return(eventTime);
    }

    return ( 
        <div>   
            
            {!events &&(
                // <Link to="/create_day">
                    <button onClick={handelSchedule}>Create Schedule</button>
                // </Link>
            )}
            {/* TODO ADD QUERY TO GET A LIST OF EVENTS FROM DB  */}

            {events && (
                <div className="schedule-button"> 
                    <h2>Schedule Main</h2>  <button onClick={handleEdit} >Edit Schedule</button>
                    {displayEvents(events)}

                    {/* <EventList></EventList> */}
                    {/* <Calendar/> */}
                   
                </div>

            )}

            
        </div>
    );
}
 
export default Schedule;