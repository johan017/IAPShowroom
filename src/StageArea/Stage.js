import ProgressBar from "./ProgressBar";
import { useParams } from "react-router-dom";
import useFetchUpcomingEvents from "../hooks/use-fetch-upcoming-events";
import useFetchServerSideEvents from "../hooks/use-fetch-server-side-events";




const Stage = () => {
    // const {id} = 1; //useParams();

    // const {data: conf} = useFetch('http://localhost:8000/conference-info/'+ id); /* data is projects because info is found in db within projects */

    var {events, isLoading} = useFetchUpcomingEvents();

    function UpcomingEventsRender(props){
        const p = props;
        if(p.length>0){
        return(
            p.map((event) => {
            return (
            // Project list for schedule view in Lobby 
            <div className="project-preview" key ={event.projectid}>
                <h3>{event.starttime}</h3>
            <h2>{event.title}</h2>
            </div>
            )
            })
        )
        } else {
        <h3>No events currently available</h3>
        }
    }

    return ( 
        <div>
            <br></br>
            <h2> STAGE </h2> 
            {/* {conf && ( 
               < div key={conf.id}> */}
                <ProgressBar
                    duration={25}
                ></ProgressBar>
                {/* </div> */}
            {/* )} */}
            <div className="bbb">
              
                {/* Update to get src url from the backend. Temporarily Hardcoded to get a view working  */}
                <iframe className="temp" src="https://iapstream.ece.uprm.edu/bigbluebutton/api/create?name=DemoMeeting&meetingID=DemoMeeting&attendeePW=ap&moderatorPW=mp&checksum=f5e85d6b55189f228cf06e4791736e44b63282f1"></iframe> {/*TODO Remove after changes to incorporate backend url*/}
                <br></br>
                <iframe className="iframe" src="https://iapstream.ece.uprm.edu/bigbluebutton/api/join?fullName=w1&meetingID=DemoMeeting&password=mp&role=moderator&checksum=62dcc9207e6fbaef56223b4f4b0dcd5abcad159e" allow="camera;microphone;display-capture" allowFullScreen></iframe> 
            </div>
            <div>
                <div>events: {UpcomingEventsRender(events)}</div>
                <div>{useFetchServerSideEvents()}</div>
            </div>
        </div>

    );
}
 
export default Stage;