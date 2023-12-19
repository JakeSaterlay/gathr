import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      {session && (
        <div>
          {session.user?.name} <Link href="/api/auth/signout">Sign Out</Link>
        </div>
      )}
      {!session && <Link href="/api/auth/signin">Login</Link>}
    </>
  );
}
