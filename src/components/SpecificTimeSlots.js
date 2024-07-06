import { useState } from "react";
import { Button } from "flowbite-react";
import Calendar from 'react-calendar'

function SpecificTimeSlots() {
  const [showCalendar, setShowCalendar] = useState(false)

  return (
    <div>
      <div>
        <h3 className="mb-4">Date Specific Hours</h3>
        <p className="mb-4">Override your availability for specific dates when your hours differ from your regular weekly hours.</p>
      </div>

      <div>
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

      { showCalendar && <DisplayCalendar />}
    </div>
  )
}


function DisplayCalendar() {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [timeSlots, setTimeSlots] = useState([]);

  const getUpcomingAvailableDates = () => {
    // display upcoming date-specific hours when calendar is submitted
  }

  const handleChange = (date) => {
    setDate(date);
    // set available slots for date
  }

  const handleSubmit = () => {
    // submit booking for student
  }

  const onTimeSelect = (time) => {
    console.log(time);
    // add animation to show confirm button
  }

  return (
    <div>
      <div className="">
        <div>
          <h1 className='mb-8'>Select the date(s) you want to assign specific hours</h1>
        </div>
        <div className="flex">
          <div className='mr-8'>
            <div>
              <
                Calendar
                value={date}
                onChange={handleChange}
                view={"month"}
                minDate={today}
                prev2Label={null}
                next2Label={null}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}



export default SpecificTimeSlots;
