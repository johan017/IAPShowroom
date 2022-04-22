
import {Link, Redirect} from "react-router-dom";
import useFetchAllResearchMembers from "./hooks/use-fetch-members";
import React from "react";


export default function MemberValidation({user_Role}) {  
  // chatContainer = React.createRef();

  const {
    researchData,
    redirect,
    loading
  } = useFetchAllResearchMembers();

  const displayMembers = (props) => {
    const d = props;
    if(d.length>0){
      return(
        d.map((data) => {
          return (
          // event list for schedule view in Lobby 
          <div >
               {data.first_name} {data.last_name} from: {data.iapproject_title}
          </div>
          )
        })
        )
    } else {
      <h3>No events currently available</h3>
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

      <div className="">
        {displayMembers(researchData)}
      </div>
    </div>   
  );
}
 
