import axios from "../context/axios";
import React, {Component} from 'react';

const EVENTS_URL = "/api/showroom/schedule/events";

const HIGH = "green";
const MEDIUM = "yellow";
const LOW = "red";

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
            // console.log("response[0]: is a thing");
            // console.log(response);
            const MINUTESTOMILLISECONDS = 60000;
            let st = new Date(response[0]['starttime']);
            const starttime = st.toLocaleString("en-US");
            const endtime = new Date(+st +  response[0]['duration'] * MINUTESTOMILLISECONDS).toLocaleString("en-US");

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
        let color = completed < 5 ? LOW : completed < 20 ? MEDIUM : HIGH;
        const barstyle = getbarstyle(completed, color);
        
            

        if(timeUp || diff > 1) return (<p></p>);
        
        else {

            if(hours == '0' && minutes == '0' && seconds == '0') return (<p></p>);

            else if(hours == '0' && minutes == '0') return (<div className="BarContainer"><div className="progressBar" style={barstyle}><span>{ `.` }</span></div></div>);

            else if(hours == '0') return (<div className="BarContainer"><div className="progressBar" style={barstyle}><span>{ `${minutes} m` }</span></div></div>);

            else return (<div className="BarContainer"><div className="progressBar" style={barstyle}><span>{ `${hours} h ${minutes} m` }</span></div></div>);
            
        }
    }
}
 
// export default ProgressBar;