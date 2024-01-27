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
      <h1 className="mb-5 text-lg">My Events</h1>
      <div className="flex flex-wrap gap-1 mb-5">
        {events.length > 0 ? (
          events.map((event) => (
            <div className="border-solid border-2 rounded border-slate-500 p-6 h-40 w-40">
              <Link href={`/event/${event.id}`}>{event.eventName}</Link>
            </div>
          ))
        ) : (
          <div>No Events</div>
        )}
      </div>
      <Link className="btn" href="/event/create">
        Create an Event
      </Link>
    </div>
  );
}

export default MyEvents;
