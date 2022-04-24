import  Select  from "react-select";
import useFetchProjects from "../hooks/use-fetch-projects";
import { useState } from "react";


const StudentResearcher = ({ nextStep, prevStep, handleChange, handleProjectChange, handleDepartmentChange, values }) => {
    
    // const [departments, setDepartments] = useState();
    const [localProjects, setProjects] = useState();
    const page = 2;
    const {projects} = useFetchProjects();

  
    for(var i = 0; i < projects.length; i++) {
        projects[i].value = projects[i].title;
        projects[i].label = projects[i].title;
    }

    const departmentsOptions = [
        { key : 1, value : "Computer Engineering", label: "Computer Engineering"},
        { key : 2, value : "Software Engineering", label: "Software Engineering"},
        { key : 3, value : "Computer Science", label: "Computer Science"},
        { key : 4, value : "Electrical Engineering", label: "Electrical Engineering"},
        { key : 5, value : "Mechanical Engineering", label:"Mechanical Engineering"},
        { key : 6, value : "Other", label: "Other"}
    ];
    

    const prevPage = (e) =>{
        e.preventDefault();
        prevStep();
    }

    /* Input validation */
    const major = document.getElementById("major");
    const gradDate = document.getElementById("date");

    const validateForm = e =>{

        if(values.projectids.length === 0)
        {
            document.getElementById("error").style.visibility = "visible";
            e.preventDefault();
        }

        else if(major.checkValidity() && gradDate.checkValidity()){
            e.preventDefault();
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
                <div >
                    <h1>StudentResearcher Info</h1>
                
                    <form onSubmit={validateForm}> 
                        <label>Research Project: </label>
                        <div style={{visibility:'hidden' }} id="error"> Please select at least one option. </div>
                        <Select 
                            id="research" 
                            isMulti
                            value = {localProjects}
                            onChange = { e => {handleProjectChange(e); setProjects(e);}}
                            options = {projects}
                            required
                        />
                        {/* <div>
                        {projects && projects.map((project) => ( 
                         
                             <label style={{float: 'relative'}}>
                                {project.label} 
                                <input 
                                    id="research" 
                                    type="checkbox"  
                                    value={project.project_id}  
                                    onChange={ e => {handleProjectChange(e); setProjects(e);}}
                                    required
                                />  
                             </label>
                          
                        ))} 
                        </div>  */}
                                       
                        <label>Major: </label>
                        <select
                            id="major" 
                            defaultValue = ""
                            onChange = {handleChange('department')} 
                            required
                        >
                            <option value="" disabled> Choose an option</option>
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
                            id="date" 
                            type="date" 
                            value = {values.grad_date}
                            onChange = {handleChange('grad_date')} 
                            required 
                        >

                        </input>
                        <label> Are you the project manager? </label>
                        <select 
                            onChange = {handleChange('ispm')} 
                            defaultValue = "false"
                            required
                        > 
                            <option value={"false"}> No </option>
                            <option value={"true"}> Yes </option>

                        </select>
                        <button style={{ background: 'red' }} onClick={prevPage} > Back </button>
                        <button style={{ background: '#3B8D25' }} type="submit" value="Next" > Next </button>

                    </form> 
                </div>
            </div>
        </div>
    );
}
 
export default StudentResearcher;