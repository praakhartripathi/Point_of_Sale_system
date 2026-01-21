import React from 'react';
import { Sun, Moon, Monitor } from './Icons';

const ThemeToggle = ({ theme, setTheme }) => {
  return (
    <div className="relative group">
      <button className="flex items-center justify-center rounded-md p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
        {theme === 'light' && <Sun className="h-4 w-4" />}
        {theme === 'dark' && <Moon className="h-4 w-4" />}
        {theme === 'system' && <Monitor className="h-4 w-4" />}
      </button>
      <div className="absolute right-0 top-full hidden w-32 pt-2 group-hover:block">
        <div className="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 shadow-md">
          <button onClick={() => setTheme('light')} className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Sun className="h-4 w-4" /> Light
          </button>
          <button onClick={() => setTheme('dark')} className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Moon className="h-4 w-4" /> Dark
          </button>
          <button onClick={() => setTheme('system')} className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Monitor className="h-4 w-4" /> System
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;