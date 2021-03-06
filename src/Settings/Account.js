import {Link} from "react-router-dom";
import useFetchUserInfo from "../hooks/use-fetch-all-user-info";
import axios from "../context/axios";
import useFetchProjects from "../hooks/use-fetch-projects";




const Account = () => {
    const{userInfo} = useFetchUserInfo();
    const {projects} = useFetchProjects();


    const getDate = (props) =>{
        const today = new Date();
        return today.toLocaleDateString('default', {month: 'long', day: 'numeric', year: 'numeric'});
    }

    const projTitles = (e) =>{
        var inputArr = new Array();

        e.forEach(function (choice){
            for(var i = 0; i < projects.length; i++) {
                if(choice == projects[i].project_id){
                     inputArr.push(projects[i].title);
                     inputArr.push(", ");
                }
            }
           
        });

        inputArr[inputArr.length-1] = "";
        
        return inputArr;
        // this.setState({"projectTitles": inputArr});
        // this.setState({"projectids": inputArrg});
    }

    const pm = (ispm) =>{
        if(ispm === false){
            return "No";
        }else {
            return "Yes";
        }
    }

    const handleValidateAccount = async (event) =>{
        event.preventDefault();

        var messageData = {};
       
        try{

        await axios.post('api/auth/verify/1/heyhxusaixhauhsixuhsiuxhiuashx?resend=true', messageData, {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
            }).then((res) => {
                console.log("message sent")
                console.log(res.data)
            }).catch((error)=>{
                console.log(error)
        });
        }catch(err){

        }

    }


    return ( 
        <div>
            <div className="account">
                <h1>Account</h1>

                <h2>Personal Information</h2>
                    <label>First Name: </label> <label>{userInfo.first_name}</label> <br/>
                    <label>Last Name: </label> <label>{userInfo.last_name}</label> <br/>
                    <label>Email: </label> <label>{userInfo.email}</label> <br/>
                    {/* <label>Password: </label> <label>{userInfo.password}</label> <br/> */}
                    {/* <label>Gender: </label> <label>{userInfo.gender}</label> <br/> */}
                    <label>Role: </label> <label>{userInfo.user_role}</label> <br/>

                    {userInfo.user_role === "Student Researcher" && (
                        <div>
                        <label>Research Project: </label> <label>{projTitles(userInfo.project_ids)}</label> <br/>
                        <label>Project Manager: </label> <label>{pm(userInfo.ispm)}</label> <br/>
                        <label>Major: </label> <label>{userInfo.department}</label> <br/>
                        <label>Graduation Date: </label> <label>{getDate(userInfo.grad_date)}</label> <br/>
                       
                        </div>
                    )}

                    {userInfo.user_role === "Advisor" && (  
                        <div>
                        <label>Research Project: </label> <label>{projTitles(userInfo.project_ids)}</label> <br/>
                        </div>
                    )}

                    {userInfo.user_role === "Company Representative" && (  
                        <div> 
                            <label>Company you Represent: </label> <label>{userInfo.company_name}</label> <br/> 
                        </div>
                    )}

                <h2>Password Change</h2>
                <p>Do you need to change your password? <Link to="/askChangePassword">Change Password</Link></p>
               
                <h2>Account Validation</h2>

                {userInfo.verifiedemail === false &&(
                <p>Do you need to receive an account validation email? <Link to="/account" onClick={handleValidateAccount} >Validate your Account</Link></p>
                )}

                {userInfo.verifiedemail === true &&(
                <p style={{color: "green", fontWeight:"bold"}}>You are a verified User !</p>
                )}



            </div>
        </div>
    );
}
 
export default Account;