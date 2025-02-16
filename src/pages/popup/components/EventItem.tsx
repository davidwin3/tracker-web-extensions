import { KinesisRequestData } from "@shared/types/request";

interface EventItemProps {
  event: KinesisRequestData;
  onClick: (event: KinesisRequestData) => void;
}

export default function EventItem({ event, onClick }: EventItemProps) {
  const { records } = event;
  const { page_name, event_name } = records?.[0] ?? {};
  return (
    <div
      className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b"
      onClick={() => onClick(event)}
    >
      <div className="w-24 text-sm text-gray-500">
        {new Date(event.timestamp).toLocaleTimeString()}
      </div>
      <div className="flex-1">
        <span className="text-blue-600 font-semibold text-sm">
          {page_name} - {event_name}
        </span>
      </div>
    </div>
  );
}
