import React from 'react';
import { User, Course } from '../types';
import { PlayCircle, Award, Zap, TrendingUp } from 'lucide-react';

interface DashboardProps {
  user: User;
  courses: Course[];
  onCourseClick: (courseId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, courses, onCourseClick }) => {
  const activeCourses = courses.filter(c => c.progress > 0 && c.progress < 100);
  const completedCount = courses.reduce((acc, c) => acc + c.completedExercises, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header / Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            ¡Hola, {user.name}! 👋
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Listo para continuar tu aprendizaje hoy?
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-white dark:bg-dark-800 px-4 py-2 rounded-xl shadow-sm border border-slate-100 dark:border-dark-700">
           <Zap className="text-yellow-500 fill-yellow-500" size={18} />
           <span className="font-semibold text-slate-700 dark:text-slate-200">{user.streak} días racha</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 text-white shadow-lg shadow-primary-500/20">
          <div className="flex items-center justify-between mb-4">
             <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Award size={24} className="text-white" />
             </div>
             <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded-full text-white">Nivel {user.level}</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl font-bold">{completedCount}</h3>
            <p className="text-primary-100 text-sm font-medium">Ejercicios completados</p>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-dark-700">
           <div className="flex items-center justify-between mb-4">
             <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                <TrendingUp size={24} className="text-emerald-600 dark:text-emerald-400" />
             </div>
          </div>
           <div className="space-y-1">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Top 5%</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Ranking semanal</p>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-dark-700">
           <div className="flex items-center justify-between mb-4">
             <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <PlayCircle size={24} className="text-purple-600 dark:text-purple-400" />
             </div>
          </div>
           <div className="space-y-1">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{activeCourses.length}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Cursos activos</p>
          </div>
        </div>
      </div>

      {/* Continue Learning Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Continuar Aprendiendo</h2>
          <button 
             onClick={() => onCourseClick('all')} 
             className="text-sm font-medium text-primary-600 dark:text-primary-500 hover:text-primary-700 dark:hover:text-primary-400"
          >
            Ver todos
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.slice(0, 3).map(course => (
            <div 
              key={course.id} 
              className="group bg-white dark:bg-dark-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-dark-700 hover:shadow-md hover:border-primary-200 dark:hover:border-primary-900 transition-all cursor-pointer"
              onClick={() => onCourseClick(course.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-slate-50 dark:bg-dark-700 rounded-lg text-2xl">
                  {/* Simplistic Icon Mapping */}
                  {course.icon === 'Python' ? '🐍' : course.icon === 'React' ? '⚛️' : '📜'}
                </div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Curso</div>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-500 transition-colors">
                {course.title}
              </h3>
              <div className="w-full bg-slate-100 dark:bg-dark-900 rounded-full h-2 mb-2">
                <div 
                  className="bg-primary-500 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>{course.progress}% completado</span>
                <span>{course.completedExercises}/{course.totalExercises} ej.</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};