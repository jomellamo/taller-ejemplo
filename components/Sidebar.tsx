import React from 'react';
import { ViewState } from '../types';
import { LayoutDashboard, BookOpen, Trophy, LogOut, Terminal } from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, isOpenMobile, setIsOpenMobile }) => {
  
  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, viewType: 'DASHBOARD' },
    { label: 'Cursos', icon: BookOpen, viewType: 'COURSES' },
    { label: 'Ranking', icon: Trophy, viewType: 'RANKING' },
  ];

  const handleNavClick = (viewType: string) => {
    onChangeView({ type: viewType as any });
    setIsOpenMobile(false);
  };

  const isActive = (viewType: string) => {
    if (currentView.type === viewType) return true;
    if (viewType === 'COURSES' && (currentView.type === 'COURSE_DETAIL' || currentView.type === 'EXERCISE_DETAIL')) return true;
    return false;
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-20 lg:hidden transition-opacity duration-300 ${isOpenMobile ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpenMobile(false)}
      />

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 left-0 z-30 h-full w-64 bg-white dark:bg-dark-900 border-r border-slate-200 dark:border-dark-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpenMobile ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-slate-100 dark:border-dark-800">
            <Terminal className="text-primary-600 mr-2" size={24} />
            <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
              TELOPROGRAMO
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navItems.map((item) => {
              const active = isActive(item.viewType);
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.viewType)}
                  className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 group
                    ${active 
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-500' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-dark-800 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                >
                  <Icon 
                    size={20} 
                    className={`mr-3 transition-colors ${active ? 'text-primary-600 dark:text-primary-500' : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300'}`} 
                  />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* User & Logout */}
          <div className="p-4 border-t border-slate-100 dark:border-dark-800">
             <button
                className="w-full flex items-center px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                onClick={() => alert("Función de salir...")}
              >
                <LogOut size={20} className="mr-3" />
                Salir
              </button>
          </div>
        </div>
      </aside>
    </>
  );
};