import React from 'react';
import {Link} from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const NavActions = ({theme, setTheme}) => {
    return (
        <div className="flex items-center gap-4">
            <ThemeToggle theme={theme} setTheme={setTheme}/>

            <Link to="/signin"
                  className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Sign In
            </Link>
            <Link to="/request-demo"
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors shadow-sm">
                Request Demo
            </Link>
        </div>
    );
};

export default NavActions;
