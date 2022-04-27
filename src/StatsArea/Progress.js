import React from "react";

const Progress = (props) => {
    const {totalp,totalItem} = props;

    const percentage = (totalItem/totalp)*100;

    return ( 
        <div className="progress-container"  style={{width:`${totalp}`}}>
            <div className="progress-filler" style={{width:`${percentage}%`, backgroundColor: 'green'}}>
                <span className="progress-label">{`${totalItem}`}</span>
            </div>
        </div>
    );
}
 
export default Progress;