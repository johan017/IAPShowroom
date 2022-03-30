import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import ConferenceList from "./ConferenceList";



const ScheduleCreate = () => {

    const {id} = useParams();
    const {data: conferences} = useFetch('http://localhost:8000/conference-info'); /* data is events because info is found in db within events */
    // const {data: conferenceDay} = useFetch('http://localhost:8000/events/' + id); /* data is project because we want the id of a singular project */
    // const [isLoading, setIsLoading] = useState(false); // when first loading the page the POST request is not being made; only after sumbitting form is when request is made
    const history = useHistory();

    // const {data: academicSessions} = useFetch('http://localhost:8000/academicSessions'); /* data is projects because info is found in db within projects */
    
    // const handleSchedule = (e) =>{
    //     e.preventDefault();
    //     history.push('/new_event');
    // }
    const handleNext = (e) =>{
        e.preventDefault();
        history.push('/schedule/review');
    }
    
        return (
        <div>
           
            {/* PRESENT ALL DAYS AND CALENDAR */}
            {conferences && <ConferenceList conferences={conferences} title="Conference List"></ConferenceList>}
            {/* <button onClick = {handleSchedule}>Add Event</button> */}
            <button onClick = {handleNext}>Next</button>

        </div>

    );
}
 
export default ScheduleCreate;