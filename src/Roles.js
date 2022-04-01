import useFetch from "./useFetch";

import {  useParams } from "react-router-dom";



const Roles = () => {
    const {id} = useParams();

    const {data: userLogged} = useFetch('http://localhost:8000/usersLoggedIn'+id); /* data is projects because info is found in db within projects */

    const {data: userSigned} = useFetch('http://localhost:8000/usersSignUp' +id); /* data is projects because info is found in db within projects */

    const welcomeUser = '';

    const userRole = "";

    // const handleClick = () =>{

    //     if(userLogged.email === userSigned.email){
    //         if(userLogged.password === userSigned.password){
    //             welcomeUser = userSigned.firstName + userSigned.lastName;

    //             userRole = userSigned.role;
    //         }
    //     }
        


    // }
    // const role =  "Student Researcher";
    // const role =  "Advisor" ;
    // const role =  "Company Representative" ;
     const role =  "None of the Above" ;

    //  const role =  "Admin" ;

    return ( 
        <div>
            
               {role === "Student Researcher" && (
                        <div>
                         <h1>Student Researcher</h1>
                         <h2>Welcome, Ashley</h2>
                        </div>
                )}

                {role === "Advisor" && (  
                        <div>
                             <h1>Advisor</h1>
                            <h2>Welcome, Karelys</h2>
                         </div>
                )}

                {role === "Company Representative" && (  
                        <div> 
                            <h1>Company Representative</h1>
                            <h2>Welcome, Edgar</h2>                        
                        </div>
                )} 
                {role === "None of the Above" && (  
                        <div> 
                            <h1>None of the Above</h1>
                            <h2>Welcome, User</h2>                        
                        </div>
                )} 
        
        </div>
        
     );
}
 
export default Roles;