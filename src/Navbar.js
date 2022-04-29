import {Link} from 'react-router-dom';
// import ProtectedRoute from './ProtectedRoute';
// import Home from './HomeArea/Home';
// import useGetRole from './hooks/use-get-role';
import useFetchUserInfo from './hooks/use-fetch-all-user-info';

const Navbar = ({user_Role}) => {
    console.log(user_Role);
    const{userInfo} = useFetchUserInfo();


    // const {role, isLoading} = useGetRole();


    return (  
        //Need to use the getUserInfo from showroom proxy to identify user_role
        //n
        <div className = "navb">
            <nav className = "navbar">

            <img
                src = "IAP_Showroom_Logo_HD_Big.png"
                alt="display image"
            />
            <div className="links">

                {user_Role === "admin" && (
                      <div >
                      <Link to="/home" >HOME</Link>
                      <Link to="/stage" >STAGE</Link>
                      <Link to="/rooms" >ROOMS</Link>
                      <Link to="/stats" >STATS</Link>
                      <Link to="/sponsors" >SPONSORS</Link>
                      {/* <Link to="/schedule" >SCHEDULE</Link>
                      <Link to="/membervalidation">VALIDATION</Link>  */}
                      <Link to="/settings">SETTINGS
                          {/* <img 
                            style={{width:'40px', height:'40px'}}
                            src = "setting_img.png"
                            alt="display image"/> */}
                     </Link>
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
                      {/* <Link to="/announce" >Announce</Link> */}

                      {/* <Link to="/schedule" >SCHEDULE</Link> */}
                      <Link to="/settings">SETTINGS</Link>
                      <Link to ="/logout"> LOGOUT</Link>
                      

                  </div>
                )}
               

                   
            </div>
            </nav>
             {/* <h3>{userInfo.first_name} {userInfo.last_name}</h3> */}
        </div>
    );
}
 
export default Navbar;