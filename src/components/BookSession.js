import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import BookTimeSlot from "./BookTimeSlot";
import { BaseService } from '../services/BaseService';
import { formatDate } from '../utils/functions';


function BookSession() {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [month, setMonth] = useState(formatDate(today));
  const [availableSlotsByMonth, setAvailableSlotsByMonth] = useState({[formatDate(today)]: []});
  const [dailyTimeSlots, setDailyTimeSlots] = useState([]);

  useEffect(() => {
    const thisMonth = formatDate(today)
    setMonth(thisMonth);
    getAvailableDatesByMonth();
  }, [])

  useEffect(() => {
    const timeSlots = availableSlotsByMonth[formatDate(date)];
    setDailyTimeSlots(timeSlots);
  }, [availableSlotsByMonth, date])

  const handleChangeMonth = ({ activeStartDate }) => {
    const selectedMonth = formatDate(activeStartDate);
    setMonth(selectedMonth);
    getAvailableDatesByMonth();
  }

  const getAvailableDatesByMonth = async () => {
    try {
      const response = await BaseService.get(`available_slots_by_month?month=${month}&id=5`);
      setAvailableSlotsByMonth(response);
    } catch (e) {
      console.log(e);
    }
  }

  const handleChange = (date) => {
    setDate(date);
    const timeSlots = availableSlotsByMonth[formatDate(date)];
    setDailyTimeSlots(timeSlots);
  }

  const handleSubmit = async (date, time) => {
    const formattedDate = formatDate(date);
    try {
      const response = await BaseService.post("book_session", { date: formattedDate, time: time });
      const timeSlots = availableSlotsByMonth[formattedDate];
      const updatedTimeSlots = timeSlots.filter((t) => t !== time);
      setAvailableSlotsByMonth({ ...availableSlotsByMonth, [formattedDate]: updatedTimeSlots });
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
          <div className='mr-8'>
            <div>
              <
                Calendar
                value={date}
                onChange={handleChange}
                onActiveStartDateChange={handleChangeMonth}
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
              dailyTimeSlots={dailyTimeSlots}
              onTimeSelect={onTimeSelect}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookSession;
