import React from 'react';
import { Button } from "flowbite-react";

const BookTimeSlot = ({ date, onTimeSelect }) => {
  const availableTimeSlots = ['10:00', '12:00', '14:00'];

  return (
    <div>
      <div>
        <h1 className='mb-4'>"date"</h1>
      </div>
      <div>
        <ul>
          {availableTimeSlots.map(time => (
            <li key={time} className="mb-4">
              <Button
                onClick={() => onTimeSelect(time)}
                outline
                color="blue"
              >
                {time}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookTimeSlot;
