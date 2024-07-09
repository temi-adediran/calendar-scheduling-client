import * as React from "react";
import BookSession from '../components/BookSession';

// add buttons to pull different coach calendars

function Student() {
  return (
    <div className="mt-8 mx-auto flex flex-col justify-center">
      <div className="flex items-center m-8">
        <div className="text-justify m-8">
          <div>Stepful Coaching Call with "Coach Name"</div>
          <div>Time: 2 Hours</div>
        </div>
        <BookSession />
      </div>
    </div>
  )
}

export default Student;
