"use client";

import { FormEvent, useState } from "react";

const EventForm = () => {
  const [eventName, setEventName] = useState("");
  const [eventDates, setEventDates] = useState<string[]>([]);

  const handleEventDateAdd = (selectedDate: string) => {
    setEventDates([...eventDates, selectedDate]);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(JSON.stringify({ eventName, eventDates }));
    fetch("/api/events", {
      method: "POST",
      body: JSON.stringify({ eventName, eventDates }),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Event Name"
        onChange={(e) => setEventName(e.target.value)}
      />
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
      <button type="submit">Add Event</button>
    </form>
  );
};

export default EventForm;
