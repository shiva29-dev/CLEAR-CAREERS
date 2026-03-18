import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, UserPlus, Compass, BookOpen, Rss, Target, 
  LayoutDashboard, FileCheck, Users, Settings, MessageSquare,
  Menu, X, Moon, Sun
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { path: '/', label: '1. Landing Page', icon: Home },
  { path: '/onboarding', label: '2. Onboarding', icon: UserPlus },
  { path: '/assessment', label: '3. Assessment', icon: Compass },
  { path: '/reality', label: '4. Career Reality', icon: BookOpen },
  { path: '/feed', label: '5. Insights Feed', icon: Rss },
  { path: '/mission', label: '6. Trial Mission', icon: Target },
  { path: '/community', label: '7. Career Hubs', icon: MessageSquare },
  { path: '/dashboard', label: '8. Student Dashboard', icon: LayoutDashboard },
  { path: '/student-report', label: '9. Decision Report', icon: FileCheck },
  { path: '/parent-report', label: '10. Parent Report', icon: Users },
  { path: '/admin', label: '11. Admin Panel', icon: Settings },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-blue-50 dark:bg-slate-950 overflow-hidden transition-colors duration-200">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl text-slate-900 dark:text-white tracking-tight">Clear Careers</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 text-slate-600 dark:text-slate-300">
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600 dark:text-slate-300">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(isMobileMenuOpen || window.innerWidth >= 768) && (
          <motion.aside 
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
            className={`fixed md:relative z-40 w-64 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shadow-xl md:shadow-none pt-16 md:pt-0`}
          >
            <div className="hidden md:flex p-6 border-b border-slate-100 dark:border-slate-800 items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
                    <Compass className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-display font-bold text-xl text-slate-900 dark:text-white tracking-tight">Clear Careers</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">Prototype Specification</p>
              </div>
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors">
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
            
            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive 
                        ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400 dark:text-slate-500'}`} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            
            <div className="p-4 border-t border-slate-100 dark:border-slate-800">
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 border border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-xs">
                    JD
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-white">Jane Doe</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">10th Grade Explorer</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative pt-16 md:pt-0 bg-blue-50 dark:bg-slate-950">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="min-h-full"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
