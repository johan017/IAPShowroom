import { useEffect, useState} from 'react';
import axios from "../context/axios";

const MEMBERS_URL = "api/showroom/researchers-advisors"

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
        var groupBy = function(xs, key) {
            return xs.reduce(function(rv, x) {
              (rv[x[key]] = rv[x[key]] || []).push(x);
              return rv;
            }, {});
          };
        var groupedByTitle = groupBy(result.data.payload, 'iapproject_title');
        setResearchData(groupedByTitle);
        console.log(groupedByTitle);
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
