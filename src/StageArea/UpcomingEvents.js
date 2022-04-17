import axios from "../context/axios";
import React, {Component} from 'react';

const EVENTS_URL = "/api/showroom/schedule/events";

export default class UpcomingEvents extends Component{
    constructor(props){
        super(props);
        this.mounted = false;
        this.state = {
            update: false,
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
            console.log("started the get");
            const result = await axios.get(EVENTS_URL, 
            {
                headers: {"Content-Type": "application/json"},
                withCredentials: true,
                params: {
                    upcoming: true,
                    date: new Date().toLocaleDateString("en-US"),
                    time: new Date().toLocaleTimeString("en-US")
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
                let st = new Date('1 ' + response[0]['starttime']);
                let eh = st.getHours() + Math.floor(response[0]['duration']/60);
                let em = st.getMinutes() + response[0]['duration'] % 60;

                em = em < 9 ? '0' + em : em;

                const endtime = eh +':'+ em;
                const currentstarttime = response[0]['starttime'];
                const update = false;
                const currenttitle = response[0]['title'];

                st = new Date('1 ' + response[1]['starttime']);
                eh = st.getHours() + Math.floor(response[1]['duration']/60);
                em = st.getMinutes() + response[1]['duration'] % 60;

                em = em < 9 ? '0' + em : em;

                const upcomingstarttime = response[1]['starttime'];

                const upcomingtitle = response[1]['title'];
                

                this.setState({ update: update, currentstarttime: currentstarttime, currentendtime: endtime, upcomingstarttime: upcomingstarttime, currenttitle: currenttitle, upcomingtitle: upcomingtitle });
            }
            else if(response[0]){
                // let d = new Date(response[0]['e_date']).toDateString();
                let st = new Date('1 ' + response[0]['starttime']);
                let eh = st.getHours() + Math.floor(response[0]['duration']/60);
                let em = st.getMinutes() + response[0]['duration'] % 60;

                em = em < 9 ? '0' + em : em;

                const endtime = eh +':'+ em;
                const starttime = response[0]['starttime'];
                const update = false;

                const currenttitle = response[0]['title'];

                this.setState({ update: update, currentstarttime: starttime, currentendtime: endtime, currenttitle: currenttitle, upcomingstarttime: "0:00", upcomingtitle: '' });
            }
            else {
                console.log("response is error:", response);
                const update = false;
                this.setState({ update: update, currentstarttime: "0:00", currentendtime: "0:00", currenttitle: '', upcomingstarttime: "0:00", upcomingtitle: '' });
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
                <h3>Event Title: {currenttitle}</h3>
                <h3>Start Time: {currentstarttime}</h3>
                <br></br>
                <h3>Upcoming Event Title: {upcomingtitle}</h3>
                <h3>Upcoming Event Start Time: {upcomingstarttime}</h3>
                </div>);
        }
        else if(currenttitle && currentstarttime){
            return (<div className="UpcomingEvents">
                <h3>Event Title: {currenttitle}</h3>
                <h3>Start Time: {currentstarttime}</h3>
                </div>);
        }
        else{
            return (<div className="UpcomingEvents">
                <h3>Awaiting Events</h3>
                </div>);
        }
        
    }
}