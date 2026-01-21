import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ theme, setTheme }) => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full flex h-16 items-center justify-between px-4">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <span role="img" aria-label="shopping cart">🛒</span>
          <span>POS Pro</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {/* Features Dropdown */}
          <div className="relative group">
            <button type="button" className="flex items-center gap-1 hover:text-primary transition-colors">
              Features
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute left-0 top-full hidden w-48 pt-2 group-hover:block">
              <div className="rounded-md border bg-white dark:bg-gray-800 p-2 text-popover-foreground shadow-md">
                <Link to="/features/point-of-sale" className="block rounded-sm px-3 py-2 hover:bg-accent hover:text-accent-foreground">
                  Point of Sale
                </Link>
                <Link to="/features/inventory" className="block rounded-sm px-3 py-2 hover:bg-accent hover:text-accent-foreground">
                  Inventory
                </Link>
                <Link to="/features/analytics" className="block rounded-sm px-3 py-2 hover:bg-accent hover:text-accent-foreground">
                  Analytics
                </Link>
              </div>
            </div>
          </div>

          <Link to="/pricing" className="hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link to="/testimonials" className="hover:text-primary transition-colors">
            Testimonials
          </Link>

          {/* Resources Dropdown */}
          <div className="relative group">
            <button type="button" className="flex items-center gap-1 hover:text-primary transition-colors">
              Resources
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute left-0 top-full hidden w-48 pt-2 group-hover:block">
              <div className="rounded-md border bg-white dark:bg-gray-800 p-2 text-popover-foreground shadow-md">
                <Link to="/blog" className="block rounded-sm px-3 py-2 hover:bg-accent hover:text-accent-foreground">
                  Blog
                </Link>
                <Link to="/guides" className="block rounded-sm px-3 py-2 hover:bg-accent hover:text-accent-foreground">
                  Guides
                </Link>
                <Link to="/support" className="block rounded-sm px-3 py-2 hover:bg-accent hover:text-accent-foreground">
                  Support
                </Link>
              </div>
            </div>
          </div>

          <Link to="/contact" className="hover:text-primary transition-colors">
            Contact
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Dropdown */}
          <div className="relative group">
            <button className="flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground">
              {theme === 'light' && <Sun className="h-4 w-4" />}
              {theme === 'dark' && <Moon className="h-4 w-4" />}
              {theme === 'system' && <Monitor className="h-4 w-4" />}
            </button>
            <div className="absolute right-0 top-full hidden w-32 pt-2 group-hover:block">
              <div className="rounded-md border bg-popover p-2 text-popover-foreground shadow-md">
                <button onClick={() => setTheme('light')} className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                  <Sun className="h-4 w-4" /> Light
                </button>
                <button onClick={() => setTheme('dark')} className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                  <Moon className="h-4 w-4" /> Dark
                </button>
                <button onClick={() => setTheme('system')} className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                  <Monitor className="h-4 w-4" /> System
                </button>
              </div>
            </div>
          </div>

          <Link to="/signin" className="text-sm font-medium hover:text-primary transition-colors">
            Sign In
          </Link>
          <Link to="/request-demo" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            Request Demo
          </Link>
        </div>
      </div>
    </nav>
  );
};

// Icons
const ChevronDown = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

const Sun = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
  </svg>
);

const Moon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
  </svg>
);

const Monitor = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>
  </svg>
);

export default Navbar;