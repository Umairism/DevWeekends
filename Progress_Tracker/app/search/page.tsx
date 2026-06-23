'use client';

import { useState, useMemo } from 'react';
import { useAllRoadmaps } from '@/utils/roadmapLoader';
import { useProgressStore } from '@/storage/progressStore';
import { Search as SearchIcon, Filter, CheckCircle2, Circle, BookOpen, Tag } from 'lucide-react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { Task } from '@/types';

type FilterType = 'All' | 'Completed' | 'In Progress' | 'Pending' | 'Easy' | 'Medium' | 'Hard';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const roadmaps = useAllRoadmaps();
  const completedTasks = useProgressStore((state) => state.completed);

  const filters: FilterType[] = ['All', 'Completed', 'Pending', 'Easy', 'Medium', 'Hard'];

  const searchResults = useMemo(() => {
    if (!query && activeFilter === 'All') return [];

    const lowerQuery = query.toLowerCase();
    const results: Array<{ roadmapId: string; roadmapTitle: string; sectionId: string; sectionTitle: string; task: Task }> = [];

    roadmaps.forEach(roadmap => {
      roadmap.sections.forEach(section => {
        section.tasks.forEach(task => {
          const matchesQuery = 
            task.title.toLowerCase().includes(lowerQuery) || 
            section.title.toLowerCase().includes(lowerQuery) ||
            roadmap.title.toLowerCase().includes(lowerQuery);

          if (!matchesQuery && query) return;

          const isCompleted = completedTasks.includes(task.id);
          
          let matchesFilter = true;
          switch (activeFilter) {
            case 'Completed': matchesFilter = isCompleted; break;
            case 'Pending': matchesFilter = !isCompleted; break;
            case 'Easy': matchesFilter = task.difficulty === 'Easy'; break;
            case 'Medium': matchesFilter = task.difficulty === 'Medium'; break;
            case 'Hard': matchesFilter = task.difficulty === 'Hard'; break;
            default: break;
          }

          if (matchesFilter) {
            results.push({
              roadmapId: roadmap.id,
              roadmapTitle: roadmap.title,
              sectionId: section.id,
              sectionTitle: section.title,
              task
            });
          }
        });
      });
    });

    return results;
  }, [query, activeFilter, roadmaps, completedTasks]);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] gap-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Search</h1>
        <p className="text-gray-500 dark:text-gray-400">Find specific tasks across all your courses.</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by task title, section, or course..."
            className="w-full rounded-2xl border-0 bg-white dark:bg-zinc-950 px-12 py-4 text-lg shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:ring-gray-800 dark:focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Filter size={16} className="text-gray-400 shrink-0 mr-2" />
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={clsx(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors shrink-0 whitespace-nowrap",
                activeFilter === filter
                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300"
                  : "bg-white text-gray-600 hover:bg-gray-50 dark:bg-zinc-950 dark:text-gray-400 dark:hover:bg-zinc-900 border border-gray-200 dark:border-gray-800"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-8">
        {(query || activeFilter !== 'All') ? (
          searchResults.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((result) => {
                const isCompleted = completedTasks.includes(result.task.id);
                return (
                  <Link 
                    key={`${result.roadmapId}-${result.task.id}`}
                    href={`/courses/${result.roadmapId}`}
                    className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-indigo-200 dark:border-gray-800 dark:bg-zinc-950 dark:hover:border-indigo-900/50 group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                        <BookOpen size={14} />
                        <span>{result.roadmapTitle}</span>
                      </div>
                      <div className={clsx(
                        "shrink-0",
                        isCompleted ? "text-emerald-500" : "text-gray-300 dark:text-gray-600"
                      )}>
                        {isCompleted ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                      </div>
                    </div>
                    
                    <h3 className={clsx(
                      "font-semibold text-lg mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors",
                      isCompleted ? "text-gray-500 dark:text-gray-400" : "text-gray-900 dark:text-gray-100"
                    )}>
                      {result.task.title}
                    </h3>
                    
                    <p className="text-sm text-gray-500 mb-4">{result.sectionTitle}</p>
                    
                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                      {result.task.difficulty ? (
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 dark:bg-zinc-900 px-2 py-1 rounded-md">
                          <Tag size={12} />
                          {result.task.difficulty}
                        </div>
                      ) : <div />}
                      
                      <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        View in Course →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <SearchIcon size={48} className="text-gray-200 dark:text-gray-800 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">No results found</h3>
              <p className="text-gray-500 max-w-sm mt-2">
                We couldn't find any tasks matching "{query}" with the selected filters.
              </p>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="flex gap-4 mb-6">
              <div className="p-4 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500">
                <SearchIcon size={32} />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Start Searching</h3>
            <p className="text-gray-500 max-w-sm mt-2">
              Type above to search across all courses, sections, and tasks in your roadmap.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
