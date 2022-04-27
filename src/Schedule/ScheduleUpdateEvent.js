import { useState, useEffect } from "react";
import { useHistory, useParams, withRouter, Link } from "react-router-dom";
import useFetch from "../useFetch";
import Calendar from './Calendar';




function ScheduleUpdateEvent (props) {
    // const {id} = useParams();
    // const {project_id} = useParams();

    // const {data: event }= useFetch('http://localhost:8000/events/' + id); /* data is project because we want the id of a singular project */
  
    // const [title, setTitle] = useState('');
    // const [startTime, setStartTime] = useState('');
    // const [endTime, setEndTime] = useState('');
    // const [presenters, setPresenters] = useState('');
    // const [isLoading, setIsLoading] = useState(false); // when first loading the page the POST request is not being made; only after sumbitting form is when request is made
    const history = useHistory();

    const [data, setData] = useState([]);


    const handleClick = (e) =>{
        e.preventDefault();
        var title = data.title;
        var start = data.start;
        var end = data.end;
        var id = props.match.params.id;
        let event = {title, start, end, id};
    //     setIsLoading(true); //before submitting

        fetch(`http://localhost:8000/events/${props.match.params.id}`, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(event)
        }).then (() => {
            console.log('new event added');
            history.push("/cal");
    //         setIsLoading(false); //when form is submitted; completed
        })
    
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

    useEffect(async ()=> {
        let result = await fetch(`http://localhost:8000/events/${props.match.params.id}`);
        result = await result.json();
        setData(result);
    })

    return ( 
        <div className = "Event-information">
            <div className="addNewEvent">
                <h2>Event Information</h2>
                <label>Event Title: </label>
                <input 
                    type="text" 
                    defaultValue={data.title}
                    onChange = {(e) => data.setTitle(e.target.value)}
                />
                <label>Start Time: </label>
                <input
                    type="datetime-local"
                    // required
                    defaultValue = {data.start}
                    onChange = {(e) => data.setStart(e.target.value)}

                ></input>
                <label>End Time: </label>
                <input 
                    type="datetime-local" 
                    // required 
                    defaultValue = {data.end}
                    onChange = {(e) => data.setEnd(e.target.value)}
                ></input>
            
                <Link to ={"/cal"}>
                        <button style={{ background: 'gray' }}>Cancel</button>
                </Link>
                <button style={{ background: '#3B8D25' }} onClick={handleClick}>Update Event</button> 
                <button>Delete Event</button>

            </div>

            <div className="Event-information-calendar">
                <Calendar/>

            </div>
        </div>

    );
}
 
export default withRouter(ScheduleUpdateEvent);