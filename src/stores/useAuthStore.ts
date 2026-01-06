import { Storage } from '@/lib/storage';
import type { User } from '@/types';
import { create } from 'zustand';
import {
  createJSONStorage,
  persist,
  type StateStorage,
} from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type AuthState = {
  user: User | null;
  hasHydrated: boolean;
  setAuth: (payload: { user: User; token: string }) => void;
  logout: () => void;
  setHydrated: (value: boolean) => void;
};

const mmkvStorage: StateStorage = {
  getItem: (name) => Storage.get(name) ?? null,
  setItem: (name, value) => {
    Storage.set(name, value);
  },
  removeItem: (name) => {
    Storage.remove(name);
  },
};

const useAuthStore = create<AuthState>()(
  persist(
    immer((set) => ({
      user: null,
      hasHydrated: false,
      setAuth: ({ user, token }) =>
        set((state) => {
          state.user = user;
          // 存储 token 到 Storage
          Storage.set('auth-token', token);
        }),
      logout: () =>
        set((state) => {
          state.user = null;
          Storage.remove('auth-token');
        }),
      setHydrated: (value: boolean) =>
        set((state) => {
          state.hasHydrated = value;
        }),
    })),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => mmkvStorage),
      partialize: (state) => ({
        user: state.user,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);

// 导出便捷的 selectors
export const selectIsLoggedIn = (state: AuthState) => Boolean(state.user);
export const selectUser = (state: AuthState) => state.user;

export default useAuthStore;
