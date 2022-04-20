import { useParams } from "react-router";
import useFetch from "../useFetch";
import {Link} from  "react-router-dom";
import { useHistory } from "react-router-dom";


const ProjectRoom = ({checked}) => {

    const history = useHistory();

    const {id} = useParams();
    const {data: event, error, isLoading} = useFetch('http://localhost:8000/projects/' + id); /* data is project because we want the id of a singular project */
    
    // const ROOM_INFO_URL = "";

// const {events} = useFetchEvents();
//STILL WORKING ON IT 
    // const {events} = useFetchEvents();
   
    // const [roomInfo, setRoomInfo] = useState([]);
    // // const [redirect, setRedirect] = useState(false);
    // const [isLoading, setLoading] = useState(false);
    // TODO: CONNECT WITH API
    // const result = "";
    
    //     // <div key={event.projectid}>
    //     useEffect(()=>{
    //         {events && events.map((event) => (

    //             result = axios.get(`api/showroom/qna/info/${event.projectid}`, 
    //             {
    //                 headers: {"Content-Type": "application/json"},
    //                 withCredentials: true
    //             });
    //         setRoomInfo(result.data.payload);
    //         // console.log(result.data.payload)
    //         ))}
    //     }, []);
    //     // </div>
    
    const handleStage = () =>{
        history.push('/stage');
    }
    
    return (  
        <div className = "project-room">
            {isLoading && <div> Loading... </div>}
            {error && <div> {error} </div>}
            {/* {events && events.map((event) =>( */}
               {checked && (<button onClick={handleStage} style={{backgroundColor: 'red'}}>STAGE LIVE</button>)}
               {!checked && (<button onClick={handleStage}>STAGE LIVE</button>)}   
              {event &&(
                <div key={event.projectid}>  
                                          {/* {roomInfo && roomInfo.map((roomI)=> (    
                        <div key={roomI.projectid}>
                            {event.title === roomI.title && (
                            <div> */}
                                <section id="project-room-info-section"></section>
                                <h2>{event.title}</h2>
                                {/* <p> Wrritten by {roomI.author}</p> */}
                                {event.abstract}
                           {/* </div>
                            )}
                    
                        </div>
                    
                    ))} */}

                </div>
            )} 
            <Link to ="/rooms">
                <button> Back to Rooms</button>
            </Link>
        </div>
    );
}
 
export default ProjectRoom;