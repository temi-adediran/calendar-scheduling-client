import { Select } from "flowbite-react";
import { getCalculatedTime } from "../utils/functions";
import { startTimeIntervals, endTimeIntervals } from "../utils/constants";

function TimeSlot({ day, index, timeSlot, handleRemoveSlot, handleUpdateTimeSlot }) {

  return (
    <div className="flex items-center">
      <Select id="start-time" value={timeSlot} onChange={(e) => handleUpdateTimeSlot(e, day, index)}>
        {startTimeIntervals.map((time) => (
          <option key={time}>{time}</option>
        ))}
      </Select>

      <span className="pr-2 pl-2"> - </span>

      <Select id="end-time" value={getCalculatedTime(timeSlot)} disabled>
        {endTimeIntervals.map((time) => (
          <option key={time}>{time}</option>
        ))}
      </Select>

      <div><button onClick={(e) => handleRemoveSlot(e, day, index)} className="pr-3 pl-8">x</button></div>
    </div>
  )
}

export default TimeSlot;
