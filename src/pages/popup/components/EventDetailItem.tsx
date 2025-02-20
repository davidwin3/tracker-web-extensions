interface EventDetailItemProps {
  keyName: string;
  value: object | string | number;
}

export function EventDetailItem({ keyName, value }: EventDetailItemProps) {
  const formatObject = (value: object): string => {
    return Object.entries(value)
      .map(([key, val]) => `${key}: ${val}`)
      .join(",\n");
  };

  const formattedValue =
    typeof value === "object" && value !== null
      ? `\n${formatObject(value)}`
      : value;

  return (
    <div className="flex justify-between">
      <span className="text-gray-600 font-bold">{keyName}: </span>
      <span className="text-sm whitespace-pre">{formattedValue}</span>
    </div>
  );
}
