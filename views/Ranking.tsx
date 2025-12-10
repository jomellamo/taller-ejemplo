import React from 'react';
import { Trophy, Medal, User as UserIcon } from 'lucide-react';
import { User } from '../types';

export const Ranking: React.FC = () => {
  const users = [
    { id: 1, name: 'María Garcia', points: 1250, avatar: 'https://picsum.photos/seed/1/200' },
    { id: 2, name: 'Alex Dev (Tú)', points: 980, avatar: 'https://picsum.photos/seed/2/200', isMe: true },
    { id: 3, name: 'Juan Perez', points: 945, avatar: 'https://picsum.photos/seed/3/200' },
    { id: 4, name: 'Sophie L.', points: 890, avatar: 'https://picsum.photos/seed/4/200' },
    { id: 5, name: 'Carlos R.', points: 750, avatar: 'https://picsum.photos/seed/5/200' },
  ];

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Tabla de Clasificación</h1>
        <p className="text-slate-500 dark:text-slate-400">Compite con otros estudiantes y demuestra tu habilidad.</p>
      </div>

      <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-slate-100 dark:border-dark-700 overflow-hidden">
        {users.map((user, index) => (
          <div 
            key={user.id}
            className={`flex items-center p-4 border-b border-slate-50 dark:border-dark-700 last:border-0 hover:bg-slate-50 dark:hover:bg-dark-700/50 transition-colors ${user.isMe ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
          >
            <div className="w-10 text-center font-bold text-slate-400">
              {index === 0 ? <Medal className="text-yellow-400 mx-auto" /> : 
               index === 1 ? <Medal className="text-slate-400 mx-auto" /> :
               index === 2 ? <Medal className="text-amber-600 mx-auto" /> :
               `#${index + 1}`}
            </div>
            
            <div className="mx-4">
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border-2 border-white dark:border-dark-800 shadow-sm" />
            </div>

            <div className="flex-1">
              <h3 className={`font-semibold ${user.isMe ? 'text-primary-600 dark:text-primary-400' : 'text-slate-900 dark:text-white'}`}>
                {user.name} {user.isMe && '(Tú)'}
              </h3>
              <p className="text-xs text-slate-500">Nivel {Math.floor(user.points / 100)}</p>
            </div>

            <div className="font-mono font-bold text-slate-700 dark:text-slate-200">
              {user.points} XP
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};