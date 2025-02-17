import { useEffect, useState } from "react";
import { FILTER_EVENT_DETAIL_KEYS } from "@src/shared/constants/storage";
import { useStorageState } from "@src/hooks/useStorageState";

export default function SettingsPage() {
  const [filterKeys, setFilterKeys] = useStorageState(
    FILTER_EVENT_DETAIL_KEYS,
    ""
  );
  const [value, setValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setValue(filterKeys);
  }, [filterKeys]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Settings</h1>
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="filterKeys"
            className="block text-sm font-medium text-gray-700"
          >
            Filter event details by keys (comma separated)
          </label>
          <input
            type="text"
            id="filterKeys"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            placeholder="Enter event keys"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            type="button"
            className="w-1/2 items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {
              setIsSaving(true);
              setFilterKeys(value);
              setIsSaving(false);
            }}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
