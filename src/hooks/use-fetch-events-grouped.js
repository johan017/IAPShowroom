import { useEffect, useState} from 'react';
import axios from "../context/axios";

var EVENTS_URL = "api/showroom/schedule/events?all=true"

const useFetchGroupedEvents = () => {

    const [groupedEvents, setGroupedEvents] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [isLoading, setLoading] = useState(false);

    // console.log(flag);
    // if(flag === "all"){
    //     EVENTS_URL = "api/showroom/schedule/events?all=true"
    //     console.log("all events url", EVENTS_URL)
    // }else if(flag === "ofday"){
    //     EVENTS_URL = "api/showroom/schedule/events"
    //     console.log("events of day url", EVENTS_URL)
    // }

    const getEvents = async() =>{
        try{
        const result = await axios.get(EVENTS_URL, 
        {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
        }) 
        // setEvents(result.data.payload);
        console.log("url_used", EVENTS_URL)
        var groupBy = function(xs, key) {
            return xs.reduce(function(rv, x) {
              (rv[x[key]] = rv[x[key]] || []).push(x);
              return rv;
            }, {});
          };
        var groupedByTitle = groupBy(result.data.payload, 'e_date');
        setGroupedEvents(groupedByTitle);


        // // EVENTS_URL = "api/showroom/schedule/events"
        // console.log("url_reseted", EVENTS_URL)

        } catch(error) {
            console.error(error.response.status);
            if(error.response.status = '401'){
               //setRedirect(true);
            }
        }
        
        setLoading(false);
    };

    useEffect(()=>{
        getEvents();
    }, []);

    return {
        groupedEvents,
        redirect,
        isLoading
      };
};

export default useFetchGroupedEvents;
