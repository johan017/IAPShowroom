// import EventList from "./EventList";
import useFetch from "../useFetch";
import { useHistory } from "react-router-dom";
import { useState } from "react";


const ScheduleDay = () => {
    // const {id} = useParams();
    const [isLoading, setIsLoading] = useState(false); // when first loading the page the POST request is not being made; only after sumbitting form is when request is made


    // const {data: events, error} = useFetch('http://localhost:8000/events'); /* data is events because info is found in db within events */
    // const {data: conferenceDay} = useFetch('http://localhost:8000/events/' + id); /* data is project because we want the id of a singular project */

    const {data: academicSessions,error} = useFetch('http://localhost:8000/academicSessions'); /* data is projects because info is found in db within projects */

    const history = useHistory();
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [timeLimit, setTimeLimit] = useState('');
    const [academicSession, setAcademicSession] = useState('');
    // const [day, setDay] = useState(1);

    const handleSchedule = (e) =>{
        e.preventDefault();
        const event = {date, startTime, timeLimit, academicSession};
        setIsLoading(true); //before submitting

        fetch('http://localhost:8000/conference-info', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(event)
        }).then (() => {
            console.log('new event added');
            setIsLoading(false); //when form is submitted; completed
        })
        history.push('/cal');
    }
    const handleCancel =(e) =>{
        history.push('/schedule');
    }

    return ( 

    <div className="schedule">
        {/* helps to render only when project data is available */}
        {/* conditionally output parts of template ; if left is true then it outputs the right */}
      {error && <div> {error} </div>}
      {isLoading && <div> Loading...</div>}
      
      <h2>Conference Information </h2>
      <form>
        <label>Date of Conference: </label>
        <input 
            type="date" 
            required 
            value = {date}
            onChange = {(e) => setDate(e.target.value)}
        />
        <label>Conference Start Time: </label>
        <input 
            type="datetime-local" 
            required 
            value = {startTime}
            onChange = {(e) => setStartTime(e.target.value)}
        />
        <label>Time Limit for Presentations: </label>
        <input 
            type= "number"
            required 
            value = {timeLimit}
            onChange = {(e) => setTimeLimit(e.target.value)}
        />
        <label>Academic Session: </label>
        <select 
            required 
            value = {academicSession}
            onChange = {(e) => setAcademicSession(e.target.value)}
        >
          {academicSessions && academicSessions.map((academicSession) =>(
                            <option key={academicSession.id} value={academicSession.session} >{academicSession.session}</option>             
                        ))}
        </select>

      </form>
      <button style={{ background: '#008DED' }} onClick = {handleCancel}>Cancel</button>
      <button style={{ background: '#3B8D25' }} onClick = {handleSchedule}>Next</button>


      </div> 
    );
}
export default ScheduleDay;