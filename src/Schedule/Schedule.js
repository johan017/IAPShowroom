import {Link, useParams} from 'react-router-dom';
import { useState } from "react";
import Calendar from './Calendar';
import useFetch from "../useFetch";

const Schedule = () => {
    const {id} = useParams();
    const {data: schedule} = useFetch('http://localhost:8000/events/'+id); /* data is project because we want the id of a singular project */
    const scheduleDone =0;

    return ( 
        <div>   
            
            {!schedule &&(
                <Link to="/create_day">
                    <button>Create Schedule</button>
                </Link>
            )}
            {/* TODO ADD QUERY TO GET A LIST OF EVENTS FROM DB  */}

            {schedule && (
                <div> 
                    <h2>Schedule Main</h2> <button>Edit Schedule</button>

                    <Calendar/>
                </div>

            )}

            
        </div>
    );
}
 
export default Schedule;