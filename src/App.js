import Navbar from './Navbar';
import Home from './Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Rooms from './Rooms';
import Stage from './Stage';
import ProjectRoom from './ProjectRoom';
import NewEvent from './NewEvent';
import Schedule from './Schedule';
import EventDetails from './EventDetails';
import NotFound from './NotFound';


function App() {

  // const likes = 100;
  // const FEAV = "https://drive.google.com/file/d/1Oa8CutI95VZUt05YpeYBVMcgKLhpjGsx/view?usp=sharing";


  return (
    <Router>
      <div className="App"> 
        <Navbar></Navbar> {/*Navigation bar*/}
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home></Home> {/*Home component*/}
            </Route>
            <Route path="/stage">
              <Stage/> {/*Stage component*/}
            </Route>
            <Route path="/rooms">
              <Rooms/> {/*Rooms component*/}
            </Route>
            <Route path="/project_room/:id"> 
              <ProjectRoom/> {/*Project Room component*/}
            </Route>
            <Route path="/schedule/new_event"> 
              <NewEvent/> {/*NewEvent component*/}
            </Route>
            <Route path="/events_details/:id"> 
              <EventDetails/> {/*Event Details component*/}
            </Route>
            <Route exact path="/schedule"> 
              <Schedule/> {/*NewEvent component*/}
            </Route>
            <Route path="*"> 
              <NotFound/> {/*NotFound component*/}
            </Route>
          </Switch>     
          {/* <p> Liked {likes} times </p> </div>  {/* to create a clickable link (like in documents) */}
        </div>
          {/*<a href={FEAV}>FRONT END ADMIN VIEW</a>  */}
       </div>
    </Router>   
  );
}

export default App;
