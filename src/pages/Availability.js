import Navigation from "../components/Navigation";
import RecurringTimeSlots from '../components/RecurringTimeSlots';
import { Card } from "flowbite-react";

function Availability() {
  return (
    <>
      <Navigation />
      <h1>Enter Availability For Stepful Coaching Calls</h1>
      <br />
      <div className="flex">
        <div>
          <Card className="p-8 mr-8 max-w-lg">
            <div>
              <div>
                <h3 className="mb-4">Recurring Weekly Availability</h3>
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
                <h3>Set Date Specific Hours</h3>
                {/* <SpecificTimeSlots /> */}
              </div>
            </div>
          </Card>
        </div>
      </div>

    </>
  )
}

export default Availability;
