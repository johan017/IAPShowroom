import {Link} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Home from './Home';
import useGetRole from './hooks/use-get-role';

const Navbar = ({user_Role}) => {
    console.log(user_Role);

    // const {role, isLoading} = useGetRole();


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

                {user_Role === "admin" && (
                      <div >
                      <Link to="/home" >HOME</Link>
                      <Link to="/stage" >STAGE</Link>
                      <Link to="/rooms" >ROOMS</Link>
                      <Link to="/stats" >STATS</Link>
                      <Link to="/sponsors" >SPONSORS</Link>
                      <Link to="/schedule" >SCHEDULE</Link>
                      <Link to="/announce" >Announce</Link>

                      <Link to ="/logout"> LOGOUT</Link>
                  </div>
                )}

                {user_Role !== "admin" && (
                      <div >
                      <Link to="/home" >HOME</Link>
                      <Link to="/stage" >STAGE</Link>
                      <Link to="/rooms" >ROOMS</Link>
                      <Link to="/stats" >STATS</Link>
                      <Link to="/sponsors" >SPONSORS</Link>
                      <Link to="/announce" >Announce</Link>

                      {/* <Link to="/schedule" >SCHEDULE</Link> */}
                      <Link to ="/logout"> LOGOUT</Link>
                  </div>
                )}
                   
            </div>
        </nav>
    );
}
 
export default Navbar;