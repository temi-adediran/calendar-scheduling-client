import { useState } from "react";
import { Button } from "flowbite-react";
import BookSession from "./BookSession";
import { useData } from "../hooks/useData";

function SelectCoach() {
  const [active, setActive] = useState(5);
  const [coaches] = useData(`get_all_coaches`, []);

  const handleSelectCoach = (e, id) => {
    e.preventDefault();
    setActive(id)
  }

  return (
    <div className="text-justify m-8">
      {
        coaches.map((coach, index) => {
          return (
            <div key={index}>
              <div className="pb-4">
                <div>
                  <Button pill color={`${active === coach.id ? "blue" : "gray"}`} onClick={(e) => handleSelectCoach(e, coach.id)}>Book Coach {coach.name || coach.id}</Button>
                </div>
              </div>
              <div>{active === coach.id ? <BookSession coach={coach} /> : null}</div>
            </div>
          )
        })
      }
    </div>
  )
}

export default SelectCoach;
