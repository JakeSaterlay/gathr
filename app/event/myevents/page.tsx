import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";

interface Event {
  id: string;
  eventName: string;
}

export const revalidate = 0;
async function MyEvents() {
  const session = await getServerSession(authOptions);
  const events: Event[] = await fetch(
    `http://localhost:3000/api/events/${session?.user?.email}`,
    { method: "GET" }
  ).then((res) => res.json());
  return (
    <div>
      <h1 className="mb-5">My Events</h1>
      {events.length > 0 ? (
        events.map((event) => (
          <Link href={`/event/${event.id}`}>{event.eventName}</Link>
        ))
      ) : (
        <div>No Events</div>
      )}
      <Link
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        href="/event/create"
      >
        Create an Event
      </Link>
    </div>
  );
}

export default MyEvents;
