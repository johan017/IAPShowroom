import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../context/axios";



const AskChangePassword = () => {
    
    const history = useHistory();
    const [email, setEmail] = useState('');
   
    const [isLoading, setIsLoading] = useState(false); 
    
    const handlePassChange = async (e) =>{ 
        e.preventDefault();
        setIsLoading(true);
        const messageData = {
              "email": email.toLowerCase(),
        };
        
        console.log("email", messageData);

        try{

        await axios.post('api/auth/forgot-pass?sendemail=true', messageData, {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
            }).then((res) => {
                console.log(res.data);
                history.push('/checkEmail');
            }).catch((error)=>{
                console.log(error)
                alert("Not a valid email.");
                window.location.reload();
                e.preventDefault();
        })
        }catch(err){

        }
        

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
                    <div>
                        {!isLoading && <button style={{width: "75px"}} onClick={handlePassChange}>Send Email</button>}
                        {isLoading && <button disabled>Sending Email...</button>} {/** add event button disabled while loading  */}
                    </div>

            </form>
        </div>
    );
}
 
export default AskChangePassword;