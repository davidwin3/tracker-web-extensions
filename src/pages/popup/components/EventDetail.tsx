import { KinesisRequestData } from "@shared/types/request";

export default function EventDetail({ event }: { event: KinesisRequestData }) {
  const { records } = event;
  const itemData = records?.[0] ?? {};
  return (
    <div className="w-1/2 border p-4 overflow-y-auto max-h-[460px]">
      <h2 className="text-xl font-semibold mb-4">$identify</h2>
      <div className="space-y-4">
        {Object.entries(itemData).map(([key, value]) => (
          <div key={key} className="flex justify-between">
            <span className="text-gray-600">{key}</span>
            <span className="text-sm">{JSON.stringify(value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
