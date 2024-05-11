import React from 'react'

const WeekDays = () => {
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <div className="grid grid-cols-7 bg-F1F6F9 p-3">
            {daysOfWeek.map((day, index) => (
                <div key={index} className={`${index !== 6 ? 'border-r-4 border-white' : ''} text-center`}>
                {day}
                </div>
            ))}
    </div>
  )
}

export default WeekDays