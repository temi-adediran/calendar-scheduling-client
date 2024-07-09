import * as React from "react";
import BookSession from '../components/BookSession';
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import UpcomingSessions from "../components/UpcomingSessions";

// add buttons to pull different coach calendars

function Student() {
  return (
    <div className="mt-8 mx-auto flex flex-col justify-center">
      <div className="flex items-center m-8">
        <div>
          <li className="pr-8">
            <Button outline gradientDuoTone="purpleToBlue"><Link to="/student">Upcoming sessions</Link></Button>
          </li>
        </div>
        <UpcomingSessions />
        <BookSession />
      </div>
    </div>
  )
}

export default Student;
