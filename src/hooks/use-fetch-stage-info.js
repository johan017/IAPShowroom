import { useEffect, useState} from 'react';
import axios from "../context/axios";

const JOIN_STAGE_URL = "/api/meet/join-stage";

const useFetchStageInfo = () => {

    const [stageInfo, setStageInfo] = useState();
    const [loading, setLoading] = useState(false);

    const getStageInfo = async() =>{
        try{
            const result = await axios.get(JOIN_STAGE_URL, 
            {
                headers: {"Content-Type": "application/json"},
                withCredentials: true,
                params: {
                    upcoming: true,
                    date: new Date().toLocaleDateString("en-US"),
                    time: new Date().toLocaleTimeString("en-US")
                }
            });
            setStageInfo(result.data.payload.url);
            console.log(result.data.payload.url);
            } catch(error) {
                console.error(error)
            }
            setLoading(false);
    };

    useEffect(()=>{
        getStageInfo();
    }, []);

    return {
        stageInfo,
        loading
      };
};

export default useFetchStageInfo;
