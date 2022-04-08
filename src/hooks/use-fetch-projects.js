import { useEffect, useState} from 'react';
import axios from "../context/axios";

const EVENTS_URL = "api/showroom/schedule/events"

const useFetchProjects = () => {

    const [projects, setProjects] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const getProjects = async() =>{
        try{
        const result = await axios.get(EVENTS_URL, 
        {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
        }) 
        setProjects(result.data.payload);
        console.log(result.data.payload)
        } catch(error) {
            console.error(error)
        }
        setLoading(false);
    };

    useEffect(()=>{
        getProjects();
    }, []);

    return {
        projects,
        isLoading
      };
};

export default useFetchProjects;
