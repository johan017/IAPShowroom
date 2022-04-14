// import ProjectRoom from "./ProjectRoom";
import useFetch from "../useFetch";
import {Link} from "react-router-dom";
import useFetchEvents from "../hooks/use-fetch-events";
import useFetchRoomStats from"../hooks/use-fetch-room-stats";



const Rooms = () => {

  // const {data: projects, isLoading, error} = useFetch('http://localhost:8000/projects'); /* data is projects because info is found in db within projects */
  const {events, loading,} = useFetchEvents();
  const {roomStats} = useFetchRoomStats();


  return ( 
    <div >
      <h2> ROOMS </h2>

      {loading && <div> Loading...</div>}
            

      {events && events.map((event) =>(
         // Project list for schedule view in Lobby 
        <div className="pr-list" key ={event.id}>
          {roomStats && roomStats.map((roomS) => (
            <div key = {roomS.title}>
              {event.title === roomS.title && (
                <div className="projects-room">
                  {/* <Link to ={`/project_room/${event.projectid}`} style={{display: 'inline-block', width:'475px', height:'100px',marginTop: '10px', marginLeft:'5px'}}>  */}

                  <Link to ={`/project_room/${event.projectid}`} > 
                    {event.title}
                
                    <br/> <br/>
              
                    <img 
                      src = "company_rep.png"
                      alt="display image"
                    /><text>{roomS.company_representatives}</text>
                    <img
                      src = "users.png"
                      alt="display image"
                    /><text>{roomS.company_representatives + roomS.general_users}</text>   
                  </Link>
                </div>
              )}
            </div> 
          ))}
        </div>
      ))}
    </div>
  );
}
 
export default Rooms;