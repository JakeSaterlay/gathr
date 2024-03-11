import prisma from "@/prisma/client";

interface Props {
  params: { id: string };
}

async function getEvent(id: string) {
  const event = await prisma.event.findFirst({ where: { id: id } });
  const dates = await prisma.eventDates.findMany({ where: { eventId: id } });
  return { event, dates };
}

async function EventDetails({ params: { id } }: Props) {
  const { event, dates } = await getEvent(id);
  return (
    <div>
      <div>Event id: {event?.id}</div>
      <div>Event Name: {event?.eventName}</div>
      <div>Event Description: {event?.eventDescription}</div>
      <div>
        {dates.map((date) => (
          <div>{date.eventDate.toDateString()}</div>
        ))}
      </div>
    </div>
  );
}

export default EventDetails;
