import { useTheme } from '../../hooks/useTheme';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ className = '', size = 24 }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${className}`}
      aria-label="Toggle theme"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun 
          size={size} 
          className="text-yellow-400 hover:text-yellow-300 transition-colors" 
        />
      ) : (
        <Moon 
          size={size} 
          className="text-gray-700 hover:text-gray-900 transition-colors" 
        />
      )}
    </button>
  );
};

export default ThemeToggle;
