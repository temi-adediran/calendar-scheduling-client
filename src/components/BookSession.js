import React, { useState, useEffect, act } from 'react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import BookTimeSlot from "./BookTimeSlot";
import { BaseService } from '../services/BaseService';
import { formatDate } from '../utils/functions';


function BookSession() {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [month, setMonth] = useState(formatDate(today));
  const [monthlyTimeSlots, setMonthlyTimeSlots] = useState({ [formatDate(today)]: [] });


  useEffect(() => {
    const thisMonth = formatDate(new Date())
    setMonth(thisMonth);
  }, [])

  useEffect(() => {
    getAvailableDatesByMonth();
  }, [month])

  const getAvailableDatesByMonth = async () => {
    try {
      const response = await BaseService.get(`available_slots_by_month?month=${month}&id=5`);
      setMonthlyTimeSlots(response);
    } catch (e) {
      console.log(e);
    }
  }

  const handleMonthChange = ({ activeStartDate }) => {
    const selectedMonth = formatDate(activeStartDate);
    setMonth(selectedMonth);
    setDate(activeStartDate);
  }

  const handleChange = (date) => {
    setDate(date);
  }

  const handleSubmit = async (date, time) => {
    const formattedDate = formatDate(date);
    try {
      const response = await BaseService.post("book_session", { date: formattedDate, time: time });
      const timeSlots = monthlyTimeSlots[formattedDate];
      const updatedTimeSlots = timeSlots.filter((t) => t !== time);
      setMonthlyTimeSlots({ ...monthlyTimeSlots, [formattedDate]: updatedTimeSlots });
      alert(response.message);
    } catch (e) {
      console.log(e);
    }
  }

  const onTimeSelect = (time) => {
    if (window.confirm(`Please confirm booking for ${formatDate(date)} ${time}`)) {
      handleSubmit(date, time);
    }
  }

  const disabledDates = ({ activeStartDate, date }) => {
    const currentMonth = activeStartDate.getMonth();
    const nextMonth = currentMonth + 1;
    return date.getMonth() === nextMonth;
  }

  return (
    <div>
      <div className="">
        <div>
          <h1 className='mb-8 text-start'>Select a Date & Time</h1>
        </div>
        <div className="flex text-start">
          <div className="text-justify m-8">
            <div>Schedule a Stepful Coaching Call with "Coach Name"</div>
            <div>Time: 2 Hours</div>
          </div>
          <div className='mr-8'>
            <div>
              <
                Calendar
                value={date}
                onChange={handleChange}
                onActiveStartDateChange={handleMonthChange}
                view={"month"}
                minDate={today}
                prev2Label={null}
                next2Label={null}
                tileDisabled={disabledDates}
              />
            </div>
          </div>
          <div>
            <BookTimeSlot
              date={formatDate(date)}
              monthlyTimeSlots={monthlyTimeSlots}
              onTimeSelect={onTimeSelect}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookSession;
