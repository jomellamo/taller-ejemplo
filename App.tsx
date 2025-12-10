import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ThemeToggle } from './components/ThemeToggle';
import { Dashboard } from './views/Dashboard';
import { Courses } from './views/Courses';
import { CourseDetail } from './views/CourseDetail';
import { ExerciseDetail } from './views/ExerciseDetail';
import { Ranking } from './views/Ranking';
import { Profile } from './views/Profile';
import { Landing } from './views/Landing';
import { SupportChat } from './components/SupportChat';
import { StreakModal } from './components/StreakModal';
import { ViewState, User, Course } from './types';
import { MOCK_USER, MOCK_COURSES } from './constants';
import { Menu, Bell, Zap, LogOut } from 'lucide-react';

const App: React.FC = () => {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'student' | 'teacher' | null>(null);

  // App State
  const [view, setView] = useState<ViewState>({ type: 'DASHBOARD' });
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isStreakModalOpen, setIsStreakModalOpen] = useState(false);
  
  // Data State
  const [user] = useState<User>(MOCK_USER);
  const [courses] = useState<Course[]>(MOCK_COURSES);

  // Theme effect
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Handle Login
  const handleLogin = (role: 'student' | 'teacher') => {
    setUserRole(role);
    setIsAuthenticated(true);
    
    if (role === 'teacher') {
      // Mock teacher experience (or just alert for now since dashboard is student focused)
      alert("Vista de Docente en desarrollo. Redirigiendo a vista de estudiante para demostración.");
      // In a real app, you would set a separate TEACHER_DASHBOARD view
    }
    
    setView({ type: 'DASHBOARD' });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setView({ type: 'DASHBOARD' }); // Reset view for next login
  };

  // Navigation Handlers
  const handleNavigate = (newView: ViewState) => {
    setView(newView);
    window.scrollTo(0, 0);
  };

  const handleSelectCourse = (courseId: string) => {
    if (courseId === 'all') {
      handleNavigate({ type: 'COURSES' });
    } else {
      handleNavigate({ type: 'COURSE_DETAIL', courseId });
    }
  };

  const handleSelectExercise = (courseId: string, exerciseId: string) => {
    handleNavigate({ type: 'EXERCISE_DETAIL', courseId, exerciseId });
  };

  // Render View Logic
  const renderContent = () => {
    switch (view.type) {
      case 'DASHBOARD':
        return <Dashboard user={user} courses={courses} onCourseClick={handleSelectCourse} />;
      case 'COURSES':
        return <Courses courses={courses} onSelectCourse={handleSelectCourse} />;
      case 'RANKING':
        return <Ranking user={user} />;
      case 'PROFILE':
        return <Profile user={user} />;
      case 'COURSE_DETAIL':
        const selectedCourse = courses.find(c => c.id === view.courseId);
        if (!selectedCourse) return <div>Curso no encontrado</div>;
        return (
          <CourseDetail 
            course={selectedCourse} 
            onSelectExercise={(exId) => handleSelectExercise(selectedCourse.id, exId)}
            onBack={() => handleNavigate({ type: 'COURSES' })}
          />
        );
      case 'EXERCISE_DETAIL':
        const course = courses.find(c => c.id === view.courseId);
        const exercise = course?.exercises.find(e => e.id === view.exerciseId);
        if (!course || !exercise) return <div>Ejercicio no encontrado</div>;
        return (
          <ExerciseDetail 
            exercise={exercise} 
            onBack={() => handleNavigate({ type: 'COURSE_DETAIL', courseId: course.id })}
            onComplete={() => console.log('Completed')}
          />
        );
      default:
        return <Dashboard user={user} courses={courses} onCourseClick={handleSelectCourse} />;
    }
  };

  // If not authenticated, show Landing
  if (!isAuthenticated) {
    return (
       <>
         <div className={isDark ? 'dark' : ''}>
           {/* Temporary Theme Toggle on Landing for Demo Purposes */}
           <div className="absolute top-4 right-4 z-50 text-white">
             <ThemeToggle isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
           </div>
           <Landing onLogin={handleLogin} />
         </div>
       </>
    );
  }

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-dark-900 transition-colors duration-300`}>
      <Sidebar 
        currentView={view} 
        onChangeView={handleNavigate}
        isOpenMobile={isMobileMenuOpen}
        setIsOpenMobile={setIsMobileMenuOpen}
      />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-20 bg-white/80 dark:bg-dark-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-dark-800 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-800 rounded-lg"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            {/* Streak Trigger (Mobile/Desktop) */}
            <button 
              onClick={() => setIsStreakModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 dark:bg-yellow-900/10 text-yellow-700 dark:text-yellow-500 rounded-full border border-yellow-200 dark:border-yellow-900/30 hover:bg-yellow-100 transition-colors"
            >
               <Zap size={16} fill="currentColor" />
               <span className="font-bold text-sm">{user.streak}</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-dark-900"></span>
            </button>
            <div className="h-6 w-px bg-slate-200 dark:bg-dark-700 mx-1"></div>
            <ThemeToggle isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
            
            <button 
              onClick={() => handleNavigate({ type: 'PROFILE' })}
              className="flex items-center gap-3 ml-2 hover:opacity-80 transition-opacity focus:outline-none"
              title="Ver Perfil"
            >
              <div className="relative">
                 {/* Mini Frame Preview in Header */}
                 <div className={`absolute -inset-1 rounded-full border-2 ${user.inventory.find(i => i.id === user.frame)?.preview || 'border-transparent'}`}></div>
                 <img 
                  src={user.avatar} 
                  alt="Profile" 
                  className={`w-9 h-9 rounded-full bg-white relative z-10`}
                />
              </div>
            </button>
            
            <button 
              onClick={handleLogout}
              className="ml-2 text-slate-400 hover:text-red-500 transition-colors"
              title="Cerrar Sesión"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Dynamic View Content */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full relative">
          {renderContent()}
        </main>
      </div>

      {/* Global Components */}
      <SupportChat />
      <StreakModal isOpen={isStreakModalOpen} onClose={() => setIsStreakModalOpen(false)} user={user} />
    </div>
  );
};

export default App;