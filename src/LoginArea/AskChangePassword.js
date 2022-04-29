import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../context/axios";



const AskChangePassword = () => {
    
    const history = useHistory();
    const [email, setEmail] = useState('');
   
    const [isLoading, setIsLoading] = useState(false); 
    
    const handlePassChange = async () =>{ 

        var messageData = {
              "email": email,
        };
        
        console.log("email", messageData);

        try{

        await axios.post('api/auth/forgot-pass?sendemail=true', messageData, {
            headers: {"Content-Type": "application/json"},
            // withCredentials: true
            }).then((res) => {
                console.log(res.data)
            }).catch((error)=>{
                console.log(error)
        });
        }catch(err){

        }
        history.push('/')
    }

    return ( 
        <div  className="askChangePass">
            <h1>Reset Password</h1>

            <p>A link will be sent to the email account provided below. Make sure this is your IAPShowroom account email.</p>

            <form>
                <input 
                    type="email" 
                    placeholder="Enter your Email"
                    required 
                    value = {email}
                    onChange = {(e) => setEmail(e.target.value)}
                />
                               
                {!isLoading && <button style={{width: "75px"}} onClick={handlePassChange}>Send</button>} {/** adds the new event  */} {/** post email a /api/auth/forgot-pass?sendemail=true */}
                {isLoading && <button disabled>Sending...</button>} {/** add event button disabled while loading  */}

            </form>
        </div>
    );
}
 
export default AskChangePassword;