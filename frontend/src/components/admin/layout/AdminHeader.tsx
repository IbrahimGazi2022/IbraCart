import { useState } from 'react';
import { Menu, Bell, Search, Moon, Sun, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

const AdminHeader = ({ onMenuClick }: AdminHeaderProps) => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    }
    else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-4">

        {/* --- LEFT --- */}
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-gray-600 dark:text-gray-300 hover:text-primary"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* --- SEARCH --- */}
          <div className="hidden md:flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-2 max-w-md w-full">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products, orders..."
              className="bg-transparent border-none outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 w-full"
            />
          </div>
        </div>

        {/* --- RIGHT --- */}
        <div className="flex items-center gap-4">

          {/* --- SEARCH ICON ON MOBILE --- */}
          <button className="md:hidden text-gray-600 hover:text-primary">
            <Search className="w-6 h-6" />
          </button>

          {/* --- DARK MODE BUTTON --- */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition">
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* --- NOTIFICATIONS --- */}
          <button className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* --- LOGOUT BUTTON --- */}
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg text-gray-600 hover:bg-red-100 hover:text-red-600 transition"
            title="Logout">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;