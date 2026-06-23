'use client';

import { useProgressStore } from '@/storage/progressStore';
import { useAllRoadmaps } from '@/utils/roadmapLoader';
import { useMemo } from 'react';
import { CheckCircle2, Circle, BookOpen, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const completedTasks = useProgressStore((state) => state.completed);
  const roadmaps = useAllRoadmaps();

  const { totalTasks, completedCount } = useMemo(() => {
    let total = 0;
    roadmaps.forEach(roadmap => {
      roadmap.sections.forEach(section => {
        total += section.tasks.length;
      });
    });
    return {
      totalTasks: total,
      completedCount: completedTasks.length,
    };
  }, [roadmaps, completedTasks]);

  const completionPercentage = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;
  const remainingCount = totalTasks - completedCount;

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">Welcome back! Here's an overview of your learning progress.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Completion Percentage */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-zinc-950">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Overall Progress</h3>
            <Trophy className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold">{completionPercentage}%</span>
          </div>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-zinc-800">
            <div 
              className="h-full bg-indigo-600 transition-all duration-1000 ease-out dark:bg-indigo-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-zinc-950">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed</h3>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold">{completedCount}</span>
            <span className="text-sm text-gray-500">tasks</span>
          </div>
        </div>

        {/* Remaining Tasks */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-zinc-950">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Remaining</h3>
            <Circle className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold">{remainingCount}</span>
            <span className="text-sm text-gray-500">tasks</span>
          </div>
        </div>

        {/* Active Courses */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-zinc-950">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Courses</h3>
            <BookOpen className="h-4 w-4 text-blue-500" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold">{roadmaps.length}</span>
            <span className="text-sm text-gray-500">enrolled</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-zinc-950">
          <h2 className="text-lg font-semibold mb-4">Your Courses</h2>
          <div className="flex flex-col gap-4">
            {roadmaps.map(roadmap => (
              <Link 
                key={roadmap.id} 
                href={`/courses/${roadmap.id}`}
                className="group flex items-center justify-between rounded-lg border border-gray-100 p-4 transition-colors hover:border-indigo-100 hover:bg-indigo-50/50 dark:border-gray-800 dark:hover:border-indigo-900/50 dark:hover:bg-indigo-900/10"
              >
                <div>
                  <h3 className="font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{roadmap.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-1">{roadmap.description}</p>
                </div>
                <div className="text-indigo-600 dark:text-indigo-400">
                  <BookOpen size={20} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-zinc-950">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          {completedTasks.length > 0 ? (
            <div className="flex flex-col gap-4">
              <p className="text-sm text-gray-500">You have completed {completedTasks.length} tasks!</p>
              {/* Future feature: show actual recently completed tasks sorted by date if we add timestamp */}
            </div>
          ) : (
            <div className="flex h-32 flex-col items-center justify-center text-center">
              <p className="text-gray-500">No tasks completed yet.</p>
              <Link href="/courses" className="mt-2 text-sm text-indigo-600 hover:underline">
                Start learning
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
