import { useEffect, useState} from 'react';
import axios from "../context/axios";

const ROOM_STATS_URL = "api/showroom/rooms/status?date=04-20-22"

//TODO - Date that it accepts or tracks is the start time date 

const useFetchRoomStats = () => {

    const [roomStats, setRoomStats] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const getRoomStats = async() =>{
        try{
        const result = await axios.get(ROOM_STATS_URL, 
        {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
        }) 
        setRoomStats(result.data.payload);
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
        getRoomStats();
    }, []);

    return {
        roomStats,
        redirect,
        isLoading
      };
};

export default useFetchRoomStats;
