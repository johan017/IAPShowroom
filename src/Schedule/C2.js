import * as React from 'react';
import Calendar from './Calendar';
import { useHistory} from "react-router-dom";

import EventList from '../EventList';
import useFetch from '../useFetch';

const C2 = () => {

  const {data: events, error, isLoading} = useFetch('http://localhost:8000/events'); /* data is events because info is found in db within events */
  const history = useHistory();

    const handleCancel =(e) =>{
        history.push('/create_day');
    }
    const handleNext = (e) =>{
        e.preventDefault();
        history.push('/schedule/review');
    }
  return (
    <div className="cal2">
      {error && <div> {error} </div>}
      {isLoading && <div> Loading...</div>}
      
      <div className="cal22">
        {events && <EventList events={events} title="Events List"></EventList>}
      </div>

      <div className="scheduler">
        <Calendar/>
      </div>
      <div>
        
        <button onClick={handleCancel} style={{color:'red'}}>Back</button>
        <button onClick = {handleNext}>Next</button>
      </div>
      
    </div>
  );
};
  
// ReactDOM.render(<C2 />, document.querySelector('my-app'));
export default C2;

