import { Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { getEndTime } from "../utils/functions";
import { startTimeIntervals, endTimeIntervals } from "../utils/constants";

function TimeSlot({ day, timeSlot, index, selectedTimeSlots, setSelectedTimeSlots, handleRemoveSlot }) {
  const [endTime, setEndTime] = useState(getEndTime(timeSlot));

  const handleUpdateTimeSlot = (e) => {
    const newStartTime = e.target.value;
    setEndTime(getEndTime(newStartTime));

    const dayTimeSlots = selectedTimeSlots[day];
    dayTimeSlots[index] = newStartTime;
    setSelectedTimeSlots({ ...selectedTimeSlots, [day]: dayTimeSlots })
  }

  return (
    <div className="flex items-center">
      <Select id="start-time" value={timeSlot} onChange={handleUpdateTimeSlot}>
        {startTimeIntervals.map((time) => (
          <option key={time}>{time}</option>
        ))}
      </Select>

      <span className="pr-2 pl-2"> - </span>

      <Select id="end-time" value={endTime} disabled>
        {endTimeIntervals.map((time) => (
          <option key={time}>{time}</option>
        ))}
      </Select>

      <div><button onClick={(e) => handleRemoveSlot(e, index)} className="pr-3 pl-8">x</button></div>
    </div>
  )
}

export default TimeSlot;
