import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProgressData, Roadmap } from '@/types';

interface ProgressStore extends ProgressData {
  toggleTask: (taskId: string) => void;
  addNote: (taskId: string, note: string) => void;
  addEvidence: (taskId: string, url: string) => void;
  addCustomRoadmap: (roadmap: Roadmap) => void;
  removeCustomRoadmap: (id: string) => void;
  importData: (data: Partial<ProgressData>) => void;
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      completed: [],
      notes: {},
      evidence: {},
      customRoadmaps: [],
      toggleTask: (taskId: string) => {
        const completed = get().completed;
        if (completed.includes(taskId)) {
          set({ completed: completed.filter((id) => id !== taskId) });
        } else {
          set({ completed: [...completed, taskId] });
        }
      },
      addNote: (taskId: string, note: string) => {
        set({ notes: { ...get().notes, [taskId]: note } });
      },
      addEvidence: (taskId: string, url: string) => {
        set({ evidence: { ...get().evidence, [taskId]: url } });
      },
      addCustomRoadmap: (roadmap: Roadmap) => {
        const current = get().customRoadmaps;
        // Check if exists, replace if so
        const existingIndex = current.findIndex(r => r.id === roadmap.id);
        if (existingIndex >= 0) {
          const updated = [...current];
          updated[existingIndex] = roadmap;
          set({ customRoadmaps: updated });
        } else {
          set({ customRoadmaps: [...current, roadmap] });
        }
      },
      removeCustomRoadmap: (id: string) => {
        set({ customRoadmaps: get().customRoadmaps.filter(r => r.id !== id) });
      },
      importData: (data: Partial<ProgressData>) => {
        set({
          completed: data.completed || get().completed,
          notes: data.notes || get().notes,
          evidence: data.evidence || get().evidence,
          customRoadmaps: data.customRoadmaps || get().customRoadmaps,
        });
      }
    }),
    {
      name: 'learning-progress-storage', // unique name for local storage
    }
  )
);
