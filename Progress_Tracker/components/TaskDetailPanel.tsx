'use client';

import { Task } from '@/types';
import { useProgressStore } from '@/storage/progressStore';
import { X, CheckCircle2, Circle, Clock, Tag, Link as LinkIcon, FileText } from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';

interface TaskDetailPanelProps {
  task: Task | null;
  onClose: () => void;
}

export default function TaskDetailPanel({ task, onClose }: TaskDetailPanelProps) {
  const { completed, toggleTask, notes, addNote, evidence, addEvidence } = useProgressStore();
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [isEditingEvidence, setIsEditingEvidence] = useState(false);

  // Update local state when task changes
  // In a real app we'd use useEffect, but simple derivation is fine here for reset
  if (!task) return null;

  const isCompleted = completed.includes(task.id);
  const currentNote = notes[task.id] || '';
  const currentEvidence = evidence[task.id] || '';

  const handleSaveNote = () => {
    addNote(task.id, noteText);
    setIsEditingNote(false);
  };

  const handleSaveEvidence = () => {
    addEvidence(task.id, evidenceUrl);
    setIsEditingEvidence(false);
  };

  return (
    <div className="flex h-full flex-col border-l border-gray-200 bg-white dark:border-gray-800 dark:bg-zinc-950 animate-in slide-in-from-right-8 duration-300">
      <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
        <h2 className="text-lg font-semibold">Task Details</h2>
        <button 
          onClick={onClose}
          className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-zinc-800 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
        <div>
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
              {task.title}
            </h3>
            <button
              onClick={() => toggleTask(task.id)}
              className={clsx(
                "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors shrink-0",
                isCompleted 
                  ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20" 
                  : "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              )}
            >
              {isCompleted ? <CheckCircle2 size={18} /> : <Circle size={18} />}
              {isCompleted ? 'Completed' : 'Mark Complete'}
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            {task.difficulty && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-zinc-900 px-3 py-1.5 rounded-md">
                <Tag size={16} />
                <span>{task.difficulty}</span>
              </div>
            )}
            {task.estimatedMinutes && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-zinc-900 px-3 py-1.5 rounded-md">
                <Clock size={16} />
                <span>{task.estimatedMinutes} min</span>
              </div>
            )}
          </div>
        </div>

        <div className="h-px bg-gray-200 dark:bg-gray-800" />

        {/* Notes Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
              <FileText size={18} className="text-indigo-500" />
              Notes
            </h4>
            {!isEditingNote && (
              <button 
                onClick={() => {
                  setNoteText(currentNote);
                  setIsEditingNote(true);
                }}
                className="text-xs font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
              >
                {currentNote ? 'Edit' : 'Add Note'}
              </button>
            )}
          </div>

          {isEditingNote ? (
            <div className="flex flex-col gap-3">
              <textarea 
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Add your markdown notes here..."
                className="w-full min-h-[120px] rounded-lg border border-gray-300 bg-transparent p-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-700"
              />
              <div className="flex justify-end gap-2">
                <button 
                  onClick={() => setIsEditingNote(false)}
                  className="px-3 py-1.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveNote}
                  className="px-3 py-1.5 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                >
                  Save Note
                </button>
              </div>
            </div>
          ) : (
            currentNote ? (
              <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-700 dark:bg-zinc-900 dark:text-gray-300 whitespace-pre-wrap font-mono">
                {currentNote}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No notes added yet.</p>
            )
          )}
        </section>

        {/* Evidence Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
              <LinkIcon size={18} className="text-indigo-500" />
              Evidence
            </h4>
            {!isEditingEvidence && (
              <button 
                onClick={() => {
                  setEvidenceUrl(currentEvidence);
                  setIsEditingEvidence(true);
                }}
                className="text-xs font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
              >
                {currentEvidence ? 'Edit' : 'Add Link'}
              </button>
            )}
          </div>

          {isEditingEvidence ? (
            <div className="flex flex-col gap-3">
              <input 
                type="url"
                value={evidenceUrl}
                onChange={(e) => setEvidenceUrl(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full rounded-lg border border-gray-300 bg-transparent p-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-700"
              />
              <div className="flex justify-end gap-2">
                <button 
                  onClick={() => setIsEditingEvidence(false)}
                  className="px-3 py-1.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveEvidence}
                  className="px-3 py-1.5 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                >
                  Save Link
                </button>
              </div>
            </div>
          ) : (
            currentEvidence ? (
              <a 
                href={currentEvidence} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 text-sm text-indigo-600 hover:bg-indigo-50 dark:border-gray-800 dark:text-indigo-400 dark:hover:bg-indigo-500/10 transition-colors truncate"
              >
                <LinkIcon size={16} className="shrink-0" />
                <span className="truncate">{currentEvidence}</span>
              </a>
            ) : (
              <p className="text-sm text-gray-500 italic">No evidence attached.</p>
            )
          )}
        </section>

      </div>
    </div>
  );
}
