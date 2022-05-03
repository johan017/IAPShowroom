import ProgressBar from "./ProgressBar";
import { useParams } from "react-router-dom";
import { FormGroup, FormControlLabel, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import UpcomingEvents from "./UpcomingEvents";
import Announcements from "../HomeArea/Announcements";
import axios from "../context/axios";
import useFetchStageInfo from "../hooks/use-fetch-stage-info";
import StageLiveButton from "./StageLiveButton";


const JOIN_STAGE_URL = "/api/meet/join-stage";

const Stage = ({user_Role}) => {

    const [checked, setChecked] = useState(false);

    const {stageInfo, isLoading } = useFetchStageInfo();
    
    const handleCheck = (e) =>{
        e.preventDefault();
        setChecked(e.target.checked);
        console.log("value of check", checked);
    }

    return ( 
        <div className="stage">
            <div className="stage-2"></div> //add flex row
            <div className="stage-1">

            <h2> STAGE </h2> 
            <StageLiveButton user_Role = {user_Role} disable={false}/> 
            </div>
            <div className="stage-upcoming">
                <h3>Schedule</h3> 
                <UpcomingEvents></UpcomingEvents>
            </div>
            <div className="stage-announcements">
                <Announcements user_Role={user_Role}/>               
            </div>
           
           
            <div className="bbb">
                <ProgressBar></ProgressBar>
                <iframe className="iframe" src={stageInfo} allow="camera;microphone;display-capture" allowFullScreen></iframe> 
            </div>
          
        </div>

    );
}
 
export default Stage;