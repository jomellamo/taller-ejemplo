import React from 'react';
import { Trophy, Medal, Lock, Star, Zap, Gift } from 'lucide-react';
import { User, CosmeticsItem } from '../types';

interface RankingProps {
  user: User;
}

export const Ranking: React.FC<RankingProps> = ({ user }) => {
  // Mock ranking data with Nicknames
  const rankingUsers = [
    { id: 1, nickname: 'CodeMaster_X', points: 1250, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix', frame: 'border-yellow-400 shadow-[0_0_10px_gold]' },
    { id: 2, nickname: user.nickname, points: user.xp, avatar: user.avatar, frame: user.inventory.find(i => i.id === user.frame)?.preview || '', isMe: true },
    { id: 3, nickname: 'PythonQueen', points: 945, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica', frame: '' },
    { id: 4, nickname: 'BugHunter007', points: 890, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John', frame: '' },
    { id: 5, nickname: 'NullPointer', points: 750, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan', frame: '' },
  ].sort((a, b) => b.points - a.points); // Ensure sorted by points

  // Calculate progress to next level (Mock logic: 100 XP per level for demo)
  const xpForNextLevel = (user.level + 1) * 100;
  const currentLevelXp = user.xp % 100; // Simplified for demo
  const progressPercent = (currentLevelXp / 100) * 100;

  // Find next unlockable item
  const nextUnlock = user.inventory
    .filter(i => !i.unlocked)
    .sort((a, b) => a.requiredLevel - b.requiredLevel)[0];

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Tabla de Clasificación</h1>
        <p className="text-slate-500 dark:text-slate-400">Compite con otros estudiantes y sube de rango.</p>
      </div>

      {/* Ranking Table */}
      <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-slate-100 dark:border-dark-700 overflow-hidden mb-12">
        {rankingUsers.map((rankUser, index) => (
          <div 
            key={rankUser.id}
            className={`flex items-center p-4 border-b border-slate-50 dark:border-dark-700 last:border-0 hover:bg-slate-50 dark:hover:bg-dark-700/50 transition-colors ${rankUser.isMe ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
          >
            <div className="w-12 text-center font-bold text-slate-400 flex flex-col items-center justify-center">
              {index === 0 ? <Medal className="text-yellow-400 w-6 h-6" /> : 
               index === 1 ? <Medal className="text-slate-400 w-6 h-6" /> :
               index === 2 ? <Medal className="text-amber-600 w-6 h-6" /> :
               <span className="text-lg">#{index + 1}</span>}
            </div>
            
            <div className="mx-4 relative group">
              <div className={`absolute -inset-1 rounded-full border-2 ${rankUser.frame || 'border-transparent'}`}></div>
              <img src={rankUser.avatar} alt={rankUser.nickname} className="w-12 h-12 rounded-full bg-white relative z-10" />
            </div>

            <div className="flex-1">
              <h3 className={`font-bold text-base md:text-lg ${rankUser.isMe ? 'text-primary-600 dark:text-primary-400' : 'text-slate-900 dark:text-white'}`}>
                {rankUser.nickname} {rankUser.isMe && '(Tú)'}
              </h3>
              <p className="text-xs text-slate-500">Nivel {Math.floor(rankUser.points / 100)}</p>
            </div>

            <div className="text-right">
              <div className="font-mono font-bold text-slate-900 dark:text-white text-lg">
                {rankUser.points}
              </div>
              <div className="text-xs text-slate-400 uppercase font-medium">XP Total</div>
            </div>
          </div>
        ))}
      </div>

      {/* NEW SECTION: Progress & Unlockables */}
      <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
         <div className="flex items-center gap-3 mb-2">
            <Gift className="text-purple-500" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Tu Progreso y Recompensas</h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Level Progress Card */}
            <div className="md:col-span-1 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
               {/* Background deco */}
               <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-1/2 -translate-y-1/2">
                 <Zap size={100} />
               </div>

               <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold mb-1 opacity-90">Nivel Actual</h3>
                    <div className="text-5xl font-black mb-4">{user.level}</div>
                    <p className="text-sm text-indigo-100 mb-4">
                      Te faltan <span className="font-bold">{100 - currentLevelXp} XP</span> para el nivel {user.level + 1}.
                    </p>
                  </div>

                  <div>
                     <div className="flex justify-between text-xs font-medium mb-1 opacity-80">
                        <span>Progreso</span>
                        <span>{Math.round(progressPercent)}%</span>
                     </div>
                     <div className="w-full bg-black/20 rounded-full h-3 mb-6">
                        <div className="bg-yellow-400 h-3 rounded-full shadow-lg shadow-yellow-500/50" style={{ width: `${progressPercent}%` }}></div>
                     </div>
                     
                     {nextUnlock ? (
                       <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3 border border-white/10">
                          <div className="p-2 bg-black/20 rounded-lg">
                            <Lock size={16} className="text-indigo-200" />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold text-indigo-200">Próximo Desbloqueable</p>
                            <p className="text-sm font-bold truncate">{nextUnlock.name}</p>
                            <p className="text-[10px] text-white/60">Alcanza el Nivel {nextUnlock.requiredLevel}</p>
                          </div>
                       </div>
                     ) : (
                       <div className="text-sm font-medium flex items-center gap-2">
                         <Star className="text-yellow-400" fill="currentColor" />
                         ¡Has desbloqueado todo!
                       </div>
                     )}
                  </div>
               </div>
            </div>

            {/* Unlockables Gallery */}
            <div className="md:col-span-2 bg-white dark:bg-dark-800 rounded-2xl p-6 border border-slate-100 dark:border-dark-700 shadow-sm">
               <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Galería de Coleccionables</h3>
               
               <div className="space-y-6">
                  {/* Avatars Section */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Avatares Disponibles</h4>
                    <div className="flex flex-wrap gap-3">
                      {user.inventory.filter(i => i.type === 'avatar').map(item => (
                        <div key={item.id} className="relative group">
                           <div className={`w-14 h-14 rounded-full border-2 p-0.5 transition-all ${
                             item.unlocked 
                               ? 'border-slate-200 dark:border-dark-600 hover:border-primary-500 cursor-pointer' 
                               : 'border-slate-100 dark:border-dark-700 bg-slate-50 dark:bg-dark-900 opacity-60'
                             }`}>
                              <img 
                                src={item.preview} 
                                alt={item.name} 
                                className={`w-full h-full rounded-full ${!item.unlocked && 'grayscale blur-[1px]'}`} 
                              />
                           </div>
                           {!item.unlocked && (
                             <div className="absolute inset-0 flex items-center justify-center">
                               <Lock size={16} className="text-slate-500 drop-shadow-md" />
                             </div>
                           )}
                           
                           {/* Tooltip */}
                           <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                              {item.name} {!item.unlocked && `(Nivel ${item.requiredLevel})`}
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="w-full h-px bg-slate-100 dark:bg-dark-700"></div>

                  {/* Frames Section */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Marcos Exclusivos</h4>
                    <div className="flex flex-wrap gap-4">
                      {user.inventory.filter(i => i.type === 'frame').map(item => (
                        <div key={item.id} className="relative group">
                           <div className={`w-16 h-16 rounded-xl border border-slate-100 dark:border-dark-700 bg-slate-50 dark:bg-dark-900/50 flex items-center justify-center transition-all ${!item.unlocked && 'opacity-60'}`}>
                              <div className={`w-10 h-10 rounded-full border-2 ${item.preview} bg-slate-200 dark:bg-dark-600`}></div>
                           </div>
                           
                           {!item.unlocked && (
                             <div className="absolute inset-0 flex items-center justify-center">
                               <Lock size={16} className="text-slate-500" />
                             </div>
                           )}

                           {/* Tooltip */}
                           <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                              {item.name} {!item.unlocked && `(Nivel ${item.requiredLevel})`}
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};