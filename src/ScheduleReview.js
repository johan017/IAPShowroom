

import { useHistory } from "react-router-dom";



const ScheduleReview = () => {
    
    const history = useHistory();

    const handleSubmit = (e) =>{
        e.preventDefault();
        // const event = {title, startTime, endTime, presenters};
        // setIsLoading(true); //before submitting

        // fetch('http://localhost:8000/events', {
        //     method: 'POST',
        //     headers: {"Content-Type": "application/json"},
        //     body: JSON.stringify(event)
        // }).then (() => {
        //     console.log('new event added');
        //     setIsLoading(false); //when form is submitted; completed
        // })
        history.push('/schedule');

    }

    return ( 
        <div>
            <h2>REVIEW PAGE</h2>
            <button onClick = {handleSubmit}>Submit</button>
        </div>
    );
}
 
export default ScheduleReview;