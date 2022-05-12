import { useEffect, useState} from 'react';
import axios from "../context/axios";
import useFetchEvents from './use-fetch-events';

const ROOM_INFO_URL = "";

const useFetchRoomInfo = () => {
    const {events} = useFetchEvents();

    {events && events.map((event) => (
        ROOM_INFO_URL = `api/showroom/qna/info?meeting_id=${event.projectid}`
    ))}

    const [roomInfo, setRoomInfo] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const getRoomInfo = async() =>{
        try{
        const result = await axios.get(ROOM_INFO_URL, 
        {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
        }) 
        setRoomInfo(result.data.payload);
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
        getRoomInfo();
    }, []);

    return {
        roomInfo,
        redirect,
        isLoading
      };
};

export default useFetchRoomInfo;
