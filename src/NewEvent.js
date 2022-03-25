import { useState } from "react";
import { useHistory } from "react-router-dom";


const NewEvent = () => {

    const [title, setTitle] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [presenters, setPresenters] = useState('');
    const [isLoading, setIsLoading] = useState(false); // when first loading the page the POST request is not being made; only after sumbitting form is when request is made
    const history = useHistory();



    const handleSubmit = (e) =>{
        e.preventDefault();
        const event = {title, startTime, endTime, presenters};
        setIsLoading(true); //before submitting

        fetch('http://localhost:8000/events', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(event)
        }).then (() => {
            console.log('new event added');
            setIsLoading(false); //when form is submitted; completed
        })
        history.push('/schedule');

    }

    return ( 
        <div className = "addNewEvent">
            <h2>Add a New Event</h2>
            <form onSubmit = {handleSubmit}>
                <label>Even Title: </label>
                <input 
                    type="text" 
                    required 
                    value = {title}
                    onChange = {(e) => setTitle(e.target.value)}
                />
                <label>Start Time: </label>
                <textarea
                    required
                    value = {startTime}
                    onChange = {(e) => setStartTime(e.target.value)}

                ></textarea>
                <label>End Time: </label>
                <input 
                    type="text" 
                    required 
                    value = {endTime}
                    onChange = {(e) => setEndTime(e.target.value)}
                ></input>
                <label>Presenters: </label>
                <select 
                    value = {presenters}
                    onChange = {(e) => setPresenters(e.target.value)}

                > 
                    <option value="" placeholder="Select Presenter">Select Presenter</option> {/* Verify how to make this entry invalid if left when submitting*/}
                    <option value="Do not Disclose" placeholder="Select Gender">Don't Disclose</option>
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select> 
                {!isLoading && <button>Add Event</button>} {/** adds the new event  */}
                {isLoading && <button disabled>Adding Event...</button>} {/** add event button disabled while loading  */}

            </form>
        </div>
                       /**select & option is a dropdown */


     );
}
 
export default NewEvent;