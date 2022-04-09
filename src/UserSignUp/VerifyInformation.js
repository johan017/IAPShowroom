import { useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "../context/axios";
import AuthContext from "../context/AuthProvider";

const SIGNUP_URL = 'api/auth/register';
const LOGIN_URL = 'api/auth/login';


const VerifyInformation = ({ prevStep, values }) =>{
    const { setAuth } = useContext(AuthContext);
    const history = useHistory();
    const page = 3
    const {first_name, last_name, email, password, gender, user_role, gradDate, researchP,
        department, company, researchAdv } = values;
    var signup = values;
    const [isLoading, setIsLoading] = useState(false); // when first loading the page the POST request is not being made; only after sumbitting form is when request is made

    const handleSubmit = async(e) =>{
        e.preventDefault();

            if(user_role === "Student Researcher"){
                signup = {first_name, last_name, email, password, gender, user_role, gradDate, 
                          researchP, department};
            }else if(user_role === "Advisor"){
                signup = {first_name, last_name, email, password, gender, user_role, researchAdv};
            }else if(user_role === "Company Representative"){
                signup = {first_name, last_name, email, password, gender, user_role, company};
            }else if(user_role === "Guest"){ //general guest
                delete signup.company;  delete signup.researchAdv;
                delete signup.gradDate; delete signup.researchP;
                delete signup.department;
                signup = {email, password, first_name, last_name, gender, user_role};
            }
            console.log(user_role);
            console.log(signup);
            setIsLoading(true); //before submitting
            
            //  Registration
            try{
                await axios.post(SIGNUP_URL, 
                    JSON.stringify(signup),
                    {
                        headers: {"Content-Type": "application/json"},
                        withCredentials: true
                    });
                    
            }catch(err){
                if(!err?.response) {
                    console.log('No Server Response');
                } else if((err.response?.status === 400)){
                    console.log('Missing Username or Password');
                } else if((err.response?.status === 400)){
                    console.log('Unauthorized');
                } else {
                    console.log('Login Failed');
                }
            }
            //  Login
            // try{
            //     const login = {email, password};
            //     const response = await axios.post(LOGIN_URL, 
            //         JSON.stringify(login),
            //         {
            //             headers: {"Content-Type": "application/json"},
            //             withCredentials: true
            //         });
            //         console.log(response.data.payload)
            //         setAuth(response.data.payload);
            //         // user_role = "user_role";
            //         // setuser_role = response.data.payload.admin;
                    
            // }catch(err){
            //     if(!err?.response) {
            //         console.log('No Server Response');
            //     } else if((err.response?.status === 400)){
            //         console.log('Missing Username or Password');
            //     } else if((err.response?.status === 400)){
            //         console.log('Unauthorized');
            //     } else {
            //         console.log('Login Failed');
            //     }
            // }
        history.push('/accountCreated');
    }

    const Previous = e => {
        e.preventDefault();
        prevStep();
    }

  
    return (
        <div>
            <img 
            style={{width:'250px', height:'100px'}}
            src = "IAP_Showroom_Logo_HD_Big.png"
            alt="display image"
            />
            <div className="generalInfoSignUp">
            
                <div>
                    {page !== 3 && <h2>Create Account</h2>}
                    {page !== 3 && <progress max="5" value={page}/>}
                    {page === 3 && <progress style={{background: 'green'}} max="5" value={page}/>}
                </div>
                <div className="verifying">
                    <h1>Verification</h1>
                    {/* <reviewInfo/> */}
                    <label>First Name: </label> <label>{first_name}</label>
                    <label>Last Name: </label> <label>{last_name}</label>
                    <label>Email: </label> <label>{email}</label>
                    <label>Password: </label> <label>{password}</label>
                    <label>Gender: </label> <label>{gender}</label>
                    <label>Role: </label> <label>{user_role}</label>

                    {user_role === "Student Researcher" && (
                        <div>
                        <label>Research Project: </label> <label>{researchP}</label>
                        <label>Department: </label> <label>{department}</label>
                        <label>Graduation Date: </label> <label>{gradDate}</label>
                        </div>
                    )}

                    {user_role === "Advisor" && (  
                        <div>
                        <label>Research Project: </label> <label>{researchAdv}</label>
                        </div>
                    )}

                    {user_role === "Company Representative" && (  
                        <div> 
                            <label>Company you Represent: </label> <label>{company}</label> 
                        </div>
                    )}

                    <button style={{ background: 'red' }} onClick={Previous} > Back </button>
                    <button style={{ background: '#3B8D25' }} onClick={handleSubmit} > Submit </button>

                </div>
            </div>        
        </div>
    );
}
 
export default VerifyInformation;