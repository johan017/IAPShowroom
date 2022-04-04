import useFetch from "./useFetch";
import {Link} from "react-router-dom";

const Home = () => {

  const {data: projects, isLoading, error} = useFetch('http://localhost:8080/projects'); /* data is projects because info is found in db within projects */

  return ( 
    <div className="home">
            {/* helps to render only when project data is available */}
            {/* conditionally output parts of template ; if left is true then it outputs the right */}
      {error && <div> {error} </div>}
      {isLoading && <div> Loading...</div>}
      <h1>Announcements</h1>
      <div className="home-date-sched" style={{ borderBottom: '1px solid #8e8a8a' }} >
        <h2> Schedule </h2> 
        <h3>March 23, 2022</h3>
      </div>
          {/* {projects && <ProjectList projects={projects} ></ProjectList>} */}
        {projects && projects.map((project) =>(
            // Project list for schedule view in Lobby 
        <div className="project-preview" key ={project.id}>
          <h2>{project.title}</h2>
           <Link to={`/project_room/${project.id}`}>
              <button>Speakers</button>  
            </Link> 
            
            <Link to ={`/project_room/${project.id}`}>           
              <button>Room</button>

                      {/* <p>Written by {project.author} </p> */}
            </Link>

            
                
          </div>
        ))}
        {/* <button sytle={{background: 'red'}}> Project Room</button> */}
      </div>   
  );
}
 
export default Home;