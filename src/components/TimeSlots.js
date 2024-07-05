import { useEffect, useState } from "react";
import TimeSlot from "./TimeSlot";
import { Checkbox, Label } from "flowbite-react";

function TimeSlots({ day, setSelectedTimeSlots, dailyTimeSlots }) {
  const handleAddSlot = () => {}
  const handleRemoveSlot = () => {}

  return (
    <>
      <div className="flex">
        <Checkbox id='${day}' className="mr-2" />
        <Label htmlFor='${day}' className="mr-4">{day}</Label>
      </div>

      <div>
        {
          dailyTimeSlots.length === 0 ? (
            <span className="text-gray-400">Unavailable</span>
          ) : (
              dailyTimeSlots.map((timeSlot) => (
                <div className="flex items-baseline pb-4" key={timeSlot}>
                  <TimeSlot
                    timeSlot={timeSlot}
                    handleRemoveSlot={handleRemoveSlot}
                  />
                </div>
            ))
          )
        }
      </div>

      <div className="pl-4">
        <button onClick={handleAddSlot()}>+</button>
      </div>
    </>
  );
}

export default TimeSlots;
