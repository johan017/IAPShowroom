import React, { useState } from "react";
import Progress from "./Progress";
import useFetchConferenceStats from "../hooks/use-fetch-Conference-stats";
import axios from "../context/axios";

const CONF_STATS_URL = "api/showroom/stats"

const Stats = () => {
   const [filterTime, setFilterTime] = useState('');
   const {conferenceStats} = useFetchConferenceStats();
   const [updatedConfStats, setupdatedConfStats] = useState([]);
   const [isLoading, setLoading] = useState(false);
   
   const getUpdatedConfStats = async(v) =>{
    try{
    const result = await axios.get(CONF_STATS_URL+`?date=${v}`,
    {
        headers: {"Content-Type": "application/json"},
        withCredentials: true
    }) 
    setupdatedConfStats(result.data.payload);
    } catch(error) {
        console.error(error.response.status);
    }
    setLoading(false);
}

   const getDate = () =>{
        const today = new Date();
        return today.toLocaleDateString('default', {month: 'long', day: 'numeric', year: 'numeric'});
    }
    

    const formatDate1 = (date) =>{
        const splitDate2 = date.toString().split(' ');
        const sdate = splitDate2[0].toString();
        return `${sdate}`; 
    }
    
    // if(!filterTime){
    //     getConferenceStats();
    //     setFilterTime(new Date());
    // } 

   var displayStats = conferenceStats;
   if(updatedConfStats.length !== 0) displayStats = updatedConfStats;
   console.log(displayStats);
    return ( 
        <div className="stats" >
            {/* {error && <div> {error} </div>} */}
            {isLoading && <div> Loading...</div>}
            <div className="statsdate" style={{ borderBottom: '1px solid #8e8a8a' }} >
                <h2> Conference Stats </h2> {!filterTime ? <h3>{getDate()}</h3> : <h3>{filterTime}</h3> }
            </div>
            <label> Presenting Stats from the following Date: </label>
               <input
                   type="date"
                   defaultValue={formatDate1(new Date())} 
                   onChange = {(e) => {setFilterTime(e.target.value);getUpdatedConfStats(e.target.value)}}  
               ></input>  
            <div className="stat-prog">
            {/* {conferenceStats && conferenceStats.map((cf)=>(
                <div key={cf.id}>
                    {cf.title} */}
             {/* {stats && stats.map((stat)=>(
                <div key={stat.id}> */}
                <h3>Overall Participants</h3>

                    <p>Total Participants</p>
                    {displayStats.maxParticipants}
                    <div className="stat-prog-bar">
                    
                        <Progress totalp={`${displayStats.maxParticipants}`} totalItem={`${displayStats.maxParticipants}`} /> 
                    </div> <br/>

                    <p>General Participants</p>
                    <div className="stat-prog-bar">
                        {displayStats.generalParticipants}
                        <Progress totalp={`${displayStats.maxParticipants}`} totalItem={`${displayStats.generalParticipants}`} /> 
                    </div> <br/>                                        
                    
                   <p>Research Student Participants</p>
                    <div className="stat-prog-bar">
                    {displayStats.researchStudParticipants}
                        <Progress totalp={`${displayStats.maxParticipants}`} totalItem={`${displayStats.researchStudParticipants}`} /> 
                    </div> <br/>

                    <p>Company Representatives Participants</p>
                    <div className="stat-prog-bar">
                    {displayStats.companyRepParticipants}
                        <Progress totalp={`${displayStats.maxParticipants}`} totalItem={`${displayStats.companyRepParticipants}`} /> 
                    </div> <br/>

                        <p>Advisor Participants</p>
                    <div className="stat-prog-bar">
                    {displayStats.professorParticipants}
                        <Progress totalp={`${displayStats.maxParticipants}`} totalItem={`${displayStats.professorParticipants}`} /> 
                    </div> <br/>

                    <div className="stats-people">
                        <div className="stats-people-women"><br/>
                            <text style={{marginLeft: "20%"}}>{`${displayStats.totalWomen}`}</text>
                            <text style={{marginLeft: "20.5%"}}>{`${displayStats.totalMen}`}</text> 
                            <text style={{marginLeft: "20%"}}>{`${displayStats.totalNotDisclosed}`}</text>
                        </div>

                        <div className="stats-people-women" >
                            <text>Women</text>
                            <text>Men</text>
                            <text>Other</text>
                        </div>
                    </div>

                    <h3>Project Research Students</h3>

                    <p>Research Student Participants</p>
                    <div className="stat-prog-bar">
                    {displayStats.researchStudParticipants}
                        <Progress totalp={`${displayStats.researchStudParticipants}`} totalItem={`${displayStats.researchStudParticipants}`} /> 
                    </div> <br/>

                    <p>Research Students from ICOM</p>
                    <div className="stat-prog-bar">
                    {displayStats.resStudICOM}
                        <Progress totalp={`${displayStats.researchStudParticipants}`} totalItem={`${displayStats.resStudICOM}`} /> 
                    </div> <br/>

                    <p>Research Students from INEL</p>
                    <div className="stat-prog-bar">
                    {displayStats.resStudINEL}
                        <Progress totalp={`${displayStats.researchStudParticipants}`} totalItem={`${displayStats.resStudINEL}`} /> 
                    </div> <br/>

                    <p>Research Students from INSO</p>
                    <div className="stat-prog-bar">
                    {displayStats.resStudINSO}
                        <Progress totalp={`${displayStats.researchStudParticipants}`} totalItem={`${displayStats.resStudINSO}`} /> 
                    </div> <br/>

                    <p>Research Students from CIIC</p>
                    <div className="stat-prog-bar">
                    {displayStats.resStudCIIC}
                        <Progress totalp={`${displayStats.researchStudParticipants}`} totalItem={`${displayStats.resStudCIIC}`} /> 
                    </div> <br/>

                    <p>Research Students from INME</p>
                    <div className="stat-prog-bar">
                    {displayStats.resStudINME}
                        <Progress totalp={`${displayStats.researchStudParticipants}`} totalItem={`${displayStats.resStudINME}`} /> 
                    </div> <br/>

                    <p>Research Students from Other Departments</p>
                    <div className="stat-prog-bar">
                    {displayStats.resStudOther}
                        <Progress totalp={`${displayStats.researchStudParticipants}`} totalItem={`${displayStats.resStudOther}`} /> 
                    </div> <br/>

                    <p>Students that will graduate soon</p>
                    <div className="stat-prog-bar">
                    {displayStats.resStudGRAD}
                        <Progress totalp={`${displayStats.researchStudParticipants}`} totalItem={`${displayStats.resStudGRAD}`} /> 
                    </div> <br/>

                    <div className="stats-people">
                        <div className="stats-people-women"><br/>
                            <text style={{marginLeft: "20%"}}>{`${displayStats.totalResStudWomen}`}</text>
                            <text style={{marginLeft: "20.5%"}}>{`${displayStats.totalResStudMen}`}</text> 
                            <text style={{marginLeft: "20%"}}>{`${displayStats.totalResStudNotDisclosed}`}</text>
                        </div>

                        <div className="stats-people-women" >
                            <text>Women</text>
                            <text>Men</text>
                            <text>Other</text>
                        </div>
                        <br/>
                    </div>

                </div>

        </div>

    );
}
 
export default Stats;

