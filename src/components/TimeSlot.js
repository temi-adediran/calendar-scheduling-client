import { Select } from "flowbite-react";

function TimeSlot({ timeSlot, handleRemoveSlot }) {
  const timeIntervals = ["9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"]
  const defaultTimeSlots = [{ startTime: "9:00", endTime: "11:00" }, { startTime: "12:00", endTime: "14:00" }, { startTime: "15:00", endTime: "17:00" }];

  const handleUpdateTimeSlot = () => { }

  const getEndTime = (timeSlot) => {
    const str = timeSlot.split(":")
    const strPlusTwoHours = Number(str[0]) + 2;
    const endTime = `${strPlusTwoHours}:${str[ str.length - 1]}`
    return endTime;
  }

  return (
    <div className="flex items-center">
      <Select id="start-time" value={timeSlot} onChange={handleUpdateTimeSlot}>
        {timeIntervals.map((time) => (
          <option key={time}>{time}</option>
        ))}
      </Select>

      <span className="pr-2 pl-2"> - </span>

      <Select id="end-time" value={getEndTime(timeSlot)} disabled>
        {timeIntervals.map((time) => (
          <option key={time}>{time}</option>
        ))}
      </Select>

      <div><button onClick={handleRemoveSlot} className="pr-3 pl-8">x</button></div>
    </div>
  )
}

export default TimeSlot;
