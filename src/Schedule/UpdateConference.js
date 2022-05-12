import { useState, useEffect } from "react";
import { useHistory, useParams, withRouter, Link } from "react-router-dom";
import useFetchProjects from "../hooks/use-fetch-projects";
import useFetch from "../useFetch";
import Calendar from './Calendar';
import axios from "../context/axios";
import useFetchUserInfo from "../hooks/use-fetch-all-user-info";
import { RestoreOutlined } from "@material-ui/icons";


function UpdateConference (props) {
   
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
  
    var  pathArray = window.location.pathname.split('/');

    var cid = parseInt(pathArray[3]);
    console.log("cid", cid)
    const history = useHistory();

    const [conference, setConference] = useState();
   
    const getConference = async() =>{
        try{
        const result = await axios.get(`api/showroom/conference?conference_id=${cid}`,  //change to correct endpoint
        {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
        }) 
        setConference(result.data.payload);
        } catch(error) {
            console.error(error.response.status);
            if(error.response.status = '401'){
               
            }
        }
    };

    useEffect(()=>{
       getConference();
    }, []);

   
//   console.log("event ", event);
//     console.log("event starttime type", typeof(event.starttime));
//     console.log("event starttime", new Date(event.starttime).toISOString('en-US').slice(0,16));
//     console.log("event starttime", new Date(event.starttime).toLocaleString('en-US'));
//     console.log("event starttime", new Date(event.starttime).toLocaleString([], {month:'2-digit', day: '2-digit', year: 'numeric'}));

    
    const formatDate3 = (date) =>{
        const splitDate = new Date(date); //.split('T');

        const splitDate2 = date.split('T');

        const sdate = splitDate2[0].toString();

        return `${sdate}`;
    }

    
    {/* if an event already exists - update [put] */}
    const handleUpdateConference = async (defaultTitle, inputTitle, defaultDate, inputDate) =>{ 

        if(inputTitle === "") { 
            inputTitle = defaultTitle;
        }
        if(inputDate === "") { 
            inputDate = defaultDate;
        }

        var messageData = {
            "c_date": inputDate, //new Date(endTime).toLocaleString(),
            "c_text": inputTitle,
        };
        // console.log("event", messageData);

        try{

        await axios.put(`api/showroom/conference/${cid}`, messageData, { //change to correct endpoint
            headers: {"Content-Type": "application/json"},
            withCredentials: true
            }).then((res) => {
                console.log(res.data)
            }).catch((error)=>{
                console.log(error)
        });
        history.push('/schedule'); // change to events of that conference
        }catch(err){

        }
       
    }

    const handleDelete = async () =>{ 
    
        await axios.delete(`api/showroom/conference/${cid}`,  {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
            }).then((res) => {
                console.log(res.data)
            }).catch((error)=>{
                console.log(error)
        });
        history.push('/schedule'); //move to schedule
    }

 

    return ( 
        <div className = "Conference-information">
            {conference && (
                <div className="addNewConference">
                    
                        <div key={conference.cid}>  
    
                                <div>                        
                                    <h2>Update Conference Information</h2>
                                    <label>Conference Title: </label>
                                    <input 
                                        type="text" 
                                        defaultValue={conference[0].c_text}
                                        onChange = {(e) => setTitle(e.target.value)}
                                    />
                                    <label>Conference Date: </label>
                                    <input 
                                        type="date" 
                                        defaultValue={formatDate3(conference[0].c_date)}
                                        onChange = {(e) => setDate(e.target.value)}
                                    />
                                    
                                    
                                    <Link to ={"/schedule"}>
                                        <button style={{ background: 'gray' }}>Cancel</button>
                                    </Link>
                                    <button style={{ background: '#3B8D25' }}  onClick={() => { handleUpdateConference(conference[0].c_text, title, conference[0].c_date, date);}}>Update Event</button> 
                                    <button onClick={handleDelete}>Delete Event</button>
                                </div>
                            
                        </div>
                                
                </div>
            )}
                
        </div>

    );
}
 
export default withRouter(UpdateConference);