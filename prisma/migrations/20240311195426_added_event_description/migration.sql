-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "createdByEmail" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "eventDescription" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventDates" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventDates_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EventDates" ADD CONSTRAINT "EventDates_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
