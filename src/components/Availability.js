import RecurringTimeSlots from './RecurringTimeSlots';
import { Card } from "flowbite-react";
import DateSpecificTimeSlots from "./DateSpecificTimeSlots";

function Availability() {
  return (
    <div className="mx-auto flex flex-col justify-center items-center px-6 pt-8 pt:mt-0">
      <h2>Enter Availability For Stepful Coaching Calls</h2>
      <br />
      <div className="flex">
        <div>
          <Card className="p-8 mr-8 max-w-lg">
            <div>
              <div>
                <h3 className="">Recurring Weekly Availability</h3>
                <br />
              </div>
              <RecurringTimeSlots />
            </div>
          </Card>
        </div>
        <br />
        <br />
        <div>
          <Card className="p-8 mr-8 max-w-lg">
            <div>
              <div>
                <DateSpecificTimeSlots />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Availability;
