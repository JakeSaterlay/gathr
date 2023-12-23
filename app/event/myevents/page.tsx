import Link from "next/link";

const MyEvents = () => {
  return (
    <div>
      <h1 className="mb-5">My Events</h1>
      <Link
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        href="/event/create"
      >
        Create an Event
      </Link>
    </div>
  );
};

export default MyEvents;
