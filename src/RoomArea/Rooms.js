// import ProjectRoom from "./ProjectRoom";
import useFetch from "../useFetch";
import {Link, useHistory} from "react-router-dom";
import useFetchEvents from "../hooks/use-fetch-events";
import useFetchRoomStats from "../hooks/use-fetch-room-stats";



const Rooms = ({checked}) => {

  // const {data: projects, isLoading, error} = useFetch('http://localhost:8000/projects'); /* data is projects because info is found in db within projects */
  const {events, loading} = useFetchEvents();
  const {roomStats} = useFetchRoomStats();
  const history = useHistory();

  const handleStage = () =>{
    history.push('/stage');
}

  return ( 
    <div className="rooms" >
      <h2> ROOMS </h2>
      <h2>{checked && (<button onClick={handleStage} style={{backgroundColor: 'red'}}>STAGE LIVE</button>)}
      {!checked && (<button onClick={handleStage}>STAGE LIVE</button>)} </h2>

      {loading && <div> Loading...</div>}
            

     

      {events && events.map((event) =>(
         // Project list for schedule view in Lobby 
        <div className="pr-list" key ={event.id}>
          {roomStats && roomStats.map((roomS) => (
            <div key = {roomS.title}>
              {event.title === roomS.title && (
                <div className="project-rooms">
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
                    /><text>{roomS.general_users}</text>   
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