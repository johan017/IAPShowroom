import {Link} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Home from './Home';
import useGetRole from './hooks/use-get-role';

const Navbar = () => {

    // const {role, isLoading} = useGetRole();


    const displayView = () =>{

        if(user_Role === "Admin"){
            <div>
                <Link to="/home" >HOME</Link>
                <Link to="/stage" >STAGE</Link>
                <Link to="/rooms" >ROOMS</Link>
                <Link to="/stats" >STATS</Link>
                <Link to="/sponsors" >SPONSORS</Link>
                <Link to="/schedule" >SCHEDULE</Link>
                <Link to ="/logout"> LOGOUT</Link>
            </div>

        }else{
            <div>
                <Link to="/home" >HOME</Link>
                <Link to="/stage" >STAGE</Link>
                <Link to="/rooms" >ROOMS</Link>
                <Link to="/stats" >STATS</Link>
                <Link to="/sponsors" >SPONSORS</Link>
                {/* <Link to="/schedule" >SCHEDULE</Link> */}
                <Link to ="/logout"> LOGOUT</Link>
            </div>
        }

    }


    return (  
        //Need to use the getUserInfo from showroom proxy to identify user_role
        //n
        <nav className = "navbar">

            <img
                src = "IAP_Showroom_Logo_HD_Big.png"
                alt="display image"
            />
            {/* <h1>IAP Showroom</h1> */}
            
            <div className="links">

                {displayView(user_Role)}
                   
            </div>
        </nav>
    );
}
 
export default Navbar;