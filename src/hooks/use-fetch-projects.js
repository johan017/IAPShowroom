import { useEffect, useState} from 'react';
import axios from "../context/axios";

const PROJECTS_URL = "api/showroom/schedule/projects"

const useFetchProjects = () => {

    const [projects, setProjects] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const getProjects = async() =>{
        try{
        const result = await axios.get(PROJECTS_URL, 
        {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
        }) 
        setProjects(result.data.payload);
        } catch(error) {
            console.error(error.response.status);
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
