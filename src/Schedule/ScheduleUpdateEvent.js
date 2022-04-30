import { useState, useEffect } from "react";
import { useHistory, useParams, withRouter, Link } from "react-router-dom";
import useFetchProjects from "../hooks/use-fetch-projects";
import useFetch from "../useFetch";
import Calendar from './Calendar';
import axios from "../context/axios";
import useFetchUserInfo from "../hooks/use-fetch-all-user-info";
import { RestoreOutlined } from "@material-ui/icons";






function ScheduleUpdateEvent (props) {
   
    const [title, setTitle] = useState('');
    const [startTime, setStartTime] = useState('');
    const [duration, setDuration] = useState('');
    const [projectID, setProjectID] = useState('');

    const {userInfo} = useFetchUserInfo();
    
    const {projects} = useFetchProjects();
    var  pathArray = window.location.pathname.split('/');


    var eid = parseInt(pathArray[2]);
    const history = useHistory();

    // useEffect(()=>{
    //     getEvents();
    // }, []);

    const [event, setEvent] = useState();


    const [defaultST, setDefaultST] = useState();

//    console.log(new Date(event.starttime))
// console.log (event)
// console.log(event.isdeleted)

    const getEvents = async() =>{
        try{
        const result = await axios.get(`api/showroom/schedule/events/${eid}`, 
        {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
        }) 
        setEvent(result.data.payload);
        setDefaultST(result.data.payload.starttime);
        } catch(error) {
            console.error(error.response.status);
            if(error.response.status = '401'){
               
            }
        }
        // setLoading(false);
    };

    useEffect(()=>{
       getEvents();
    }, []);

    // var defaultST = event.starttime;

    // const defaultst = new Date(event.starttime).toISOString('en-US').slice(0,16);

//   console.log("event ", event);
//     console.log("event starttime type", typeof(event.starttime));
//     console.log("event starttime", new Date(event.starttime).toISOString('en-US').slice(0,16));
//     console.log("event starttime", new Date(event.starttime).toLocaleString('en-US'));
//     console.log("event starttime", new Date(event.starttime).toLocaleString([], {month:'2-digit', day: '2-digit', year: 'numeric'}));

    const formatDate = (date) =>{
       const splitDate = new Date(date); //.split('T');
        const splitDate2 = date.split('T');
        const sdate = splitDate2[0].toString();
        // console.log("date", sdate)
        const stime = splitDate.toLocaleTimeString('it-IT'); //splitDate[1].toString()+":00";
        // console.log("time", stime)

        return `${sdate}`+" "+`${stime}`;
       
    }
    // to display in modify date box 
    const formatDate1 = (date) =>{
        const splitDate = new Date(date); //.split('T');
         const splitDate2 = date.split(' ');
         const sdate = splitDate2[0].toString();
         // console.log("date", sdate)
         const stime = splitDate.toLocaleTimeString('it-IT'); //splitDate[1].toString()+":00";
         // console.log("time", stime)
 
         return `${sdate}`+"T"+`${stime}`;
        
     }
    const formatDate2 = (date) =>{
        
        const splitDate = date.split('T');
        const sdate = splitDate[0].toString();
        const stime = "00:00:00";
        return `${sdate}`+" "+`${stime}`;
    }

    {/* if an event does not exist - creat event [post] */}
    const handlePostEvent = async (id, defaultTitle, inputTitle) =>{
        if(inputTitle === "") { 
            inputTitle = defaultTitle;
        }
        const messageData = [{
            "adminid": userInfo.adminid,
            "projectid": id, //parseInt(projectID),
            "starttime": formatDate(startTime), //new Date(endTime).toLocaleString(),
            "duration": parseInt(duration),
            "title": inputTitle,
            "e_date": formatDate2(startTime), //new Date(startTime), //.toLocaleString('en-US'),
        }];
        console.log("event", messageData);

        try{

        await axios.post(`api/showroom/schedule/events`, messageData, {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
            }).then((res) => {
                console.log(res.data)
            }).catch((error)=>{
                console.log(error)
        });
        }catch(err){

        }
    }
    
    {/* if an event already exists - update [put] */}
    const handleUpdateEvent = async (id, defaultTitle, inputTitle, defaultStartTime, inputStartTime, defaultDuration, inputDuration) =>{ 

        if(inputTitle === "") { 
            inputTitle = defaultTitle;
        }
        if(inputStartTime === "") { 
            inputStartTime = defaultStartTime;
        }
        if(inputDuration === "") { 
            inputDuration = defaultDuration;
        }
        // console.log("start time", startTime)
        console.log("edate", formatDate2(startTime));
        var messageData = {
                "adminid": userInfo.adminid,
                "projectid": id, //parseInt(projectID),
                "starttime": inputStartTime, //new Date(endTime).toLocaleString(),
                "duration": parseInt(inputDuration),
                "title": inputTitle,
                "e_date": inputStartTime.slice(0,10), //new Date(startTime), //.toLocaleString('en-US'),
        };
        console.log("event", messageData);

        try{

        await axios.put(`api/showroom/schedule/events/${eid}`, messageData, {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
            }).then((res) => {
                console.log(res.data)
            }).catch((error)=>{
                console.log(error)
        });
        }catch(err){

        }
       
    }

    const handleDelete = async () =>{ 
    
        await axios.delete(`api/showroom/schedule/events/${eid}`,  {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
            }).then((res) => {
                console.log(res.data)
            }).catch((error)=>{
                console.log(error)
        });
        history.push('/cal'); 
    }

   

    return ( 
        <div className = "Event-information">
            {/* if an event already exists - update [put] */}
            {event && (
                <div className="addNewEvent">
                    
                        <div key={event.meetid}>  
    
                                <div>                        
                                    <h2>Event Information</h2>
                                    <label>Event Title: </label>
                                    <input 
                                        type="text" 
                                        defaultValue={event.title}
                                        onChange = {(e) => setTitle(e.target.value)}
                                    />
                                    <label>Start Time: </label>
                                    <input
                                        type="datetime-local"
                                        // required
                                        defaultValue={formatDate1(event.starttime)} 
                                        //  value = {startTime}
                                        onChange = {(e) => setStartTime(e.target.value)}
                    
                                    ></input>
                                    <label>Duration: </label>
                                    <input 
                                        type="number" 
                                        // required 
                                        defaultValue={event.duration}
                                        //  value = {duration}
                                        onChange = {(e) => setDuration(e.target.value)}
                                    ></input>
                                
                                    <Link to ={"/cal"}>
                                        <button style={{ background: 'gray' }}>Cancel</button>
                                    </Link>
                                    <button style={{ background: '#3B8D25' }}  onClick={() => { handleUpdateEvent(event.projectid, event.title, title, event.starttime, startTime, event.duration, duration);}}>Update Event</button> 
                                    <button onClick={handleDelete}>Delete Event</button>
                                </div>
                            
                        </div>
                                
                </div>
            )}

            {/* if an event does not exist - creat event [post] */}
            {!event && (
                <div className="addNewEvent">
                    {projects && projects.map((project)=>(
                        <div key={project.project_id}>  
                            {project.project_id === eid &&(
                                <div>                        
                                    <h2>Event Information</h2>
                                    <label>Event Title: </label>
                                    <input 
                                        type="text" 
                                        defaultValue={project.title}
                                        onChange = {(e) => setTitle(e.target.value)}
                                    />
                                    <label>Start Time: </label>
                                    <input
                                        type="datetime-local"
                                        // required
                                        // defaultValue={new Date(defaultST).toISOString('en-US').slice(0,16)}
                                        value = {startTime}
                                        onChange = {(e) => setStartTime(e.target.value)}

                                    ></input>
                                    <label>Duration: </label>
                                    <input 
                                        type="number" 
                                        // required 
                                        // defaultValue={duration}
                                        value = {duration}
                                        onChange = {(e) => setDuration(e.target.value)}
                                    ></input>
                                
                                    <Link to ={"/cal"}>
                                            <button style={{ background: 'gray' }}>Cancel</button>
                                    </Link>
                                    <button style={{ background: '#3B8D25' }}  onClick={() => {handlePostEvent(project.project_id, project.title, title);}}>Update Event</button> 
                                    <button onClick={handleDelete}>Delete Event</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
           
                

            <div className="Event-information-calendar">
                <Calendar/>

            </div>
        </div>

    );
}
 
export default withRouter(ScheduleUpdateEvent);