import {Link} from 'react-router-dom';



const Logout = () => {

    return ( 
        
        <div>
            <h2>YOU HAVE SUCCESSFULLY LOGGED OUT OF THE CONFERENCE</h2>
            <Link to ={"/"}>
                <button>OK</button>
            </Link>
        </div>
        
    );


}
 
export default Logout;