"use client";
import { useState } from "react";

const DateInput = () => {
  const [eventDates, setEventDates] = useState<string[]>([]);

  const handleEventDateAdd = (selectedDate: string) => {
    setEventDates([...eventDates, selectedDate]);
  };

  return (
    <>
      <div>
        <input
          type="date"
          onChange={(e) => handleEventDateAdd(e.target.value)}
        />
      </div>
      <div>
        <h1>Dates:</h1>
        {eventDates.length > 0 ? (
          eventDates.map((eventDate) => <div key={eventDate}>{eventDate}</div>)
        ) : (
          <div>No Dates Set</div>
        )}
      </div>
      <>
        {eventDates.length > 0 &&
          eventDates.map((eventDate) => (
            <input key={eventDate} hidden value={eventDate} name="date" />
          ))}
      </>
    </>
  );
};

export default DateInput;
