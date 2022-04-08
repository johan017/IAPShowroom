import { useEffect, useState} from 'react';

const EVENTS_URL = "/api/showroom/sse"

const useFetchServerSideEvents = () => {
    
    const [current, setCurrent] = useState({ title: "", starttime: "" });
    const [upcoming, setUpcoming] = useState({ title: "", starttime: "" });
      
        useEffect(() => {
          const source = new EventSource(`http://localhost:8080/api/showroom/sse`, {withCredentials: true});
      
          source.addEventListener('open', () => {
            console.log('SSE opened!');
          });
      
          source.addEventListener('message', (e) => {
            console.log(e.data);
            let data = JSON.parse(e.data);
            const currentData = data[0];
            const upcomingData = data[1];
            console.log(currentData);
            console.log(upcomingData);
            setCurrent(currentData);
            setUpcoming(upcomingData);
          });
      
          source.addEventListener('error', (e) => {
            console.error('Error: ',  e);
          });
      
          return () => {
            source.close();
          };
        }, []);
      
        return (
          <div>
            <h1>Server Side Events testing</h1>
            <hr/>
            <h3>Current Title: {current.title}</h3>
            <h3>Current Time: {current.starttime}</h3>
            <br></br>
            <h3>Upcoming Title: {upcoming.title}</h3>
            <h3>Upcoming Time: {upcoming.starttime}</h3>
          </div>
        );
};

export default useFetchServerSideEvents;