import { useHistory } from "react-router-dom";
import { useState } from "react";
import useFetch from "../useFetch";
// import VerifyInformation from "./VerifyInformation";


const CompanyRepresentative = ({ nextStep, prevStep, handleChange, values }) =>{

    const history = useHistory();
    const page = 2;
     const [company, setCompany] = useState('');
    const {data: sponsors} = useFetch('http://localhost:8000/sponsors'); /* data is projects because info is found in db within projects */


    // const handleVerify = (e) =>{
    //     e.preventDefault();
    //     history.push('/verifyInformation');
    // }
    const nextPage = e =>{
        e.preventDefault();
        // history.push('/verifyInformation');
        nextStep();
    }

    const prevPage = e =>{
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
                    {page !== 2 && <h2>Create Account</h2>}
                    {page !== 2 && <progress max="4" value={page}/>}
                    {page === 2 && <progress style={{background: 'green'}} max="4" value={page}/>}
                </div>
                <div>
                    <h1>CompanyRepresentative Info</h1>

                    {/* <form> */}
                        <label>Company you Represent: </label>
                        <select 
                            required
                            value = {values.company}
                            onChange = {handleChange('company')}
                            // = {(e) => setCompany(e.target.value)}

                        > 
                            {sponsors && sponsors.map((sponsor) =>(
                                <option key={sponsor.id} value={sponsor.company_name} >{sponsor.company_name}</option>             
                            ))}
                        
                        </select> 
                    {/* </form> */}

                    <button style={{ background: 'red' }} onClick={prevPage} > Back </button>
                    <button style={{ background: '#3B8D25' }} onClick={nextPage} > Verify </button>


                </div>
            </div>
        </div>
    );
}
 
export default CompanyRepresentative;