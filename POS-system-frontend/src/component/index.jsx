import Logo from './Logo';
import NavLinks from './NavLinks';
import NavActions from './NavActions';

const Navbar = ({theme, setTheme}) => {
  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 transition-colors duration-300">
      <div className="w-full flex h-16 items-center justify-between px-4">
        <Logo/>
        <NavLinks/>
        <NavActions theme={theme} setTheme={setTheme}/>
      </div>
    </nav>
  );
};

export default Navbar;
