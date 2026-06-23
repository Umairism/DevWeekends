'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  BarChart3, 
  Search, 
  Download, 
  Upload, 
  Settings 
} from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Courses', href: '/courses', icon: BookOpen },
  { name: 'Statistics', href: '/statistics', icon: BarChart3 },
  { name: 'Search', href: '/search', icon: Search },
];

const secondaryNavItems = [
  { name: 'Import', href: '/import', icon: Download },
  { name: 'Export', href: '/export', icon: Upload },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r border-gray-200 bg-white px-4 py-6 dark:border-gray-800 dark:bg-zinc-950">
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
          <BookOpen size={18} />
        </div>
        <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          ProgressTracker
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-900'
              )}
            >
              <item.icon size={18} className={isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800">
        <nav className="flex flex-col gap-1">
          {secondaryNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-900'
                )}
              >
                <item.icon size={18} className={isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
