import { useEffect, useState } from "react";

export function useStorageState<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    chrome.storage.local.get(key, (result) => {
      setValue(result[key] ?? defaultValue);
    });
  }, [key, defaultValue]);

  const updateValue = (newValue: T) => {
    setValue(newValue);
    chrome.storage.local.set({ [key]: newValue });
  };

  return [value, updateValue] as const;
}
