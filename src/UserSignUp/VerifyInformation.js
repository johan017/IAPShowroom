import { useHistory } from "react-router-dom";
import { useState } from "react";



const VerifyInformation = ({ prevStep, values }) =>{

    const history = useHistory();
    const page = 3
    const {firstName, lastName, email, password, gender, role, gradDate, researchP,
        department, company, researchAdv } = values;
    var signup = {};
    const [isLoading, setIsLoading] = useState(false); // when first loading the page the POST request is not being made; only after sumbitting form is when request is made

    const handleSubmit = (e) =>{
        e.preventDefault();

            if(role === "Student Researcher"){
                signup = {firstName, lastName, email, password, gender, role, gradDate, researchP, department};
            }else if(role === "Advisor"){
                signup = {firstName, lastName, email, password, gender, role, researchAdv};
            }else if(role === "Company Representative"){
                signup = {firstName, lastName, email, password, gender, role, company};
            }else if(role === "None of the Above"){ //general guest
                signup = {firstName, lastName, email, password, gender, role};
            }
           
            setIsLoading(true); //before submitting

            fetch('http://localhost:8000/usersSignUp', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(signup)
            }).then (() => {
                console.log('user Signed Up');
                setIsLoading(false); //when form is submitted; completed
            })

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
                    <label>First Name: </label> <label>{firstName}</label>
                    <label>Last Name: </label> <label>{lastName}</label>
                    <label>Email: </label> <label>{email}</label>
                    <label>Password: </label> <label>{password}</label>
                    <label>Gender: </label> <label>{gender}</label>
                    <label>Role: </label> <label>{role}</label>

                    {role === "Student Researcher" && (
                        <div>
                        <label>Research Project: </label> <label>{researchP}</label>
                        <label>Department: </label> <label>{department}</label>
                        <label>Graduation Date: </label> <label>{gradDate}</label>
                        </div>
                    )}

                    {role === "Advisor" && (  
                        <div>
                        <label>Research Project: </label> <label>{researchAdv}</label>
                        </div>
                    )}

                    {role === "Company Representative" && (  
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