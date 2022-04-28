import useFetchEvents from "../hooks/use-fetch-events";

const {events} = useFetchEvents();
for(let i=0; i < events.length; i++){
    console.log(events[i].starttime)
    console.log("+")
    console.log(events[i].duration)
    let milli = new Date(events[i].starttime).getTime()+events[i].duration*60000;
    let end = new Date(milli)
    console.log("=")
    console.log(end)
    console.log(" ")
    events[i]['endtime'] = end;
}
  export const customModelFields = {
    id: "meetID",
    title: "Title",
    start: "Start",
    end: "End",
  };
  
  //export const displayDate = new Date(Date.UTC(currentYear, 5, 24));
  export const sampleData = events.map((dataItem) => ({
    id: dataItem.meetid,
    start: new Date(dataItem.starttime),
    end: dataItem.endtime,
    title: dataItem.title,
  }));
