import { Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { getCalculatedTime } from "../utils/functions";
import { startTimeIntervals, endTimeIntervals } from "../utils/constants";

function TimeSlot({ day, index, timeSlot, handleRemoveSlot, handleUpdateTimeSlot }) {
  // get rid of the endTime state and useEffect by calculating directly. The key prop should reset it.
  // Or: check if endTime !== getCalculatedTime(timeSlot), then set it while rendering without useEffect
  const [endTime, setEndTime] = useState(getCalculatedTime(timeSlot));

  useEffect(() => {
    setEndTime(getCalculatedTime(timeSlot));
  }, [timeSlot])

  return (
    <div className="flex items-center">
      <Select id="start-time" value={timeSlot} onChange={(e) => handleUpdateTimeSlot(e, day, index)}>
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

      <div><button onClick={(e) => handleRemoveSlot(e, day, index)} className="pr-3 pl-8">x</button></div>
    </div>
  )
}

export default TimeSlot;
