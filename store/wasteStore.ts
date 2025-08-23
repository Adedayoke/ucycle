import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type WasteItem = {
  id: string;
  imageUri?: string;
  name: string;
  quantity: number;
  recyclable: boolean;
  createdAt: number; // epoch ms
  notes?: string;
};

export type ActivityItem = {
  id: string;
  type: 'scan' | 'pickup' | 'info';
  message: string;
  createdAt: number;
};

type WasteState = {
  wastes: WasteItem[];
  activities: ActivityItem[];
  addWaste: (w: Omit<WasteItem, 'id' | 'createdAt'>) => void;
  addActivity: (a: Omit<ActivityItem, 'id' | 'createdAt'>) => void;
  addFromScan: (payload: { imageUri?: string; name: string; quantity: number; recyclable: boolean }) => void;
  updateWaste: (id: string, patch: Partial<Omit<WasteItem, 'id' | 'createdAt'>>) => void;
  removeWaste: (id: string) => void;
};

export const useWasteStore = create<WasteState>()(
  persist(
    (set) => ({
      wastes: [],
      activities: [],
      addWaste: (w) => set((state) => ({
        wastes: [
          { id: Math.random().toString(36).slice(2), createdAt: Date.now(), ...w },
          ...state.wastes,
        ],
      })),
      addActivity: (a) => set((state) => ({
        activities: [
          { id: Math.random().toString(36).slice(2), createdAt: Date.now(), ...a },
          ...state.activities,
        ],
      })),
      addFromScan: ({ imageUri, name, quantity, recyclable }) => set((state) => {
        const id = Math.random().toString(36).slice(2);
        const createdAt = Date.now();
        const waste: WasteItem = { id, imageUri, name, quantity, recyclable, createdAt };
        const activity: ActivityItem = {
          id: Math.random().toString(36).slice(2),
          type: 'scan',
          message: `Scanned ${name} (x${quantity}) - ${recyclable ? 'Recyclable' : 'Not recyclable'}`,
          createdAt,
        };
        return {
          wastes: [waste, ...state.wastes],
          activities: [activity, ...state.activities],
        };
      }),
      updateWaste: (id, patch) => set((state) => ({
        wastes: state.wastes.map(w => w.id === id ? { ...w, ...patch } : w)
      })),
      removeWaste: (id) => set((state) => ({
        wastes: state.wastes.filter(w => w.id !== id)
      })),
    }),
    {
      name: 'waste-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ wastes: state.wastes, activities: state.activities }),
      version: 1,
    }
  )
);
