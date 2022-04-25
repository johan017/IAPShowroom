import '@progress/kendo-theme-default/dist/all.css';
import Login from './LoginArea/Login';
import GeneralSignUp from './UserSignUp/GeneralSignUp';
import Navbar from './Navbar';
import Home from './HomeArea/Home';
import Stage from './StageArea/Stage';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Rooms from './RoomArea/Rooms';
import ProjectRoom from './RoomArea/ProjectRoom';

import NotFound from './NotFound';

import Stats from './StatsArea/Stats';
import Sponsors from './Sponsors';
import Schedule from './Schedule/Schedule';
import ScheduleDay from './Schedule/ScheduleDay';
import ScheduleCreate from './Schedule/ScheduleCreate';
import ConferenceDetails from './ConferenceDetails';
import ScheduleNewEvent from './Schedule/ScheduleNewEvent';
import EventDetails from './Schedule/EventDetails';
import ScheduleReview from './Schedule/ScheduleReview';
import ScheduleUpdateEvent from './Schedule/ScheduleUpdateEvent';
import AccountCreated from './UserSignUp/AccountCreated';
import SignUpPage from './UserSignUp/SignUpPage';
import Announcements from './HomeArea/Announcements';

import Calendar from './Schedule/Calendar';
import ProtectedRoute from './ProtectedRoute';

import AskChangePassword from './LoginArea/AskChangePassword';

import ChangePassword from './LoginArea/ChangePassword';
import C2 from './Schedule/C2';
import Logout from './Logout';
import { QueryClient, QueryClientProvider, useQuery  } from 'react-query';
import MemberValidation from './MemberValidation';

const queryClient = new QueryClient();


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


            <div className="content">
              <ProtectedRoute user_role="all" component={Navbar}/>
               {/*Navigation bar*/}
               {/* <Navbar></Navbar> */}
      
                {/*Home component*/}
                {/* <Home path="/home"></Home> */}
                {/* <Logout path="/logout" ></Logout> */}
                <ProtectedRoute path="/home" user_role="all" component={Home}/>
                {/* <ProtectedRoute exact path="/announce" user_role="all" component={Announcements}/> */}

                <ProtectedRoute path="/logout" user_role="all" component={Logout}/>
                

                {/*Stage component*/}
                <ProtectedRoute path="/stage" user_role="all" component={Stage}/>
                  {/* <Stage path="/stage"></Stage> */}
                {/* </ProtectedRoute> */}

                {/*Rooms component*/}
                <ProtectedRoute path="/rooms" user_role="all" component={Rooms}/>
                
                 
                {/* </ProtectedRoute> */}

                {/*Project Room component*/}
                <Route path="/project_room/:meetid"> 
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
                
                {/* <QueryClientProvider client={queryClient}>
                  {/* Calendar  component - view schedule before submitting* *
                  <Route path="/calendar"> 
                    <Calendar/> 
                  </Route>
                </QueryClientProvider> */}

                <Route path="/logout"> 
                  <Logout/> 
                </Route>

            
                <Route exact path="/cal"> 
                  <C2/> 
                </Route>

               
                
                {/* <ProtectedRoute exact path="/announce" user_role="all" component={Announcements}/> */}

                {/* <Route path="/announce">
                  <Announcements user_role="all"/>
                </Route> */}
               
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
