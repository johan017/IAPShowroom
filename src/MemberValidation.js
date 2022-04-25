
import {Link, Redirect} from "react-router-dom";
import useFetchAllResearchMembers from "./hooks/use-fetch-members";
import React from "react";
import { color } from "@mui/system";


export default function MemberValidation({user_Role}) {  
  // chatContainer = React.createRef();

  const {
    researchData,
    redirect,
    loading
  } = useFetchAllResearchMembers();


//   {departmentsOptions && departmentsOptions.map((department) =>(
//     <option key={department.key} value={department.value}>{department.label}</option>             
// ))}

  const displayProjects = (props) => {
    const data = props;
        return (
          <div >
              {Object.keys(data) && Object.keys(data).map((project) =>( 
                <>
                <h2>{JSON.parse(JSON.stringify(project))}</h2>
                 {displayMembers(data[project])}
                 <br></br>
                </>
              ))}
          </div>
        ) 
  }
  const displayMembers = (p) => {

      return(
        
        p.map((members) => (
         <>
         
         {members.validatedmember || members.validateradvisor ? (
          <p style={{"color": "green"}}>{members.user_role}: {members.first_name} {members.last_name} {   }
         </p> 
         ):(<li>
           {members.user_role}: {members.first_name} {members.last_name} {   }
           <button onClick={validateMember()}>Validate</button>
         </li>)}
         </>
        ))
      )
  }

  const validateMember = () => {

  }



  if(redirect){
    return (
      <Redirect from="*" to ="/"/>
    )
  }

  return ( 
    <div className="">
      {loading && <div> Loading...</div>}

      <div className="">
        {displayProjects(researchData)}
      </div>
    </div>   
  );
}
 
