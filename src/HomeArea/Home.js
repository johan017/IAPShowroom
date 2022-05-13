import {Link, Redirect} from "react-router-dom";
import Announcements from "./Announcements";
import useFetchEvents from "../hooks/use-fetch-events";
import React from "react";
import { useState, useEffect} from 'react';
import axios from "../context/axios";
import config from '../config/config';
import StageLiveButton from "../StageArea/StageLiveButton";
import useFetchConferences from "../hooks/use-fetch-conferences";
import useFetchGroupedEvents from "../hooks/use-fetch-events-grouped";


export default function Home({user_Role, aID, checked}) {  

  const getDate = () =>{
    const today = new Date();
    return today.toLocaleDateString('default', {month: 'long', day: 'numeric', year: 'numeric'});
  }

  const getTime = (props) =>{
    const time = config.safariPolyfill(props);
    return(new Date(time).toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'}));
  }
  const {groupedEvents} = useFetchGroupedEvents();
  console.log("groupedEvents", groupedEvents)
  const [popup, setPopup] = useState(false);
  const { events, redirect, loading} = useFetchEvents();
  const {conferences} = useFetchConferences();
  const [scheduleDate, setScheduleDate] = useState(""); // date chosen in dropdown 
  const [eventsByConf, setEventsByConf] = useState([]); //events from cid
  const [cid, setCid] = useState(); //conference to get events from 
  const [isLoading, setLoading] = useState(false);

  const CONF_EVENTS_URL = "api/showroom/schedule/events"

  const getConferenceEvents = async(c) =>{
    console.log("getconference function input: ",c)
    try{
    const result = await axios.get(CONF_EVENTS_URL+`?conference_id=${c}`,
    {
        headers: {"Content-Type": "application/json"},
        withCredentials: true
    }) 
    setEventsByConf(result.data.payload);
    } catch(error) {
        console.error(error.response.status);
    }
    setLoading(false);
}

  var modal;
  const [roomInfo, setRoomInfo] = useState('');
  const [title, setModalTitle] = useState('');


  const showSpeakers = async(pID, title) => {
    modal = document.getElementById("myModal");
    modal.style.display = "block";
    try{
      const result = await axios.get(`api/showroom/qna/info?meeting_id=${pID}`, 
      {
          headers: {"Content-Type": "application/json"},
          withCredentials: true
      }) 
      setRoomInfo(result.data.payload.project_members);
      setModalTitle(title)
      } catch(error) {
          console.error(error.response.status);
      }
  }

  const closeModal = () => {
    document.getElementById("myModal").style = "none";
  }

  window.onclick = function(event) {
    if (event.target == document.getElementById("myModal")) {
      document.getElementById("myModal").style = "none";
    }
  }


  const displayEvents = (props) => {
    const e = props;
    if(e.length>0){
      return(
        e.map((event) => {
          return (
            <div className="project-prev" key ={event.meetid}>

                <p>{getTime(event.starttime)}</p>
                <div className="project-preview">
                  <h3>{event.title}</h3> 
                  {event.projectid && ( 
                  <div>
                    <button onClick={() => {showSpeakers(event.projectid, event.title)}} >Speakers</button>  
                    <Link to ={`/rooms/${scheduleDate}/project_room/${event.projectid}`}>           
                      <button style={{marginLeft: "10px"}}>Room</button>
                    </Link>
                  
                  <div id="myModal" className="modal">
                  
                    <div id="myModal" className="modal-content">
                      <span onClick={() => {closeModal()}}className="close">&times;</span>
                      <h2>{title}</h2>
                      <h4> Student Researchers </h4>
                      {roomInfo && roomInfo.map((member)=> ( 
                        <>
                        {member.user_role === "Student Researcher" ? (
                        <li key={member.userid}>{member.first_name} {member.last_name}</li>
                        ):(<></>)}
                        </>
                      ))} 
                      <br></br>
                      <h4> Advisors </h4>
                       {roomInfo && roomInfo.map((member)=> ( 
                        <>
                        {member.user_role === "Advisor" ? (
                        <li key={member.userid}>{member.first_name} {member.last_name}</li>
                        ):(<></>)}
                        </>
                      ))} 
                    </div>
                        
                  </div>
                  </div>
                  )}
                </div>
            </div>       
          )
        })
      )
    } else {
      return(
      <div className="no-conf-event">
        {events && events.map((event)=>(
          <div key={event.meetid}>
              <div className="project-prev" key ={event.meetid}>

              <p>{getTime(event.starttime)}</p>
              <div className="project-preview">
                <h3>{event.title}</h3> 
                {event.projectid && ( 
                <div>
                  <button onClick={() => {showSpeakers(event.projectid, event.title)}} >Speakers</button>  
                  <a href ={`/project_room/${event.projectid}`}>           
                    <button style={{marginLeft: "10px"}}>Room</button>
                  </a>
                
                <div id="myModal" className="modal">
                
                  <div id="myModal" className="modal-content">
                    <span onClick={() => {closeModal()}}className="close">&times;</span>
                    <h2>{title}</h2>
                    <h4> Student Researchers </h4>
                    {roomInfo && roomInfo.map((member)=> ( 
                      <>
                      {member.user_role === "Student Researcher" ? (
                      <li key={member.userid}>{member.first_name} {member.last_name}</li>
                      ):(<></>)}
                      </>
                    ))} 
                    <br></br>
                    <h4> Advisors </h4>
                    {roomInfo && roomInfo.map((member)=> ( 
                      <>
                      {member.user_role === "Advisor" ? (
                      <li key={member.userid}>{member.first_name} {member.last_name}</li>
                      ):(<></>)}
                      </>
                    ))} 
                  </div>
                      
                </div>
                </div>
                )}
              </div>
              </div>       
          </div>
        ))}
        {!events && (
          <>
            <h3>No events currently available</h3>
          </>
        )}
    
      </div>
      )
    }

  }

  if(redirect){
    return (
      <Redirect from="*" to ="/"/>
    )
  }


  const changePopup = () =>{
    console.log(popup);
    if(popup === false){
        setPopup(true);
    } else {
        setPopup(false);
    }
    
  }

  const getDate1 = (props) =>{
        
    const day = props;
   
    console.log("day entered", day);

    console.log("day displayes", new Date(day).toLocaleDateString('default', {month: 'long', day: 'numeric', year: 'numeric'}));

    return new Date(day).toLocaleDateString('default', {month: 'long', day: 'numeric', year: 'numeric'}); //new Date(day).toISOString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});
  }

console.log("eventsByConf", eventsByConf)
  return ( 

    <div className="home">
      {loading && <div> Loading...</div>}

        <div className="home-container2"> 

          <div className="home-date-sched" style={{ borderBottom: '1px solid #8e8a8a'}}>
          <label> Schedule </label> <p>{getDate()}</p>  
          </div>
          <div className="home-container5"> 

          <label>Conference Date:</label>
          <select
            value={scheduleDate}
            onChange={(e)=>{setScheduleDate(e.target.value);getConferenceEvents(e.target.value)}}
          
          
          >
            <option value="" disabled> Choose an option</option>
            {conferences && conferences.map((conference) =>(
              <option key={conference.cid} value={conference.cid} >{conference.c_date.slice(0,10)}</option>             
            ))}
          </select>
          </div>
          {/* <h1>selected date: {scheduleDate}</h1> */}
           
                {displayEvents(eventsByConf)}
  
       </div>  

      
      <div className="home-container-3">
        <div className="home-container-4">
        <StageLiveButton user_Role={user_Role} disable={true}/>
        <button style={{backgroundColor: "white", borderColor: "white",  marginLeft: "10px", cursor: "pointer"}}onClick={()=>{changePopup();}}>
        <img
          
          width= "40px"
          height="40px"
          src="info.PNG"

        ></img></button>
        </div>
      <div className="announce-pop">

        <div className="announcements-home">
          <Announcements user_Role={user_Role} adminID={aID}/>
        </div>

          <div className="popup-rooms">
          {popup === true && (
            <div style={{ marginTop: "5px",marginRight: "30px", backgroundColor: "#a9a5a593", borderRadius: "8px"}}>
            <h3>IAP Showroom</h3> <p>(currently a Beta product)</p>

            <p>For technical support please contact us:</p>
            <p><a href=" https://www.facebook.com/IAP-Showroom-115757747789908">Facebook Page</a></p>
            <p><a href=" http://m.me/115757747789908">Direct Message on Facebook Page</a></p>
            
            </div>
          )}
          </div>
      </div>
</div>
  
    </div>   
  );
}
 
