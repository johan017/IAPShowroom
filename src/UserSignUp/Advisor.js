import { useHistory } from "react-router-dom";
import { useState } from "react";
import Select from "react-select"
import useFetchProjects from "../hooks/use-fetch-projects";
import useFetch from "../useFetch";



const Advisor = ({  nextStep, prevStep, handleChange, handleProjectChange, values }) => {

    const history = useHistory();
    const [localProjects, setProjects] = useState();
    const [isChecked, setIsChecked] = useState(false);
    const page = 2;

    const {projects} = useFetchProjects();
  
    for(var i = 0; i < projects.length; i++) {
        projects[i].value = projects[i].title;
        projects[i].label = projects[i].title;
    }

    const nextPage = e =>{
        e.preventDefault();
        nextStep();
    }

    const prevPage = (e) =>{
        e.preventDefault();
        prevStep();
    }

    const validateForm = e =>{

        if(values.projectids.length === 0)
        {
            document.getElementById("error").style.visibility = "visible";
            e.preventDefault();
        } else {
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
                <div className ="checklist">
                    <h1>Advisor Info</h1>
                <form onSubmit={validateForm}>
                    <label>Research Project: </label>
                    <div style={{visibility:'hidden', color: "red" }} id="error"> Please select at least one option. </div>
                        <Select 
                            id = "research"
                            isMulti
                            value = {localProjects}
                            onChange = { e => {handleProjectChange(e); setProjects(e);}}
                            options = {projects}
                            // {(e) => setResearchP(e.target.value)}
                        />
                    
                    <button style={{ background: 'red' }} onClick={prevPage} > Back </button>
                    <button style={{ background: '#3B8D25' }} type="submit" value="Next" > Next </button>

                </form> 
                </div>
            </div>
        </div>
    );
}
 
export default Advisor;