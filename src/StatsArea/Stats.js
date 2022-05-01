import useFetch from "../useFetch";
import React, { useState } from "react";
import Progress from "./Progress";
import { blue } from "@material-ui/core/colors";
import useFetchConferenceStats from "../hooks/use-fetch-Conference-stats";
// import ProgressBar from 'react-bootstrap/ProgressBar'
// import 'bootstrap/dist/css/bootstrap.css';


const Stats = () => {
    
    // const {data:stats, isLoading, error} = useFetch('http://localhost:8000/stats');

    const {conferenceStats, isLoading} = useFetchConferenceStats();
   console.log(conferenceStats);
   const getDate = () =>{
    const today = new Date();
    return today.toLocaleDateString('default', {month: 'long', day: 'numeric', year: 'numeric'});
  }
   
    return ( 
        <div >
            {/* {error && <div> {error} </div>} */}
            {isLoading && <div> Loading...</div>}
            <div className="statsdate" style={{ borderBottom: '1px solid #8e8a8a' }} >
                <h2> Conference Stats </h2>  <h3>{getDate()}</h3>
               {/* {conferenceStats} */}
            </div>
          
           
            <div className="stat-prog">
            {/* {conferenceStats && conferenceStats.map((cf)=>(
                <div key={cf.id}>
                    {cf.title} */}
             {/* {stats && stats.map((stat)=>(
                <div key={stat.id}> */}
                {/* <p>Total Participants</p> */}
                <h3>Overall Participants</h3>

                    <p>Total Participants</p>
                    <div className="stat-prog-bar">
                        <Progress totalp={`${conferenceStats.maxParticipants}`} totalItem={`${conferenceStats.maxParticipants}`} /> 
                    </div> <br/>

                    {/* <p>Total Participants</p>
                    <div className="stat-prog-bar">
                        <Progress totalp={`${stat.activeParticipants}`} totalItem={`${stat.activeParticipants}`} /> 
                    </div> <br/>
                    {/* <p>Total Participants</p>
                    <div className="stat-prog-bar">
                        <ProgressBar now={stat.activeParticipants} label={`${stat.activeParticipants}`} /> 
            </div> <br/> */}

                    <p>General Participants</p>
                    <div className="stat-prog-bar">
                        <Progress totalp={`${conferenceStats.maxParticipants}`} totalItem={`${conferenceStats.generalParticipants}`} /> 
                    </div> <br/>                                        
                    
                   <p>Research Student Participants</p>
                    <div className="stat-prog-bar">
                        <Progress totalp={`${conferenceStats.maxParticipants}`} totalItem={`${conferenceStats.researchStudParticipants}`} /> 
                    </div> <br/>

                    <p>Company Representatives Participants</p>
                    <div className="stat-prog-bar">
                        <Progress totalp={`${conferenceStats.maxParticipants}`} totalItem={`${conferenceStats.companyRepParticipants}`} /> 
                    </div> <br/>

                        <p>Advisor Participants</p>
                    <div className="stat-prog-bar">
                        <Progress totalp={`${conferenceStats.maxParticipants}`} totalItem={`${conferenceStats.professorParticipants}`} /> 
                    </div> <br/>

                    {/* <p>Women</p>
                    <div className="stat-prog-bar">
                        <Progress totalp={`${conferenceStats.maxParticipants}`} totalItem={`${conferenceStats.totalWomen}`} /> 
                    </div> <br/>

                    <p>Men</p>
                    <div className="stat-prog-bar">
                        <Progress totalp={`${conferenceStats.maxParticipants}`} totalItem={`${conferenceStats.totalMen}`} /> 
                    </div> <br/>

                    <p>Other</p>
                    <div className="stat-prog-bar">
                        <Progress totalp={`${conferenceStats.maxParticipants}`} totalItem={`${conferenceStats.totalNotDisclosed}`} /> 
                    </div> <br/> */}
                    <div className="stats-people">

                        <div className="stats-people-women"><br/>
                        <text style={{marginLeft: "20%"}}>{`${conferenceStats.totalWomen}`}</text>
                        <text style={{marginLeft: "20.5%"}}>{`${conferenceStats.totalMen}`}</text> 
                        <text style={{marginLeft: "20%"}}>{`${conferenceStats.totalNotDisclosed}`}</text>
                       </div>

                       <div className="stats-people-women" >

                       <text>Women</text>
                        <text>Men</text>
                        <text>Other</text>
                        </div>

                        {/* <div >

                        
                        
                        </div> */}
                     
                    </div>

                    <h3>Project Research Students</h3>

                    <p>Research Student Participants</p>
                    <div className="stat-prog-bar">
                        <Progress totalp={`${conferenceStats.researchStudParticipants}`} totalItem={`${conferenceStats.researchStudParticipants}`} /> 
                    </div> <br/>

                    <p>Research Students from ICOM</p>
                    <div className="stat-prog-bar">
                        <Progress totalp={`${conferenceStats.researchStudParticipants}`} totalItem={`${conferenceStats.resStudICOM}`} /> 
                    </div> <br/>

                    <p>Research Students from INEL</p>
                    <div className="stat-prog-bar">
                        <Progress totalp={`${conferenceStats.researchStudParticipants}`} totalItem={`${conferenceStats.resStudINEL}`} /> 
                    </div> <br/>

                    <p>Research Students from INSO</p>
                    <div className="stat-prog-bar">
                        <Progress totalp={`${conferenceStats.researchStudParticipants}`} totalItem={`${conferenceStats.resStudINSO}`} /> 
                    </div> <br/>

                    <p>Research Students from CIIC</p>
                    <div className="stat-prog-bar">
                        <Progress totalp={`${conferenceStats.researchStudParticipants}`} totalItem={`${conferenceStats.resStudCIIC}`} /> 
                    </div> <br/>

                    <p>Research Students from INME</p>
                    <div className="stat-prog-bar">
                        <Progress totalp={`${conferenceStats.researchStudParticipants}`} totalItem={`${conferenceStats.resStudINME}`} /> 
                    </div> <br/>

                    <p>Research Students from Other Departments</p>
                    <div className="stat-prog-bar">
                        <Progress totalp={`${conferenceStats.researchStudParticipants}`} totalItem={`${conferenceStats.resStudOther}`} /> 
                    </div> <br/>

                    <p>Current Grad Students</p>
                    <div className="stat-prog-bar">
                        <Progress totalp={`${conferenceStats.researchStudParticipants}`} totalItem={`${conferenceStats.resStudGRAD}`} /> 
                    </div> <br/>

                    {/* <p>Women</p>
                    <div className="stat-prog-bar">
                        <Progress totalp={`${conferenceStats.researchStudParticipants}`} totalItem={`${conferenceStats.totalResStudWomen}`} /> 
                    </div> <br/>

                    <p>Men</p>
                    <div className="stat-prog-bar">
                        <Progress totalp={`${conferenceStats.researchStudParticipants}`} totalItem={`${conferenceStats.totalResStudMen}`} /> 
                    </div> <br/>

                    <p>Other</p>
                    <div className="stat-prog-bar">
                        <Progress totalp={`${conferenceStats.researchStudParticipants}`} totalItem={`${conferenceStats.totalResStudNotDisclosed}`} /> 
                    </div> <br/> */}

                    <div className="stats-people">

                    <div className="stats-people-women"><br/>
                    <text style={{marginLeft: "20%"}}>{`${conferenceStats.totalResStudWomen}`}</text>
                    <text style={{marginLeft: "20.5%"}}>{`${conferenceStats.totalResStudMen}`}</text> 
                    <text style={{marginLeft: "20%"}}>{`${conferenceStats.totalResStudNotDisclosed}`}</text>
                    </div>

                    <div className="stats-people-women" >

                    <text>Women</text>
                    <text>Men</text>
                    <text>Other</text>
                    </div>
                    <br/>


                    </div>

                </div>
             {/* ))}
            </div> */}

        </div>

    );
}
 
export default Stats;

// constructor(props) {
//     super(props);

//     this.state = {
//       percentage: 21
//     };

//     this.handleChangeEvent = this.handleChangeEvent.bind(this);
// }

//   handleChangeEvent(event) {
//     this.setState({
//       percentage: event.target.value
//     });
//   }

//   render() {
//     return (
//       <div>
//           <CircularProgressBar
//             strokeWidth="10"
//             sqSize="200"
//             percentage={this.state.percentage}/>
         
//         </div>
//     );