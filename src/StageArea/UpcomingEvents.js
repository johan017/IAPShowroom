import axios from "../context/axios";
import React, {Component} from 'react';

const EVENTS_URL = "/api/showroom/schedule/events";
const MINUTESTOMILLISECONDS = 60000;

export default class UpcomingEvents extends Component{
    constructor(props){
        super(props);
        this.mounted = false;
        this.state = {
            currentstarttime: '0:00',
            currentendtime: '0:00',
            upcomingstarttime: '0:00',
            currenttitle: '',
            upcomingtitle: ''
        }
    }

    componentDidMount(){
        const source = new EventSource(`http://localhost:8080/api/showroom/sse`, {withCredentials: true});
      
        source.addEventListener('open', () => {
            console.log('SSE opened for Upcoming Events!');
        });
        source.addEventListener('upcomingevents', this.getEvents().then(response => this.updateEvents(response)));

        this.mounted = true;
        // this.getEvents().then(response => this.updateEvents(response));
    }
    componentWillUnmount(){
        this.mounted = false;
    }

    getEvents = async() => {
        try{
            const result = await axios.get(EVENTS_URL, 
            {
                headers: {"Content-Type": "application/json"},
                withCredentials: true,
                params: {
                    upcoming: true,
                    date: new Date().toLocaleDateString("en-US"),
                    time: new Date().toLocaleString("en-US")
                }
            });
            console.log("result:",result);
            return result.data.payload;
        } 
        catch(error) {
            // console.error(error);
            console.log(error.response);
            if(error.response.status === 404) return {};
        }
    }

    updateEvents(response){
        if(response){
            console.log(response);
            if(response[1] && response[0]){
                // let d = new Date(response[0]['e_date']).toDateString();
                
                let st = new Date(response[0]['starttime']);
                let endtime = new Date(+st + response[0]['duration'] * MINUTESTOMILLISECONDS);
                const currentstarttime = st.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                const currenttitle = response[0]['title'];

                st = new Date(response[1]['starttime']);
                endtime = new Date(+st + response[1]['duration'] * MINUTESTOMILLISECONDS);
                const upcomingstarttime = st.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                const upcomingtitle = response[1]['title'];

                this.setState({currentstarttime: currentstarttime, currentendtime: endtime, upcomingstarttime: upcomingstarttime, currenttitle: currenttitle, upcomingtitle: upcomingtitle });
            }
            else if(response[0]){
                let st = new Date(response[0]['starttime']);
                let endtime = new Date(+st + response[0]['duration'] * MINUTESTOMILLISECONDS);
                const currentstarttime = st.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                const currenttitle = response[0]['title'];

                this.setState({currentstarttime: currentstarttime, currentendtime: endtime, currenttitle: currenttitle, upcomingstarttime: "0:00", upcomingtitle: '' });
            }
            else {
                console.log("error response:", response);
                this.setState({currentstarttime: "0:00", currentendtime: "0:00", currenttitle: '', upcomingstarttime: "0:00", upcomingtitle: '' });
            }
        }
    }

    render(){
        const date = new Date();

        const end = +new Date(date.toLocaleDateString("en-US")+' '+this.state.currentendtime);
        const diff = end - +date;
        console.log("diff:",diff);
        // const diff = 0;

        if(this.state.currentendtime != "0:00" && diff < 1){
            this.getEvents().then(response => this.updateEvents(response));
        }

        let {update, currentstarttime, currentendtime, upcomingstarttime, currenttitle, upcomingtitle} = this.state

        console.log("state:", this.state);

        if(currenttitle && currentstarttime && upcomingtitle && upcomingstarttime){
            return (<div className="UpcomingEvents">
                        <div className="event-item">
                        <p>{currentstarttime}</p>
                        <span>{currenttitle}</span>
                        </div>
                    <br></br>
                        <div className="event-item">
                        <p>{upcomingstarttime}</p>
                        <span>{upcomingtitle}</span>
                        </div>
                </div>);
        }
        else if(currenttitle && currentstarttime){
            return (<div className="UpcomingEvents">
                <div className="event-item">
                <p>{currentstarttime}</p>
                <span>{currenttitle}</span>
                </div>
                </div>);
        }
        else{
            return (<div className="UpcomingEvents">
                <h3></h3>
                </div>);
        }
        
    }
}