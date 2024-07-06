import { useEffect, useState } from "react";
import { BaseService } from '../services/BaseService';
import TimeSlots from '../components/TimeSlots';
import { Button } from "flowbite-react";
import { days } from "../utils/constants";
import { getCalculatedTime } from "../utils/functions";

const initialState = { 'MON': [], 'TUE': [], 'WED': [], 'THUR': [], 'FRI': [], 'SAT': [], 'SUN': [] }

const defaultTimeSlots = () => {
  const obj = {}
  const startOfBusinessHours = "9:00"
  const weekEnd = ["SAT", "SUN"];
  days.map((day) => {
    const timeSlots = weekEnd.includes(day) ? [] : [startOfBusinessHours];
    obj[day] = timeSlots;
  })
  return obj;
}

// Add comments to this file

function RecurringTimeSlots() {
  const [selectedTimeSlots, setSelectedTimeSlots] = useState(initialState);

  useEffect(() => {
    const getAvailableDates = async () => {
      try {
        const response = await BaseService.get("get_recurring_hours");
        response == null ? setSelectedTimeSlots(defaultTimeSlots()) : setSelectedTimeSlots(response);
      } catch (e) {
        console.log(e);
      }
    }

    getAvailableDates();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    // if any timeslot is overlapping another, alert and return error

    const submitRecurringHours = async (data) => {
      try {
        const response = await BaseService.post("post_recurring_hours", data );
        console.log(response.message);
      } catch (e) {
        console.log(e);
      }
    }

    submitRecurringHours({ "recurring_hour": selectedTimeSlots });
  }

  const handleUpdateTimeSlot = (e, day, index) => {
    const newStartTime = e.target.value;
    const dayTimeSlots = selectedTimeSlots[day];
    dayTimeSlots[index] = newStartTime;
    setSelectedTimeSlots({ ...selectedTimeSlots, [day]: dayTimeSlots })
  }

  const handleAddSlot = (e, day) => {
    e.preventDefault()
    const defaultLastIndexTimeSlot = "6:00"
    const currentTimeSlots = selectedTimeSlots[day];
    const lastIndexTimeSlot = currentTimeSlots[currentTimeSlots.length - 1] || defaultLastIndexTimeSlot
    const newTimeSlot = getCalculatedTime(lastIndexTimeSlot, 3);
    const updatedTimeSlots = [...currentTimeSlots, newTimeSlot];
    setSelectedTimeSlots({ ...selectedTimeSlots, [day]: updatedTimeSlots })
  }

  const handleRemoveSlot = (e, day, index) => {
    e.preventDefault();
    const timeSlot = selectedTimeSlots[day][index];
    const updatedTimeSlots = selectedTimeSlots[day].filter((time) => timeSlot !== time);
    setSelectedTimeSlots({ ...selectedTimeSlots, [day]: updatedTimeSlots })
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="self-baseline items-center gap-2 mb-4">
          { days.map((day, index) => (
            <div key={index} className="mb-4 flex justify-between items-baseline">
              <TimeSlots
                day={day}
                selectedTimeSlots={selectedTimeSlots}
                handleAddSlot={handleAddSlot}
                handleRemoveSlot={handleRemoveSlot}
                handleUpdateTimeSlot={handleUpdateTimeSlot}
              />
            </div>
          ))}
        </div>
        <Button color="blue" type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default RecurringTimeSlots;
