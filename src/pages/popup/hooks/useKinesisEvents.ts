import { useState, useEffect, useCallback } from "react";
import { KinesisRequestData } from "@shared/types/request";
import { KINESIS_DATA_KEY } from "@src/shared/constants/storage";

export function useKinesisEvents() {
  const [events, setEvents] = useState<KinesisRequestData[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<KinesisRequestData[]>(
    []
  );
  const [selectedEvent, setSelectedEvent] = useState<KinesisRequestData | null>(
    null
  );
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const result = await chrome.storage.local.get(KINESIS_DATA_KEY);
      const loadedEvents = result[KINESIS_DATA_KEY] || [];
      setEvents(loadedEvents);
      setFilteredEvents(loadedEvents);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load events"));
    }
  };

  const clearEvents = useCallback(async () => {
    try {
      await chrome.storage.local.remove(KINESIS_DATA_KEY);
      setEvents([]);
      setFilteredEvents([]);
      setSelectedEvent(null);
      await chrome.action.setBadgeText({ text: "" });
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to clear events")
      );
    }
  }, []);

  const selectEvent = useCallback((event: KinesisRequestData) => {
    setSelectedEvent(event);
  }, []);

  const filterEvents = useCallback(
    (streamName: string) => {
      setFilteredEvents(
        streamName === "ALL"
          ? events
          : events.filter((event) => event.streamName === streamName)
      );
    },
    [events]
  );

  return {
    events,
    filteredEvents,
    selectedEvent,
    error,
    clearEvents,
    selectEvent,
    filterEvents,
    loadEvents,
  };
}
