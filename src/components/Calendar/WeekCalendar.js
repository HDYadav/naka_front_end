import React, { Fragment } from 'react'
import WeekDays from './WeekDays'

const WeekCalendar = ({value}) => {

    const getStartOfWeek = (date) => {
        const dayOfWeek = date.getDay(); 
        const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        const startDate = new Date(date);
        startDate.setDate(startDate.getDate() - diff);
        return startDate;
      };
    
      const getWeekDates = (date) => {
        const startDate = getStartOfWeek(date);
        const dates = [];
    
        for (let i = 0; i < 7; i++) {
          const currentDate = new Date(startDate);
          currentDate.setDate(startDate.getDate() + i);
          dates.push(currentDate);
        }
    
        return dates;
      };
    
      const weekDates = getWeekDates(value);
    
  return (
      <Fragment>
               <WeekDays />

               <div className="grid grid-cols-7 mt-5">
                    {weekDates.map((date, index) => (
                        
                                <div key={index} className={`border border-E8E9EA p-4 relative  ${date.getDay() === 0 ? 'bg-EDEDED border border-E8E9EA' : ''}`}>
                                     <i className={`border-y-[25px] border-transparent border-r-[25px] border-r-2999BC w-0 h-0 rotate-45 absolute top-[-16px] left-[-4px] text-2999BC ${date.getDate() !== value.getDate() && 'hidden'} `}></i>
                                <div className="flex justify-between mb-3">
                                <span>{date.getDate()}</span>
                                <span><i className="bi bi-plus-circle text-606061"></i></span>
                                </div>
                                <div className={`text-2C495D bg-F5F0E9 border border-2c495d33 text-sm w-full p-3 h-20 ${date.getDay() === 0 && 'hidden'}`}>
                                </div>
                            </div>
                    ))}
                </div>
      </Fragment>
  )
}

export default WeekCalendar