// import ProjectRoom from "./ProjectRoom";
import useFetch from "./useFetch";
import {Link} from "react-router-dom";


const Rooms = () => {

    const {data: projects, isLoading, error} = useFetch('http://localhost:8000/projects'); /* data is projects because info is found in db within projects */

    return ( 
        <div>
            <h2> ROOMS </h2>

            {error && <div> {error} </div>}
            {isLoading && <div> Loading...</div>}
            {/* <h1>Announcements</h1> */}
          {/* <div className="home-date-sched"> */}
            {/* <h2> Schedule March23,2022</h2> */}
          {/* </div> */}
          {/* {projects && <ProjectRoom projects={projects} ></ProjectRoom>} */}
          {/* <button sytle={{background: 'red'}}> Project Room</button> */}

          {projects && projects.map((project) =>(
            // Project list for schedule view in Lobby 
          <div className="project-preview" key ={project.id}>
            <Link to ={`/project_room/${project.id}`}> 
              <h2>{project.title}</h2>
                      {/* <p>Written by {project.author} </p> */}
            </Link>
            <img
                src = "company_rep.png"
                alt="display image"
            />  <text>100</text>
           
            <img
                src = "users.png"
                alt="display image"
            /><text>15</text> 
                           
          </div>
        ))}
        </div>

    );
}
 
export default Rooms;