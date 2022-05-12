import * as React from 'react';
import Calendar from './Calendar';
import { useHistory} from "react-router-dom";
import {useState, useEffect} from 'react';
import ProjectList from './ProjectList';
import EventList from './EventList';
import {Link} from "react-router-dom";
import useFetchEvents from "../hooks/use-fetch-events";
import ScheduledEventList from './ScheduledEventList';
import axios from "../context/axios";
import useFetchConferences from '../hooks/use-fetch-conferences';

const C2 = () => {

  // const {data: events, error, isLoading} = useFetch('http://localhost:8000/events'); /* data is events because info is found in db within events */
  const history = useHistory();
  const {conferences} = useFetchConferences();
  var  pathArray = window.location.pathname.split('/');
  var cid = parseInt(pathArray[2]);
  
  // const {events, loading} = useFetchEvents();
    const handleNewEvent =(e)=>{
      history.push(`/schedule/${cid}/new_event`);
    }
    const handleCancel =(e) =>{
        history.push('/schedule');
    }
    const handleDone = (e) =>{
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
    // const [cDate, setCDate] = useState('');

  //   const getConference = async() =>{
  //     try{
  //     const result = await axios.get(`api/showroom/conference?conference_id=${cid}`,  //change to correct endpoint
  //     {
  //         headers: {"Content-Type": "application/json"},
  //         withCredentials: true
  //     }) 
  //     setCDate(result.data.payload[0].c_date);
  //     console.log ("C-Date", result.data.payload[0].c_date)
  //     } catch(error) {
  //         console.error(error.response.status);
  //         if(error.response.status = '401'){
             
  //         }
  //     }
  // };

  // useEffect(()=>{
  //    getConference();
  // }, []);

  // const formatDate2 = (date) =>{
  //   const splitDate = date.split('T');
  //   const sdate = splitDate[0].toString();
  //   // const sdate = date;
  //   console.log("date", sdate)
  //   // const stime = "00:00:00";
  //   // console.log("time", stime)

  //   return `${sdate}`;
  // }
  // var nDate = formatDate2(cDate).toString();
  // console.log("nDate c2", nDate)


  return (
    <div className="cal2">
      <div className="conf-title">
      {conferences && conferences.map((conf)=>(
        <div key={conf.cid}>
            {conf.cid === cid && (
     
      <>
      <h1>{conf.c_text}</h1>
      </> 
      )}
      </div>
      ))}
      </div>
      {/* {error && <div> {error} </div>}
      {isLoading && <div> Loading...</div>} */}
      <div className="row-conf">
       <div className="schedule-container2">
            <div className='tab'>
                 <div className="sched-buttons">
                      <button class="tablinks" onClick={e => openTab(e, 'Projects')}> IAP Projects </button>
                      <button class="tablinks" onClick={e => openTab(e, 'AllEvents')}> All Existing Events </button>
                      <button class="tablinks" onClick={e => openTab(e, 'TodayEvents')}> Today's Events </button>
                </div>
            </div>
       
           <div className="cal22">
             
               <div id="Projects" class="tabcontent">
                    <ProjectList cid={cid}/>
               </div>
               <div id="AllEvents" class="tabcontent">
                    <EventList cid={cid}/>
               </div>
               <div id="TodayEvents" class="tabcontent">
                    <ScheduledEventList cid={cid}/>
               </div>
            
             
             </div>
        </div>
           
      <div className="schedule-container">
      
        <div className="schedule-buttons">
          <button onClick={handleNewEvent}>ADD NEW EVENT</button>
          <button onClick={handleCancel} style={{ background: 'gray', marginLeft: '280px' }}>Cancel</button>
          <button onClick={handleDone} style={{ background: '#3B8D25', marginLeft: '30px' }}>Done</button>
        </div>
      
        <div className="scheduler">
          <Calendar cid={cid}/>
          {/* <Calendar newDate={formatDate2(cDate).toString()} /> */}
        </div>
      </div>
      </div>
       
    </div>
  );
};

  
// ReactDOM.render(<C2 />, document.querySelector('my-app'));
export default C2;

