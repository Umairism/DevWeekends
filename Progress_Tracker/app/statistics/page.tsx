'use client';

import { useProgressStore } from '@/storage/progressStore';
import { useAllRoadmaps } from '@/utils/roadmapLoader';
import { useMemo } from 'react';
import { BarChart3, TrendingUp, Trophy, BookOpen, Target, CheckCircle2 } from 'lucide-react';
import { Roadmap, Section, Task } from '@/types';

export default function StatisticsPage() {
  const completedTasks = useProgressStore((state) => state.completed);
  const roadmaps = useAllRoadmaps();

  const stats = useMemo(() => {
    let totalTasksCount = 0;
    const completedCount = completedTasks.length;
    let maxCompletedInCourse = 0;
    let mostProductiveCourseTitle = 'None';
    
    let hardestSectionName = 'None';
    let hardestSectionRatio = 0; // lowest completion ratio

    roadmaps.forEach(roadmap => {
      let courseTotalTasks = 0;
      let courseCompletedTasks = 0;

      roadmap.sections.forEach(section => {
        let sectionTotal = section.tasks.length;
        let sectionCompleted = 0;

        section.tasks.forEach(task => {
          totalTasksCount++;
          courseTotalTasks++;
          if (completedTasks.includes(task.id)) {
            sectionCompleted++;
            courseCompletedTasks++;
          }
        });

        // Hardest section is the one with the lowest completion ratio > 0 or just the one with most incomplete tasks
        if (sectionTotal > 0 && sectionCompleted < sectionTotal) {
          const incompleteRatio = (sectionTotal - sectionCompleted) / sectionTotal;
          if (incompleteRatio > hardestSectionRatio) {
            hardestSectionRatio = incompleteRatio;
            hardestSectionName = `${roadmap.title} - ${section.title}`;
          }
        }
      });

      if (courseCompletedTasks > maxCompletedInCourse) {
        maxCompletedInCourse = courseCompletedTasks;
        mostProductiveCourseTitle = roadmap.title;
      }
    });

    const completionPercentage = totalTasksCount > 0 ? Math.round((completedCount / totalTasksCount) * 100) : 0;
    const avgCompletion = roadmaps.length > 0 ? Math.round((completedCount / roadmaps.length)) : 0;

    return {
      totalCourses: roadmaps.length,
      totalTasksCount,
      completedCount,
      completionPercentage,
      avgCompletion,
      hardestSectionName: hardestSectionRatio > 0 ? hardestSectionName : 'All clear!',
      mostProductiveCourseTitle
    };
  }, [roadmaps, completedTasks]);

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Statistics</h1>
        <p className="text-gray-500 dark:text-gray-400">Detailed insights into your learning journey.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard 
          title="Total Courses" 
          value={stats.totalCourses.toString()} 
          icon={<BookOpen className="text-blue-500" size={24} />} 
        />
        <StatCard 
          title="Total Tasks" 
          value={stats.totalTasksCount.toString()} 
          icon={<Target className="text-indigo-500" size={24} />} 
        />
        <StatCard 
          title="Completed Tasks" 
          value={stats.completedCount.toString()} 
          icon={<CheckCircle2 className="text-emerald-500" size={24} />} 
        />
        <StatCard 
          title="Completion %" 
          value={`${stats.completionPercentage}%`} 
          icon={<BarChart3 className="text-amber-500" size={24} />} 
        />
        <StatCard 
          title="Avg Tasks / Course" 
          value={stats.avgCompletion.toString()} 
          icon={<TrendingUp className="text-rose-500" size={24} />} 
        />
        <StatCard 
          title="Most Productive" 
          value={stats.mostProductiveCourseTitle} 
          icon={<Trophy className="text-yellow-500" size={24} />} 
        />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-zinc-950 mt-4">
        <h2 className="text-xl font-semibold mb-4">Hardest Unfinished Section</h2>
        <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-4 dark:bg-zinc-900 border border-gray-100 dark:border-gray-800">
          <Target className="text-red-500 shrink-0" size={28} />
          <div>
            <p className="font-medium text-lg">{stats.hardestSectionName}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Focus your energy here to clear your backlog.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-zinc-950 flex items-center gap-4">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-gray-800">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{title}</p>
        <p className="text-2xl font-bold truncate">{value}</p>
      </div>
    </div>
  );
}
