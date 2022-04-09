// import ProjectRoom from "./ProjectRoom";
import useFetch from "../useFetch";
import {Link} from "react-router-dom";
import useFetchEvents from "../hooks/use-fetch-events";



const Rooms = () => {

    // const {data: projects, isLoading, error} = useFetch('http://localhost:8000/projects'); /* data is projects because info is found in db within projects */
    const {events, loading,} = useFetchEvents();


    return ( 
        <div>
            <h2> ROOMS </h2>

            {/* {error && <div> {error} </div>} */}
            {loading && <div> Loading...</div>}
            

          {events && events.map((event) =>(
            // Project list for schedule view in Lobby 
          <div className="project-preview" key ={event.id}>
            <label><Link to ={`/project_room/${event.id}`}> 
              {event.title}
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