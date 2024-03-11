import { getServerSession } from "next-auth";
import DateInput from "./DateInput";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import { redirect } from "next/navigation";

const EventForm = () => {
  async function createEvent(formData: FormData) {
    "use server";
    const eventName = formData.get("eventName") as string;
    const eventDescription = formData.get("eventDescription") as string;
    const eventDates = formData.getAll("date") as string[];
    const session = await getServerSession(authOptions);

    const newEvent = await prisma.event.create({
      data: {
        eventName: eventName,
        eventDescription: eventDescription,
        createdByEmail: session?.user?.email || "",
      },
    });

    for (const date of eventDates) {
      await prisma.eventDates.create({
        data: { eventId: newEvent.id, eventDate: new Date(date) },
      });
    }
    redirect("/event/myevents");
  }

  return (
    <form action={createEvent}>
      <div className="flex flex-col">
        <input
          className="input input-bordered max-w-xs"
          placeholder="Event Name"
          name="eventName"
        />
        <input
          className="input input-bordered max-w-xs"
          placeholder="Event description"
          name="eventDescription"
        />
      </div>
      <DateInput />
      <button className="btn btn-primary" type="submit">
        Add Event
      </button>
    </form>
  );
};

export default EventForm;
