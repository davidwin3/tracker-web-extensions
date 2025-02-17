interface EventDetailItemProps {
  keyName: string;
  value: unknown;
}

export function EventDetailItem({ keyName, value }: EventDetailItemProps) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">{keyName}</span>
      <span className="text-sm">{JSON.stringify(value)}</span>
    </div>
  );
}
