// import { useHistory } from "react-router-dom";
// import { useState } from "react";
import useFetch from "../useFetch";
// import VerifyInformation from "./VerifyInformation";


const StudentResearcher = ({ nextStep, prevStep, handleChange, values }) => {

    const page = 2;
   
    const {data: departments} = useFetch('http://localhost:8000/departments'); /* data is projects because info is found in db within projects */
    const {data: projects} = useFetch('http://localhost:8000/projects'); /* data is projects because info is found in db within projects */       
    
    const nextPage = (e) =>{
        e.preventDefault();
        // history.push('/verifyInformation');
        nextStep();
    }

    const prevPage = (e) =>{
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
                <div >
                    <h1>StudentResearcher Info</h1>
                
                    {/* <form> */}
                        <label>Research Project: </label>
                        <select 
                            value = {values.researchP}
                            onChange = {handleChange('researchP')} 
                            // {(e) => setResearchP(e.target.value)}
                        > 
                            {projects && projects.map((project) =>(
                                <option key={project.id} value={project.title}>{project.title}</option>             
                            ))}
                        </select> 
                    
                        
                        <label>Department: </label>
                        <select 
                            value = {values.department}
                            onChange = {handleChange('department')} 
                            //  {(e) => setDepartment(e.target.value)}
                        >
                            {departments && departments.map((department) =>(
                                <option key={department.id} value={department.name}>{department.name}</option>             
                            ))}

                        </select>
                        <label>Graduation Date: </label>
                        <input 
                            type="date" 
                            required 
                            value = {values.gradDate}
                            onChange = {handleChange('gradDate')} 
                            // = {(e) => setGradDate(e.target.value)}
                        />
                    
                        <button style={{ background: 'red' }} onClick={prevPage} > Back </button>
                        <button style={{ background: '#3B8D25' }} onClick={nextPage} > Verify </button>

                    {/* </form> */}
                </div>
            </div>
        </div>
    );
}
 
export default StudentResearcher;