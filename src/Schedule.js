import {Link} from 'react-router-dom';


const Schedule = () => {
    return ( 
        <div>
            <h2>Schedule Main</h2>
            <Link to="/create_day">
                <button>Next</button>
            </Link>
        </div>
    );
}
 
export default Schedule;