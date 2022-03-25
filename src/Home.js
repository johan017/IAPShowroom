import ProjectList from "./ProjectList";
import useFetch from "./useFetch";

const Home = () => {

   const {data: projects, isLoading, error} = useFetch('http://localhost:8000/projects'); /* data is projects because info is found in db within projects */


    // // While pressing Project Room button, redirects to that page
    // const handleRedirect = (id) =>{
    //     const newProjects = projects.filter(project => project.id !== id);
    //     setProjects(newProjects);
    // }

    return ( 
        <div className="home">
            {/* helps to render only when project data is available */}
            {/* conditionally output parts of template ; if left is true then it outputs the right */}
          {error && <div> {error} </div>}
          {isLoading && <div> Loading...</div>}
          <h1>Announcements</h1>
          <div className="home-date-sched">
            <h2> Schedule March23,2022</h2>
          </div>
          {projects && <ProjectList projects={projects} ></ProjectList>}
        </div>   
    );
}
 
export default Home;