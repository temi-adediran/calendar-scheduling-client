import React from 'react';
import { Button } from "flowbite-react";
import { formatDate } from '../utils/functions';

const BookTimeSlot = ({ date, monthlyTimeSlots, onTimeSelect }) => {
  const dailyTimeSlots = monthlyTimeSlots[formatDate(date)];

  return (
    <div>
      <div>
        <h3 className='mb-4'>{date}</h3>
      </div>
      <div>
        {
          dailyTimeSlots && dailyTimeSlots.length === 0 ? (
            <div>
              <span>No slots available.</span>
            </div>
          ) : (
            <ul>
              {
                dailyTimeSlots && dailyTimeSlots.map((time, index) => (
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
