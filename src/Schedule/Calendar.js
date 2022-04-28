// ES2015 module syntax
import { Scheduler, DayView } from '@progress/kendo-react-scheduler';
import * as React from 'react';
import { useState } from "react";
import useFetch from '../useFetch';

import useFetchEvents from "../hooks/use-fetch-events";

const currentYear = new Date().getFullYear();
const currentMonth =new Date().getMonth();
const currentDay = new Date().getDate();

// const parseAdjust = eventDate => {
//     const date = new Date(eventDate);
//     date.setFullYear(currentYear);
//     return date;
// };

const C2 = () => {
    const displayDate = new Date(currentYear, currentMonth, currentDay);
    const {events, isLoading} = useFetchEvents();
    for(let i=0; i < events.length; i++) {
        let milli = new Date(events[i].starttime).getTime()+events[i].duration*60000;
        let end = new Date(milli)
        events[i]['endtime'] = end;
    }
    const sampleData = events.map((dataItem) => ({
      id: dataItem.meetid,
      start: new Date(dataItem.starttime),
      end: dataItem.endtime,
      title: dataItem.title,
    }));
  
    const modelFields ={
        id: "id",
        title: "title",
        start: "start",
        end: "end",
    };

    // console.log("informacion", info);
    // console.log("eventos", events);
    
    return (
    <div className="cal2">
      {/* {error && <div> {error} </div>} */}
      {isLoading && <div> Loading...</div>}
  
      <div className="scheduler">
        <Scheduler data={sampleData} defaultDate={displayDate} modelFields={modelFields}>
          <DayView 
            title="" 
            numberOfDays={1} 
            slotDuration={15} 
            slotDivisions={2} 
            startTime={"00:00"} 
            endTime={"23:59"} 
            workDayStart={"00:00"} 
            workDayEnd={"23:59"} 
          />
        </Scheduler>
      </div>
    </div>
  );
};
  
// ReactDOM.render(<C2 />, document.querySelector('my-app'));
export default C2;
