import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "../useFetch";
import axios from "../context/axios";
import useGetRole from "../hooks/use-get-role";
import { Link } from "react-router-dom";


const EVENTS_URL = "api/showroom/schedule/events"

const NewEvent = () => {
    const {uID}  = useGetRole();
    const adminid = uID;
    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');
    const [duration, setDuration] = useState(15);
    const [isLoading, setIsLoading] = useState(false); // when first loading the page the POST request is not being made; only after sumbitting form is when request is made
    const history = useHistory();
    const projectid= null;
    const [cDate, setCDate] = useState('');

    var  pathArray = window.location.pathname.split('/');

    var confid=parseInt(pathArray[2]);


    const formatDate2 = (date) =>{
        const splitDate = date.split('T');
        const sdate = splitDate[0].toString();
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


    const handleSubmit = async(e) =>{
        e.preventDefault();
        // var difference = new Date(end) - new Date(starttime);
        // let duration = Math.floor((difference / (1000 * 60)));

        var e_date = formatDate2(cDate);
        var newstarttime = formatDate1(cDate, time);

        

        const event = [{adminid,  "starttime": newstarttime, "duration": parseInt(duration), title, projectid, e_date, "cid":confid}];
        //const event = {title, starttime, end};
        setIsLoading(true); //before submitting

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

    }

    return ( 
        <div className = "addNewEvent">
            <h2>Add a New Event</h2>
            <form onSubmit = {handleSubmit}>
                <label>Event Title: </label>
                <input 
                    type="text" 
                    required 
                    value = {title}
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
                {!isLoading && <button>Add Event</button>} {/** adds the new event  */}
                {isLoading && <button disabled>Adding Event...</button>} {/** add event button disabled while loading  */}

            </form>
        </div>
                       /**select & option is a dropdown */


     );
}
 
export default NewEvent;