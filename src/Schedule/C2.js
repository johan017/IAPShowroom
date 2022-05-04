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
  // const {events, loading} = useFetchEvents();

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

    function openTab(evt, tabName) {
      var i, tabcontent, tablinks;
    
      // Get all elements with class="tabcontent" and hide them
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
    
      // Get all elements with class="tablinks" and remove the class "active"
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
    
      // Show the current tab, and add an "active" class to the button that opened the tab
      document.getElementById(tabName).style.display = "block";
      evt.currentTarget.className += " active";
    }


  return (
    <div className="cal2">
      {/* {error && <div> {error} </div>}
      {isLoading && <div> Loading...</div>} */}
       <div className="schedule-container">
            <div className='tab'>
                 <div className="sched-buttons">
                      <button class="tablinks" onClick={e => openTab(e, 'Projects')}> IAP Projects </button>
                      <button class="tablinks" onClick={e => openTab(e, 'AllEvents')}> All Existing Events </button>
                      <button class="tablinks" onClick={e => openTab(e, 'TodayEvents')}> Today's Events </button>
                </div>
            </div>
       
           <div className="cal22">
             
               <div id="Projects" class="tabcontent">
                    <ProjectList/>
               </div>
               <div id="AllEvents" class="tabcontent">
                    <EventList/>
               </div>
               <div id="TodayEvents" class="tabcontent">
                    <ScheduledEventList/>
               </div>
            
             
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

