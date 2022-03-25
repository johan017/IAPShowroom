import { useState } from "react";
import { useHistory } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import useFetch from "./useFetch";



const UserSignUpForm = () => {
    const [isLoading, setIsLoading] = useState(false); // when first loading the page the POST request is not being made; only after sumbitting form is when request is made
    
   
    const history = useHistory(); //to move to a certain view after submitting

    //used to verify captcha
    const [isVerified, setIsVerified] = useState(false);


   //To manage Back and Forth of "pages" (steps)
    const [page, setPage] = useState(1);

    //To manage information
    const [firstName, setFirstName] = useState(''); //input
    const [lastName, setLastName] = useState(''); //input
    const [email, setEmail] = useState(''); //input
    const [password, setPassword] = useState(''); //input
    const [gender, setGender] = useState(''); //dropdown
    const [role, setRole] = useState(''); //dropdown - decides next step 
    const [gradDate, setGradDate] = useState(''); //dropdown - decides next step 
    const [researchP, setResearchP] = useState("Select your research project"); //dropdown - research projects for students & advisors
    const [department, setDepartment] = useState("Select the department you belong to");
    const [company, setCompany] = useState("Select the company you represent");
    const [researchAdv, setResearchAdv] = useState('');


    
    function nextPage(){
        // if(page === 1 && !isVerified){
        //     alert("Please verify that you are a Human");
        // }

        setPage(page => page +1);
        
        if(page === 5) return;
       
    }

    function prevPage(){
        if(page === 1) return;
        setPage(page => page -1);
    }
 
    const handleSubmit = (e) =>{
        e.preventDefault();
        const signup = {firstName, lastName, email, password, gender, role, gradDate, researchP, department, company};
        setIsLoading(true); //before submitting

        fetch('http://localhost:8000/usersSignUp', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(signup)
        }).then (() => {
            console.log('user Signed Up');
            setIsLoading(false); //when form is submitted; completed
        })
        history.push('/home');
    

    }



   return(

    <div className="generalInfoSignUp">

        <div>
            <h2>Create Account</h2>
            <progress max="5" value={page}/>
        </div>
        
        <div>
            
            { page === 1 && <UserSignUp></UserSignUp>} {/**start for every one */}

            { page === 2 && <StudentResearcher></StudentResearcher>} {/**Student Researcher*/}

            { page === 3 && <Advisor></Advisor>} {/**Student Researcher*/}

            { page === 4 && <CompanyRepresentative></CompanyRepresentative>} {/**Student Researcher*/}

            { page === 5 && <Verification></Verification>} {/**Student Researcher*/}

        </div>
        <div className="signupButtons"> 
            {/* <div style= "color:#E54242"> */}
            {page !== 1 && <button style={{ background: '#E54242' }} onClick={prevPage} > Back </button>}
            {/* </div> */}
            {/* <div className="nextB"style= "color:#3B8D25"> */}
            {page !== 5 && <button style={{ background: '#3B8D25' }} onClick={nextPage} > Next </button>}
            {/* </div> */}
            {page === 5 && <button type="submit" style={{ background: '#008DED' }} onClick={handleSubmit}> Submit </button>}
        </div>
    </div>
   );
   


    //fisrt page; every user will be able to enter the same basic information
    function UserSignUp(){
        
        // //verifies if captcha was successfull (checked)
        const handleCaptcha = () =>{
            console.log("captcha has loaded");
            setIsVerified(true);

        }

        return (
            <div className="general-info"> 
                <h1>General Info</h1>

                <form >
                    <label>First Name: </label>
                    <input 
                        type="text" 
                        required 
                        value = {firstName}
                        onChange = {(e) => setFirstName(e.target.value)}
                    />
                    <label>Last Name: </label>
                    <input 
                        type="text" 
                        required 
                        value = {lastName}
                        onChange = {(e) => setLastName(e.target.value)}
                    />
                    <label>Email: </label>
                    <input 
                        type="email" 
                        required 
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
                    />
                    <label>Password: </label>
                    <input
                    type = "password"
                    required
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}

                    ></input> 
                    <div className="recaptcha">                
                        <ReCAPTCHA
                        sitekey="6Lfnv_geAAAAABsSPS0UKVKIFkeZWly0yiA_-Wxi"
                        onChange={handleCaptcha}
                        
                        ></ReCAPTCHA> 
                    </div>
                </form>
            </div>
        )
    }

    function StudentResearcher(){
    
            const {data: projects, isLoading, error} = useFetch('http://localhost:8000/projects'); /* data is projects because info is found in db within projects */

            const {data: departments} = useFetch('http://localhost:8000/departments'); /* data is projects because info is found in db within projects */

        return (
            <div className="dropdown-project">
                <h1>StudentResearcher Info</h1>
                {error && <div> {error} </div>}
                {isLoading && <div> Loading...</div>}
                <form>
                    <label>Research Project: </label>
                    <select 
                        value = {researchP}
                        onChange = {(e) => setResearchP(e.target.value)}

                    > 
                        {projects && projects.map((project) =>(
                            <option key={project.id} value={project.title}>{project.title}</option>             
                        ))}
                    </select> 
                
                    
                    <label>Department: </label>
                    <select 
                        value = {department}
                        onChange = {(e) => setDepartment(e.target.value)}
                    >
                        {departments && departments.map((department) =>(
                            <option key={department.id} value={department.name}>{department.name}</option>             
                        ))}

                    </select>
                    <label>Graduation Date: </label>
                    <input 
                        type="date" 
                        required 
                        value = {gradDate}
                        onChange = {(e) => setGradDate(e.target.value)}
                    />
                
                </form>
            </div>
        )
    }

    function Advisor (){

        const {data: projects, isLoading, error} = useFetch('http://localhost:8000/projects'); /* data is projects because info is found in db within projects */
        {error && <div> {error} </div>}
        {isLoading && <div> Loading...</div>}

        const [isChecked, setIsChecked] = useState(false);

        const checkedProjects = [];

        // const ccklist = ["P1", "P2", "P3"];
        // const [checked, setChecked] = useState([]);

        // const handleCheck = (e) =>{
        //     var updatedList = [checked];
        //     if(e.target.checked){
        //         updatedList = [checked, e.target.value];
        //     }else{
        //         updatedList.splice(checked.indexOf(e.target.value),1);
        //     }
        //     setChecked(updatedList);
        // }
        if(isChecked === true){
            setResearchAdv()

        }

        return (
            <div className ="checklist">
                <h1>Advisor Info</h1>
                <form>
                    {projects && projects.map((project) =>(
                    // Project list for schedule view in Lobby 
                        <div className="checklist" key ={project.id}>
                            {/* <label> */}
                            <input value={researchAdv} type="checkbox" onChange={() => {setIsChecked(!isChecked)}} /> 
                            {project.title}
                            {/* </label> */}

                        </div>
                    ))}
                </form> 


            </div>
        )
    }

    function CompanyRepresentative (){

        const {data: logos, isLoading, error} = useFetch('http://localhost:8000/logos'); /* data is projects because info is found in db within projects */
        // console.log({projects}, "pbefore");
        {error && <div> {error} </div>}
        {isLoading && <div> Loading...</div>}
        // const plist = projects.map(project =>(<option key={project.id} value={project.title} placeholder="Select a Research Project">{project.title}</option> ));

        return (
            <div className="dropdown-project">
                <h1>CompanyRepresentative Info</h1>

                <form>
                    <label>Company you Represent: </label>
                    <select 
                        value = {company}
                        onChange = {(e) => setCompany(e.target.value)}

                    > 
                        {logos && logos.map((logo) =>(
                            <option key={logo.id} value={logo.company} >{logo.company}</option>             
                        ))}
                    
                    </select> 
                
                </form>
            </div>
            

        )
    }

    function Verification(){
        return (
            <div>
                <h1>Verification</h1>
            </div>
        )
    }
    

}
export default UserSignUpForm;