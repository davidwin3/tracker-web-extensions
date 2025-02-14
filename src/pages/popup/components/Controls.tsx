import { KINESIS_DATA_KEY } from "@shared/constants/config";
import { KinesisRequestData } from "@shared/types/request";
import { useEffect, useState } from "react";

export default function Controls({
  onClearEvents,
  onFilteredEventsChange,
}: {
  onClearEvents: () => void;
  onFilteredEventsChange: (streamName: string) => void;
}) {
  const [uniqueGroupedEvents, setUniqueGroupedEvents] = useState<string[]>([]);

  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilteredEventsChange(e.target.value);
  };

  useEffect(() => {
    chrome.storage.local.get(
      KINESIS_DATA_KEY,
      (result: { [KINESIS_DATA_KEY]: KinesisRequestData[] }) => {
        const uniqueStreamNames = [
          ...new Set(result[KINESIS_DATA_KEY].map((event) => event.streamName)),
        ];
        setUniqueGroupedEvents(uniqueStreamNames);
      }
    );
  }, []);

  return (
    <div className="flex justify-between mb-4">
      <div className="flex space-x-2 w-2/3">
        <select
          className="border rounded-md px-3 py-2 w-full"
          onChange={handleProjectChange}
        >
          <option value="ALL">All Streams</option>
          {uniqueGroupedEvents.map((streamName) => (
            <option key={streamName} value={streamName}>
              {streamName}
            </option>
          ))}
        </select>
        <button
          className="border w-[200px] rounded-md px-4 py-2 hover:bg-gray-50"
          onClick={onClearEvents}
        >
          Clear Events
        </button>
      </div>
    </div>
  );
}
