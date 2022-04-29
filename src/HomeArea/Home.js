import {Link, Redirect} from "react-router-dom";
import Announcements from "./Announcements";
import useFetchEvents from "../hooks/use-fetch-events";
import React from "react";
import { useHistory } from "react-router-dom";


export default function Home({user_Role, checked}) {  
  const history = useHistory();

  const getDate = () =>{
    const today = new Date();
    return today.toLocaleDateString('default', {month: 'long', day: 'numeric', year: 'numeric'});
  }

  const getTime = (props) =>{
    const time = props;
    return(new Date(time).toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'}));
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

      <div className="home-container2">
       <div className="home-date-sched" >
         <div className="home-date-sched-1" style={{ borderBottom: '1px solid #8e8a8a'}}>
            <label> Schedule </label> <p>{getDate()}</p>  
          </div>
          {/* {checked && (<button onClick={handleStage} style={{backgroundColor: 'red'}}>STAGE LIVE</button>)}
          {!checked && (<button onClick={handleStage}>STAGE LIVE</button>)}  */}
        </div>
      </div>  

      <div className="events-home">
        {displayEvents(events)}
      </div>
      

      <div >
        <Announcements user_Role={user_Role}/>
      </div>
        
    </div>   
  );
}
 
