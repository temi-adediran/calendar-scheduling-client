import { useEffect, useState } from "react";
import TimeSlot from "./TimeSlot";
import { Checkbox, Label } from "flowbite-react";

function TimeSlots({ day, selectedTimeSlots, setSelectedTimeSlots }) {
  const handleAddSlot = () => { }

  const handleRemoveSlot = (e, index) => {
    e.preventDefault();
    const timeSlot = selectedTimeSlots[day][index];
    const updatedTimeSlots = selectedTimeSlots[day].filter((time) => timeSlot !== time);
    setSelectedTimeSlots({ ...selectedTimeSlots, [day]: updatedTimeSlots })
  }

  return (
    <>
      <div className="flex">
        <Checkbox id='${day}' className="mr-2" />
        <Label htmlFor='${day}' className="mr-4">{day}</Label>
      </div>

      <div>
        {
          selectedTimeSlots[day].length === 0 ? (
            <span className="text-gray-400">Unavailable</span>
          ) : (
            selectedTimeSlots[day].map((timeSlot, index) => (
                <div className="flex items-baseline pb-4" key={index}>
                  <TimeSlot
                    day={day}
                    index={index}
                    timeSlot={timeSlot}
                    selectedTimeSlots={selectedTimeSlots}
                    setSelectedTimeSlots={setSelectedTimeSlots}
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
