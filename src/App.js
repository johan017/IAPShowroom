import Login from './Login';
import GeneralSignUp from './UserSignUp/GeneralSignUp';
import Navbar from './Navbar';
import Home from './Home';
import Stage from './Stage';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Rooms from './Rooms';
import ProjectRoom from './ProjectRoom';

import NotFound from './NotFound';

import Stats from './Stats';
import Sponsors from './Sponsors';
import Schedule from './Schedule';
import ScheduleDay from './ScheduleDay';
import ScheduleCreate from './ScheduleCreate';
import ConferenceDetails from './ConferenceDetails';
import ScheduleNewEvent from './ScheduleNewEvent';
import EventDetails from './EventDetails';
import ScheduleReview from './ScheduleReview';
import ScheduleUpdateEvent from './ScheduleUpdateEvent';
// import ProtectedRoute from './ProtectedRoute';
import C2 from './C2';


import AccountCreated from './UserSignUp/AccountCreated';
import SignUpPage from './UserSignUp/SignUpPage';

import Calendar from './Calendar';

import Logout from './Logout';



function App() {

  // const likes = 100;
  // const FEAV = "https://drive.google.com/file/d/1Oa8CutI95VZUt05YpeYBVMcgKLhpjGsx/view?usp=sharing";


  return (
    <div className="App"> 
    
     
      <Router>
        <Switch>
          <Route exact path="/"> 
            <Login/> {/*Login component*/}
          </Route>
          <Route path="/signUp"> 
           <SignUpPage/> {/*Sign Up component*/}
          </Route>
                 
          {/* Schedule Review  component - view schedule before submitting* */}
          <Route path="/accountCreated"> 
            <AccountCreated/> 
          </Route>


            <div className="content">
              <Navbar></Navbar> {/*Navigation bar*/}
      
                {/*Home component*/}
                {/* <ProtectedRoute component={Home}>
        
                </ProtectedRoute> */}

                {/*Stage component*/}
                <Route path="/stage">
                  <Stage/> 
                </Route>

                {/*Rooms component*/}
                <Route path="/rooms">
                  <Rooms/> 
                </Route>

                {/*Project Room component*/}
                <Route path="/project_room/:id"> 
                  <ProjectRoom/> 
                </Route>

                {/*Stats component*/}
                <Route path="/stats">
                  <Stats/> 
                </Route>

                {/*Sponsors component*/}
                <Route path="/sponsors">
                  <Sponsors/> 
                </Route>           

                {/*Schedule component - schedule of conferencia*/}
                <Route exact path="/schedule">
                  <Schedule/>
                </Route>
                            
                {/* Create Schedule component - organize events and projects (calendar component)*/}
                <Route exact path="/create_day"> 
                  <ScheduleDay/> 
                </Route>
                
                <Route exact path="/conference_details/:id"> 
                  <ConferenceDetails/> {/*Event Details component*/}
                </Route>
                
                {/*Create Schedule component - organize events and projects (calendar component)*/}
                <Route exact path="/create_schedule"> 
                  <ScheduleCreate/> 
                </Route>
                
                {/*NewEvent component - events created manually*/}
                <Route exact path="/new_event"> 
                  <ScheduleNewEvent/> 
                </Route>

                {/*NewEvent component - events created manually*/}
                <Route exact path="/update_event/:id"> 
                  <ScheduleUpdateEvent/> 
                </Route>

                <Route exact path="/event_details/:id"> 
                  <EventDetails/> {/*Event Details component*/}
                </Route>

                {/* Schedule Review  component - view schedule before submitting* */}
                <Route exact path="/schedule/review"> 
                  <ScheduleReview/> 
                </Route>
                
                {/* Calendar  component - view schedule before submitting* */}
                <Route path="/calendar"> 
                  <Calendar/> 
                </Route>

                <Route path="/logout"> 
                  <Logout/> 
                </Route>
                <Route path="/cal"> 
                  <C2/> 
                </Route>
                
                
               
              </div> 
              <Route path="*"> 
                <NotFound/> {/*NotFound component*/}
              </Route> 
          </Switch>     
          {/* <p> Liked {likes} times </p> </div>  {/* to create a clickable link (like in documents) */}
       
          {/*<a href={FEAV}>FRONT END ADMIN VIEW</a>  */}
        </Router> 
        
      </div>
    
  );
}

export default App;
