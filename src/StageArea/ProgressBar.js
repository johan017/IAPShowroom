import axios from "../context/axios";
import React, {Component} from 'react';

const EVENTS_URL = "/api/showroom/schedule/events";

function getbarstyle(completed, bgcolor) {
    return {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: bgcolor,
        borderRadius: 'inherit',
        textAlign: 'center'
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
        const source = new EventSource(`http://localhost:8080/api/showroom/sse`, {withCredentials: true});
      
        source.addEventListener('open', () => {
            console.log('SSE opened for progress bar!');
        });
        source.addEventListener('progress', this.getEvents().then(response => this.updateTimestamp(response)));

        this.mounted = true;
        this.mounted && setInterval(() => {
            if(this.state.endtime != '0:00'){

                let eventDate = +new Date(this.state.endtime);
                let difference = eventDate - +new Date();

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
            return result.data.payload;
            } 
            catch(error) {
                console.error(error)
                if(error.response.status === 404) return {}
            }
    }

    updateTimestamp(response){
        if(response[0]){
            console.log("response[0]: is a thing");
            console.log(response);
            let d = new Date(response[0]['e_date']).toDateString();
            let st = new Date('1 ' + response[0]['starttime']);
            let eh = st.getHours() + Math.floor(response[0]['duration']/60);
            let em = st.getMinutes() + response[0]['duration'] % 60;

            const endtime = d + ' ' + eh +':'+ em;
            const starttime = d + ' ' + st.getHours() +':'+ st.getMinutes();

            this.setState({ timeUp: false, starttime: starttime, endtime: endtime });
        }
        else{
            console.log("response[0]: is not a thing");
            this.setState({ timeUp: false, starttime: '0:00', endtime: '0:00', hours: '0', minutes: '0', seconds: '0' });
        }
    }

    render(){
        const {hours, minutes, seconds, timeUp, starttime, endtime} = this.state

        console.log("progressstate:", this.state);

        let start = +new Date(this.state.starttime);
        let end = +new Date(this.state.endtime);
        let diff = start - +new Date();

        

        let duration = end-start;
        
        let completed = Math.floor((end-new Date())/duration * 100);
        console.log("diff/duration = ", (end-new Date())/duration);
        const barstyle = getbarstyle(completed, "green");
        
            

        if(timeUp || diff > 1) return (<p></p>);
        
        else {

            if(hours == '0' && minutes == '0' && seconds == '0') return (<p></p>);

            else if(hours == '0' && minutes == '0') return (<div className="BarContainer"><div className="progressBar" style={barstyle}><span>{ ` ${seconds} seconds` }</span></div></div>);

            else if(hours == '0') return (<div className="BarContainer"><div className="progressBar" style={barstyle}><span>{ `${minutes}  minutes ${seconds} seconds` }</span></div></div>);

            else return (<div className="BarContainer"><div className="progressBar" style={barstyle}><span>{ `${hours} hours ${minutes}  minutes ${seconds} seconds` }</span></div></div>);
            
        }
    }
}
 
// export default ProgressBar;