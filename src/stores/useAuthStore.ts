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
  token: string | null;
  hasHydrated: boolean;
  setAuth: (payload: { user: User; token: string }) => void;
  logout: () => void;
  setHydrated: (value: boolean) => void;
};

const mmkvStorage: StateStorage = {
  getItem: (name) => Storage.getRaw(name),
  setItem: (name, value) => {
    Storage.setRaw(name, value);
  },
  removeItem: (name) => {
    Storage.remove(name);
  },
};

const useAuthStore = create<AuthState>()(
  persist(
    immer((set) => ({
      user: null,
      token: null,
      hasHydrated: false,
      setAuth: ({ user, token }) =>
        set((state) => {
          state.user = user;
          state.token = token;
        }),
      logout: () =>
        set((state) => {
          state.user = null;
          state.token = null;
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
        token: state.token,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);

// 导出便捷的 selectors
export const selectIsLoggedIn = (state: AuthState) =>
  Boolean(state.user && state.token);
export const selectUser = (state: AuthState) => state.user;

export default useAuthStore;
