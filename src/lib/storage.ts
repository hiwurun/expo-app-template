import { createMMKV } from 'react-native-mmkv';

const storage = createMMKV();

/**
 * 存储工具类
 * 使用 AsyncStorage 提供持久化存储
 */
export const Storage = {
  /**
   * 设置存储
   */
  set: (key: string, value: any) => storage.set(key, JSON.stringify(value)),

  /**
   * 获取存储
   */
  get: <T = any>(key: string): T | null => {
    const value = storage.getString(key);
    return value != null ? JSON.parse(value) : null;
  },

  /**
   * 删除存储
   */
  remove: (key: string) => storage.remove(key),

  /**
   * 清空所有存储
   */
  clear: () => storage.clearAll(),
};
