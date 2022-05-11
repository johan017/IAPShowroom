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
import NewEvent from './Schedule/NewEvent';
import NewProjectEvent from './Schedule/NewProjectEvent';
import EventDetails from './Schedule/EventDetails';
// import ScheduleReview from './Schedule/ScheduleReview';
import UpdateEvent from './Schedule/UpdateEvent';
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
import useGetRole from "./hooks/use-get-role";
import CheckEmail from './LoginArea/CheckEmail';



function App() {

  // const likes = 100;
  // const FEAV = "https://drive.google.com/file/d/1Oa8CutI95VZUt05YpeYBVMcgKLhpjGsx/view?usp=sharing";
  const {role, uID}  = useGetRole();

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

          <Route exact path="/changePassword/:user_id/:euuid"> 
            <ChangePassword/> 
          </Route>
                 
          {/* Schedule Review  component - view schedule before submitting* */}
          <Route path="/accountCreated"> 
            <AccountCreated/> 
          </Route>
          <Route path="/endMeeting"> 
              <HtmlEndMeeting/> 
            </Route>
          <Route path="/checkEmail">
            <CheckEmail/>
          </Route>

          <div className="content">
            <ProtectedRoute component={Navbar}/>      
            {/*Home component*/}
            <ProtectedRoute path="/home" component={Home} uRole={role} aID={uID}/>
            {/* <ProtectedRoute exact path="/announce" user_role="all" component={Announcements}/> */}

            {/*Stage component*/}
            <ProtectedRoute path="/stage" component={Stage} uRole={role} aID={uID}/>
            {/* <Stage path="/stage"></Stage> */}

            {/*Rooms component*/}
            <ProtectedRoute path="/rooms" component={Rooms} uRole={role} aID={uID}/>

            {/*Project Room component*/}
            <ProtectedRoute path="/project_room/:project_id" component={ProjectRoom} uRole={role} aID={uID}/>

            {/*Stats component*/}
            
            <Route path="/stats">
              <Stats/> 
            </Route>

            {/*Sponsors component*/}
            <Route path="/sponsors">
              <Sponsors/> 
            </Route>           

            {/*Schedule component - schedule of conferencia*/}
            <ProtectedRoute exact path="/schedule" component={Schedule} uRole={role} aID={uID}/>

            <ProtectedRoute exact path="/membervalidation" component={MemberValidation} uRole={role} aID={uID}/>
                            
            {/*NewEvent component - events created manually*/}
            <ProtectedRoute  exact path="/new_event"  component={NewEvent} uRole={role} aID={uID}/> 
            <ProtectedRoute  exact path="/new_event/:project_id"  component={NewProjectEvent} uRole={role} aID={uID}/> 

            {/*NewEvent component - events created manually*/}
            <ProtectedRoute  exact path="/update_event/:meetid" component={UpdateEvent} uRole={role} aID={uID}/> 
            {/* <ProtectedRoute  exact path="/update_event" component={UpdateEvent} uRole={role} aID={uID}/>  */}

            <ProtectedRoute  exact path="/event_details/:project_id" component={EventDetails} uRole={role} aID={uID}/> 

            {/* Schedule Review  component - view schedule before submitting* */}
            {/* <ProtectedRoute  exact path="/schedule/review" component={ScheduleReview} uRole={role} aID={uID}/>  */}


            <Route path="/validate">
              <Validate/> 
            </Route> 

            <ProtectedRoute exact path="/account" component={Account} uRole={role} aID={uID}/>

                                 
            <ProtectedRoute exact path="/settings" component={Settings} uRole={role} aID={uID}/>

                          
            <ProtectedRoute exact path="/cal" component={C2} uRole={role} aID={uID}/> 
               
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
