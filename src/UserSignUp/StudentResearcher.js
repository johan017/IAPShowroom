// import { useHistory } from "react-router-dom";
import  Select from "react-select";
import useFetch from "../useFetch";
import useFetchProjects from "../hooks/use-fetch-projects";
import { useState } from "react";
// import VerifyInformation from "./VerifyInformation";


const StudentResearcher = ({ nextStep, prevStep, handleChange, handleProjectChange, handleDepartmentChange, values }) => {
    const [departments, setDepartments] = useState();
    const [localProjects, setProjects] = useState();
    const page = 2;
    const {projects} = useFetchProjects();
  
    for(var i = 0; i < projects.length; i++) {
        projects[i].value = projects[i].title;
        projects[i].label = projects[i].title;
    }
    // {projects && projects.map((project) =>(
    //     <option key={project.id} value={project.title}>{project.title}</option>             
    // ))}
    // TODO: Validation required
    const departmentsOptions = [
        { key : 1, value : "Computer Engineering", label: "Computer Engineering"},
        { key : 2, value : "Software Engineering", label: "Software Engineering"},
        { key : 3, value : "Computer Science", label: "Computer Science"},
        { key : 4, value : "Electrical Engineering", label: "Electrical Engineering"},
        { key : 5, value : "Mechanical Engineering", label:"Mechanical Engineering"},
        { key : 6, value : "Other", label: "Other"}
    ];
    

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
                        <Select 
                            isMulti
                            value = {localProjects}
                            onChange = { e => {handleProjectChange(e); setProjects(e);}}
                            options = {projects}
                            // {(e) => setResearchP(e.target.value)}
                        />
                                       
                        <label>Department: </label>
                        <select
                            defaultValue = "default"
                            onChange = {handleChange('department')} 
                            // = {(e) => setGradDate(e.target.value)}
                        >
                            <option value={"default"} disabled> Choose an option</option>
                            {departmentsOptions && departmentsOptions.map((department) =>(
                                <option key={department.key} value={department.value}>{department.label}</option>             
                            ))}
                        </select>    
                        {/* if students want to select more than one department
                           <Select 
                            isMulti
                            value = {departments}
                            onChange ={ e => {handleDepartmentChange(e); setDepartments(e);}}
                            options = {departmentsOptions}
                            //  {(e) => setDepartment(e.target.value)}
                        /> */}

                        <label>Graduation Date: </label>
                        <input 
                            type="date" 
                            required 
                            value = {values.grad_date}
                            onChange = {handleChange('grad_date')} 
                            // = {(e) => setGradDate(e.target.value)}
                        >

                        </input>
                        <label> Are you the project manager? </label>
                        <select 
                    
                            onChange = {handleChange('ispm')} 
                            defaultValue = "default"
                        > 
                            <option value={"false"}> No </option>
                            <option value={"true"}> Yes </option>

                        </select>
                        <button style={{ background: 'red' }} onClick={prevPage} > Back </button>
                        <button style={{ background: '#3B8D25' }} onClick={nextPage} > Verify </button>

                    {/* </form> */}
                </div>
            </div>
        </div>
    );
}
 
export default StudentResearcher;