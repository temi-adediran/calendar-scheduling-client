import * as React from "react";
import DisplayCalendar from '../components/DisplayCalendar';

function Student() {
  return (
    <div className="m-8">
      <div className="flex items-baseline m-4">
        <div className="m-8">
          <div>Schedule a Stepful Coaching Call with Coach</div>
          <div>Time: 2 Hours</div>
        </div>
        <DisplayCalendar />
      </div>
    </div>
  )
}

export default Student;
