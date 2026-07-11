import { useCallback, useEffect, useState } from 'react';

interface PersistentStorage {
  getItem(key: string): string | null;
  removeItem(key: string): void;
  setItem(key: string, value: string): void;
}

function useStorage<T>(key: string, defaultValue: T | (() => T), storageObject: PersistentStorage) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = storageObject.getItem(key);
    if (jsonValue !== null) return JSON.parse(jsonValue) as T;

    return typeof defaultValue === 'function' ? (defaultValue as () => T)() : defaultValue;
  });

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key);
    return storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  const removeValue = useCallback(() => {
    setValue(undefined as T);
  }, []);

  return [value, setValue, removeValue] as const;
}

export function useLocalStorage(key: string, defaultValue: string) {
  return useStorage(key, defaultValue, globalThis.localStorage);
}

export function useSessionStorage(key: string, defaultValue: string) {
  return useStorage(key, defaultValue, globalThis.sessionStorage);
}
