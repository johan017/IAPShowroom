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
                                    
                                    <Link to ="/schedule" ><h4>CONFERENCE SCHEDULE</h4> </Link>
                                    <Link to ="/membervalidation" ><h4>MEMBERS VALIDATION</h4> </Link>


                                </div>
                            )}
                                    <Link to ="/account" ><h4>ACCOUNT</h4> </Link>
                                    <Link to ="/validate" ><h4>ACCOUNT VALIDATION</h4> </Link>
                          
                    

        
        </div>
    );
}
 
export default Settings;