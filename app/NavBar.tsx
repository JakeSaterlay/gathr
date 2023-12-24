import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";

async function NavBar() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex bg-slate-200 p-5 justify-between">
      <Link href="/">Home</Link>
      {session && (
        <div className="flex space-x-3">
          {/* TOOO: Find a better way to get first name only */}
          <div>Welcome, {session.user?.name?.split(" ")[0]}</div>
          <Link href="/event/myevents">My Events</Link>
          <div>
            <Link href="/api/auth/signout">Sign Out</Link>
          </div>
        </div>
      )}
      {!session && <Link href="/api/auth/signin">Login</Link>}
    </div>
  );
}

export default NavBar;
