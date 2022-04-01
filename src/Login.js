import { useState } from "react";
import { useHistory } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import {Link} from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    //used to verify captcha
    const [isVerified, setIsVerified] = useState(false);
    // when first loading the page the POST request is not being made; only after sumbitting form is when request is made
    const [isLoading, setIsLoading] = useState(false); 
    const history = useHistory();

    //verifies if captcha was successfull (checked)
    const handleCaptcha = () =>{
        console.log("captcha has loaded");
        setIsVerified(true);
        setIsLoggedIn(true);
    }

    const handleSubmit = async(e) =>{
        //if captcha not successfull, do captcha
        if(!isVerified){
            alert("Please verify that you are a Human");
        }else{
            //else let login 
            e.preventDefault();
            const login = {email, password};
            setIsLoading(true); //before submitting
 
            await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(login)
            }).then (() => {
                console.log('user Signed In');
                setIsLoading(false); //when form is submitted; completed
            })
            history.push('/home');

        }

    }

    return ( 
        <div className = "signIn">
            <img
                src = "IAP_Showroom_Logo_HD_Big.png"
                alt="display image"
            />

            <h2>Welcome to IAP ShowRoom</h2>
            <form onSubmit = {async (e) => handleSubmit(e)}>
                {/* <label>Email: </label> */}
                <input 
                    type="email" 
                    placeholder="Email"
                    required 
                    value = {email}
                    onChange = {(e) => setEmail(e.target.value)}
                />
                {/* <label>Password: </label> */}
                <input
                   type = "password"
                   placeholder="Password"
                   required
                   value = {password}
                   onChange = {(e) => setPassword(e.target.value)}
                ></input>
               
               

                <div className="recaptcha">
                    <ReCAPTCHA 
                    sitekey="6Lfnv_geAAAAABsSPS0UKVKIFkeZWly0yiA_-Wxi"
                    onChange={handleCaptcha}
                    
                    ></ReCAPTCHA>
                </div> 
                
                {!isLoading && <button>Log In</button>} {/** adds the new event  */}
                {isLoading && <button disabled>Loging In...</button>} {/** add event button disabled while loading  */}

            </form>

            <Link to="/signUp" >Don't have an account? Create</Link>
        </div>
                       /**select & option is a dropdown */


     );
}
 
export default Login;