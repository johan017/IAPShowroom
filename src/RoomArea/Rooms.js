import {Link, useHistory} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../context/axios";
import StageLiveButton from "../StageArea/StageLiveButton";
import { modalUnstyledClasses } from "@mui/material";
import Grid from '@mui/material/Grid';


const Rooms = ({user_Role}) => {

  // const history = useHistory();
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

  const modStyle =(props) =>{
    const sr = props;
    if(sr === false){
      return({
      border: "3px solid red",
      background: "red"
      })
    }else{
      return({
      border: "3px solid purple",
      background: "purple"
      })
    }
   
  }
  const [popup, setPopup] = useState(false);


  const changePopup = () =>{
    console.log(popup);
    if(popup === false){
        setPopup(true);
    } else {
        setPopup(false);
    }
    
}

  return ( 
    <div className="rooms" >
      <div className="rooms-title-block">
        <h2> ROOMS </h2>  
        
        {/* <div className="rooms-title-button-block"> */}
        <StageLiveButton user_Role={user_Role} disable={true}/>
        <button style={{backgroundColor: "white", borderColor: "white", marginLeft:"20px", cursor: "pointer"}}onClick={()=>{changePopup();}}>
        <img
          
          width= "40px"
          height="40px"
          src="info.PNG"

        ></img></button>
        {/* </div> */}
      </div>

  <div  className="pr-list">
     <div className="room-list">
        <Grid container item spacing={6} justifyContent="center" alignContent="center">
        {roomStats && roomStats.map((roomS)=>(
            <Grid item xs="auto" key={roomS.project_id}>

          <div style={modStyle(roomS.student_researcher)}className="project-rooms">
     

            <a href ={`/project_room/${roomS.project_id}`} > 
              <p style={{marginLeft: "10px", marginTop: "10px"}}>{roomS.title}</p>
              <br/> 
              <img 
                src = "comp-rep.png"
                alt="display image"     
              />
              {/* <i class="tio">user</i> */}
              <text>{roomS.company_representatives}</text>
              <img
                src = "user-2.png"
                alt="display image"
              /><text>{roomS.general_users}</text>   
            </a> 
            
          </div>
        </Grid>
          // </div> 
        ))}  </Grid>
      </div>

      <div className="popup-rooms">
        {popup === true && (
          <div style={{ marginTop: "5px",marginRight: "30px", backgroundColor: "#a9a5a593", borderRadius: "8px"}}>
          <h3>Legend: </h3>
          <label style={{color: 'green'}}>Green Colored Room</label><p> - You have never entered this room before.</p>
          <label style={{color: 'gray'}}>Gray Colored Room</label><p> - You have entered this room before.</p>
          <label style={{color: 'red'}}>Red Colored Border Around Room</label><p> - There are no Student Researchers in the room to attend you at this time.</p>

          <img  height="50px"
          width="50px"
                marginLeft= "10px"
                src = "comp-rep.png"
                alt="display image"     
              />
              {/* <i class="tio">user</i> */}
              <p>Represents the amount of company representatives in the room. </p>
              <img 
              height="50px"
              width="50px"
               marginLeft= "50px"
                src = "user-2.png"
                alt="display image"
              /><p>Represents the amount of participants in the room excluding: student researchers.</p>   
          
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
 
export default Rooms;