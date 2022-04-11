import { useEffect, useState} from 'react';
import axios from "../context/axios";

const PROJECTS_URL = "api/showroom/schedule/projects"

const useFetchProjects = () => {

    const [projects, setProjects] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const params = new URLSearchParams([['session_id', 14]]);

    /* Get Projects requires IAPSession ID, possibly remove that requirement from 
    backend */
    const getProjects = async() =>{
        try{
        const result = await axios.get(PROJECTS_URL, 
        {params},
        {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
        }) 
        setProjects(result.data.payload);
        console.log(result.data.payload)
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
        redirect,
        isLoading
      };
};

export default useFetchProjects;
