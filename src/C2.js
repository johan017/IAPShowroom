// ES2015 module syntax
import { Scheduler, DayView } from '@progress/kendo-react-scheduler';
import * as React from 'react';
import { guid } from "@progress/kendo-react-common";
import * as ReactDOM from 'react-dom';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// import { Calendar } from '@progress/kendo-react-dateinputs';
import EventList from './EventList';
import useFetch from './useFetch';
// const res = fetch('http://localhost:8000/events/');

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const currentDay = new Date().getDay();

const parseAdjust = eventDate => {
    const date = new Date(eventDate);
    date.setFullYear(currentYear);
    return date;
};
var sampleData = "";

const C2 = () => {
    // const {project_id} = useParams();

    const {data: events, error, isLoading} = useFetch('http://localhost:8000/events'); /* data is events because info is found in db within events */
    const [info, setInfo] = useState(events);
  
    const displayDate = new Date(currentYear, currentMonth, currentDay);

    {events && (
        sampleData =  events.map((dataItem) => ({
                id: dataItem.project_id,
                start: parseAdjust(dataItem.start),
            //     startTimezone: dataItem.StartTimezone,
                end: parseAdjust(dataItem.end),
            //     endTimezone: dataItem.EndTimezone,
            //     isAllDay: dataItem.isAllDay,
                title: dataItem.title
        }))
    )}
    // useEffect(async ()=> {
    //     let result = await fetch("http://localhost:8000/events/"+props.match.params.project_id);
    //     result = await result.json();
    //     setData(result);
    // })
    const modelFields ={
        id: "project_id",
        title: "title",
        start: "start",
        end: "end",
    };

    // const handleDataChange = React.useCallback(
    //     ({ updated }) => {
    //         setInfo((old) =>
    //           old.map(
    //             (item) => updated.find((current) => current.id === item.id) || item
    //           )
    //         );
    //       },
    //       [setInfo]
    
    // );
    console.log("informacion", info);
    console.log("eventos", events);
    
    return (
    <div className="cal2">
      {error && <div> {error} </div>}
      {isLoading && <div> Loading...</div>}
      <div className="cal22">

          {events && <EventList events={events} title="Events List"></EventList>}
      </div>

      <div className="scheduler">
        <Scheduler data={sampleData} defaultDate={displayDate} modelFields={modelFields}>
          <DayView 
            title="" 
            numberOfDays={1} 
            slotDuration={60} 
            slotDivisions={2} 
            startTime={"01:00"} 
            endTime={"23:00"} 
            workDayStart={"08:00"} 
            workDayEnd={"18:00"} 
          />
        </Scheduler>
      </div>
    </div>
  );
};
  
// ReactDOM.render(<C2 />, document.querySelector('my-app'));
export default C2;



// const baseData = [{
//     "TaskID": 4,
//     "OwnerID": 2,
//     "Title": "Bowling tournament",
//     "Description": "",
//     "StartTimezone": null,
//     "Start": "2022-04-20T12:00",
//     "End": "2022-04-20T19:00",
//     "EndTimezone": null,
//     "RecurrenceRule": null,
//     "RecurrenceID": null,
//     "RecurrenceException": null,
//     "isAllDay": false
// }];

  
// export const customModelFields = {
//     id: 'TaskID',
//     title: 'Title',
//     description: 'Description',
//     start: 'Start',
//     end: 'End',
//     recurrenceRule: 'RecurrenceRule',
//     recurrenceId: 'RecurrenceID',
//     recurrenceExceptions: 'RecurrenceException'
// };

// const currentYear = new Date().getFullYear();
// const currentMonth = new Date().getMonth();
// const currentDay = new Date().getDay();
  
// const parseAdjust = eventDate => {
//     const date = new Date(eventDate);
//     date.setFullYear(currentYear);
//     return date;
// };
  
// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  
// export const displayDate = new Date(currentYear, currentMonth, currentDay);
// export const sampleData = baseData.map(dataItem => ({
//     id: dataItem.TaskID,
//     start: parseAdjust(dataItem.Start),
//     startTimezone: dataItem.StartTimezone,
//     end: parseAdjust(dataItem.End),
//     endTimezone: dataItem.EndTimezone,
//     isAllDay: dataItem.isAllDay,
//     title: dataItem.Title,
//     description: dataItem.Description,
//     recurrenceRule: dataItem.RecurrenceRule,
//     recurrenceId: dataItem.RecurrenceID,
//     recurrenceExceptions: dataItem.RecurrenceException,
//     roomId: dataItem.RoomID,
//     ownerID: dataItem.OwnerID,
//     personId: dataItem.OwnerID
// }));
// export const sampleDataWithResources = baseData.map(dataItem => ({
//     id: dataItem.TaskID,
//     start: parseAdjust(dataItem.Start),
//     startTimezone: dataItem.StartTimezone,
//     end: parseAdjust(dataItem.End),
//     endTimezone: dataItem.EndTimezone,
//     isAllDay: dataItem.isAllDay,
//     title: dataItem.Title,
//     description: dataItem.Description,
//     recurrenceRule: dataItem.RecurrenceRule,
//     recurrenceId: dataItem.RecurrenceID,
//     recurrenceExceptions: dataItem.RecurrenceException,
//     roomId: randomInt(1, 2),
//     personId: randomInt(1, 2)
// }));
// export const sampleDataWithCustomSchema = baseData.map(dataItem => ({ ...dataItem,
//     Start: parseAdjust(dataItem.Start),
//     End: parseAdjust(dataItem.End),
//     PersonIDs: randomInt(1, 2),
//     RoomID: randomInt(1, 2)
// }));
