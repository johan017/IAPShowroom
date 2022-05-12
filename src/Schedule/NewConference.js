import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "../context/axios";



const ScheduleDay = () => {
    const [isLoading, setIsLoading] = useState(false); // when first loading the page the POST request is not being made; only after sumbitting form is when request is made

    const history = useHistory();
    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');

    const handleSchedule = async(e) =>{
        e.preventDefault();
        const conf = {
            "c_date": date, 
            "c_text": title};
        setIsLoading(true); //before submitting
        try{

        await axios.post('api/showroom/conference', conf, {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
            }).then((res) => {
                console.log(res.data);
            })
        }catch(err){

        }
        history.push('/schedule');
    }
    const handleCancel = (e) =>{
        history.push('/schedule');
    }


   
    return ( 

    <div className="schedule-new-conference">
      
      {/* {error && <div> {error} </div>} */}
      {isLoading && <div> Loading...</div>}
      
      <h2>Create a Conference</h2>
      <form>        
          
        <label>Conference Title: </label>
        <input 
            type="text" 
            required 
            value = {title}
            onChange = {(e) => setTitle(e.target.value)}
        />
        <label>Date of Conference: </label>
        <input 
            type="date" 
            required 
            value = {date}
            onChange = {(e) => setDate(e.target.value)}
        />
        
        </form>
      <button onClick = {handleCancel}>Cancel</button>
      <button style={{ background: '#3B8D25', marginLeft: "30px"}} onClick = {handleSchedule}>Next</button>


      </div> 
    );
}
export default ScheduleDay;