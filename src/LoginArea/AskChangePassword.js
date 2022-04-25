import { useState } from "react";
import { useHistory } from "react-router-dom";



const AskChangePassword = () => {
    
    const history = useHistory();
    const [email, setEmail] = useState('');
   
    const [isLoading, setIsLoading] = useState(false); 
    
    
    return ( 
        <div  className="askChangePass">
             <h1>Reset Password</h1>

             <p>A link will be sent to the email account provided below. Make sure this is your IAPShowroom account email.</p>

             <form >

            {/* <form onSubmit = {async (e) => handleSubmit(e)}> */}
                {/* <label>Email: </label> */}
                <input 
                    type="email" 
                    placeholder="Enter your Email"
                    required 
                    value = {email}
                    onChange = {(e) => setEmail(e.target.value)}
                />
                               
                {!isLoading && <button style={{width: "75px"}}>Send</button>} {/** adds the new event  */}
                {isLoading && <button disabled>Sending...</button>} {/** add event button disabled while loading  */}

            </form>
        </div>
    );
}
 
export default AskChangePassword;