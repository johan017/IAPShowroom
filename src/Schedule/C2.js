import * as React from 'react';
import Calendar from './Calendar';
import { useHistory} from "react-router-dom";
import {useState} from 'react';
import ProjectList from './ProjectList';
import EventList from './EventList';
import {Link} from "react-router-dom";
import useFetchEvents from "../hooks/use-fetch-events";
import ScheduledEventList from './ScheduledEventList';

const C2 = () => {

  // const {data: events, error, isLoading} = useFetch('http://localhost:8000/events'); /* data is events because info is found in db within events */
  const history = useHistory();

  const {events, loading} = useFetchEvents();

    const handleNewEvent =(e)=>{
      history.push('/new_event');
    }
    const handleCancel =(e) =>{
        history.push('/schedule');
    }
    const handleNext = (e) =>{
        e.preventDefault();
        history.push('/schedule');
    }

    const [projtab, setProjTab] = useState(false);

    const [etab, setETab] = useState(false);
    /** los eventos que son projects no devuelven abstracts */
    const showProjects = () =>{
        if(projtab === false){
          setProjTab(true);
        }else{
          setProjTab(false);
        }
    }
    const showEvents = () =>{
      if(etab === true){
          setETab(false);
      }else{
        setETab(true);
      }
  }
  return (
    <div className="cal2">
      {/* {error && <div> {error} </div>}
      {isLoading && <div> Loading...</div>} */}
       <div className="schedule-container">
       <div className="sched-buttons">
       <button onClick={() => showProjects()}> IAP Projects </button>
       <button onClick={() => showEvents()}> All Existing Events </button>
       </div>
      <div className="cal22">
        
        {projtab === true && (
          <ProjectList></ProjectList>
        )}
         {etab === true && (
          <EventList></EventList>
         )} 
        {<ScheduledEventList/>}




      </div>
      </div>
      
      <div className="schedule-container">
      
        <div className="schedule-buttons">
          <button onClick={handleNewEvent}>ADD NEW EVENT</button>
          <button onClick={handleCancel} style={{ background: 'gray', marginLeft: '280px' }}>Cancel</button>
          <button onClick={handleNext} style={{ background: '#3B8D25', marginLeft: '30px' }}>Next</button>
        </div>
      
        <div className="scheduler">
          <Calendar/>
        </div>
      </div>
        {/* <div className="scheduler">
          <Calendar/>
        </div>
       */}
      
    </div>
  );
};
  
// ReactDOM.render(<C2 />, document.querySelector('my-app'));
export default C2;

