import { KINESIS_DATA_KEY } from "@src/shared/constants/storage";
import { KinesisRequestData } from "@shared/types/request";
import { useEffect, useState } from "react";

interface ControlsProps {
  onClearEvents: () => void;
  onFilteredEventsChange: (streamName: string) => void;
}

export default function Controls({
  onClearEvents,
  onFilteredEventsChange,
}: ControlsProps) {
  const [uniqueGroupedEvents, setUniqueGroupedEvents] = useState<string[]>([]);

  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilteredEventsChange(e.target.value);
  };

  useEffect(() => {
    chrome.storage.local.get(
      KINESIS_DATA_KEY,
      (result: { [KINESIS_DATA_KEY]: KinesisRequestData[] }) => {
        if (!result[KINESIS_DATA_KEY]) {
          return;
        }

        const uniqueStreamNames = [
          ...new Set(result[KINESIS_DATA_KEY].map((event) => event.streamName)),
        ];
        setUniqueGroupedEvents(uniqueStreamNames);
      }
    );
  }, []);

  return (
    <div className="flex justify-between mb-4">
      <div className="flex space-x-2 w-[460px]">
        <select
          className="border px-3 py-2 w-full"
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
          className="border w-[150px] px-4 py-2 hover:bg-gray-50"
          onClick={onClearEvents}
        >
          Clear Events
        </button>
      </div>
    </div>
  );
}
