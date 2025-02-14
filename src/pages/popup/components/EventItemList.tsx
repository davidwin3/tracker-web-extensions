import { useEffect, useState } from "react";
import { KinesisRequestData } from "@shared/types/request";
import EventItem from "./EventItem";

type EventItemListProps = {
  events: KinesisRequestData[];
  onItemClick: (event: KinesisRequestData) => void;
};

export default function EventItemList({
  events,
  onItemClick,
}: EventItemListProps) {
  if (events.length === 0) {
    return null;
  }

  return (
    <div className="w-1/2 border">
      <div className="overflow-y-auto max-h-[460px]">
        {events.map((event) => (
          <EventItem
            key={event.timestamp}
            event={event}
            onClick={onItemClick}
          />
        ))}
      </div>
    </div>
  );
}
