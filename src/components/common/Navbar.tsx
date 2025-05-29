import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();

  const isLandingPage = location.pathname === '/';

  return (
    <nav className={`bg-white dark:bg-gray-800 shadow-md ${isLandingPage ? 'bg-opacity-90 backdrop-blur-md' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold">⚽</span>
              </div>
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">FootballTracker</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Nav Links */}
            <Link 
              to="/" 
              className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                location.pathname === '/' ? 'text-blue-600 dark:text-blue-400' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/matches" 
              className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                location.pathname === '/matches' ? 'text-blue-600 dark:text-blue-400' : ''
              }`}
            >
              Matches
            </Link>
            {/* Theme toggle */}
            <button 
              onClick={toggleTheme}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2 ${
                  location.pathname === '/' ? 'text-blue-600 dark:text-blue-400' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/matches" 
                className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2 ${
                  location.pathname === '/matches' ? 'text-blue-600 dark:text-blue-400' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Matches
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
