import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import BookTimeSlot from "./BookTimeSlot";

// get all available dates for the month
// when a date is selected, set the timeSlot for the date

function BookSession() {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  useEffect(() => {
    // get available dates with timeSlots for the month
    // do this every time the change month arrow is clicked
  })

  const handleChange = (date) => {
    setDate(date);
    // set available slots for date
  }

  const handleSubmit = () => {
    // submit booking for student
  }

  const onTimeSelect = (time) => {
    console.log(time);
    // add animation to show confirm button
  }

  const disabledDates = () => {
    // set dates that are []
  }

  return (
    <div>
      <div className="">
        <div>
          <h1 className='mb-8'>Select a Date & Time</h1>
        </div>
        <div className="flex">
          <div className='mr-8'>
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
            </div>
          </div>
          <div>
            <BookTimeSlot
              date={date}
              availableTimeSlots={availableTimeSlots}
              onTimeSelect={onTimeSelect}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookSession;
