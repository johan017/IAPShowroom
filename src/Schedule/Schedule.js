import {Link, useParams} from 'react-router-dom';
import { useState } from "react";
import Calendar from './Calendar';
import useFetch from "../useFetch";
import { useHistory } from 'react-router-dom';


const Schedule = () => {
    const {id} = useParams();
    const {data: schedule} = useFetch('http://localhost:8000/events/'); /* data is project because we want the id of a singular project */
    const scheduleDone =0;

    const history = useHistory();

    const handleEdit =() =>{
        history.push('/cal');
    }

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
                    <h2>Schedule Main</h2> 

                    <Calendar/>
                    <button onClick={handleEdit} >Edit Schedule</button>
                </div>

            )}

            
        </div>
    );
}
 
export default Schedule;