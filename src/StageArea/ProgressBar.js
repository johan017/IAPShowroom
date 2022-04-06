import { useState } from "react";
import React, {Component} from 'react';



export default class ProgressBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            count: props.duration
        }
    }

    componentDidMount(){
        setInterval(() => {
            let {count} = this.state;
            this.setState({
                count: count - 1
            })
        }, 60000)
    }

    componentDidUpdate(prevProps, PrevState, snapshot){
        if(PrevState.count !== this.state.count && this.state.count === 0){
            clearInterval(this.timer)
        }
    }

    render(){
        let {count} = this.state;
        return (  
            <div style={{color:'black'}}>
            counter:{count}
            {/* {countDown(count)} */}
            </div>
        );
    }
}
 
// export default ProgressBar;