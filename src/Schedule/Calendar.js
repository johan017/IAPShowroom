// ES2015 module syntax
import { Scheduler, DayView } from '@progress/kendo-react-scheduler';
import * as React from 'react';
import { useState } from "react";
import useFetch from '../useFetch';

import useFetchEvents from "../hooks/use-fetch-events";

const currentYear = new Date().getFullYear();
const currentMonth =new Date().getMonth();
const currentDay = new Date().getDate();

const parseAdjust = eventDate => {
    const date = new Date(eventDate);
    date.setFullYear(currentYear);
    return date;
};
var sampleData = "";

const C2 = () => {
    const {data: events, error, isLoading} = useFetch('http://localhost:8000/events'); /* data is events because info is found in db within events */
    // const [info, setInfo] = useState(events);
    // const {events, loading } = useFetchEvents();
    // const conferenceDate = new Date(2022, 4, 14);
    const displayDate = new Date(currentYear, currentMonth, currentDay);

    //Assigning the events to the Calendar
    {events && (
        sampleData =  events.map((dataItem) => ({
                id: dataItem.id,
                start: parseAdjust(dataItem.start),
            //     startTimezone: dataItem.StartTimezone,
                end: parseAdjust(dataItem.end),
            //     endTimezone: dataItem.EndTimezone,
            //     isAllDay: dataItem.isAllDay,
                title: dataItem.title
        }))
    )}
  
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
            slotDuration={60} 
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
