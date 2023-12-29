import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
export async function POST(request: NextRequest) {
  const body = await request.json();
  const session = await getServerSession(authOptions);
  const newEvent = await prisma.event.create({
    data: {
      eventName: body.eventName,
      createdByEmail: session?.user?.email || "",
    },
  });

  for (const date of body.eventDates) {
    await prisma.eventDates.create({
      data: { eventId: newEvent.id, eventDate: new Date(date) },
    });
  }

  return NextResponse.json(newEvent);
}
