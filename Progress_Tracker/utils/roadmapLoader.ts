import { Roadmap } from '@/types';
import pythonRoadmap from '@/roadmaps/python.json';
import { useProgressStore } from '@/storage/progressStore';

const defaultRoadmaps: Record<string, Roadmap> = {
  python: pythonRoadmap as Roadmap,
};

export const useRoadmap = (id: string): Roadmap | undefined => {
  const customRoadmaps = useProgressStore(state => state.customRoadmaps);
  const custom = customRoadmaps.find(r => r.id === id);
  if (custom) return custom;
  
  return defaultRoadmaps[id];
};

export const useAllRoadmaps = (): Roadmap[] => {
  const customRoadmaps = useProgressStore(state => state.customRoadmaps) || [];
  return [...Object.values(defaultRoadmaps), ...customRoadmaps];
};
