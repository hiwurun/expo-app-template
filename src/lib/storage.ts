import { createMMKV } from 'react-native-mmkv';

const storage = createMMKV();

export const Storage = {
  set: <T>(key: string, value: T) => {
    storage.set(key, JSON.stringify(value));
  },
  get: <T>(key: string): T | null => {
    const value = storage.getString(key);
    if (value === undefined) return null;
    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  },
  remove: (key: string) => storage.remove(key),
  clear: () => storage.clearAll(),
};
