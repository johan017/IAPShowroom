import useFetch from "./useFetch";
// // import {Tooltip, Title, ArcElement, Legend} from "chart.js";
// // import {Doughnut } from "react-chartjs-2";
// import { useState } from "react";
import CircularProgressBar from "./Percentage";
import React, { useState } from "react";
// import { render } from "react-dom";
// import {  CircularProgressbar } from "react-circular-progressbar";
import ProgressBar from 'react-bootstrap/ProgressBar'
  import "react-circular-progressbar/dist/styles.css";
  import 'bootstrap/dist/css/bootstrap.min.css';


const Stats = () => {
//     
    const {data:stats, isLoading, error} = useFetch('http://localhost:8000/stats');
   
    const [percentage, setPercentage] = useState(0);
    const now = 60;

    // const percentage = 19;

  
    // handleChangeEvent(event) {
    //   this.setState({
    //     percentage: event.target.value
    //   });
    // }
    return ( 
        <div >
            {/* {error && <div> {error} </div>}
            {isLoading && <div> Loading...</div>} */}
            <div className="statsdate" style={{ borderBottom: '1px solid #8e8a8a' }} >
                <h2> Conference Stats </h2>  <h3>March 23, 2022</h3>
               
            </div>
          
           
            <div className="stat-prog">
             {stats && stats.map((stat)=>(
                <div key={stat.id}>
                {/* <p>Total Participants</p> */}
                <h3>Overall Participants</h3>

                    <p>Total Participants</p>
                    <div className="stat-prog-bar">
                        <ProgressBar now={stat.activeParticipants} label={`${stat.activeParticipants}`} /> 
                    </div> <br/>

                    <p>General Participants</p>
                    <div className="stat-prog-bar">
                        <ProgressBar now={stat.generalParticipants} label={`${stat.generalParticipants}`} /> 
                    </div> <br/>                                        
                    
                    <p>Research Student Participants</p>
                    <div className="stat-prog-bar">
                        <ProgressBar now={stat.researchStudParticipants} label={`${stat.researchStudParticipants}%`} /> 
                    </div> <br/>

                    <p>Company Representatives Participants</p>
                    <div className="stat-prog-bar">
                        <ProgressBar now={stat.companyRepParticipants} label={`${stat.companyRepParticipants}`} /> 
                    </div> <br/>

                        <p>Advisor Participants</p>
                    <div className="stat-prog-bar">
                        <ProgressBar now={stat.professorParticipantss} label={`${stat.professorParticipants}`} /> 
                    </div> <br/>

                    <p>Women</p>
                    <div className="stat-prog-bar">
                        <ProgressBar now={stat.totalWomen} label={`${stat.totalWomen}`} /> 
                    </div> <br/>

                    <p>Men</p>
                    <div className="stat-prog-bar">
                        <ProgressBar now={stat.totalMen} label={`${stat.totalMen}`} /> 
                    </div> <br/>

                    <p>Other</p>
                    <div className="stat-prog-bar">
                        <ProgressBar now={stat.totalNotDisclosed} label={`${stat.totalNotDisclosed}`} /> 
                    </div> <br/>


                    <h3>Project Research Students</h3>

                    <p>Research Student Participants</p>
                    <div className="stat-prog-bar">
                        <ProgressBar now={stat.researchStudParticipants} label={`${stat.researchStudParticipants}`} /> 
                    </div> <br/>

                    <p>Research Students from ICOM</p>
                    <div className="stat-prog-bar">
                        <ProgressBar now={stat.resStudICOM} label={`${stat.resStudICOM}`} /> 
                    </div> <br/>

                    <p>Research Students from INEL</p>
                    <div className="stat-prog-bar">
                        <ProgressBar now={stat.resStudINEL} label={`${stat.resStudINEL}`} /> 
                    </div> <br/>

                    <p>Current Grad Students</p>
                    <div className="stat-prog-bar">
                        <ProgressBar now={stat.resStudGRAD} label={`${stat.resStudGRAD}`} /> 
                    </div> <br/>

                    <p>Women</p>
                    <div className="stat-prog-bar">
                        <ProgressBar now={stat.totalResStudWomen} label={`${stat.totalResStudWomen}`} /> 
                    </div> <br/>

                    <p>Men</p>
                    <div className="stat-prog-bar">
                        <ProgressBar now={stat.totalResStudMen} label={`${stat.totalResStudMen}`} /> 
                    </div> <br/>

                    <p>Other</p>
                    <div className="stat-prog-bar">
                        <ProgressBar now={stat.totalResStudNotDisclosed} label={`${stat.totalResStudNotDisclosed}`} /> 
                    </div> <br/>

                </div>
             ))}
            </div>

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