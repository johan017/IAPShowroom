import {Link} from 'react-router-dom';


const Navbar = () => {
    return (  

        <nav className = "navbar">

        <h1>IAP Showroom</h1>
        <div className="links">
            <Link to ="/">HOME</Link>
            <Link to="/stage" >STAGE</Link>
            <Link to="/rooms" >ROOMS</Link>
            <Link to="/stats" >STATS</Link>
            <Link to="/sponsors" >SPONSORS</Link>
            <Link to="/schedule" >SCHEDULE</Link>



        </div>
        </nav>
    );
}
 
export default Navbar;