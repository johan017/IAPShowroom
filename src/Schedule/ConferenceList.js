import { Link } from "react-router-dom";
import useFetchConferences from "../hooks/use-fetch-conferences";


const ConferenceList = () => {
    
    const {conferences, loading} = useFetchConferences();
      
    const getDate = (props) =>{
        
        const day = props;
       
        console.log("day entered", day);

        console.log("day displayes", new Date(day).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'}));

        return new Date(day).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'}); //new Date(day).toISOString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});
    }

    return (

        <div>
            {loading && <div> Loading...</div>}
            
           {conferences && conferences.map((conference) =>(
                <div  className="conference-list" key ={conference.cid}>
                      
                    <p>{getDate(conference.c_date)}</p>
                        {conference.c_text}
                    <br/>
                    <Link to ={`/schedule/${conference.cid}/eventsScheduled`}>
                        <button>Edit Events</button>
                    </Link> 
                    <Link to ={`/schedule/update_conference/${conference.cid}` } >
                        <button style={{marginLeft:"2%"}}>Edit Conference</button>
                    </Link>  
               
                </div>     
            ))}

           {!conferences && (
               <h3> No Conferences Currently Available</h3>
           )}
        
        </div>
    );
}
 
export default ConferenceList;