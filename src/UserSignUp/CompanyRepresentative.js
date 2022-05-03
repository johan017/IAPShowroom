import { useHistory } from "react-router-dom";
import { useState } from "react";
import useFetch from "../useFetch";
import useFetchSponsors from "../hooks/use-fetch-sponsors";
// import VerifyInformation from "./VerifyInformation";


const CompanyRepresentative = ({ nextStep, prevStep, handleChange, values }) =>{

    const page = 2;
    var {sponsors} = useFetchSponsors();
    if(sponsors.length === 0) {
       sponsors = [
           { sponsor_id : 1, company_name : "Verizon" },
           { sponsor_id : 2, company_name : "Texas Instruments" },
           { sponsor_id : 3, company_name : "Sikorski" },
           { sponsor_id : 4, company_name : "GM Foundation" },
           { sponsor_id : 5, company_name : "L3Harris" },
           { sponsor_id : 6, company_name : "Capital One" },
           { sponsor_id : 7, company_name : "DXC Technology" },
           { sponsor_id : 8, company_name : "Gird Systems Inc." },
           { sponsor_id : 9, company_name : "Intel" },
           { sponsor_id : 10, company_name : "Raytheon" }
       ];
    }
    
    console.log(sponsors);
    const nextPage = e =>{
        e.preventDefault();
        nextStep();
    }

    const prevPage = e =>{
        e.preventDefault();
        prevStep();
    }

    const company = document.getElementById("company");
    const validateForm = e =>{
        if(company.checkValidity()){
            e.preventDefault()
            nextStep();
        }
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
                    {page !== 2 && <h2>Create Account</h2>}
                    {page !== 2 && <progress max="4" value={page}/>}
                    {page === 2 && <progress style={{background: 'green'}} max="4" value={page}/>}
                </div>
                <div>
                    <h1>CompanyRepresentative Info</h1>

                    <form onSubmit={validateForm}> 
                        <label>Company you Represent: </label>
                        <select 
                            id = "company"
                            defaultValue = ""
                            onChange = {handleChange('company_name')}
                            required
                        > 
                            <option value="" disabled> Choose an option</option>
                            {sponsors && sponsors.map((sponsor) =>(
                                <option key={sponsor.sponsor_id} value={sponsor.company_name} >{sponsor.company_name}</option>             
                            ))}
                            {/* {sponsors && sponsors.map((sponsor) =>(
                                <option key={sponsor.sponsor_id} value={sponsor.company_name} >{sponsor.company_name}</option>             
                            ))} */}
                        
                        </select> 

                    <button style={{ background: 'red' }} onClick={prevPage} > Back </button>
                    <button style={{ background: '#3B8D25' }} type="submit" value="Next" > Next </button>
                    </form>


                </div>
            </div>
        </div>
    );
}
 
export default CompanyRepresentative;