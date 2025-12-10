import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ThemeToggle } from './components/ThemeToggle';
import { Dashboard } from './views/Dashboard';
import { Courses } from './views/Courses';
import { CourseDetail } from './views/CourseDetail';
import { ExerciseDetail } from './views/ExerciseDetail';
import { Ranking } from './views/Ranking';
import { ViewState, User, Course } from './types';
import { MOCK_USER, MOCK_COURSES } from './constants';
import { Menu, Bell } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>({ type: 'DASHBOARD' });
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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
        return <Ranking />;
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
            {/* Breadcrumb mock or Title could go here */}
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-dark-900"></span>
            </button>
            <div className="h-6 w-px bg-slate-200 dark:bg-dark-700 mx-1"></div>
            <ThemeToggle isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
            <div className="flex items-center gap-3 ml-2">
              <img 
                src={user.avatar} 
                alt="Profile" 
                className="w-9 h-9 rounded-full border-2 border-white dark:border-dark-700 shadow-sm"
              />
            </div>
          </div>
        </header>

        {/* Dynamic View Content */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;