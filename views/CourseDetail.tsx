import React from 'react';
import { Course, Exercise, ExerciseStatus } from '../types';
import { ChevronRight, Sparkles, ArrowLeft } from 'lucide-react';

interface CourseDetailProps {
  course: Course;
  onSelectExercise: (exerciseId: string) => void;
  onBack: () => void;
  onAIHelp?: (exercise: Exercise) => void; // Optional quick help from list
}

export const CourseDetail: React.FC<CourseDetailProps> = ({ course, onSelectExercise, onBack }) => {
  
  const getStatusIcon = (status: ExerciseStatus) => {
    // Requirements: ✔️ Completado, 🕒 Pendiente, ✏️ Intentado
    switch (status) {
      case ExerciseStatus.COMPLETED:
        return <span className="text-xl" role="img" aria-label="Completado">✔️</span>;
      case ExerciseStatus.PENDING:
        return <span className="text-xl" role="img" aria-label="Pendiente">🕒</span>;
      case ExerciseStatus.ATTEMPTED:
        return <span className="text-xl" role="img" aria-label="Intentado">✏️</span>;
    }
  };

  const getStatusText = (status: ExerciseStatus) => {
    switch (status) {
      case ExerciseStatus.COMPLETED: return "Completado";
      case ExerciseStatus.PENDING: return "Pendiente";
      case ExerciseStatus.ATTEMPTED: return "Intentado";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <button 
        onClick={onBack}
        className="flex items-center text-sm text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
      >
        <ArrowLeft size={16} className="mr-1" />
        Volver a cursos
      </button>

      {/* Course Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-dark-800 dark:to-dark-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10 text-9xl transform translate-x-1/4 -translate-y-1/4 rotate-12 pointer-events-none">
          {course.icon === 'Python' ? '🐍' : '💻'}
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-white/10">
              Curso Oficial
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-slate-300 max-w-2xl">{course.description}</p>
          
          <div className="mt-8 flex items-center gap-4">
             <div className="flex-1 max-w-xs">
                <div className="flex justify-between text-xs mb-1 text-slate-300">
                   <span>Tu progreso</span>
                   <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-emerald-400 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Exercises List */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Ejercicios del Curso</h2>
        <div className="space-y-4">
          {course.exercises.map((exercise, index) => (
            <div 
              key={exercise.id}
              className="group bg-white dark:bg-dark-800 border border-slate-100 dark:border-dark-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 w-8 flex justify-center">
                  {getStatusIcon(exercise.status)}
                </div>
                <div>
                   <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                     {index + 1}. {exercise.title}
                   </h3>
                   <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-2">
                     {exercise.description}
                   </p>
                   
                   <span className="text-xs text-slate-400 dark:text-slate-500 font-medium bg-slate-100 dark:bg-dark-700 px-2 py-0.5 rounded">
                      {getStatusText(exercise.status)}
                   </span>
                </div>
              </div>

              <div className="flex items-center gap-3 pl-12 md:pl-0">
                <button 
                  onClick={() => onSelectExercise(exercise.id)}
                  className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-medium rounded-lg border border-emerald-200 dark:border-emerald-900/50 transition-colors flex items-center"
                >
                  <Sparkles size={16} className="mr-2" />
                  Ayuda IA
                </button>
                <button 
                  onClick={() => onSelectExercise(exercise.id)}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg shadow-sm shadow-primary-500/30 transition-colors flex items-center"
                >
                  Ver Detalle
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};