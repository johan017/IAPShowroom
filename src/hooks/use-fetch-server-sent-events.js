import { useEffect, useState} from 'react';

const EVENTS_URL = "/api/showroom/sse"

const useFetchServerSentEvents = () => {
    
    const [current, setCurrent] = useState();
    const [upcoming, setUpcoming] = useState();
      
        useEffect(() => {
          const source = new EventSource(`http://localhost:8080/api/showroom/sse`, {withCredentials: true});
      
          source.addEventListener('open', () => {
            console.log('SSE opened!');
          });
      
          source.addEventListener('upcomingevents', (e) => {
            try{
                console.log(e.data);
                let data = JSON.parse(e.data);

                if(data[0]){
                    const currentData = data[0];
                    setCurrent(currentData);
                    console.log(currentData);
                }

                // Sets current first in case upcoming data is not in JSON
                if(data[1]){
                    const upcomingData = data[1];
                    console.log(upcomingData);
                    setUpcoming(upcomingData);
                }
            }
            catch{
                console.log("data was unable to fill out both current and upcoming activity");
                console.log("Current:", current);
                console.log("Upcoming:", upcoming);
            }
          });
      
          source.addEventListener('error', (e) => {
            console.error('Error: ',  e);
          });
      
          return () => {
            source.close();
          };
        }, []);
      if(current && upcoming){
        return (
          <div>
            <h1>Events</h1>
            <hr/>
            <h3>Event Title: {current.title}</h3>
            <h3>Start Time: {current.starttime}</h3>
            <br></br>
            <h3>Upcoming Event Title: {upcoming.title}</h3>
            <h3>Upcoming Event Start Time: {upcoming.starttime}</h3>
          </div>
        );
    }
    else if (current && !upcoming){
        return (
            <div>
              <h1>Events</h1>
              <hr/>
              <h3>Title: {current.title}</h3>
              <h3>Start Time: {current.starttime}</h3>
            </div>
          );
    }
    else{
        return (
            <div>
              <h1>Events</h1>
              <hr/>
              <h3>Awaiting new events</h3>
              <br></br>
            </div>
          );
    }
};

export default useFetchServerSentEvents;