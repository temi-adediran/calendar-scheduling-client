import { useEffect, useState, useReducer } from "react";
import { BaseService } from '../services/BaseService';
import TimeSlots from '../components/TimeSlots';
import { Button } from "flowbite-react";
import { days } from "../utils/constants";
import { getCalculatedTime } from "../utils/functions";

const initialState = { 'MON': [], 'TUE': [], 'WED': [], 'THU': [], 'FRI': [], 'SAT': [], 'SUN': [] }

const defaultTimeSlots = () => {
  const obj = {}
  const startOfBusinessHours = "9:00"
  const weekEnd = ["SAT", "SUN"];
  days.map((day) => {
    const timeSlots = weekEnd.includes(day) ? [] : [startOfBusinessHours];
    return obj[day] = timeSlots;
  })
  return obj;
}


function timeSlotsReducer(timeSlots, action) {
  switch (action.type) {
    case "initial": {
      return action.initialTimeSlots;
    }

    case "added": {
      const { day } = action;
      const defaultLastIndexTimeSlot = "6:00"
      const dayTimeSlots = timeSlots[day];
      const lastIndexTimeSlot = dayTimeSlots[dayTimeSlots.length - 1] || defaultLastIndexTimeSlot
      // Use 3 hours to calculate the next time slot, which gives 2 hours for default end time and 1 hour to rest in between sessions.
      const newTimeSlot = getCalculatedTime(lastIndexTimeSlot, 3);
      const updatedDayTimeSlots = [...dayTimeSlots, newTimeSlot];
      return { ...timeSlots, [day]: updatedDayTimeSlots }
    }

    case "updated": {
      const { day, index, newStartTime } = action;
      const dayTimeSlots = timeSlots[day];
      const updatedTimeSlots = [ ...dayTimeSlots.slice(0, index), newStartTime, ...dayTimeSlots.slice(index + 1) ]
      return { ...timeSlots, [day]: updatedTimeSlots }
    }

    case "removed": {
      const { day, index } = action;
      const dayTimeSlots = timeSlots[day];
      const updatedTimeSlots = dayTimeSlots.filter((v, i) => i !== index )
      return { ...timeSlots, [day]: updatedTimeSlots }
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}


function RecurringTimeSlots() {
  const [weeklyTimeSlots, dispatch] = useReducer(timeSlotsReducer, initialState);

  useEffect(() => {
    const getAvailableDates = async () => {
      try {
        const response = await BaseService.get("get_recurring_hours");
        dispatch({ type: "initial", initialTimeSlots: response == null ? defaultTimeSlots() : response })
      } catch (e) {
        console.log(e);
      }
    }

    getAvailableDates();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    // to do: if any timeslot is overlapping another, alert and return error

    const submitRecurringHours = async (data) => {
      try {
        const response = await BaseService.post("post_recurring_hours", data);
        alert("Submitted successfully.")
        console.log(response.message);
      } catch (e) {
        alert("Error while submitting. Please try again.")
        console.log(e);
      }
    }

    submitRecurringHours({ "recurring_hour": weeklyTimeSlots });
  }

  const handleUpdateTimeSlot = (e, day, index) => {
    const newStartTime = e.target.value;

    dispatch({
      type: "updated",
      newStartTime: newStartTime,
      day: day,
      index: index
    })
  }

  const handleAddTimeSlot = (e, day) => {
    e.preventDefault();
    dispatch({
      type: "added",
      day: day
    })
  }

  const handleRemoveTimeSlot = (e, day, index) => {
    e.preventDefault();

    dispatch({
      type: "removed",
      day: day,
      index: index
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="self-baseline items-center gap-2 mb-4">
          { days.map((day, index) => (
            <div key={index} className="mb-4 flex justify-between items-baseline">
              <TimeSlots
                day={day}
                selectedTimeSlots={weeklyTimeSlots}
                handleAddSlot={handleAddTimeSlot}
                handleRemoveSlot={handleRemoveTimeSlot}
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
