import React from 'react';
import { Zap, X, Calendar } from 'lucide-react';
import { User } from '../types';

interface StreakModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export const StreakModal: React.FC<StreakModalProps> = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  // Mock generating last 14 days
  const days = Array.from({ length: 14 }, (_, i) => {
     const d = new Date();
     d.setDate(d.getDate() - (13 - i));
     return d.toISOString().split('T')[0];
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white dark:bg-dark-800 w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 dark:border-dark-700 overflow-hidden transform scale-100 transition-all">
          <div className="bg-gradient-to-r from-yellow-500 to-amber-500 p-6 text-white text-center relative">
             <button 
               onClick={onClose}
               className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1 rounded-full transition-colors"
             >
               <X size={20} />
             </button>
             <Zap size={48} className="mx-auto mb-2 fill-white" />
             <h2 className="text-3xl font-bold">{user.streak} Días</h2>
             <p className="text-yellow-100 font-medium">¡Estás en racha! Sigue así.</p>
          </div>

          <div className="p-6">
             <div className="flex items-center gap-2 mb-4 text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider">
               <Calendar size={16} />
               Historial Reciente
             </div>

             <div className="grid grid-cols-7 gap-2">
                {days.map((date, index) => {
                   const isActive = user.streakHistory.includes(date);
                   const isToday = index === 13;
                   const dayLabel = new Date(date).toLocaleDateString('es-ES', { weekday: 'narrow' });
                   
                   return (
                     <div key={date} className="flex flex-col items-center gap-1">
                        <span className="text-[10px] text-slate-400 capitalize">{dayLabel}</span>
                        <div 
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                            isActive 
                              ? 'bg-yellow-500 border-yellow-500 text-white shadow-sm' 
                              : isToday 
                                ? 'bg-slate-100 dark:bg-dark-700 border-slate-300 dark:border-dark-600 text-slate-400 border-dashed'
                                : 'bg-transparent border-slate-100 dark:border-dark-700 text-slate-300'
                          }`}
                        >
                          {isActive ? <Zap size={12} fill="currentColor" /> : new Date(date).getDate()}
                        </div>
                     </div>
                   )
                })}
             </div>

             <div className="mt-6 bg-slate-50 dark:bg-dark-900/50 p-4 rounded-xl border border-slate-100 dark:border-dark-700 text-center">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Próximo hito: <span className="font-bold text-yellow-600 dark:text-yellow-500">7 días</span>
                </p>
                <div className="w-full bg-slate-200 dark:bg-dark-700 h-2 rounded-full mt-2 overflow-hidden">
                   <div className="bg-yellow-500 h-full rounded-full w-[70%]"></div>
                </div>
                <p className="text-xs text-slate-400 mt-2">Completa un ejercicio hoy para mantener tu racha.</p>
             </div>
          </div>
       </div>
    </div>
  );
};