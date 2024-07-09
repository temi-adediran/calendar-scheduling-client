import React, { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getCalculatedTime, formatDate } from "../utils/functions";
import TimeSlot from "./TimeSlot";
import { Button } from "flowbite-react";
import { BaseService } from '../services/BaseService';
import UnavailableDate from "./UnavailableDate";


function AvailableDates({ handleCloseCalendar }) {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [timeSlots, setTimeSlots] = useState(["9:00"]);

  const handleChange = (date) => {
    setDate(date);
    setTimeSlots(["9:00"]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // if any timeslot is overlapping another, alert and return error

    const submitAvailableDates = async (data) => {
      try {
        const response = await BaseService.post("post_available_dates", data);
        alert("Submitted successfully.");
        console.log(response.message);
      } catch (e) {
        alert("Error while submitting. Please try again.")
        console.log(e);
      }
    }

    submitAvailableDates({ "available_dates": {date: formatDate(date), time_slots: timeSlots} });
  }

  const handleAddSlot = (e) => {
    e.preventDefault();
    const defaultLastIndexTimeSlot = "6:00"
    const lastIndexTimeSlot = timeSlots[timeSlots.length - 1] || defaultLastIndexTimeSlot;
    const newTimeSlot = getCalculatedTime(lastIndexTimeSlot, 3);
    const updatedTimeSlots = [...timeSlots, newTimeSlot];
    setTimeSlots(updatedTimeSlots);
  }

  const handleRemoveSlot = (e, date, index) => {
    e.preventDefault();
    const timeSlot = timeSlots[index];
    const updatedTimeSlots = timeSlots.filter((time) => timeSlot !== time);
    setTimeSlots(updatedTimeSlots);
  }

  const handleUpdateTimeSlot = (e, day, index) => {
    const newStartTime = e.target.value;
    const currentTimeSlot = timeSlots[index];
    const updatedTimeSlots = timeSlots.map((time) => time === currentTimeSlot ? newStartTime : time)
    setTimeSlots(updatedTimeSlots);
  }

  return (
    <div>
      <div className="">
        <div>
          <p className='mb-8 text-start'>Select the date you want to assign specific hours</p>
        </div>
        <div className="flex">
          <div className='mr-8'>
            <div className="mb-8">
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

            <div className="flex items-baseline justify-between">
              <div className="pb-8">
                {
                  timeSlots.length === 0 ? (
                    <UnavailableDate />
                  ) : (
                    timeSlots.map((timeSlot, index) => {
                      return (
                        <div className="flex items-baseline pb-4" key={index}>
                          <TimeSlot
                            day={"date"}
                            index={index}
                            timeSlot={timeSlot}
                            handleRemoveSlot={handleRemoveSlot}
                            handleUpdateTimeSlot={handleUpdateTimeSlot}
                          />
                        </div>
                      )
                    })
                  )
                }
              </div>

              <div className="mt-8">
                <div className="pl-4">
                  <button className="text-2xl" onClick={handleAddSlot}>+</button>
                </div>
              </div>
            </div>

            <div className="flex justify-start">
              <div>
                <Button color="blue" className="mr-8" onClick={handleSubmit}>Save</Button>
              </div>
              <div>
                <Button outline color="blue" onClick={handleCloseCalendar}>Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AvailableDates;
