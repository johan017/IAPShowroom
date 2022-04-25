import { useEffect, useState} from 'react';
import axios from "../context/axios";

const Announcement_URL = "api/showroom/announcement"

const useFetchAnnouncements = () => {

    const [announcements, setAnnouncements] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const getAnnouncements = async() =>{
        try{
        const result = await axios.get(Announcement_URL, 
        {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
        }) 
        setAnnouncements(result.data.payload);
        console.log(result.data.payload)
        } catch(error) {
            console.error(error.response.status);
            if(error.response.status = '401'){
                setRedirect(true);
            }
        }
        setLoading(false);
    };

    useEffect(()=>{
        getAnnouncements();
    }, []);

    return {
        announcements,
        redirect,
        isLoading
      };
};

export default useFetchAnnouncements;
