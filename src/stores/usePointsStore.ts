import { Storage } from '@/lib/storage';
import type { Points } from '@/types';
import { create } from 'zustand';
import {
  createJSONStorage,
  persist,
  type StateStorage,
} from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type PointsState = {
  points: Points | null;
  hasHydrated: boolean;
  setPoints: (points: Points) => void;
  clearPoints: () => void;
  setHydrated: (value: boolean) => void;
};

const mmkvStorage: StateStorage = {
  getItem: (name) => Storage.get(name),
  setItem: (name, value) => Storage.set(name, value),
  removeItem: (name) => Storage.remove(name),
};

const usePointsStore = create<PointsState>()(
  persist(
    immer((set) => ({
      points: null,
      hasHydrated: false,
      setPoints: (points) =>
        set((state) => {
          state.points = points;
        }),
      clearPoints: () =>
        set((state) => {
          state.points = null;
        }),
      setHydrated: (value: boolean) =>
        set((state) => {
          state.hasHydrated = value;
        }),
    })),
    {
      name: 'points-store',
      storage: createJSONStorage(() => mmkvStorage),
      partialize: (state) => ({
        points: state.points,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);

// 导出便捷的 selectors
export const selectPoints = (state: PointsState) => state.points;
export const selectPointsBalance = (state: PointsState) =>
  state.points?.points_balance ?? 0;

export default usePointsStore;
