import React from 'react';

const BookTimeSlot = ({ date, onTimeSelect }) => {
  const availableTimes = ['10:00 AM', '11:00 AM', '12:00 PM'];

  return (
    <div>
      <h2>Select a Time for {date}</h2>
      {availableTimes.map(time => (
        <div key={time} onClick={() => onTimeSelect(time)}>{time}</div>
      ))}
    </div>
  );
};

export default BookTimeSlot;
