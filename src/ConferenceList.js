import { Link } from "react-router-dom";


const ConferenceList = ({conferences, title}) => {

    return ( 

        <div className="event-list">
            <h2>{title}</h2>
            {conferences.map((conference) =>(
                // Project list for schedule view in Lobby 
                //TODO: MAP CONFERENCE.ID TO EVENTS
                <div className="event-list-preview" key ={conference.id}>
                    <Link to ={`/conference_details/${conference.id}`}> 
                        <h2>Conference Day {conference.day}</h2>
                        <h2>Date {conference.date}</h2>
                    </Link>

                    
                
                    {/* Button to enter that specific project room  */}
                    {/* <button onClick={() => handleRedirect(project.id)}> Project Room </button> */}
                
                </div>     
            ))}
        </div>
    );
}
 
export default ConferenceList;