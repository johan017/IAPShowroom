import {Link} from "react-router-dom";



const Account = ({user_Role}) => {
    return ( 
        <div>
            <div className="account">
                <h1>Account</h1>

                <h2>Personal Information</h2>
                    {/* <label>First Name: </label> <label>{first_name}</label>
                    <label>Last Name: </label> <label>{last_name}</label>
                    <label>Email: </label> <label>{email}</label>
                    <label>Password: </label> <label>{password}</label>
                    <label>Gender: </label> <label>{gender}</label> */}
                    <label>Role: </label> <label>{user_Role}</label>

                    {/* {user_Role === "Student Researcher" && (
                        <div>
                        <label>Research Project: </label> <label>{projectTitles}</label>
                        <label>Department: </label> <label>{department}</label>
                        <label>Graduation Date: </label> <label>{grad_date}</label>
                        <label>Project Manager: </label> <label>{ispm}</label>
                        </div>
                    )}

                    {user_Role === "Advisor" && (  
                        <div>
                        <label>Research Project: </label> <label>{projectTitles}</label>
                        </div>
                    )}

                    {user_Role === "Company Representative" && (  
                        <div> 
                            <label>Company you Represent: </label> <label>{company_name}</label> 
                        </div>
                    )} */}

                <h2>Password Change</h2>
                    
                <p>Do you need to change your password? <Link to="/askChangePassword">Change Password</Link></p>
                <h2>Account Validation</h2>
                <p>Do you need to receive an account validation email? <Link to ="/validate" >Validate your Account</Link></p>




            </div>
        </div>
    );
}
 
export default Account;