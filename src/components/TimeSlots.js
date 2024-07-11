import TimeSlot from "./TimeSlot";
import { Checkbox, Label } from "flowbite-react";
import UnavailableDate from "./UnavailableDate";

function TimeSlots({ day, selectedTimeSlots, handleAddSlot, handleRemoveSlot, handleUpdateTimeSlot }) {
  return (
    <>
      <div className="flex">
        <Checkbox id="${day}" checked={selectedTimeSlots[day].length > 0} readOnly className="mr-2" />
        <Label htmlFor="${day}" className="mr-4">{day}</Label>
      </div>

      <div>
        {
          selectedTimeSlots[day].length === 0 ? (
            <UnavailableDate />
          ) : (
            selectedTimeSlots[day].map((timeSlot, index) => {
              return (
                <div className="flex items-baseline pb-4" key={index}>
                  <TimeSlot
                    day={day}
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

      <div className="pl-4">
        <button onClick={(e) => handleAddSlot(e, day)}>+</button>
      </div>
    </>
  );
}

export default TimeSlots;
