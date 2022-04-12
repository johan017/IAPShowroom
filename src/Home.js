
import {Link, Redirect} from "react-router-dom";
import useFetchEvents from "./hooks/use-fetch-events";


export default function Home() {  
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
          // if projectid == null, it s

          return (
          // event list for schedule view in Lobby 
          <div className="project-preview" key ={event.eventid}>
          <h2>{event.title}</h2>
          <Link to={`/project_room/${event.projectid}`}>
            <button>Speakers</button>  
          </Link> 
          <Link to ={`/project_room/${event.projectid}`}>           
            <button>Room</button>
                  {/* <p>Written by {project.author} </p> */}
          </Link>
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

  return ( 
    <div className="home">
            {/* helps to render only when project data is available */}
            {/* conditionally output parts of template ; if left is true then it outputs the right */}
      {loading && <div> Loading...</div>}
      <h1>Announcements</h1>
      <div className="home-date-sched" style={{ borderBottom: '1px solid #8e8a8a' }} >
        <h2> Schedule </h2> 
        <h3>March 23, 2022</h3>
      </div>
      <>
      {displayEvents(events)}
      </>
    </div>   
  );
}
 
