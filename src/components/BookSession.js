import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import BookTimeSlot from "./BookTimeSlot";
import { BaseService } from '../services/BaseService';
import { formatDate } from '../utils/functions';

const today = new Date();
const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);

function BookSession({ coach }) {
  const [date, setDate] = useState(tomorrow);
  const [month, setMonth] = useState(formatDate(today));
  const [monthlyTimeSlots, setMonthlyTimeSlots] = useState({ [formatDate(today)]: [] });

  useEffect(() => {
    const thisMonth = formatDate(today)
    setMonth(thisMonth);
  }, [])

  useEffect(() => {
    let ignore = false;
    const getAvailableDatesByMonth = async () => {
      try {
        const response = await BaseService.get(`available_slots_by_month?month=${month}&id=${coach.id}`);
        if (!ignore) { setMonthlyTimeSlots(response) }
      } catch (e) {
        console.log(e);
      }

      return () => {
        ignore = true;
      };
    }

    getAvailableDatesByMonth();
  }, [month, coach])

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
    <div className="mx-auto flex flex-col justify-center items-center px-6 pt-8 pt:mt-0">
      <div className="">
        <div className='mt-12 text-center'>
          <div>
            <h2>Schedule a Stepful Session with Coach {coach.name || coach.id} </h2>
          </div>
          <div>
            <h2>Time: 2 Hours</h2>
          </div>
        </div>
        <div className="mt-8">
          <div>
            <h3 className='mb-8 text-center'>Select a Date & Time</h3>
          </div>
          <div className="flex text-start">
            <div>

            </div>
            <div className='mr-8'>
              <div>
                <
                  Calendar
                  value={date}
                  onChange={handleChange}
                  onActiveStartDateChange={handleMonthChange}
                  view={"month"}
                  minDate={tomorrow}
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
    </div>
  )
}

export default BookSession;
