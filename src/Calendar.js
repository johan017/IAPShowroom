import React from 'react';
// ES2015 module syntax
import { Scheduler, DayView } from '@progress/kendo-react-scheduler';
// import Paper from '@mui/material/Paper';
// import { ViewState } from '@devexpress/dx-react-scheduler';
// import {
//   Scheduler,
//   DayView,
//   Appointments,
// } from '@devexpress/dx-react-scheduler-material-ui';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const fetchEvents = async () => {
    const res = await fetch('http://localhost:8000/events/');
    return res.json();
}

const queryClient = new QueryClient();
// [
//   { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
//   { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
// ];

const Calendar = ({queryClient}) => {
    const {data, status} = useQuery('events', fetchEvents);

    const currentDate = '2018-11-01';
    const schedulerData = data;

    
    return(
        <div>
            {/* {status === "loading" && (
                <div>Loading Data...</div>
            )}

            {status === "error" && (
                <div>Error fetching Data...</div>
            )}

            { status === "success" && (
                <div>
                {data.map(event => <div key={event.title}>{event.title}</div>)}
                </div>
            )} */}
{/* 
        <Paper>
            <Scheduler
            data={schedulerData}
            >
            <ViewState
                currentDate={currentDate}
            />
            <DayView
                startDayHour={9}
                endDayHour={14}
            />
            <Appointments />
            </Scheduler>
        </Paper> */}
        </div>
    );
}

 
export default Calendar;