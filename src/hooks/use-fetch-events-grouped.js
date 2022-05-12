import { useEffect, useState} from 'react';
import axios from "../context/axios";

var EVENTS_URL = "api/showroom/schedule/events?all=true"

const useFetchGroupedEvents = () => {

    const [groupedEvents, setGroupedEvents] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const getEvents = async() =>{
        try{
        const result = await axios.get(EVENTS_URL, 
        {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
        }) 
        var groupBy = function(xs, key) {
            return xs.reduce(function(rv, x) {
              (rv[x[key]] = rv[x[key]] || []).push(x);
              return rv;
            }, {});
          };
        var groupedByTitle = groupBy(result.data.payload, 'cid');

        setGroupedEvents(groupedByTitle);
console.log("groupedByTitle", groupedByTitle)
        } catch(error) {
            console.error(error.response.status);
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
