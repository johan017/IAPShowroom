import {Link} from 'react-router-dom';


const Navbar = () => {
    return (  

        <nav className = "navbar">

            <img
                src = "IAP_Showroom_Logo_HD_Big.png"
                alt="display image"
            />
            {/* <h1>IAP Showroom</h1> */}
            <div className="links">
                <Link to ="/home">HOME</Link>
                <Link to="/stage" >STAGE</Link>
                <Link to="/rooms" >ROOMS</Link>
                <Link to="/stats" >STATS</Link>
                <Link to="/sponsors" >SPONSORS</Link>
                <Link to="/schedule" >SCHEDULE</Link>
                <Link to="/calendar">CALENDAR</Link>



            </div>
        </nav>
    );
}
 
export default Navbar;