import axios from "../context/axios";
import React, {Component} from 'react';

// const WebSocket = require('ws');

const EVENTS_URL = "/api/showroom/schedule/events";
const WEBSOCKETS_URL = 'ws://localhost:8080';
const MINUTESTOMILLISECONDS = 60000;

const ws = new WebSocket(WEBSOCKETS_URL);
export default class UpcomingEvents extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentstarttime: '0:00',
            currentendtime: '0:00',
            upcomingstarttime: '0:00',
            currenttitle: '',
            upcomingtitle: ''
        }
    }

    componentDidMount(){
        console.log("component did mount");
        ws.onopen = () => {
            console.log('Upcoming Events WebSocket Client Connected');
        };
        ws.onmessage = (message) => {
            console.log("WebSocket received message:", message.data)
            const dataFromServer = JSON.parse(message.data);
            if(dataFromServer.type === 'upcomingevents'){
                this.getEvents().then(response => this.updateEvents(response));
            }
        };

        ws.onclose = () => {
            console.log('Upcoming Events WebSocket Client Disconnected');
            ws.close();
        }

        this.getEvents().then(response => this.updateEvents(response));
    }
    componentWillUnmount(){
        console.log("unmounted upcomingevents");
        ws.close();
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
            return result.data.payload;
        } 
        catch(error) {
            console.log(error.response);
            if(error.response.status === 404) return {};
        }
    }

    updateEvents(response){
        if(response){
            if(response[1] && response[0]){
                let st = new Date(response[0]['starttime']);
                let endtime = new Date(+st + response[0]['duration'] * MINUTESTOMILLISECONDS).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                const currentstarttime = st.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                const currenttitle = response[0]['title'];

                st = new Date(response[1]['starttime']);
                const upcomingstarttime = st.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                const upcomingtitle = response[1]['title'];

                this.setState({
                    currentstarttime: currentstarttime, 
                    currentendtime: endtime, 
                    upcomingstarttime: upcomingstarttime, 
                    currenttitle: currenttitle, 
                    upcomingtitle: upcomingtitle 
                });
            }
            else if(response[0]){
                let st = new Date(response[0]['starttime']);
                let endtime = new Date(+st + response[0]['duration'] * MINUTESTOMILLISECONDS).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                const currentstarttime = st.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                const currenttitle = response[0]['title'];

                this.setState({
                    currentstarttime: currentstarttime, 
                    currentendtime: endtime, 
                    currenttitle: currenttitle, 
                    upcomingstarttime: "0:00", 
                    upcomingtitle: '' 
                });
            }
            else {
                console.log("error response:", response);
                this.setState({
                    currentstarttime: "0:00", 
                    currentendtime: "0:00", 
                    currenttitle: '', 
                    upcomingstarttime: "0:00", 
                    upcomingtitle: '' 
                });
            }
        }
    }

    render(){
        let {update, currentstarttime, currentendtime, upcomingstarttime, currenttitle, upcomingtitle} = this.state

        const date = new Date();
        const end = +new Date(date.toLocaleDateString("en-US")+' '+ currentendtime);
        const diff = end - +date;
        console.log("diff:", diff);

        if(diff > 0){
            setTimeout(() => {
                this.getEvents().then(response => this.updateEvents(response));
            }, diff+1000);
        }
        
        ({update, currentstarttime, currentendtime, upcomingstarttime, currenttitle, upcomingtitle} = this.state)

        

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