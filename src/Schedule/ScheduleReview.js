// import useFetch from "../useFetch";
import Calendar from './Calendar';

import { useHistory } from "react-router-dom";
import useFetchEvents from "../hooks/use-fetch-events";

// import { Calendar } from "@progress/kendo-react-dateinputs";



const ScheduleReview = () => {
    
    const history = useHistory();
    const {events,redirect, loading} = useFetchEvents();


    const getDate = (props) =>{
        const today = props;
        return new Date(today).toLocaleDateString('default', {month: 'long', day: 'numeric', year: 'numeric'});
      }
    const getTime = (props) =>{
        const time = props;
        return(new Date(time).toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'}));
    }
    const displayEvents = (props) => {
        const e = props;
        if(e.length>0){
            // setScheduleDone(true);
          return(
            e.map((event) => {
              return (
              // event list for schedule view in Lobby 
              <div className="schedule-prev" key ={event.projectid}>
                  

                    <p>{getDate(event.starttime)}</p>
                    <text>{getTime(event.starttime)}</text>
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
    const handleSubmit = (e) =>{
        e.preventDefault();
        // const event = {title, startTime, endTime, presenters};
        // setIsLoading(true); //before submitting

        // fetch('http://localhost:8000/events', {
        //     method: 'POST',
        //     headers: {"Content-Type": "application/json"},
        //     body: JSON.stringify(event)
        // }).then (() => {
        //     console.log('new event added');
        //     setIsLoading(false); //when form is submitted; completed
        // })
        history.push('/schedule');

    }
    const handleBack = (e) =>{
        e.preventDefault();
        history.push('/cal');

    }

    return ( 
        <div className="review-page">
            <h2>REVIEW PAGE</h2> 
            <button onClick={handleBack} style={{ background: 'gray'}}>Back</button>
            <button onClick = {handleSubmit} style={{ marginLeft: '30px' }}>Submit</button>
            {/* <Calendar/> */}
            {displayEvents(events)}
           
        </div>
    );
}
 
export default ScheduleReview;