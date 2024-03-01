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
      <h1 className="mb-5 text-lg font-bold">My Events</h1>
      <div className="mb-5">
        {events.length > 0 ? (
          events.map((event) => (
            <Link href={`/event/${event.id}`} key={event.id}>
              <div className="bg-gray-100 drop-shadow-lg h-40 mb-5 p-6">
                <p>{event.eventName}</p>
              </div>
            </Link>
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
