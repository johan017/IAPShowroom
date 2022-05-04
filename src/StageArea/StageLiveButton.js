import { useEffect, useState } from "react";
import { FormGroup, FormControlLabel, Switch } from "@mui/material";
import { useHistory } from "react-router-dom";
const config = require("../config/config");

const ws = new WebSocket(config.WebSocketURL);
const StageLiveButton = ({user_Role, disable}) => {
    
    const [checked, setChecked] = useState(false);

    const history = useHistory();

    const handleStage = () =>{
        history.push('/stage');
    }

    useEffect(() => {
        ws.onopen = () => {
            console.log('StageLiveButton WebSocket Client Connected');
        };
        ws.onmessage = (message) => {
            console.log("StageLiveButton received message:", message.data)
            const dataFromServer = JSON.parse(message.data);
            if(dataFromServer.type === config.ws_getStageLive){
                setChecked(dataFromServer.value);
            } else if(dataFromServer.type === config.ws_die) {
                window.location.href = "/"; // reloads page after server is attempting close
            } else {
                console.log("WebSocket type was not recognized");
            }
        };
        ws.onclose = () => {
            console.log('StageLiveButton WebSocket Client Disconnected');
        }

        ws.send(JSON.stringify({ type: config.ws_getStageLive}));

        return () => {
            //on component unmount
            console.log("unmounted StageLiveButton");
            ws.close();
            };
    },[])
        
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
                                onClick={(e) => {
                                        setChecked(e.target.checked);
                                        ws.send(JSON.stringify({ type: config.ws_stageUpdate, value: e.target.checked }));
                                    }
                                }

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