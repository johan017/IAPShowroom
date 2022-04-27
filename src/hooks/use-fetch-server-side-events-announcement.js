import { useEffect, useState} from 'react';

const EVENTS_URL = "/api/showroom/sse-connect";

const useFetchServerSideEventsAnnouncements = () => {

    const [announcement, setAnnouncement] = useState({ announcementid: "", a_content: "", a_date: "" });
      
        useEffect(() => {
          const source = new EventSource(`http://localhost:8080${EVENTS_URL}`, {withCredentials: true});
      
          source.addEventListener('open', () => {
            console.log('SSE opened!');
          });

          source.addEventListener('message', (e) => {
            const announcementData = JSON.parse(e.data);
            setAnnouncement(announcementData);
          });

          source.addEventListener('closedConnection', (e) => {
            source.close(); //TODO: can we call this function when app closes?
          });
      
          source.addEventListener('error', (e) => {
            console.error('Error: ',  e);
          });
          
          //Hahaha putting this here creates a loop de connections ending and reopening
          //TODO: find appropriate moment to call source.close(); - But maybe we should call it on this return?
          // return () => {
          //   source.close();
          // };
        }); //Removed second argument '[]' <-- don't know what its purpose was
      
        return (
          <div>
            <h1>Server Side Events testing</h1>
            <hr/>
            <h3>Announcement ID: {announcement.announcementid}</h3>
            <h3>Message: {announcement.a_content}</h3>
            <h3>Time: {announcement.a_date}</h3>
          </div>
        );
};

export default useFetchServerSideEventsAnnouncements;