import { KinesisRequestData } from "@shared/types/request";
import EventItem from "./EventItem";

interface EventItemListProps {
  events: KinesisRequestData[];
  onItemClick: (event: KinesisRequestData) => void;
}

export default function EventItemList({
  events,
  onItemClick,
}: EventItemListProps) {
  if (events.length === 0) {
    return null;
  }

  const sortedEvents = [...events].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="w-1/2 border">
      <div className="overflow-y-auto max-h-[460px]">
        {sortedEvents.map((event) => (
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
