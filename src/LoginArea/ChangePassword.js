import { useState } from "react";
import { useHistory } from "react-router-dom";
import PasswordStrengthBar from 'react-password-strength-bar';
import axios from "../context/axios";





const ChangePassword = () => {
    
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    
    const [isLoading, setIsLoading] = useState(false); 
    const [matchPass,setMatchPass] = useState();
    const [isMatched, setisMatched] = useState(false);

    const matchPassword = e =>{
        if(e.target.value === password){
            setisMatched(true);
            document.getElementById("match").innerHTML = "Passwords matched";
        } else{ 
            setisMatched(false);
            document.getElementById("match").innerHTML = "Passwords does not match";
        }
        
    }

    const handlePassChange = async (e) =>{ 
        e.preventDefault();
        const messageData = {
              "email": email,
              "new_password": password,
        };
        
        console.log("email", messageData);

        try{

        await axios.post('api/auth/forgot-pass', messageData, {
            headers: {"Content-Type": "application/json"}
            // withCredentials: true
            }).then((res) => {
                console.log(res.data)
            }).catch((error)=>{
                console.log(error)
        })
        }catch(err){

        }
        history.push('/');

    }
{/*new_password - post on click */} 
    
    return ( 
        <div  className="changePass">
             <h1>Create New Password</h1>

             <p>A link will be sent to the email account provided below. Make sure this is your IAPShowroom account email.</p>
            {/* ADD ON SUBMIT WITH API */}
            <form >

            {/* <form onSubmit = {async (e) => handleSubmit(e)}> */}
                <label>Email: </label>
                <input 
                    type="email" 
                    placeholder="Enter your Email"
                    required 
                    value = {email}
                    onChange = {(e) => setEmail(e.target.value)}
                />
                
                <label>New Password: </label>
                <input
                    type="password"
                    id="password"
                    value = {password}
                    onChange= {(e) => setPassword(e.target.value)}
                    required 
                ></input> 
                
                {password !== "" && (
                    <PasswordStrengthBar style={{width: "450px", marginLeft: "20px"}} password={password} />
                )}

                <label>Confirm New Password: </label>
                <input
                    type="password"
                    id="confirm-password"
                    value = {matchPass}
                    onChange= { e => {matchPassword(e);}}
                    required 
                ></input> 
                <p id="match"/>       
        
                {!isLoading && <button onClick={handlePassChange}>Reset Password</button>} {/** adds the new event  */}
                {isLoading && <button disabled>Resetting Password...</button>} {/** add event button disabled while loading  */}
                {/*add redirect message based on message response */}

            </form>
        </div>
    );
}
 
export default ChangePassword;