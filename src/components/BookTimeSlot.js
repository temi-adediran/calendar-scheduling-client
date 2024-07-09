import React from 'react';
import { Button } from "flowbite-react";

const BookTimeSlot = ({ date, dailyTimeSlots, onTimeSelect }) => {
  return (
    <div>
      <div>
        <h3 className='mb-4'>{date}</h3>
      </div>
      <div>
        {
          dailyTimeSlots.length === 0 ? (
            <div>
              <span>No slots available.</span>
            </div>
          ) : (
            <ul>
              {
                dailyTimeSlots.map((time, index) => (
                  <li key={index} className="mb-4">
                    <Button
                      onClick={() => onTimeSelect(time)}
                      outline
                      color="blue"
                    >
                      {time}
                    </Button>
                  </li>
                ))
              }
            </ul>
          )
        }
      </div>
    </div>
  );
};

export default BookTimeSlot;
