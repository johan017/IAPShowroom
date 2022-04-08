import { Link } from "react-router-dom";
import useFetchProjects from "./hooks/use-fetch-projects";
import useFetch from "./useFetch";


//List of events inside the conference day 
const EventList = () => {
    const {projects, loading,} = useFetchProjects();
    // const {id} = useParams();

    const displayEvents = (props) =>{
        const p = props;
        if(p.length>0){
        // <h2>{title}</h2>
            return( 
            
                p.map((project) =>{
                    return(
                        <div className="c2" key ={project.projectid}>
                           
                        <Link to ={`/event_details/${project.projectid}`}>
                            {project.title}
                            {/* <h2>Date {event.date}</h2> */}
                        </Link>
                        <Link to ={`/update_event/${project.projectid}`}>
                            <button style={{ background: 'blue' }}>Modify</button>
                        </Link>                
                    </div>     
                    )

                })
            )
        }else{
            <h3>No events currently available</h3>

        }

    }
    

    return ( 

        <div className="event-list">
            {loading && <div> Loading...</div>}

           {displayEvents(projects)}
        </div>
    );
}
 
export default EventList;