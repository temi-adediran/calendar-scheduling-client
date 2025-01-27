import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

function Navigation() {
  return (
    <ul className="pb-8 flex">
      <li className="pr-8">
        <Button outline gradientDuoTone="purpleToBlue"><Link to="/availability">Availability</Link></Button>
      </li>
      <li className="pr-8">
        <Button outline gradientDuoTone="purpleToBlue"><Link to="/coach">Upcoming sessions</Link></Button>
      </li>
      <li>
        <Button outline gradientDuoTone="purpleToBlue"><Link to="/past-sessions">Past sessions</Link></Button>
      </li>
    </ul>
  );
}

export default Navigation;
