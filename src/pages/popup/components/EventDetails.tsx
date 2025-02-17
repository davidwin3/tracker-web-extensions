import { KinesisRequestData } from "@shared/types/request";
import { Switch } from "@src/components/ui/switch";
import {
  ENABLED_FILTER_KEYS_ONLY,
  FILTER_EVENT_DETAIL_KEYS,
} from "@src/shared/constants/storage";
import { useStorageState } from "@src/hooks/useStorageState";
import { EventDetailItem } from "./EventDetailItem";

interface EventDetailsProps {
  event: KinesisRequestData;
}

export default function EventDetails({ event }: EventDetailsProps) {
  const [enabledKeysOnly, setEnabledKeysOnly] = useStorageState(
    ENABLED_FILTER_KEYS_ONLY,
    false
  );
  const [filterKeys] = useStorageState(FILTER_EVENT_DETAIL_KEYS, "");

  const { records } = event;
  const itemData = records?.[0] ?? {};
  const { page_name, event_name } = itemData;

  return (
    <div className="w-1/2 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">Event Detail</span>
        <div className="flex items-center gap-2">
          <Switch
            checked={enabledKeysOnly}
            onCheckedChange={setEnabledKeysOnly}
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
              enabledKeysOnly ? filterKeys.includes(key) : true
            )
            .map(([key, value]) => (
              <EventDetailItem key={key} keyName={key} value={value} />
            ))}
        </div>
      </div>
    </div>
  );
}
