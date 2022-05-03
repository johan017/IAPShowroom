import { useState } from "react";
import { FormGroup, FormControlLabel, Switch } from "@mui/material";
import { useHistory } from "react-router-dom";

const StageLiveButton = ({user_Role, disable}) => {
    
    const [checked, setChecked] = useState(false);
    const [popup, setPopup] = useState(false);
    const [color, setColor] = useState('#424240');


    const history = useHistory();

    const changePopup = () =>{
        console.log(popup);
        if(popup === false){
            setPopup(true);
            setColor('red');
        } else {
            setPopup(false);
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
                {/* {popup === true && ( */}
                <>
                <button onClick={()=>{changePopup();handleStage}} style={{backgroundColor: {color}}}>STAGE LIVE</button>
                </>
                   
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