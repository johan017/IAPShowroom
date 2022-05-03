import { Link } from "react-router-dom";
import useFetchEvents from "../hooks/use-fetch-events";
// import useFetch from "./useFetch";
import useFetchProjects from "../hooks/use-fetch-projects";


//List of events inside the conference day 
const ProjectList = () => {
    const {projects, loading,} = useFetchProjects();
    const {events} = useFetchEvents();

    var eventsList = new Set();

    events.forEach(e =>{
        if(e.projectid) eventsList.add(e.projectid);
    })

    return (

        <div className="event-list">
            {loading && <div> Loading...</div>}

           {projects && projects.map((project) =>(
                <div key ={project.project_id}>
                    {!eventsList.has(project.project_id) && (
                        <div className="c2">
                            {project.title}
                            <Link to ={`/update_event/${project.project_id}`}>
                                <button>Modify</button>
                            </Link> 
                        </div>
                    )}
                </div>     
            ))}
        
        </div>
    );
}
 
export default ProjectList;