import {Link} from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white transition-colors">
      <span role="img" aria-label="shopping cart">🛒</span>
      <span>POS Pro</span>
    </Link>
  );
};

export default Logo;
