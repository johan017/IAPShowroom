// import ProjectRoom from "./ProjectRoom";
import useFetch from "../useFetch";
import {Link} from "react-router-dom";
import useFetchProjects from "../hooks/use-fetch-projects";



const Rooms = () => {

    // const {data: projects, isLoading, error} = useFetch('http://localhost:8000/projects'); /* data is projects because info is found in db within projects */
    const {projects, loading,} = useFetchProjects();


    return ( 
        <div>
            <h2> ROOMS </h2>

            {/* {error && <div> {error} </div>} */}
            {loading && <div> Loading...</div>}
            

          {projects && projects.map((project) =>(
            // Project list for schedule view in Lobby 
          <div className="project-preview" key ={project.id}>
            <label><Link to ={`/project_room/${project.id}`}> 
              {project.title}
            </Link></label><label>
            <img
                src = "company_rep.png"
                alt="display image"
            />  <text>100</text>
           </label><label>
            <img
                src = "users.png"
                alt="display image"
            /><text>15</text> 
            </label>      
          </div>
        ))}
        </div>

    );
}
 
export default Rooms;