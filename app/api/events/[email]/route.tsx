import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  const events = await prisma.event.findMany({
    where: { createdByEmail: params.email },
  });
  if (!events)
    return NextResponse.json({ error: "Events not found" }, { status: 404 });

  return NextResponse.json(events);
}
