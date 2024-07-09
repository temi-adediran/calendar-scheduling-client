import { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import { BaseService } from '../services/BaseService';
import BookSession from "./BookSession";

function SelectCoach() {
  const [coaches, setCoaches] = useState([]);
  const [active, setActive] = useState(5);

  const handleSelectCoach = (e, id) => {
    e.preventDefault();
    setActive(id)
  }

  useEffect(() => {
    const getAllCoaches = async () => {
      try {
        const response = await BaseService.get("get_all_coaches");
        setCoaches(response);
      } catch (e) {
        console.log(e);
      }
    }

    getAllCoaches();
  }, [])


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
