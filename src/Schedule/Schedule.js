import {Link, useParams} from 'react-router-dom';
import { useState } from "react";
import Calendar from './Calendar';
import useFetch from "../useFetch";
import { useHistory, Redirect } from 'react-router-dom';
// import EventList from './EventList';
import useFetchEvents from "../hooks/use-fetch-events";
import config from "../config/config"
import { getDate } from '@progress/kendo-date-math';
import ConferenceList from './ConferenceList';
import useFetchConferences from '../hooks/use-fetch-conferences';


const Schedule = ({adminID}) => {
    
    const history = useHistory();

    const handelSchedule = () =>{
        history.push('/schedule/new_conference');
    }

    // const handleEdit =() =>{
    //     history.push('/cal');
    // }
    // const {events,redirect, loading} = useFetchEvents();

    const {conferences} = useFetchConferences();


    if(!adminID) return <Redirect from="*" to ="/home"/>


    // const getDate = () =>{
    //     // const today = props;
    //     return new Date().toLocaleDateString('default', {month: 'long', day: 'numeric', year: 'numeric'});
    //   }
    // const getTime = (props) =>{
    //     const time = config.safariPolyfill(props);
    //     return(new Date(time).toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'}));
    // }
    

    return ( 
        <div>   
            <div className="schedule-button"> 
                <button onClick={handelSchedule}>Create a New Conference</button>
            </div>
            {conferences.length <=0 &&(
                <div className="schedule-button"> 
                  <h2>No Conference Available</h2>
                </div>
            )}
            {/* TODO ADD QUERY TO GET A LIST OF EVENTS FROM DB  */}

            {conferences.length>0 && (
                // <div className="schedule-done"> 
                    <ConferenceList/>
                // </div>
            )}

        </div>
    );
}
 
export default Schedule;