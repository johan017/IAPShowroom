import { useEffect, useState} from 'react';
import axios from '../context/axios';


const SPONSORS_URL = "/api/showroom/sponsors/"

const useFetchSponsors = () => {

    const [sponsors, setSponsors] = useState([]);
    const [isLoading, setLoading] = useState(false);

    /* Get Sponsors requires IAPSession ID, possibly remove that requirement from 
    backend */
    const getSponsors = async() =>{
        try{
        const result = await axios.get(SPONSORS_URL) 
        setSponsors(result.data.payload);
        console.log(result.data.payload)
        } catch(error) {
            console.error(error.response.status);
        }
        setLoading(false);
    };

    useEffect(()=>{
        getSponsors();
    }, []);

    return {
        sponsors,
        isLoading
      };
};

export default useFetchSponsors;
