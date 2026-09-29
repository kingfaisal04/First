import React, { useEffect, useState } from 'react';
import { Moon, Sun, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // auto, light, or dark
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem('themeMode') || 'auto'
  );

  const [theme, setTheme] = useState('light');

  // Determine whether it is daytime or nighttime
  const getTimeBasedTheme = () => {
    const hour = new Date().getHours();

    if (hour >= 6 && hour < 18) {
      return 'light';
    }

    return 'dark';
  };

  // Apply theme
  useEffect(() => {
    const applyTheme = () => {
      const newTheme =
        themeMode === 'auto'
          ? getTimeBasedTheme()
          : themeMode;

      setTheme(newTheme);

      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    applyTheme();

    // Check the time every minute
    const interval = setInterval(applyTheme, 60 * 1000);

    return () => clearInterval(interval);
  }, [themeMode]);

  // Save preference
  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  // Manual toggle
  const toggleTheme = () => {
    if (theme === 'light') {
      setThemeMode('dark');
    } else {
      setThemeMode('light');
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          <Link to="/" className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
              <GraduationCap className="w-5 h-5" />
            </div>

            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
              StudentOS
            </span>
          </Link>

          <div className="flex items-center gap-4">

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
