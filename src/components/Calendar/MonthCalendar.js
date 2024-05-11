

import React, { Fragment } from 'react';
import WeekDays from './WeekDays';

const MonthCalendar = ({ value }) => {
  

  const year = value.getFullYear();
  const month = value.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = (firstDay + 6) % 7; // Adjusted to start from Monday
  const startDate = new Date(year, month, 1 - firstDayOfWeek);
  const endDate = new Date(year, month, daysInMonth);

  const getDayClassName = (day) => {
    if (day.getMonth() !== month) {
      return "text-gray-400";
    }
    else if(day.getDay() === 0){
       return "bg-EDEDED border border-E8E9EA"
    }
    return "";
  };

  const renderDay = (day) => {
    return (
      <div key={day.toISOString()} className={`border border-E8E9EA p-4 relative ${getDayClassName(day)}`}>

           <i className={`border-y-[25px] border-transparent border-r-[25px] border-r-2999BC w-0 h-0 rotate-45 absolute top-[-16px] left-[-4px] text-2999BC ${day.getDate() !== value.getDate() && 'hidden'} `}></i>

        <div className="flex justify-between mb-3">
          <span>{day.getDate()}</span>
          <span><i className="bi bi-plus-circle text-606061"></i></span>
        </div>
        <div className={`text-2C495D bg-F5F0E9 border border-2c495d33 text-sm w-full p-3 h-20 ${day.getDay() === 0 ? 'hidden' : ''}`}>
        </div>
      </div>
    );
  };

  const monthGrid = [];
  let currentDate = new Date(startDate);
  while (currentDate <= endDate || currentDate.getDay() !== 1) {
    // let prev = day - firstDay;
    // let next = day + firstDay;
    // prev.map((day,index) => {
    //     <h1 key={index}>{day}</h1>
    // })
    monthGrid.push(renderDay(new Date(currentDate)));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return (
    <Fragment>
      
       <WeekDays/>

      <div className="grid grid-cols-7 mt-5">
        {monthGrid}
      </div>
    </Fragment>
  );
}

export default MonthCalendar;
