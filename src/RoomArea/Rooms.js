import {Link, useHistory} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../context/axios";

const Rooms = ({checked}) => {

  const history = useHistory();
  const cdate = new Date(Date.now());
  const getDate = (props) =>{
    const today = props;

    const month = parseInt((new Date(today).getMonth() +1).toString().padStart(2, "0")); 
    const day = parseInt(new Date(today).getDate().toString().padStart(2, "0"));
    const year2 = parseInt(new Date(today).getFullYear().toString().substring(2));
    const ndate = [month, day,year2].join('-');
    return ndate;
  }

  const ROOM_STATS_URL = `api/showroom/rooms/status?date=${getDate(cdate)}`;

  const [roomStats, setRoomStats] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setLoading] = useState(false);
  
  const getRoomStats = async() =>{
    try{
      const result = await axios.get(ROOM_STATS_URL, 
      {
        headers: {"Content-Type": "application/json"},
        withCredentials: true
      }) 
      setRoomStats(result.data.payload);
      console.log(result.data.payload)
      } catch(error) {
         console.error(error.response.status);
          if(error.response.status = '401'){
            setRedirect(true);
          }
    }
    setLoading(false);
  };
  
  useEffect(()=>{
    getRoomStats();
  }, []);

  const handleStage = () =>{
    history.push('/stage');
  }

  return ( 
    <div className="rooms" >
      <div className="rooms-title-block">
      <h2> ROOMS </h2> 
      {checked && (<button onClick={handleStage} style={{backgroundColor: 'red'}}>STAGE LIVE</button>)}
      {!checked && (<button onClick={handleStage}>STAGE LIVE</button>)}
      
      </div>


     <div className="room-list">
        {roomStats && roomStats.map((roomS)=>(
         <div  className="pr-list">
          <div style={{border: "1px solid #E5E5E5"}}className="project-rooms">
            <Link to ={`/project_room/${roomS.project_id}`} > 
              <p style={{marginLeft: "10px", marginTop: "10px"}}>{roomS.title}</p>
              <br/> 
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
          </div> 
        ))}
      </div>
    </div>
  );
}
 
export default Rooms;