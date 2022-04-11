import { useState } from "react";
//import { useHistory} from "react-router-dom";
import Select from 'react-select';
import ReCAPTCHA from "react-google-recaptcha";

import useFetch from "../useFetch";

const UserSignUpForm = ({ nextStep, handleChange, values }) => {

    /* data validation needed in backend */
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
    // const {data: genders} = useFetch('http://localhost:8000/genders'); /* data is projects because info is found in db within projects */
    // const {data: roles} = useFetch('http://localhost:8000/roles'); /* data is projects because info is found in db within projects */
   
    //used to verify captcha
    const [isVerified, setIsVerified] = useState(false);

    //verifies if captcha was successfull (checked)
    const handleCaptcha = () =>{
        console.log("captcha has loaded");
        setIsVerified(true);
    }

    const page = 1;

    const nextPage = e =>{
        e.preventDefault();
        nextStep();
    }
    
    return(

        <div>
            
            <img 
                style={{width:'250px', height:'100px'}}
                src = "IAP_Showroom_Logo_HD_Big.png"
                alt="display image"
            />
            <div className="generalInfoSignUp">
                
            
                <div>
                    {page !== 4 && <h2>Create Account</h2>}
                    {page !== 4 && <progress max="4" value={page}/>}
                    {page === 4 && <progress style={{background: 'green'}} max="4" value={page}/>}
                </div>
                <div>
                    
                    <h1>General Info</h1>
                    {/* <form > */}
                        <label>First Name: </label>
                        <input 
                            type="text" 
                            required 
                            value = {values.first_name}
                            onChange = {handleChange('first_name')} 
                            // = {(e) => setFirstName(e.target.value)}
                        />
                        <label>Last Name: </label>
                        <input 
                            type="text" 
                            required 
                            value = {values.last_name}
                            onChange = {handleChange('last_name')} 
                            // = {(e) => setLastName(e.target.value)}
                        />
                        <label>Email: </label>
                        <input 
                            type="email" 
                            required 
                            value = {values.email}
                            onChange = {handleChange('email')} 
                            //  = {(e) => setEmail(e.target.value)}
                        />
                        <label>Password: </label>
                        <input
                        type = "password"
                        required
                        value = {values.password}
                        onChange= {handleChange('password')} 
                        //  = {(e) => setPassword(e.target.value)}

                        ></input> 
                        <label>Gender: </label>
                        <select 
                    
                            onChange = {handleChange('gender')} 
                            defaultValue = "default"
                            // = {(e) => setGender(e.target.value)}
                        > 
                            <option value={"default"} disabled> Choose an option</option>
                            {genders && genders.map((gender) =>(
                                <option key={gender.g_id} value={gender.gender}>{gender.gender}</option>             
                            ))}
                        </select> 
                        <label>Role: </label>
                        <select 
                           
                            onChange= {handleChange('user_role')} 
                            //  = {(e) => setRole(e.target.value)}
                            defaultValue = "default"
                        > 
                        <option value={"default"} disabled> Choose an option</option>
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
                

                </div>
                {/* <div className="signupButtons">  */}
                    {/* <div style= "color:#E54242"> */}
                    {/* {page !== 1 && <button style={{ background: '#E54242' }} onClick={prevPage} > Back </button>} */}
                
                    <button style={{ background: '#3B8D25' }} onClick={nextPage} > Next </button>

                {/* </div> */}
            </div>
        </div>
   );
 
}
export default UserSignUpForm;