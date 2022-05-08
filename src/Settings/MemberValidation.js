
import {Redirect} from "react-router-dom";
import useFetchAllResearchMembers from "../hooks/use-fetch-members";
import React, {useState} from "react";
import axios from "../context/axios";

const VAL_URL = "api/showroom/validateResearchMember";

export default function MemberValidation({adminID}) {  
  const [isValidated, setValidated] = useState();
  const {
    researchData,
    redirect,
    loading
  } = useFetchAllResearchMembers();
  
  
  const displayProjects = (props) => {
    const data = props;
    return (
      <div >
        {Object.keys(data) && Object.keys(data).map((project) =>( 
          <>
            <h2 key={project}>{JSON.parse(JSON.stringify(project))}</h2>
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
      <div className="display-members-validation">
        {members.validatedmember === true || members.validatedadvisor === true ? (
        <li id={members.userid} key={members.userid} style={{"color": "green"}}>{members.user_role}: {members.first_name} {members.last_name}</li> 
        ):(<li id={members.userid} key={members.userid}>
          {members.user_role}: {members.first_name} {members.last_name} 
          <button onClick={() => {handleValidation(members.userid,members.user_role); setValidated(members.userid);}} id={members.user_role} value={members.userid}>Validate</button>
          </li>)}
      </div>
      ))
    )
  }

  const handleValidation = async(uID, uRole) => {
    try{
      await axios.post(VAL_URL, {"userid":uID,"user_role":uRole},
        { 
          headers: {"Content-Type": "application/json"},
          withCredentials: true
        }).then(() =>{
          window.location.reload(false);
        });
    }catch(err){
      alert("User not found");
    }
  }

  if(redirect){
    return (
      <Redirect from="*" to ="/"/>
    )
  }

  return ( 
    <div className="">
      {loading && <div> Loading...</div>}  
      <div className="members-validation">
        <h1>Project Members Validation</h1>
        {displayProjects(researchData)}
      </div>
    </div>   
  );
}
 
