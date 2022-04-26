
import {Link, Redirect} from "react-router-dom";
import Announcements from "./Announcements";
import useFetchEvents from "../hooks/use-fetch-events";
import React from "react";
import { useHistory } from "react-router-dom";


export default function Home({user_Role, checked}) {  
  // chatContainer = React.createRef();
  const history = useHistory();

  const getTime = (props) =>{
    const time = props;
    return(new Date(time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
  }

  const {
    events,
    redirect,
    loading
  } = useFetchEvents();

  const displayEvents = (props) => {
    const e = props;
    if(e.length>0){
      return(
        e.map((event) => {
          return (
          // event list for schedule view in Lobby 
          <div className="project-prev" key ={event.meetid}>
                <p>{getTime(event.starttime)}</p>
            <div className="project-preview">
              <h2>{event.title}</h2>  <br/>
              <Link to={`/project_room/${event.meetid}`}>
                <button>Speakers</button>  
              </Link> 
              <Link to ={`/project_room/${event.meetid}`}>           
                <button>Room</button>
                      {/* <p>Written by {project.author} </p> */}
              </Link>
            </div>
          </div>
          )
        })
        )
    } else {
      <h3>No events currently available</h3>
    }

  }

  if(redirect){
    return (
      <Redirect from="*" to ="/"/>
    )
  }
  const handleStage = () =>{
    history.push('/stage');
}

  return ( 
    <div className="home">
      {loading && <div> Loading...</div>}
      <div className="home-button">
      {checked && (<button onClick={handleStage} style={{backgroundColor: 'red'}}>STAGE LIVE</button>)}
      {!checked && (<button onClick={handleStage}>STAGE LIVE</button>)}
      </div>
      <div className="home-date-sched" >
        {/* TODO: CHANGE TO A METHOD AND ACCESPT CHECKED AS PARAMETER */}
       


        <div style={{ borderBottom: '1px solid #8e8a8a', width: '100%',marginLeft:'15px' }} >

          <label> Schedule </label> <p>March 23, 2022</p>   
        </div>
        <text>Announcements</text>
      </div> 
     
      <div className="home-announcements">
        
        <Announcements user_Role={user_Role}/>
      </div>
      <div className="events-home">
        {displayEvents(events)}
      </div>
    </div>   
  );
}
 
