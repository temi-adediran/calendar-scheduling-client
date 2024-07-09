import { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import AvailableDates from "./AvailableDates";
import { BaseService } from "../services/BaseService";
import { getCalculatedTime } from "../utils/functions";
import UnavailableDate from "./UnavailableDate"


function DisplayAvailableDates() {
  const [availableDates, SetAvailableDates] = useState([]);

  useEffect(() => {
    const getUpcomingAvailableDates = async () => {
      try {
        const response = await BaseService.get("get_available_dates");
        SetAvailableDates(response);
      } catch (e) {
        console.log(e);
      }
    }

    getUpcomingAvailableDates();
  }, []);

  const handleDelete = (e, id) => {
    const deleteAvailableDate = async (data) => {
      try {
        const response = await BaseService.delete("delete_available_date", data)

        const updatedAvailableDates = availableDates.filter((date) => date.id !== id)
        SetAvailableDates(updatedAvailableDates);

        alert("Deleted successfully.")
      } catch (e) {
        console.log(e);
      }
    }

    deleteAvailableDate({ available_dates: { available_date_id: id} });
  }


  return (
    <div>
      <h3 className="mb-6">Upcoming specific time slots</h3>

      <div>
        {
          availableDates.map((available_date, index) => (
            <div key={index}>
              <div className="flex justify-between mb-6">
                <div>
                  <div>{available_date.date}</div>
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




function SpecificTimeSlots() {
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

      {showCalendar && <AvailableDates handleCloseCalendar={handleCloseCalendar} />}
      {!showCalendar && <DisplayAvailableDates />}
    </div>
  )
}



export default SpecificTimeSlots;
