import '@progress/kendo-theme-default/dist/all.css';
import Login from './LoginArea/Login';
import Navbar from './Navbar';
import Home from './HomeArea/Home';
import Stage from './StageArea/Stage';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Rooms from './RoomArea/Rooms';
import ProjectRoom from './RoomArea/ProjectRoom';
import Stats from './StatsArea/Stats';
import Sponsors from './Sponsors';
import Schedule from './Schedule/Schedule';
import ScheduleNewEvent from './Schedule/ScheduleNewEvent';
import EventDetails from './Schedule/EventDetails';
import ScheduleReview from './Schedule/ScheduleReview';
import ScheduleUpdateEvent from './Schedule/ScheduleUpdateEvent';
import AccountCreated from './UserSignUp/AccountCreated';
import SignUpPage from './UserSignUp/SignUpPage';
import ProtectedRoute from './ProtectedRoute';
import NotFound from './NotFound';
import AskChangePassword from './LoginArea/AskChangePassword';
import ChangePassword from './LoginArea/ChangePassword';
import Validate from './Settings/Validate';
import Account from './Settings/Account';
import Settings from './Settings/Settings';
import C2 from './Schedule/C2';
import MemberValidation from './Settings/MemberValidation';
import HtmlEndMeeting from './StageArea/HtmlEndMeeting';




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

          <Route exact path="/askChangePassword"> 
            <AskChangePassword/> 
          </Route>

          <Route exact path="/changePassword"> 
            <ChangePassword/> 
          </Route>
                 
          {/* Schedule Review  component - view schedule before submitting* */}
          <Route path="/accountCreated"> 
            <AccountCreated/> 
          </Route>
          <Route path="/endMeeting"> 
              <HtmlEndMeeting/> 
            </Route>

          <div className="content">
            <ProtectedRoute user_role="all" component={Navbar}/>      
            {/*Home component*/}
            <ProtectedRoute path="/home" user_role="all" component={Home}/>
            {/* <ProtectedRoute exact path="/announce" user_role="all" component={Announcements}/> */}

            {/*Stage component*/}
            <ProtectedRoute path="/stage" user_role="all" component={Stage}/>
            {/* <Stage path="/stage"></Stage> */}

            {/*Rooms component*/}
            <ProtectedRoute path="/rooms" user_role="all" component={Rooms}/>

            {/*Project Room component*/}
            <Route path="/project_room/:project_id"> 
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
            <ProtectedRoute exact path="/schedule" user_role="admin" component={Schedule}/>

            <ProtectedRoute exact path="/membervalidation" user_role="admin" component={MemberValidation}/>
                            
            {/*NewEvent component - events created manually*/}
            <ProtectedRoute  exact path="/new_event" user_role="admin" component={ScheduleNewEvent}/> 

            {/*NewEvent component - events created manually*/}
            <Route exact path="/update_event/:projectid"> 
              <ScheduleUpdateEvent/> 
            </Route>
 
            <Route exact path="/event_details/:project_id"> 
              <EventDetails/> {/*Event Details component*/}
            </Route>

            {/* Schedule Review  component - view schedule before submitting* */}
            <Route exact path="/schedule/review"> 
              <ScheduleReview/> 
            </Route>

            <Route path="/validate">
              <Validate/> 
            </Route> 

            <ProtectedRoute exact path="/account" user_role="all" component={Account}/>

                                 
            <ProtectedRoute exact path="/settings" user_role="all" component={Settings}/>

                          
            <ProtectedRoute exact path="/cal" user_role="admin" component={C2}/> 
               
          </div> 
          <Route path="*"> 
            <NotFound/> {/*NotFound component*/}
          </Route> 
        </Switch>     
      </Router>         
    </div>
  );
}

export default App;
