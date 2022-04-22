import { useEffect, useState} from 'react';
import axios from "../context/axios";

const MEMBERS_URL = "api/showroom/researchers_advisors"

const useFetchAllResearchMembers = () => {

    const [researchData, setResearchData] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const getMembers = async() =>{
        try{
        const result = await axios.get(MEMBERS_URL, 
        {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
        }) 
        setResearchData(result.data.payload);
        console.log(result.data.payload)
        } catch(error) {
            console.error(error.response.status);
        }
        setLoading(false);
    };

    useEffect(()=>{
        getMembers();
    }, []);

    return {
        researchData,
        isLoading
      };
};

export default useFetchAllResearchMembers;
