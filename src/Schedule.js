import EventList from "./EventList";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom";


const Schedule = () => {
    const {data: events, isLoading, error} = useFetch('http://localhost:8000/events'); /* data is events because info is found in db within events */
    const history = useHistory();

    const handleClick = (e) =>{
        e.preventDefault();
        history.push('/schedule/new_event');
    }

    return ( 

    <div className="schedule">
        {/* helps to render only when project data is available */}
        {/* conditionally output parts of template ; if left is true then it outputs the right */}
      {error && <div> {error} </div>}
      {isLoading && <div> Loading...</div>}
      {events && <EventList events={events} title="Event List"></EventList>}
      <button onClick = {handleClick}>Add a New Event</button>
    </div> 
    );
}
 
export default Schedule;