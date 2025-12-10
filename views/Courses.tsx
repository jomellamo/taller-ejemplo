import React from 'react';
import { Course } from '../types';
import { ArrowRight } from 'lucide-react';

interface CoursesProps {
  courses: Course[];
  onSelectCourse: (courseId: string) => void;
}

export const Courses: React.FC<CoursesProps> = ({ courses, onSelectCourse }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Mis Cursos</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Explora el catálogo y mejora tus habilidades.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div 
            key={course.id} 
            className="flex flex-col bg-white dark:bg-dark-800 rounded-2xl border border-slate-100 dark:border-dark-700 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="p-6 flex-1">
              <div className="flex items-center justify-between mb-6">
                 <span className="text-4xl filter drop-shadow-sm">
                   {course.icon === 'Python' ? '🐍' : course.icon === 'React' ? '⚛️' : '🤖'}
                 </span>
                 <span className="px-3 py-1 bg-slate-100 dark:bg-dark-700 text-xs font-semibold rounded-full text-slate-600 dark:text-slate-300">
                    {course.totalExercises} Módulos
                 </span>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{course.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-4">
                {course.description}
              </p>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                  <span>Progreso</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-dark-900 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-50 dark:border-dark-700 bg-slate-50/50 dark:bg-dark-900/30">
              <button 
                onClick={() => onSelectCourse(course.id)}
                className="w-full py-2.5 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2"
              >
                {course.progress > 0 ? 'Continuar Curso' : 'Entrar al Curso'}
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};