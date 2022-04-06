import {Link} from "react-router-dom";
import useFetchProjects from "./hooks/use-fetch-projects";

export default function Home() {  
  const {
    projects,
    loading,
  } = useFetchProjects();

  const displayEvents = (props) => {
    const p = props;
    if(p.length>0){
      return(
        p.map((project) => {
          return (
          // Project list for schedule view in Lobby 
          <div className="project-preview" key ={project.projectid}>
          <h2>{project.title}</h2>
          <Link to={`/project_room/${project.projectid}`}>
            <button>Speakers</button>  
          </Link> 
          <Link to ={`/project_room/${project.projectid}`}>           
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
      {displayEvents(projects)}
      </>
    </div>   
  );
}
 
