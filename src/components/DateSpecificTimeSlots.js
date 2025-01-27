import { useState } from "react";
import { Button } from "flowbite-react";
import SelectAvailableDates from "./SelectAvailableDates";
import { BaseService } from "../services/BaseService";
import { getCalculatedTime, formatDateWithDay } from "../utils/functions";
import UnavailableDate from "./UnavailableDate"
import { useData } from "../hooks/useData";


function DateSpecificTimeSlots() {
  const [showCalendar, setShowCalendar] = useState(false)

  const handleCloseCalendar = (e) => {
    e.preventDefault();
    setShowCalendar(false);
  }

  return (
    <div>
      <div>
        <h3 className="mb-4">Date Specific Hours</h3>
        <p className="mb-4">Override your availability for specific dates when your hours differ from your regular weekly hours.</p>
      </div>

      <div className="mb-16">
        <div className="pt-4">
          <Button
            onClick={() => setShowCalendar(true)}
            outline
            color="blue"
          >
            Add date-specific hours
          </Button>
        </div>
      </div>

      {showCalendar && <SelectAvailableDates handleCloseCalendar={handleCloseCalendar} />}
      {!showCalendar && <DisplayAvailableDates />}
    </div>
  )
}




function DisplayAvailableDates() {
  const [availableDates, setAvailableDates] = useData("get_available_dates", []);

  const handleDelete = (e, id) => {
    const deleteAvailableDate = async (data) => {
      try {
        await BaseService.delete("delete_available_date", data)
        const updatedAvailableDates = availableDates.filter((date) => date.id !== id)
        setAvailableDates(updatedAvailableDates);

        alert("Deleted successfully.")
      } catch (e) {
        console.log(e);
      }
    }

    deleteAvailableDate({ available_dates: { available_date_id: id} });
  }


  return (
    <div>
      <h3 className="mb-6">Upcoming date-specific hours</h3>

      <div>
        {
          availableDates.map((available_date, index) => (
            <div key={index}>
              <div className="flex justify-between mb-6">
                <div>
                  <div>{formatDateWithDay(new Date(available_date.date))}</div>
                </div>
                <div>
                  {
                    available_date.time_slots.length === 0 ? (
                      <UnavailableDate />
                    ) : (
                      available_date.time_slots.map((time, index) => (
                        <div key={index}>
                          {time} - {getCalculatedTime(time)}
                        </div>
                      ))
                    )
                  }
                </div>
                <div className="pl-4">
                  <button className="text-l" onClick={(e) => handleDelete(e, available_date.id)}>x</button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}



export default DateSpecificTimeSlots;
