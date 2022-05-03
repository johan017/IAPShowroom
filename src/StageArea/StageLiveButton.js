import { useState } from "react";
import { FormGroup, FormControlLabel, Switch } from "@mui/material";
import { useHistory } from "react-router-dom";

const StageLiveButton = ({user_Role, disable}) => {
    
    const [checked, setChecked] = useState(false);

    const history = useHistory();

    const handleStage = () =>{
        history.push('/stage');
    }
        
    return ( 
        <div className="stage-live">
            <div className="stage-live-button">
           
                {checked &&(<button onClick={handleStage} style={{backgroundColor: 'red'}}>STAGE LIVE</button>)}
                {!checked &&(<button onClick={handleStage} style={{backgroundColor: '#424240'}}>STAGE LIVE</button>)}
               </div>
                
                {user_Role === "admin" && (
                    <>
                    {disable === false && (
                    <FormGroup>
                        <FormControlLabel control={
                            <Switch 
                                checked={checked}
                                onClick={(e) => setChecked(e.target.checked)}

                            />} label="Stage is Live">   
                            </FormControlLabel>
                    </FormGroup>
                    )}
                    </>
                )}

                
                
          
        </div>
    );
}
 
export default StageLiveButton;