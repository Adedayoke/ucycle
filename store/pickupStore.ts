import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type PickupItem = {
  id: string;
  address: string;
  datetimeISO: string;
  phone?: string;
  notes?: string;
  wasteIds?: string[];
  status: 'scheduled' | 'completed' | 'canceled';
  createdAt: number;
};

type PickupState = {
  pickups: PickupItem[];
  addPickup: (p: Omit<PickupItem, 'id' | 'createdAt' | 'status'> & { status?: PickupItem['status'] }) => string;
  updatePickup: (id: string, patch: Partial<PickupItem>) => void;
  removePickup: (id: string) => void;
};

export const usePickupStore = create<PickupState>()(
  persist(
    (set) => ({
      pickups: [],
      addPickup: (p) => {
        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        const item: PickupItem = {
          id,
          address: p.address,
          datetimeISO: p.datetimeISO,
          phone: p.phone,
          notes: p.notes,
          wasteIds: p.wasteIds ?? [],
          status: p.status ?? 'scheduled',
          createdAt: Date.now(),
        };
        set((s) => ({ pickups: [item, ...s.pickups] }));
        return id;
      },
      updatePickup: (id, patch) => set((s) => ({
        pickups: s.pickups.map((x) => (x.id === id ? { ...x, ...patch } : x)),
      })),
      removePickup: (id) => set((s) => ({ pickups: s.pickups.filter((x) => x.id !== id) })),
    }),
    {
      name: 'pickup-store',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
    }
  )
);
