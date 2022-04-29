import axios from "../context/axios";
import React, {Component} from 'react';

const EVENTS_URL = "/api/showroom/schedule/events";
const WEBSOCKETS_URL = 'ws://localhost:8080';

const ws = new WebSocket(WEBSOCKETS_URL);

const HIGH = "green";
const MEDIUM = "yellow";
const LOW = "red";

function getbarstyle(completed, bgcolor) {
    return {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: bgcolor,
        borderRadius: 'inherit',
        'text-align': 'center'
    };
} 

export default class ProgressBar extends Component{
    constructor(props){
        super(props);
        this.mounted = false;
        this.state = {
            hours: '0',
            minutes: '0',
            seconds: '0',
            timeUp: false,
            starttime: '0:00',
            endtime: '0:00',
        }
    }

    

    componentDidMount(){
        this.mounted = true;

        ws.onopen = () => {
            console.log('Upcoming Events WebSocket Client Connected');
        };
        ws.onmessage = (message) => {
            console.log("WebSocket received message:", message.data)
            const dataFromServer = JSON.parse(message.data);
            if(dataFromServer.type === 'progressbar'){
                this.getEvents().then(response => this.updateTimestamp(response));
            }
        };

        ws.onclose = () => {
            console.log('Upcoming Events WebSocket Client Disconnected');
            ws.close();
        }

        this.getEvents().then(response => this.updateTimestamp(response));

        this.mounted && setInterval(() => {
            if(this.state.endtime != '0:00'){

                let eventTime = +new Date(this.state.endtime);
                let difference = eventTime - +new Date();

                if (difference < 1) {
                    this.setState({ timeUp: true });
                } else {
                    let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                    let minutes = Math.floor((difference / (1000 * 60)) % 60);
                    let seconds = Math.floor((difference / (1000)) % 60);
                    this.setState({
                        hours: hours,
                        minutes: minutes,
                        seconds: seconds
                    });
                }
            }
         }, 1000)
    }
    componentWillUnmount(){
        this.mounted = false;
        ws.close();
        clearInterval();
    }

    componentDidUpdate(){
        if(this.mounted && this.state.timeUp){
            this.getEvents().then(response => this.updateTimestamp(response));
        }
    }
    getEvents = async() => {
        console.log("getEvents: got here");
        try{
            const upcoming = true;
            const date = new Date().toLocaleDateString("en-US");
            const time = new Date().toLocaleString("en-US");

            const result = await axios.get(EVENTS_URL, 
            {
                headers: {"Content-Type": "application/json"},
                withCredentials: true,
                params: {
                    upcoming: upcoming,
                    date: date,
                    time: time
                }
            });
            console.log("params:",upcoming, date, time);
            return result.data.payload;
            } 
            catch(error) {
                console.error(error)
                if(error.response.status === 404) return {}
            }
    }

    updateTimestamp(response){
        if(response[0]){
            const MINUTESTOMILLISECONDS = 60000;
            let st = new Date(response[0]['starttime']);
            const starttime = st.toLocaleString("en-US");
            const endtime = new Date(+st +  response[0]['duration'] * MINUTESTOMILLISECONDS).toLocaleString("en-US");

            this.setState({ 
                timeUp: false,
                starttime: starttime, 
                endtime: endtime 
            });
        }
        else{
            this.setState({ 
                timeUp: false, 
                starttime: '0:00', 
                endtime: '0:00', 
                hours: '0', 
                minutes: '0', 
                seconds: '0' 
            });
        }
    }

    render(){
        const {hours, minutes, seconds, timeUp, starttime, endtime} = this.state

        let start = +new Date(starttime);
        let end = +new Date(endtime);
        let diff = start - +new Date();

        let duration = end-start;
        
        let completed = Math.floor((end-new Date())/duration * 100);
        let color = completed < 5 ? LOW : completed < 20 ? MEDIUM : HIGH;
        const barstyle = getbarstyle(completed, color);
        
        if(timeUp || diff > 1) return (<p></p>);
        
        else {

            if(hours == '0' && minutes == '0' && seconds == '0') return (<p></p>);

            else if(hours == '0' && minutes == '0') return (<div className="BarContainer"><div className="progressBar" style={barstyle}><span style={{padding: '5px'}}>{ `${seconds}s` }</span></div></div>);

            else if(hours == '0') return (<div className="BarContainer"><div className="progressBar" style={barstyle}><span>{ `${minutes}m` }</span></div></div>);

            else return (<div className="BarContainer"><div className="progressBar" style={barstyle}><span>{ `${hours}h ${minutes}m` }</span></div></div>);
            
        }
    }
}
 
// export default ProgressBar;