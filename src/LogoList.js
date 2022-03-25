// import { Link } from "react-router-dom";


const LogoList = ({logos}) => {

    // const ProjectList = ({projects, title, handleRedirect}) => {

    // const projects = props.projects;
    // const title = props.title;

    return ( 

    <div className="project-list">
       
        {logos.map((logo) =>(
            // Project list for schedule view in Lobby 
            <div className="logo-preview" key ={logo.id}>
               <img
                src = {logo.url}
                alt="display image"
                />
            </div>
            
        ))}
    </div>
    );
}
 
export default LogoList;