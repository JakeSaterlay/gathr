import prisma from "@/prisma/client";

interface Props {
  params: { id: string };
}

async function getEvent(id: string) {
  const event = await prisma.event.findFirst({ where: { id: id } });
  return event;
}

async function EventDetails({ params: { id } }: Props) {
  const event = await getEvent(id);
  return (
    <div>
      <div>Event id: {event?.id}</div>
      <div>Event Name: {event?.eventName}</div>
    </div>
  );
}

export default EventDetails;
