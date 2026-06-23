'use client';

import { useState } from 'react';
import { useProgressStore } from '@/storage/progressStore';
import { Roadmap, Section, Task } from '@/types';
import { Upload, FileJson, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ImportPage() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { addCustomRoadmap } = useProgressStore();
  const router = useRouter();

  const generateId = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const parseRawText = (text: string): Roadmap => {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) throw new Error("Input is empty.");

    let title = "Custom Roadmap";
    let description = "Generated from text input.";
    
    // Attempt to find title (first line starting with # or just first line if no markdown)
    const firstLine = lines[0];
    if (firstLine.startsWith('# ')) {
      title = firstLine.substring(2).trim();
      lines.shift();
    } else if (!firstLine.match(/^[-*]/) && !firstLine.match(/^\d+\./)) {
      title = firstLine;
      lines.shift();
    }

    const sections: Section[] = [];
    let currentSection: Section = {
      id: generateId('General Tasks'),
      title: 'General Tasks',
      tasks: []
    };

    for (const line of lines) {
      // Check for section headers (## or ends with :)
      if (line.startsWith('## ') || line.endsWith(':')) {
        if (currentSection.tasks.length > 0) {
          sections.push(currentSection);
        }
        const sectionTitle = line.replace(/^##\s*/, '').replace(/:$/, '').trim();
        currentSection = {
          id: generateId(sectionTitle) + '-' + Math.random().toString(36).substr(2, 5),
          title: sectionTitle,
          tasks: []
        };
      } 
      // Check for tasks (- , *, [ ], or numbers)
      else if (line.match(/^[-*]\s+/) || line.match(/^\[[ xX]\]\s+/) || line.match(/^\d+\.\s+/)) {
        const taskTitle = line.replace(/^[-*]\s+/, '').replace(/^\[[ xX]\]\s+/, '').replace(/^\d+\.\s+/, '').trim();
        currentSection.tasks.push({
          id: generateId(taskTitle) + '-' + Math.random().toString(36).substr(2, 5),
          title: taskTitle,
        });
      }
      // If it doesn't match a task or section, just treat it as a task if it's long enough, 
      // or description if we have no tasks yet.
      else {
        if (currentSection.tasks.length === 0 && sections.length === 0) {
          description = line;
        } else {
          currentSection.tasks.push({
            id: generateId(line) + '-' + Math.random().toString(36).substr(2, 5),
            title: line,
          });
        }
      }
    }

    if (currentSection.tasks.length > 0) {
      sections.push(currentSection);
    }

    if (sections.length === 0) {
      throw new Error("Could not find any tasks in the provided text.");
    }

    return {
      id: generateId(title) + '-' + Date.now().toString(36),
      title,
      description,
      sections
    };
  };

  const handleImport = () => {
    setError('');
    setSuccess('');
    
    if (!input.trim()) {
      setError('Please provide input text or JSON.');
      return;
    }

    try {
      // Check if it's JSON
      if (input.trim().startsWith('{')) {
        const parsed = JSON.parse(input);
        
        // Check if it's a full progress backup
        if (parsed.completed !== undefined && parsed.customRoadmaps !== undefined) {
          useProgressStore.getState().importData(parsed);
          setSuccess('Successfully restored full progress backup!');
          setInput('');
          setTimeout(() => {
            router.push('/');
          }, 2000);
          return;
        }

        // Otherwise treat as a single roadmap JSON
        if (!parsed.title || !parsed.sections) {
          throw new Error("Invalid JSON roadmap structure. Must contain 'title' and 'sections'.");
        }
        
        // Ensure IDs exist
        if (!parsed.id) parsed.id = generateId(parsed.title) + '-' + Date.now().toString(36);
        
        parsed.sections.forEach((s: any) => {
          if (!s.id) s.id = generateId(s.title) + '-' + Math.random().toString(36).substr(2, 5);
          s.tasks.forEach((t: any) => {
            if (!t.id) t.id = generateId(t.title) + '-' + Math.random().toString(36).substr(2, 5);
          });
        });
        
        addCustomRoadmap(parsed as Roadmap);
        setSuccess(`Successfully imported roadmap "${parsed.title}"!`);
        setInput('');
        setTimeout(() => {
          router.push(`/courses/${parsed.id}`);
        }, 2000);
        return;
      } 
      
      // Parse as raw text
      const roadmap = parseRawText(input);
      addCustomRoadmap(roadmap);
      setSuccess(`Successfully imported "${roadmap.title}" with ${roadmap.sections.reduce((a, b) => a + b.tasks.length, 0)} tasks!`);
      setInput('');
      
      // Redirect after 2 seconds
      setTimeout(() => {
        router.push(`/courses/${roadmap.id}`);
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'Failed to parse input.');
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Import Course</h1>
        <p className="text-gray-500 dark:text-gray-400">Paste JSON or raw text to automatically generate a progress tracker course.</p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-zinc-950">
        <div className="flex gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-zinc-900 px-3 py-2 rounded-lg border border-gray-100 dark:border-gray-800">
            <FileJson size={16} className="text-indigo-500" />
            <span>Valid JSON</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-zinc-900 px-3 py-2 rounded-lg border border-gray-100 dark:border-gray-800">
            <FileText size={16} className="text-blue-500" />
            <span>Raw Text (Markdown lists)</span>
          </div>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your content here...&#10;&#10;Example raw text:&#10;# My Learning Plan&#10;&#10;## Basics&#10;- Read chapter 1&#10;- Complete exercise A&#10;&#10;## Advanced&#10;- Build final project"
          className="w-full min-h-[300px] rounded-lg border border-gray-300 bg-transparent p-4 text-sm font-mono focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-700"
        />

        {error && (
          <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg dark:bg-red-500/10 dark:text-red-400">
            <AlertCircle size={18} />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {success && (
          <div className="mt-4 flex items-center gap-2 text-emerald-600 bg-emerald-50 p-3 rounded-lg dark:bg-emerald-500/10 dark:text-emerald-400">
            <CheckCircle2 size={18} />
            <p className="text-sm font-medium">{success}</p>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleImport}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
          >
            <Upload size={18} />
            Generate Course
          </button>
        </div>
      </div>
    </div>
  );
}
