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
  return (
    <div className="w-1/2 border rounded-md">
      <div className="overflow-y-auto max-h-[600px]">
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
