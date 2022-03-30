import { useHistory } from "react-router-dom";
import { useState } from "react";
import useFetch from "../useFetch";



const Advisor = ({  nextStep, prevStep, values }) => {

    const history = useHistory();
    const [isChecked, setIsChecked] = useState(false);
    const page = 2;

    const {data: projects} = useFetch('http://localhost:8000/projects'); /* data is projects because info is found in db within projects */

    const nextPage = e =>{
        e.preventDefault();
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
                <div className ="checklist">
                    <h1>Advisor Info</h1>
                    {/* <form> */}
                        {projects && projects.map((project) =>(
                        // Project list for schedule view in Lobby 
                            <div className="checklist" key ={project.id}>
                                <input value={values.researchAdv} type="checkbox" onChange={() => {setIsChecked(!isChecked)}} /> 
                                {project.title}

                            </div>
                        ))}
                    
                    <button style={{ background: 'red' }} onClick={prevPage} > Back </button>
                    <button style={{ background: '#3B8D25' }} onClick={nextPage} > Submit </button>

                {/* </form>  */}
                </div>
            </div>
        </div>
    );
}
 
export default Advisor;