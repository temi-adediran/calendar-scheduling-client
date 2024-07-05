import React, { useState } from 'react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

// get all available dates this month
// when a day is selected, populate the times available in the TimeSlot component

function DisplayCalendar() {
  const today = new Date();
  const [date, setDate] = useState(today);
  const availableDates = [];

  const handleChange = (date) => {
    setDate(date);
  }

  const disabledDates = () => {
  }

  const onTimeSelect = (time) => {
    console.log(time);
  }

  return (
    <div>
      <
        Calendar
        value={date}
        onChange={handleChange}
        view={"month"}
        minDate={today}
        prev2Label={null}
        next2Label={null}
      />
      {/* <BookTimeSlot date={date} onTimeSelect={onTimeSelect}  /> */}
    </div>
  )
}

export default DisplayCalendar;
