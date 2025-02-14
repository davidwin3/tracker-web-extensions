import { Controls, EventDetail, EventItemList, Navigation } from "./components";
import { useKinesisEvents } from "./hooks/useKinesisEvents";

export default function Popup() {
  const {
    filteredEvents,
    selectedEvent,
    clearEvents,
    selectEvent,
    filterEvents,
  } = useKinesisEvents();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="p-4">
        <Controls
          onClearEvents={clearEvents}
          onFilteredEventsChange={filterEvents}
        />
        <div className="flex gap-4">
          <EventItemList events={filteredEvents} onItemClick={selectEvent} />
          {selectedEvent && <EventDetail event={selectedEvent} />}
        </div>
      </div>
    </div>
  );
}
