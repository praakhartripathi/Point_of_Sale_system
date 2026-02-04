import {Link} from 'react-router-dom';
import {ChevronDown} from './Icons';

const NavLinks = () => {
  return (
    <div className="hidden md:flex items-center gap-6 text-sm font-medium">
      {/* Features Dropdown */}
      <div className="relative group">
        <button type="button"
                className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-gray-700 dark:text-gray-200">
          Features
          <ChevronDown className="h-4 w-4"/>
        </button>
        <div className="absolute left-0 top-full hidden w-48 pt-2 group-hover:block">
          <div
            className="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 shadow-md">
            <Link to="/features/point-of-sale"
                  className="block rounded-sm px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              Point of Sale
            </Link>
            <Link to="/features/inventory"
                  className="block rounded-sm px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              Inventory
            </Link>
            <Link to="/features/analytics"
                  className="block rounded-sm px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              Analytics
            </Link>
          </div>
        </div>
      </div>

      <Link to="/pricing"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-gray-700 dark:text-gray-200">
        Pricing
      </Link>
      <Link to="/testimonials"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-gray-700 dark:text-gray-200">
        Testimonials
      </Link>

      {/* Resources Dropdown */}
      <div className="relative group">
        <button type="button"
                className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-gray-700 dark:text-gray-200">
          Resources
          <ChevronDown className="h-4 w-4"/>
        </button>
        <div className="absolute left-0 top-full hidden w-48 pt-2 group-hover:block">
          <div
            className="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 shadow-md">
            <Link to="/blog"
                  className="block rounded-sm px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              Blog
            </Link>
            <Link to="/guides"
                  className="block rounded-sm px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              Guides
            </Link>
            <Link to="/support"
                  className="block rounded-sm px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>

      <Link to="/contact"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-gray-700 dark:text-gray-200">
        Contact
      </Link>
    </div>
  );
};

export default NavLinks;
