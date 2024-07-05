import React from 'react';

const ConfirmationPage = ({ bookingDetails }) => {
  return (
    <div>
      <h2>Booking Confirmed</h2>
      <p>Thank you, {bookingDetails.name}!</p>
      <p>Your booking is confirmed for {bookingDetails.date} at {bookingDetails.time}.</p>
      <p>A confirmation email has been sent to {bookingDetails.email}.</p>
    </div>
  );
};

export default ConfirmationPage;
