import axios from "../context/axios";

const Announcement_URL = "api/showroom/announcement"
var announcements= [];

const fetchAnnouncements = async () => {
    try{
    const result = await axios.get(Announcement_URL, 
    {
        headers: {"Content-Type": "application/json"},
        withCredentials: true
    }); 
    announcements = result.data.payload != undefined ? result.data.payload : [] ;
    } catch (error) {
        console.error(error.response.status);
    }
    return announcements;
};

export default fetchAnnouncements;
