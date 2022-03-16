const ProjectList = ({projects, title}) => {

    // const ProjectList = ({projects, title, handleRedirect}) => {

    // const projects = props.projects;
    // const title = props.title;

    return ( 

    <div className="project-list">
        <h2>{title}</h2>
        {projects.map((project) =>(
            // Project list for schedule view in Lobby 
            <div className="project-preview" key ={project.id}>
                <h2>{project.title}</h2>
                <p>Written by {project.author} </p>
            {/* Button to enter that specific project room  */}
                {/* <button onClick={() => handleRedirect(project.id)}> Project Room </button> */}
               
            </div>
            
        ))}
    </div>
    );
}
 
export default ProjectList;