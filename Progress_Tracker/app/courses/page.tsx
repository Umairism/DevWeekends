'use client';

import { useAllRoadmaps } from '@/utils/roadmapLoader';
import { useProgressStore } from '@/storage/progressStore';
import Link from 'next/link';
import { BookOpen, Trash2 } from 'lucide-react';

export default function CoursesPage() {
  const roadmaps = useAllRoadmaps();
  const customRoadmaps = useProgressStore(state => state.customRoadmaps);
  const removeCustomRoadmap = useProgressStore(state => state.removeCustomRoadmap);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault(); // Prevent link navigation
    if (confirm('Are you sure you want to delete this custom course? This cannot be undone.')) {
      removeCustomRoadmap(id);
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Courses & Roadmaps</h1>
        <p className="text-gray-500 dark:text-gray-400">Select a course to view your progress and continue learning.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {roadmaps.map(roadmap => {
          const totalTasks = roadmap.sections.reduce((acc, section) => acc + section.tasks.length, 0);
          const isCustom = customRoadmaps.some(r => r.id === roadmap.id);

          return (
            <Link 
              key={roadmap.id} 
              href={`/courses/${roadmap.id}`}
              className="group flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-indigo-200 dark:border-gray-800 dark:bg-zinc-950 dark:hover:border-indigo-900/50 relative"
            >
              {isCustom && (
                <button
                  onClick={(e) => handleDelete(e, roadmap.id)}
                  className="absolute top-4 right-4 p-2 rounded-md text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                  title="Delete Custom Course"
                >
                  <Trash2 size={18} />
                </button>
              )}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                  <BookOpen size={20} />
                </div>
                <h2 className="text-lg font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors pr-8 truncate">{roadmap.title}</h2>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex-1 line-clamp-2 mb-6">
                {roadmap.description}
              </p>
              <div className="flex items-center justify-between text-sm pt-4 border-t border-gray-100 dark:border-gray-800">
                <span className="text-gray-500">{roadmap.sections.length} sections</span>
                <span className="text-gray-500">{totalTasks} tasks</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
