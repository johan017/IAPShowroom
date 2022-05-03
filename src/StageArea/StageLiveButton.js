import { useState } from "react";
import { FormGroup, FormControlLabel, Switch } from "@mui/material";
import { useHistory } from "react-router-dom";

const StageLiveButton = ({user_Role, disable}) => {
    
    const [checked, setChecked] = useState(false);
    const [live, setLive] = useState(false);
    const [color, setColor] = useState('#424240');


    const history = useHistory();

    const changeLive = () =>{
        console.log(live);
        if(live === false){
            setLive(true);
            setColor('red');
        } else {
            setLive(false);
            setColor('#424240');
        } 
    }
    
    const handleCheck = (e) =>{
        e.preventDefault();
        setChecked(e.target.checked);
        console.log("value of check", checked);
    }
    const handleStage = () =>{
        history.push('/stage');
      }
    
    
    return ( 
        <div>
            <div className="stage-live-button">
                {live === false && (
                <>
                <button onClick={()=>{changeLive();handleStage();}} style={{backgroundColor: {color}}}>STAGE LIVE</button>
                </>
                )}
                
                {user_Role === "admin" && (
                    <>
                    {disable === false && (
                    <FormGroup>
                        <FormControlLabel control={
                            <Switch 
                                checked={checked}
                                onClick={handleCheck}

                            />} label="Stage is Live">   
                            </FormControlLabel>
                    </FormGroup>
                    )}
                    </>
                )}

                
                
            </div>
        </div>
    );
}
 
export default StageLiveButton;