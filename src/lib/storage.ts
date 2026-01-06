import { createMMKV } from 'react-native-mmkv';

const storage = createMMKV();

/**
 * 存储工具类（MMKV 封装）
 */
export const Storage = {
  setRaw: (key: string, value: string) => storage.set(key, value),
  getRaw: (key: string): string | null => storage.getString(key) ?? null,
  remove: (key: string) => storage.remove(key),
  clear: () => storage.clearAll(),
};
