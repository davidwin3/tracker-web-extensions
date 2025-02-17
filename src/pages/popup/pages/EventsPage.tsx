import { Controls, EventDetails, EventItemList } from "../components";
import { useKinesisEvents } from "../hooks/useKinesisEvents";

export default function EventsPage() {
  const {
    filteredEvents,
    selectedEvent,
    clearEvents,
    selectEvent,
    filterEvents,
  } = useKinesisEvents();

  return (
    <div className="p-4">
      <Controls
        onClearEvents={clearEvents}
        onFilteredEventsChange={filterEvents}
      />
      <div className="flex gap-4 max-h-[calc(100vh-100px)] overflow-y-auto">
        <EventItemList events={filteredEvents} onItemClick={selectEvent} />
        {selectedEvent && <EventDetails event={selectedEvent} />}
      </div>
    </div>
  );
}
