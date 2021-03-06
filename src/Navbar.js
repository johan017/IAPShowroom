import {Link} from 'react-router-dom';
// import ProtectedRoute from './ProtectedRoute';
// import Home from './HomeArea/Home';
// import useGetRole from './hooks/use-get-role';
import useFetchUserInfo from './hooks/use-fetch-all-user-info';
import axios from "./context/axios";

const LOGOUT_URL = "api/auth/logout";

const Navbar = () => {
  
    // const{userInfo} = useFetchUserInfo();


    // const {role, isLoading} = useGetRole();

    const handleLogout = async() => {
        try {
            await axios.post(LOGOUT_URL, 
                {data: "Request Logout"},
                {   
                headers: {"Content-Type": "application/json"},
                withCredentials: true,
                data: "Request Logout"
                },)
            localStorage.clear();
        } catch (error) {
            console.log(error);
        }
        window.location.href="/"
        // window.location.reload();
  } 
    return (  
        //Need to use the getUserInfo from showroom proxy to identify user_role
        //n
        <div className = "navb">
            <nav className = "navbar">
            <a href='/home'>
                <img
                    src = "IAP_Showroom_Logo_HD_Big.png"
                    alt="display image"
                />
            </a>
            <div className="links">
                 <div >
                    <a onClick={() => {window.location.href="/home"}}>HOME</a>
                    <a onClick={() => {window.location.href="/stage"}}>STAGE</a>
                    <a onClick={() => {window.location.href="/rooms"}}>ROOMS</a>
                    <a onClick={() => {window.location.href="/stats"}}>STATS</a>
                    <a onClick={() => {window.location.href="/sponsors"}}>SPONSORS</a>
                    <a onClick={() => {window.location.href="/settings"}}>SETTINGS</a>
                    <a onClick={() => handleLogout()}> LOGOUT</a>
                  </div>               
            </div>
            </nav>
             {/* <h3>{userInfo.first_name} {userInfo.last_name}</h3> */}
        </div>
    );
}
 
export default Navbar;