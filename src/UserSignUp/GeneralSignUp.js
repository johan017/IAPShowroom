import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import PasswordStrengthBar from 'react-password-strength-bar';

const EMAILREGEX = "^.+@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z])$";

const UserSignUpForm = ({ nextStep, handleChange, values }) => {
    
    const page = 1;
    /* Selection values */
    const genders = [
        { g_id : 1, gender: "male"},
        { g_id : 2, gender: "female"},
        { g_id : 3, gender: "other"}
      ];
      const roles = [
        { id : 1, user_role: "Guest"},
        { id : 2, user_role: "Student Researcher"},
        { id : 3, user_role: "Company Representative"},
        { id : 4, user_role: "Advisor"}
      ];
  
    //used to verify captcha
    const [isVerified, setIsVerified] = useState(false);
    const [matchPass,setMatchPass] = useState();
    const [isMatched, setisMatched] = useState(false);

    //verifies if captcha was successfull (checked)
    const handleCaptcha = () =>{
        console.log("captcha has loaded");
        setIsVerified(true);
    }


    /* Required input validation */
    //const formValues = ["first_name", "last_name", "email", "password"]
    const name = document.getElementById("first_name");
    const lastName = document.getElementById("last_name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const vpassword = document.getElementById("confirm-password");
    const gender = document.getElementById("gender");
    const role = document.getElementById("role");

    const validateForm = e =>{
        // formValues.forEach(v => {
        //     document.getElementById(v).checkValidity();
        // })
        if(!isMatched) alert("Passwords must match");
        if(name.checkValidity() && lastName.checkValidity() && email.checkValidity() && password.checkValidity() 
         && role.checkValidity() && gender.checkValidity() && isMatched){
           // && vpassword.checkValidity()
            e.preventDefault()
            nextStep();
        }
      }
    
    const matchPassword = e =>{
        if(e.target.value === values.password){
            setisMatched(true);
            document.getElementById("match").innerHTML = "Passwords matched";
        } else{ 
            setisMatched(false);
            document.getElementById("match").innerHTML = "Passwords does not match";
        }
        
    }

    return(

        <div>
            
            <img 
                style={{width:'250px', height:'100px'}}
                src = "IAP_Showroom_Logo_HD_Big.png"
                alt="display image"
            />
        <form onSubmit={validateForm} >
            <div className="generalInfoSignUp">
                
            
                <div>
                    {page !== 4 && <h2>Create Account</h2>}
                    {page !== 4 && <progress max="4" value={page}/>}
                    {page === 4 && <progress style={{background: 'green'}} max="4" value={page}/>}
                </div>
               
                <div>
                    
                    <h1>General Info</h1>
                   
                        <label>First Name: </label>
                        <input 
                            type="text"
                            id="first_name"  
                            value = {values.first_name}
                            onChange = {handleChange('first_name')}
                            required  
                        />

                        <label>Last Name: </label>
                        <input 
                            type="text" 
                            id="last_name"  
                            value = {values.last_name}
                            onChange = {handleChange('last_name')}
                            required  
                        />

                        <label>Email: </label>
                        <input 
                            type="email"
                            id="email" 
                            value = {values.email}
                            onChange = {handleChange('email')} 
                            pattern= {EMAILREGEX} 
                            required 
                        />

                        <label>Password: </label>
                        <input
                            type="password"
                            id="password"
                            value = {values.password}
                            onChange= {handleChange('password')}
                            required 
                        ></input> 
                        <PasswordStrengthBar password={values.password} />

                        <label>Confirm Password: </label>
                        <input
                            type="password"
                            id="confirm-password"
                            value = {matchPass}
                            onChange= { e => {matchPassword(e);}}
                            required 
                        ></input> 
                        <p id="match"/>

                        <label>Gender: </label>
                        <select 
                            id="gender" 
                            onChange = {handleChange('gender')} 
                            defaultValue = ""
                            required
                        > 
                            <option value="" disabled > Choose an option</option>
                            {genders && genders.map((gender) =>(
                                <option key={gender.g_id} value={gender.gender}>{gender.gender}</option>             
                            ))}
                        </select> 

                        <label>Role: </label>
                        <select 
                            id="role" 
                            onChange= {handleChange('user_role')} 
                            defaultValue = ""
                            required 
                        > 
                            <option value="" disabled> Choose an option</option>
                            {roles && roles.map((role) =>(
                                <option key={role.id} value={role.user_role}>{role.user_role}</option>             
                            ))}
                        </select>

                        <div className="recaptcha">                
                            <ReCAPTCHA
                                sitekey="6Lfnv_geAAAAABsSPS0UKVKIFkeZWly0yiA_-Wxi"
                                onChange={handleCaptcha}
                                
                            ></ReCAPTCHA> 
                        </div>       
                        <button style={{ background: '#3B8D25'}} type="submit" value="Next"> Next </button>
                </div>
            </div>
        </form>
        </div>
   );
 
}
export default UserSignUpForm;