'use client';

import { Roadmap, Task } from '@/types';
import { useProgressStore } from '@/storage/progressStore';
import { useState } from 'react';
import { CheckSquare, Square, ChevronDown, ChevronRight, BookOpen } from 'lucide-react';
import TaskDetailPanel from '@/components/TaskDetailPanel';
import { clsx } from 'clsx';
import Link from 'next/link';

interface CourseViewProps {
  roadmap: Roadmap;
}

export default function CourseView({ roadmap }: CourseViewProps) {
  const completedTasks = useProgressStore((state) => state.completed);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() => {
    // Expand first section by default
    const state: Record<string, boolean> = {};
    if (roadmap.sections.length > 0) {
      state[roadmap.sections[0].id] = true;
    }
    return state;
  });
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const calculateSectionProgress = (tasks: Task[]) => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter(t => completedTasks.includes(t.id)).length;
    return Math.round((completed / tasks.length) * 100);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] gap-6 animate-in fade-in duration-500">
      <div className={clsx(
        "flex-1 flex flex-col min-w-0 transition-all duration-300",
        selectedTask ? "pr-0" : ""
      )}>
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/courses" className="hover:text-indigo-600 transition-colors">Courses</Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-gray-200">{roadmap.title}</span>
          </div>
          
          <div className="flex items-center gap-4 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              <BookOpen size={24} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{roadmap.title}</h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg mt-2">{roadmap.description}</p>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 pb-12 space-y-4">
          {roadmap.sections.map(section => {
            const isExpanded = expandedSections[section.id];
            const progress = calculateSectionProgress(section.tasks);

            return (
              <div key={section.id} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden dark:border-gray-800 dark:bg-zinc-950">
                <button 
                  onClick={() => toggleSection(section.id)}
                  className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-gray-50 dark:hover:bg-zinc-900"
                >
                  <div className="flex items-center gap-3">
                    {isExpanded ? <ChevronDown size={20} className="text-gray-400" /> : <ChevronRight size={20} className="text-gray-400" />}
                    <h2 className="text-lg font-semibold">{section.title}</h2>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:block text-sm font-medium text-gray-500">
                      {progress}%
                    </div>
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-100 dark:bg-zinc-800 hidden sm:block">
                      <div 
                        className="h-full bg-indigo-600 transition-all duration-500 dark:bg-indigo-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-gray-100 dark:border-gray-800 p-2">
                    <div className="flex flex-col gap-1">
                      {section.tasks.map(task => {
                        const isCompleted = completedTasks.includes(task.id);
                        const isSelected = selectedTask?.id === task.id;

                        return (
                          <button
                            key={task.id}
                            onClick={() => setSelectedTask(task)}
                            className={clsx(
                              "flex items-center gap-3 rounded-lg px-4 py-3 text-left transition-all",
                              isSelected 
                                ? "bg-indigo-50 ring-1 ring-indigo-200 dark:bg-indigo-500/10 dark:ring-indigo-500/30" 
                                : "hover:bg-gray-50 dark:hover:bg-zinc-900",
                              isCompleted ? "opacity-70" : ""
                            )}
                          >
                            <div className={clsx("shrink-0", isCompleted ? "text-emerald-500" : "text-gray-300 dark:text-gray-600")}>
                              {isCompleted ? <CheckSquare size={20} /> : <Square size={20} />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className={clsx(
                                "font-medium truncate",
                                isCompleted ? "text-gray-500 line-through dark:text-gray-400" : "text-gray-900 dark:text-gray-100"
                              )}>
                                {task.title}
                              </h3>
                            </div>
                            {task.difficulty && (
                              <span className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-zinc-800 text-gray-500 rounded-md shrink-0">
                                {task.difficulty}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {selectedTask && (
        <div className="w-96 shrink-0 h-full overflow-hidden rounded-xl border border-gray-200 shadow-xl dark:border-gray-800">
          <TaskDetailPanel 
            task={selectedTask} 
            onClose={() => setSelectedTask(null)} 
          />
        </div>
      )}
    </div>
  );
}
