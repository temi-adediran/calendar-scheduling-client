import { useEffect, useState } from "react";
import { BaseService } from '../services/BaseService';
import TimeSlots from '../components/TimeSlots';
import { Button } from "flowbite-react";

function RecurringTimeSlots() {
  const days = ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"]
  const [selectedTimeSlots, setSelectedTimeSlots] = useState({});
  //selectedTimeSlots = {MON: [], TUES: [], WED: [], THURS: [], FRI: [], SAT: [], SUN: []}

  const handleSubmit = () => {}

  useEffect(() => {
    const getAvailableDates = async () => {
      try {
        const response = await BaseService.get("get_recurring_hours");
        setSelectedTimeSlots(response);
      } catch (e) {
        console.log(e);
      }
    }

    getAvailableDates();
  }, [])

  const getDailyTimeSlots = (day) => {
    const weekEnd = ["SAT", "SUN"];
    const dailyTimeSlots = weekEnd.includes(day) ? [] : ["9:00"];

    if (selectedTimeSlots == null){ return dailyTimeSlots };

    if (Object.keys(selectedTimeSlots).length >= 1) {
      return selectedTimeSlots[day]
    } else {
      return [];
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="self-baseline items-center gap-2 mb-4">
          { days.map((day) => (
            <div key={day} className="mb-4 flex justify-between items-baseline">
              <TimeSlots
                day={day}
                // selectedTimeSlots={selectedTimeSlots}
                setSelectedTimeSlots={setSelectedTimeSlots}
                dailyTimeSlots={getDailyTimeSlots(day)}
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
