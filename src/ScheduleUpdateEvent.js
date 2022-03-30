import { useState, useEffect } from "react";
import { useHistory, useParams, withRouter, Link } from "react-router-dom";
import useFetch from "./useFetch";



function ScheduleUpdateEvent (props) {
    // const {id} = useParams();
    // const {data: event }= useFetch('http://localhost:8000/events/' + id); /* data is project because we want the id of a singular project */
  
    // const [title, setTitle] = useState('');
    // const [startTime, setStartTime] = useState('');
    // const [endTime, setEndTime] = useState('');
    // const [presenters, setPresenters] = useState('');
    // const [isLoading, setIsLoading] = useState(false); // when first loading the page the POST request is not being made; only after sumbitting form is when request is made
    const history = useHistory();

    const [data, setData] = useState([]);


    // const handleClick = (e) =>{
    //     e.preventDefault();
    //     // const event = {title, startTime, endTime, presenters};
    // //     setIsLoading(true); //before submitting

    //     fetch('http://localhost:8000/events'+props.match.params.id, {
    //         method: 'POST',
    //         headers: {"Content-Type": "application/json"},
    //         body: JSON.stringify(data)
    //     }).then (() => {
    //         console.log('new event added');
    // //         setIsLoading(false); //when form is submitted; completed
    //     })
    // //     //TODO:need to go back to a specific id of conference details(not working)
    //     // history.push("/event_details/"+data.id);

    // }

    useEffect(async ()=> {
        let result = await fetch("http://localhost:8000/events/"+props.match.params.id);
        result = await result.json();
        setData(result);
    })

    return ( 
        <div className = "addNewEvent">
            <h2>Update Event</h2>
            <label>Even Title: </label>
            <input 
                type="text" 
                defaultValue={data.title}
                onChange = {(e) => data.setTitle(e.target.value)}
            />
            <label>Start Time: </label>
            <input
                type="datetime-local"
                // required
                defaultValue = {data.startTime}
                onChange = {(e) => data.setStartTime(e.target.value)}

            ></input>
            <label>End Time: </label>
            <input 
                type="datetime-local" 
                // required 
                defaultValue = {data.endTime}
                onChange = {(e) => data.setEndTime(e.target.value)}
            ></input>
            <label>Presenters: </label>
            <select 
                defaultValue = {data.presenters}
                onChange = {(e) => data.setPresenters(e.target.value)}

            > 
                <option value="" placeholder="Select Presenter">Select Presenter</option> {/* Verify how to make this entry invalid if left when submitting*/}
                <option value="Do not Disclose" placeholder="Select Gender">Don't Disclose</option>
                <option value="mario">mario</option>
                <option value="yoshi">yoshi</option>
            </select> 
            <Link to ={"/event_details/"+data.id}>
                     <button>Cancel</button>
            </Link>
            <button >Update Event</button> {/** adds the new event  */}
            {/* {isLoading && <button disabled>Adding Event...</button>} * add event button disabled while loading  */}

            {/* </form> */}
        </div>
                       /**select & option is a dropdown */


     );
}
 
export default withRouter(ScheduleUpdateEvent);