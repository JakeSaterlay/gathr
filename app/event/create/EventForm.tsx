import { getServerSession } from "next-auth";
import DateInput from "./DateInput";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import { redirect } from "next/navigation";

const EventForm = () => {
  async function createEvent(formData: FormData) {
    "use server";
    const eventName = formData.get("eventName") as string;
    const eventDates = formData.getAll("date") as string[];
    const session = await getServerSession(authOptions);

    const newEvent = await prisma.event.create({
      data: {
        eventName: eventName,
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
      <input
        className="input input-bordered w-full max-w-xs"
        placeholder="Event Name"
        name="eventName"
      />
      <DateInput />
      <button className="btn btn-primary" type="submit">
        Add Event
      </button>
    </form>
  );
};

export default EventForm;
