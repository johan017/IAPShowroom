import { useParams } from "react-router";
import useFetch from "./useFetch";

const ProjectRoom = () => {

    const {id} = useParams();
    const {data: project, error, isLoading} = useFetch('http://localhost:8000/projects/' + id); /* data is project because we want the id of a singular project */

    return (  
        <div className = "project-room">
            {isLoading && <div> Loading... </div>}
            {error && <div> {error} </div>}
            {project && (
                <article>
                    <h2>{project.title}</h2>
                    <p> Wrritten by {project.author}</p>
                    <div>{project.body}</div>
                </article>
            )}

        </div>
    );
}
 
export default ProjectRoom;