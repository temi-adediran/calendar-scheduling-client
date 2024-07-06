import { useState } from "react";
import { Button } from "flowbite-react";

function SpecificTimeSlots() {
  const [showCalendar, setShowCalendar] = useState(false)

  return (
    <div>
      <div>
        <h3 className="mb-4">Date Specific Hours</h3>
        <p className="mb-4">Override your availability for specific dates when your hours differ from your regular weekly hours.</p>
      </div>

      <div>
        <div className="">
          <Button
            onClick={() => setShowCalendar(true)}
            outline
            color="blue"
          >
            Add date-specific hours
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SpecificTimeSlots;
