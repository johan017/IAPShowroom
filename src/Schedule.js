import {Link} from 'react-router-dom';


const Schedule = () => {
    return ( 
        <div>
            <h2>Schedule Main</h2>
            <Link to="/create_day">
                <button>Next</button>
            </Link>

            {/* TODO ADD QUERY TO GET A LIST OF EVENTS FROM DB  */}


            
        </div>
    );
}
 
export default Schedule;