import { useState, useEffect } from "react";
import { useHistory, useParams, withRouter, Link } from "react-router-dom";
import useFetchProjects from "../hooks/use-fetch-projects";
import useFetch from "../useFetch";
import Calendar from './Calendar';
import axios from "../context/axios";
import useFetchUserInfo from "../hooks/use-fetch-all-user-info";
import useFetchEvents from "../hooks/use-fetch-events";
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

    console.log("url_id",eid)
    // useEffect(()=>{
        // getEvents();
    // }, []);

    const [event, setEvent] = useState();
    const [redirect, setRedirect] = useState(false);
    const [isLoading, setLoading] = useState(false);
  
    const [defaultST, setDefaultST] = useState();

   

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
                setRedirect(true);
            }
        }
        setLoading(false);
    };

    useEffect(()=>{
        getEvents();
    }, []);

    // var defaultST = event.starttime;

    // const defaultst = new Date(event.starttime).toISOString('en-US').slice(0,16);

//   console.log("event starttime", event.starttime);
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
    const formatDate2 = (date) =>{
        const splitDate = date.split('T');
        const sdate = splitDate[0].toString();
        console.log("date", sdate)
        const stime = "00:00:00";
        console.log("time", stime)

        return `${sdate}`+" "+`${stime}`;
    }
    // console.log("event starttime ffn", formatDate(event.starttime));


    // console.log("event starttime formatFN", formatDate(startTime))

    console.log ("projects", projects)
    const handleEvent = async () =>{ 
        console.log("start time", startTime)
        var messageData = {
                // "meetid": "",
                "adminid": userInfo.adminid,
                "projectid": parseInt(projectID),
                "starttime": formatDate(startTime), //new Date(endTime).toLocaleString(),
                "duration": parseInt(duration),
                "title": title,
                "e_date": formatDate2(startTime), //new Date(startTime), //.toLocaleString('en-US'),
                // "isdeleted": false,
            };
            console.log("event", messageData);
        // }
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



   
   
    // const handleDelete = (props) =>{
    //     const eventID = props;

    //     fetch('http://localhost:8000/events/'+ eventID, {
    //         method: 'DELETE'
    //     }).then(() => {
    //         history.push('/cal');
    //     })
    //     // isDeleted = true;
    // }

    // useEffect(async ()=> {
    //     let result = await fetch(`http://localhost:8000/events/${props.match.params.id}`);
    //     result = await result.json();
    //     setData(result);
    // })

    return ( 
        <div className = "Event-information">
            <div className="addNewEvent">
                {projects && projects.map((project)=>(
                    <div key={project.project_id}>  
                {/* // {events && ( */}
                    {project.project_id === eid &&(
                        <div>                        
                            

                         <h2>Event Information</h2>
                         <label>Event Title: </label>
                         <input 
                             type="text" 
                             defaultValue={project.title}
                            //  value={title}
                             onChange = {(e) => setTitle(e.target.value)}
                         />
                         <label>Start Time: </label>
                         <input
                             type="datetime-local"
                             // required
                             defaultValue={new Date(defaultST).toISOString('en-US').slice(0,16)}
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
                         <button style={{ background: '#3B8D25' }}  onClick={() => {handleEvent(); setProjectID(project.project_id); setTitle(project.title); }}>Update Event</button> 
                         <button>Delete Event</button>
                        </div>
                    )}
                {/* )} */}
                    </div>

                ))}
               
            </div>

            <div className="Event-information-calendar">
                <Calendar/>

            </div>
        </div>

    );
}
 
export default withRouter(ScheduleUpdateEvent);