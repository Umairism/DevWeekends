'use client';

import { useProgressStore } from '@/storage/progressStore';
import { Download, Database, BookOpen } from 'lucide-react';

export default function ExportPage() {
  const store = useProgressStore();

  const handleExportFullProgress = () => {
    const data = {
      completed: store.completed,
      notes: store.notes,
      evidence: store.evidence,
      customRoadmaps: store.customRoadmaps,
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `progress-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportRoadmap = (roadmap: any) => {
    const blob = new Blob([JSON.stringify(roadmap, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `roadmap-${roadmap.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Export Data</h1>
        <p className="text-gray-500 dark:text-gray-400">Download your progress, notes, and custom courses to back them up or move to another device.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col items-center text-center dark:border-gray-800 dark:bg-zinc-950">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 mb-4 dark:bg-indigo-500/10 dark:text-indigo-400">
            <Database size={32} />
          </div>
          <h2 className="text-xl font-semibold mb-2">Full Backup</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 flex-1">
            Export all your completed tasks, personal notes, evidence links, and custom roadmaps in a single JSON file.
          </p>
          <button
            onClick={handleExportFullProgress}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
          >
            <Download size={18} />
            Download Full Backup
          </button>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col dark:border-gray-800 dark:bg-zinc-950">
          <div className="flex items-center justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <BookOpen size={32} />
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-2 text-center">Export Custom Courses</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 text-center">
            Download individual custom roadmaps you've generated to share them with others.
          </p>
          
          {store.customRoadmaps.length > 0 ? (
            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-2">
              {store.customRoadmaps.map(roadmap => (
                <div key={roadmap.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-zinc-900">
                  <span className="text-sm font-medium truncate pr-4">{roadmap.title}</span>
                  <button
                    onClick={() => handleExportRoadmap(roadmap)}
                    className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-white rounded-md dark:hover:bg-zinc-800 transition-colors"
                    title="Export Roadmap"
                  >
                    <Download size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-sm text-gray-400 italic text-center">
              No custom roadmaps available to export.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
