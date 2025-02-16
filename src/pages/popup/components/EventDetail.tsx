import { KinesisRequestData } from "@shared/types/request";
import { useEffect, useState } from "react";
import { Switch } from "@src/components/ui/switch";
export default function EventDetail({ event }: { event: KinesisRequestData }) {
  const [enabledFilterKeysOnly, setEnabledFilterKeysOnly] = useState(false);
  const [filterEventDetailKeys, setFilterEventDetailKeys] = useState("");

  useEffect(() => {
    chrome.storage.local.get("filterEventDetailKeys", (result) => {
      setFilterEventDetailKeys(result.filterEventDetailKeys || "");
    });
  }, []);

  const handleFilterKeysOnly = () => {
    setEnabledFilterKeysOnly(!enabledFilterKeysOnly);
    chrome.storage.local.set({ enabledFilterKeysOnly });
  };

  const { records } = event;
  const itemData = records?.[0] ?? {};
  const { page_name, event_name } = itemData;
  return (
    <div className="w-1/2 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">Event Detail</span>
        <div className="flex items-center gap-2">
          <Switch
            checked={enabledFilterKeysOnly}
            onCheckedChange={handleFilterKeysOnly}
          />
          <span className="text-sm text-gray-500">Filter keys only</span>
        </div>
      </div>
      <div className="w-full border p-4 overflow-y-auto max-h-[425px]">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold mb-4">
            {page_name} - {event_name}
          </h2>
        </div>
        <div className="space-y-4">
          {Object.entries(itemData)
            .filter(([key]) =>
              enabledFilterKeysOnly ? filterEventDetailKeys.includes(key) : true
            )
            .map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-gray-600">{key}</span>
                <span className="text-sm">{JSON.stringify(value)}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
