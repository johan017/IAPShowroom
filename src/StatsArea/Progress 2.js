import React from "react";

const Progress = (props) => {
    const {totalp,totalItem} = props;
    return ( 
        <div className="progress-container"  style={{width:`${totalp}`}}>
            <div className="progress-filler" style={{width:`${totalItem}%`, backgroundColor: 'green'}}>
                <span className="progress-label">{`${totalItem}`}</span>
            </div>
        </div>
    );
}
 
export default Progress;