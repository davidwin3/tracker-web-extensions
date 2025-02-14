import { useState, useEffect } from "react";
import { KinesisRequestData } from "@shared/types/request";
import { KINESIS_DATA_KEY } from "@shared/constants/config";

export function useKinesisEvents() {
  const [events, setEvents] = useState<KinesisRequestData[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<KinesisRequestData[]>(
    []
  );
  const [selectedEvent, setSelectedEvent] = useState<KinesisRequestData | null>(
    null
  );

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    chrome.storage.local.get(
      KINESIS_DATA_KEY,
      (result: { [KINESIS_DATA_KEY]: KinesisRequestData[] }) => {
        setEvents(result[KINESIS_DATA_KEY] || []);
        setFilteredEvents(result[KINESIS_DATA_KEY] || []);
      }
    );
  };

  const clearEvents = () => {
    chrome.storage.local.remove(KINESIS_DATA_KEY, () => {
      setEvents([]);
      setFilteredEvents([]);
      setSelectedEvent(null);
    });
  };

  const selectEvent = (event: KinesisRequestData) => {
    setSelectedEvent(event);
  };

  const filterEvents = (streamName: string) => {
    if (streamName === "ALL") {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(
        events.filter((event) => event.streamName === streamName)
      );
    }
  };

  return {
    events,
    filteredEvents,
    selectedEvent,
    clearEvents,
    selectEvent,
    filterEvents,
  };
}
