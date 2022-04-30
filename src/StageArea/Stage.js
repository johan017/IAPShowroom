import ProgressBar from "./ProgressBar";
import { useParams } from "react-router-dom";
import { FormGroup, FormControlLabel, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import UpcomingEvents from "./UpcomingEvents";
import Announcements from "../HomeArea/Announcements";
import axios from "../context/axios";
import useFetchStageInfo from "../hooks/use-fetch-stage-info";


const JOIN_STAGE_URL = "/api/meet/join-stage";

const Stage = ({user_Role}) => {

    const [checked, setChecked] = useState(false);

    const {stageInfo, isLoading } = useFetchStageInfo();
    
    const handleCheck = (e) =>{
        e.preventDefault();
        setChecked(e.target.checked);
        console.log("value of check", checked);
    }

    // const {id} = 1; //useParams();

    // const {data: conf} = useFetch('http://localhost:8000/conference-info/'+ id); /* data is projects because info is found in db within projects */

    //TODO: PULL DURATION FROM SCHEDULE DAY TIME LIMIT 

    return ( 
        <div className="stage">
            
            <h2> STAGE </h2>  <h3>Schedule</h3> <h3>Announcements</h3> 

            <div className="stage-announcements">
               
                <Announcements user_Role={user_Role}></Announcements>
                <div className="stage-upcoming">
                <UpcomingEvents></UpcomingEvents>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            
            {/* <FormGroup>
                <FormControlLabel control={
                    <Switch 
                        checked={checked}
                        onClick={handleCheck}
                    
                    />} label="Stage is Live">   
                    </FormControlLabel>
            </FormGroup> 
                    {checked && (<button style={{backgroundColor: 'red'}}>TURNED ON</button>)}
                    {!checked && (<button style={{backgroundColor: 'green'}}>TURNED ON</button>)} */}

            {/* {conf && ( 
               < div key={conf.id}> */}
               
                <ProgressBar></ProgressBar>
                
                {/* </div> */}
            {/* )} */}
            <div className="bbb">
              
                {/* Update to get src url from the backend. Temporarily Hardcoded to get a view working  */}
                {/* <iframe className="temp" src="https://iapstream.ece.uprm.edu/bigbluebutton/api/create?name=DemoMeeting&meetingID=DemoMeeting&attendeePW=ap&moderatorPW=mp&checksum=f5e85d6b55189f228cf06e4791736e44b63282f1"></iframe> TODO Remove after changes to incorporate backend url */}
                <br></br>
                <iframe className="iframe" src={stageInfo} allow="camera;microphone;display-capture" allowFullScreen></iframe> 
            </div>
            <div>
                {/* <div>{useFetchServerSentEvents()}</div> */}
                <br></br>
                {/* <UpcomingEvents></UpcomingEvents> */}
            </div>
        </div>

    );
}
 
export default Stage;