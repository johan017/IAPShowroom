import { useState } from "react";
import {Link} from  "react-router-dom";



const Settings = ({user_Role}) => {

    const [popup, setPopup] = useState(false);

      
    return ( 
        <div className="settings">
            <div><h1>Settings</h1></div>
           
                            
                            {user_Role == "admin" && (
                                <div>
                                    {/* <h2>{}</h2> */}                                    
                                    <h2>IAP Conference Management</h2>
                                    <p><Link to ="/schedule" >CONFERENCE SCHEDULE </Link></p>
                                    <p><Link to ="/membervalidation" >MEMBERS VALIDATION </Link></p>


                                </div>
                            )}
                            
                            <h2>Account Management</h2>

                            <p><Link to ="/account" >ACCOUNT </Link> </p>
                          
                    

        
        </div>
    );
}
 
export default Settings;