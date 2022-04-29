import { useEffect, useState} from 'react';
import {Component} from 'react';
import useFetchAnnouncements from "./use-fetch-announcements";
import axios from "../context/axios";



const EVENTS_URL = "/api/showroom/sse-connect";
const Announcement_URL = "api/showroom/announcement"

// const [announcement, setAnnouncement] = useState({ announcementid: "", a_content: "", a_date: "" });

export default class UpdateAnnouncements extends Component{
      
      constructor(props){
        super(props);
        this.state = {
          announcement:{
            announcementid: '', 
            a_content: '', 
            a_date: '',
          },
          redirect: false,
          isLoading: false,
        }
      }

      



       render(){          
         const source = new EventSource(`http://localhost:8080${EVENTS_URL}`, {withCredentials: true});

        //  const [announcements, setAnnouncements] = useState([]);
        //  const [redirect, setRedirect] = useState(false);
        //  const [isLoading, setLoading] = useState(false);
     
         const getAnnouncements = async() =>{
             try{
             const result = await axios.get(Announcement_URL, 
             {
                 headers: {"Content-Type": "application/json"},
                 withCredentials: true
             }) 
             this.setState("announcement", result.data.payload);
             console.log(result.data.payload)
             } catch(error) {
                 console.error(error.response.status);
                 if(error.response.status = '401'){
                     this.setState("redirect", true);
                 }
             }
             this.setState("isLoading", false);
         };
     
        //  useEffect(()=>{
        //      getAnnouncements();
        //  }, []);


          source.addEventListener('open', () => {
                        console.log('SSE opened!');
                      });

                      source.addEventListener('message', (e) => {
                        // const announcementData = JSON.parse(e.data);
                        // setAnnouncement(announcementData);
                        // return( useFetchAnnouncements())
                        getAnnouncements()

                      });

                      source.addEventListener('closedConnection', (e) => {
                        source.close(); //TODO: can we call this function when app closes?
                      });
                  
                      source.addEventListener('error', (e) => {
                        console.error('Error: ',  e);
                      });
         return(
          getAnnouncements()

          // announcement,
          // redirect,
          // isLoading
          // useFetchAnnouncements()
         )
          
          //Hahaha putting this here creates a loop de connections ending and reopening
          //TODO: find appropriate moment to call source.close(); - But maybe we should call it on this return?
          // return () => {
          //   source.close();
          // };
        } //Removed second argument '[]' <-- don't know what its purpose was
      
        // return (
        //   <div>
        //     <h1>Server Side Events testing</h1>
        //     <hr/>
        //     <h3>Announcement ID: {announcement.announcementid}</h3>
        //     <h3>Message: {announcement.a_content}</h3>
        //     <h3>Time: {announcement.a_date}</h3>
        //   </div>
        // );
}

