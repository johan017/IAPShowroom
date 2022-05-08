import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../context/axios";



const CheckEmail = () => {
    
    const history = useHistory();
  
   
    const [isLoading, setIsLoading] = useState(false); 
    const handleButton = (e) =>{
        e.preventDefault();
        history.push('/');
    }

   
    return ( 
        <div  className="askChangePass">
            
            <h1>Email Sent</h1>

            <p>An email has been sent to your email account. Please check your inbox.</p>
            
            <button onClick={handleButton}>OK</button>
        </div>
    );
}
 
export default CheckEmail;