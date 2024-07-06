import { useEffect, useState } from "react";
import { BaseService } from '../services/BaseService';
import TimeSlots from '../components/TimeSlots';
import { Button } from "flowbite-react";
import { days } from "../utils/constants";
import { getCalculatedTime } from "../utils/functions";

const defaultTimeSlots = () => {
  const obj = {}
  const weekEnd = ["SAT", "SUN"];
  days.map((day) => {
    const timeSlots = weekEnd.includes(day) ? [] : ["9:00"];
    obj[day] = timeSlots;
  })
  return obj;
}

const defaultSelectedTimeSlots = { 'MON': [], 'TUE': [], 'WED': [], 'THUR': [], 'FRI': [], 'SAT': [], 'SUN': [] }



function RecurringTimeSlots() {
  const [selectedTimeSlots, setSelectedTimeSlots] = useState(defaultSelectedTimeSlots);

  const handleSubmit = () => { }

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

  const handleAddSlot = (e, day) => {
    e.preventDefault()
    const currentTimeSlots = selectedTimeSlots[day];
    const lastIndexTimeSlot = currentTimeSlots[currentTimeSlots.length - 1]
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
                setSelectedTimeSlots={setSelectedTimeSlots}
                handleAddSlot={handleAddSlot}
                handleRemoveSlot={handleRemoveSlot}
              />
            </div>
          ))}
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default RecurringTimeSlots;
