import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [filterEventDetailKeys, setFilterEventDetailKeys] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    chrome.storage.local.get("filterEventDetailKeys", (result) => {
      setFilterEventDetailKeys(result.filterEventDetailKeys || "");
    });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Settings</h1>
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="filterEventDetailKeys"
            className="block text-sm font-medium text-gray-700"
          >
            Filter event details by keys (comma separated)
          </label>
          <input
            type="text"
            id="filterEventDetailKeys"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            placeholder="Enter event keys"
            value={filterEventDetailKeys}
            onChange={(e) => setFilterEventDetailKeys(e.target.value)}
          />
          <button
            type="button"
            className="w-1/2 items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {
              setIsSaving(true);
              chrome.storage.local.set({ filterEventDetailKeys });
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
