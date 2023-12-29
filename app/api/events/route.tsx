import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
export async function POST(request: NextRequest) {
  const body = await request.json();
  const newEvent = await prisma.event.create({
    data: { eventName: body.eventName },
  });

  for (const date of body.eventDates) {
    await prisma.eventDates.create({
      data: { eventId: newEvent.id, eventDate: new Date(date) },
    });
  }

  return NextResponse.json(newEvent);
}
