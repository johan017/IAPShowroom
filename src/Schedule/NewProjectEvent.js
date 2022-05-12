import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "../useFetch";
import axios from "../context/axios";
import useGetRole from "../hooks/use-get-role";
import useFetchProjects from "../hooks/use-fetch-projects";
import { Link } from "react-router-dom";


const EVENTS_URL = "api/showroom/schedule/events"

const NewProjectEvent = () => {
    const {uID}  = useGetRole();
    const adminid = uID;
    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');
    const [duration, setDuration] = useState(15);
    const [isLoading, setIsLoading] = useState(false); // when first loading the page the POST request is not being made; only after sumbitting form is when request is made
    const history = useHistory();
    const {projects, loading,} = useFetchProjects();
    const [cDate, setCDate] = useState('');


    var  pathArray = window.location.pathname.split('/');

    var projectid=parseInt(pathArray[4]);

    var confid=parseInt(pathArray[2]);
    console.log("projectid", projectid)

    console.log("confid", confid)

    const formatDate2 = (date) =>{
        const splitDate = date.split('T');
        const sdate = splitDate[0].toString();
        // const sdate = date;
        console.log("date", sdate)
        const stime = "00:00:00";
        console.log("time", stime)

        return `${sdate}`+" "+`${stime}`;
    }

    const formatDate1 = (date, addtime) =>{
        const splitDate = date.split('T');
        const sdate = splitDate[0].toString();
        // const sdate = date;
        console.log("date", sdate)
        const stime = addtime; //"00:00:00";
        console.log("time", stime)

        return `${sdate}`+" "+`${stime}`;
    }

    const getConference = async() =>{
        try{
        const result = await axios.get(`api/showroom/conference?conference_id=${confid}`,  //change to correct endpoint
        {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
        }) 
        setCDate(result.data.payload[0].c_date);
        console.log ("C-Date", result.data.payload[0].c_date)
        } catch(error) {
            console.error(error.response.status);
            if(error.response.status = '401'){
               
            }
        }
    };

    useEffect(()=>{
       getConference();
    }, []);


    const handleSubmit = async(defaultTitle, inputTitle) =>{
        // e.preventDefault();
        // var difference = new Date(end) - new Date(starttime);
        // let duration = Math.floor((difference / (1000 * 60)));

        var e_date = formatDate2(cDate);
        console.log(cDate);
        var newstarttime = formatDate1(cDate, time);
        console.log (cDate +","+ time)

        if(inputTitle === "") { 
            inputTitle = defaultTitle;
        }

        const event = [{adminid,  "starttime": newstarttime, "duration": parseInt(duration), "title": inputTitle, "projectid": projectid, e_date, "cid":confid}];
        //const event = {title, starttime, end};
        setIsLoading(true); //before submitting
        console.log("new project event", event )

        try{
            await axios.post(EVENTS_URL, 
                event,
                {
                    headers: {"Content-Type": "application/json"},
                    withCredentials: true
                }).then(() =>{
                   
                });
             history.push(`/schedule/${confid}/eventsScheduled`);     
        }catch(err){
            console.log(err);
        }
        // history.push('/cal');
      
    }

    return ( 
        <div className = "addNewEvent">
             {projects && projects.map((project) =>(
                <div key ={project.project_id}>
                    {projectid === project.project_id && (
                        <>
            <h2>Add a New Event</h2>
            {/* <form > */}
                <label>Event Title: </label>
                <input 
                    type="text" 
                    required 
                    defaultValue = {project.title}
                    onChange = {(e) => setTitle(e.target.value)}
                />
                <label>Start Time: </label>
                <input
                    type="time"
                    required
                    value = {time}
                    onChange = {(e) => setTime(e.target.value)}

                ></input>
                <label>Duration (in minutes): </label>
                <input 
                    type="number" 
                    required 
                    value = {duration}
                    onChange = {(e) => setDuration(e.target.value)}
                ></input>
               <Link to ={`/schedule/${confid}/eventsScheduled`}>
                    <button style={{ background: 'gray' }}>Cancel</button>
                </Link>
                {!isLoading && <button onClick = {()=>{handleSubmit(project.title, title);}}>Add Event</button>} {/** adds the new event  */}
                {isLoading && <button disabled>Adding Event...</button>} {/** add event button disabled while loading  */}

            {/* </form> */}
            </>
            )}
            </div>
            ))}
        </div>
                       /**select & option is a dropdown */


     );
}
 
export default NewProjectEvent;