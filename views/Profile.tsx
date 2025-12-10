import React, { useState } from 'react';
import { User, CosmeticsItem } from '../types';
import { Mail, Calendar, Award, Zap, Star, Edit2, MapPin, Check, Lock, X, Eye, EyeOff, Globe } from 'lucide-react';

interface ProfileProps {
  user: User;
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNickname, setEditedNickname] = useState(user.nickname);
  const [activeTab, setActiveTab] = useState<'overview' | 'customization'>('overview');
  // Local state to force re-render on privacy toggle since user object is mutable reference in this mock
  const [isPublic, setIsPublic] = useState(user.isPublic);
  
  // Mock function to "save"
  const handleSave = () => {
    user.nickname = editedNickname; // In a real app, dispatch an action
    setIsEditing(false);
  };

  const togglePrivacy = () => {
    user.isPublic = !user.isPublic;
    setIsPublic(user.isPublic);
  };

  const getFrameStyle = (frameId: string | null) => {
    const frame = user.inventory.find(i => i.id === frameId);
    return frame ? frame.preview : 'border-white dark:border-dark-800';
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto pb-10">
      
      {/* Profile Header Card */}
      <div className="bg-white dark:bg-dark-800 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-dark-700 relative">
        {/* Banner Background */}
        <div className="h-32 bg-gradient-to-r from-primary-600 to-primary-400 relative">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
        </div>
        
        <div className="px-8 pb-8">
          <div className="relative flex flex-col md:flex-row justify-between items-end -mt-12 mb-6 gap-4">
             <div className="flex items-end gap-6">
               <div className="relative group cursor-pointer" onClick={() => setActiveTab('customization')}>
                 {/* Dynamic Frame */}
                 <div className={`absolute -inset-1 rounded-full border-4 ${getFrameStyle(user.frame)} pointer-events-none z-10`}></div>
                 
                 <img 
                   src={user.avatar} 
                   alt={user.nickname} 
                   className="w-32 h-32 rounded-full border-4 border-white dark:border-dark-800 shadow-md bg-white relative z-0" 
                 />
                 <div className="absolute bottom-1 right-1 z-20 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full border-2 border-white dark:border-dark-800 shadow-sm">
                   Lvl {user.level}
                 </div>
                 <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 backdrop-blur-[1px]">
                    <Edit2 className="text-white" size={24} />
                 </div>
               </div>
               
               <div className="mb-2">
                 {isEditing ? (
                   <div className="flex items-center gap-2">
                      <input 
                        value={editedNickname}
                        onChange={(e) => setEditedNickname(e.target.value)}
                        className="bg-slate-100 dark:bg-dark-700 text-slate-900 dark:text-white px-3 py-1 rounded-lg font-bold text-2xl outline-none border-2 border-primary-500"
                        autoFocus
                      />
                      <button onClick={handleSave} className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"><Check size={18} /></button>
                      <button onClick={() => setIsEditing(false)} className="p-2 bg-slate-200 text-slate-600 rounded-lg hover:bg-slate-300"><X size={18} /></button>
                   </div>
                 ) : (
                   <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                     {user.nickname}
                     <span className={`text-xs font-normal border px-2 py-1 rounded-full flex items-center gap-1 ${isPublic ? 'bg-primary-50 text-primary-600 border-primary-200' : 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-dark-700 dark:text-slate-400 dark:border-dark-600'}`}>
                        {isPublic ? <Globe size={12} /> : <EyeOff size={12} />}
                        {isPublic ? 'Público' : 'Anónimo'}
                     </span>
                   </h1>
                 )}
                 <p className="text-slate-500 dark:text-slate-400 font-medium">Estudiante de Ingeniería</p>
               </div>
             </div>
             
             <div className="flex gap-2">
               <button 
                  onClick={() => setActiveTab('customization')}
                  className={`px-4 py-2 rounded-xl font-medium text-sm transition-colors flex items-center gap-2 ${activeTab === 'customization' ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-dark-700 hover:bg-slate-200 dark:hover:bg-dark-600 text-slate-700 dark:text-slate-200'}`}
                >
                  <Edit2 size={16} />
                  Personalizar
                </button>
               {!isEditing && (
                 <button 
                   onClick={() => setIsEditing(true)}
                   className="px-4 py-2 bg-slate-100 dark:bg-dark-700 hover:bg-slate-200 dark:hover:bg-dark-600 text-slate-700 dark:text-slate-200 rounded-xl font-medium text-sm transition-colors"
                 >
                   Editar Info
                 </button>
               )}
             </div>
          </div>

          {activeTab === 'overview' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
              <div className="md:col-span-2 space-y-6">
                
                {/* Privacy Toggle Section */}
                <div className="bg-slate-50 dark:bg-dark-900/30 p-4 rounded-xl border border-slate-100 dark:border-dark-700 flex items-center justify-between">
                   <div>
                     <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                       {isPublic ? <Eye size={18} className="text-primary-500" /> : <EyeOff size={18} className="text-slate-500" />}
                       Visibilidad del Perfil
                     </h4>
                     <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                       {isPublic 
                         ? "Tu nombre real y perfil completo son visibles para otros." 
                         : "Estás en modo anónimo. Solo se muestra tu Apodo y Avatar."}
                     </p>
                   </div>
                   <button 
                     onClick={togglePrivacy}
                     className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${isPublic ? 'bg-primary-600' : 'bg-slate-300 dark:bg-dark-600'}`}
                   >
                     <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isPublic ? 'translate-x-6' : 'translate-x-1'}`} />
                   </button>
                </div>

                {/* Bio Section */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Sobre mí</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-dark-900/50 p-4 rounded-xl border border-slate-100 dark:border-dark-700">
                    {user.bio}
                  </p>
                </div>

                {/* Personal Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-dark-900/50 rounded-xl">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Email</p>
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-200 truncate">{user.email}</p>
                      </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-dark-900/50 rounded-xl">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                        <Calendar size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Miembro desde</p>
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-200">{user.joinDate}</p>
                      </div>
                  </div>
                </div>

                {/* Achievements Section */}
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Award className="text-amber-500" />
                    Logros
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {user.achievements.map((achievement) => (
                      <div key={achievement.id} className="bg-white dark:bg-dark-800 p-3 rounded-xl border border-slate-100 dark:border-dark-700 shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-0.5">{achievement.name}</h4>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">{achievement.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats Sidebar */}
              <div className="space-y-4">
                <div className="bg-slate-50 dark:bg-dark-900/50 rounded-2xl p-5 border border-slate-100 dark:border-dark-700">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Estadísticas</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Zap size={20} className="text-yellow-500 fill-yellow-500" />
                            <span className="text-slate-600 dark:text-slate-300 font-medium">Racha actual</span>
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white">{user.streak} días</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Star size={20} className="text-amber-500" />
                            <span className="text-slate-600 dark:text-slate-300 font-medium">Total XP</span>
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white">{user.xp} XP</span>
                      </div>

                      <div className="w-full bg-slate-200 dark:bg-dark-700 h-px"></div>

                      <div className="pt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-500">Nivel {user.level}</span>
                          <span className="text-slate-500">Nivel {user.level + 1}</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-dark-700 rounded-full h-2">
                            <div className="bg-primary-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                        <p className="text-xs text-center mt-1 text-slate-400">350 XP para el siguiente nivel</p>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                 <h2 className="text-xl font-bold text-slate-900 dark:text-white">Personalización</h2>
                 <button onClick={() => setActiveTab('overview')} className="text-sm text-primary-600 hover:underline">Volver al perfil</button>
              </div>

              {/* Avatar Selection */}
              <div className="mb-8">
                 <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Avatares</h3>
                 <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                    {user.inventory.filter(i => i.type === 'avatar').map(item => (
                      <div 
                        key={item.id}
                        onClick={() => item.unlocked && (user.avatar = item.preview)} // Simple mutation for mock
                        className={`relative group cursor-pointer rounded-2xl p-2 border-2 transition-all ${user.avatar === item.preview ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' : 'border-slate-100 dark:border-dark-700 hover:border-slate-300'}`}
                      >
                         <img src={item.preview} alt={item.name} className={`w-full aspect-square rounded-full ${!item.unlocked && 'grayscale opacity-50'}`} />
                         {!item.unlocked && (
                           <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl">
                             <Lock size={20} className="text-slate-700" />
                           </div>
                         )}
                         {user.avatar === item.preview && (
                           <div className="absolute -top-2 -right-2 bg-primary-500 text-white p-1 rounded-full">
                             <Check size={12} />
                           </div>
                         )}
                      </div>
                    ))}
                 </div>
              </div>

              {/* Frame Selection */}
              <div>
                 <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Marcos de Perfil</h3>
                 <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                    {user.inventory.filter(i => i.type === 'frame').map(item => (
                      <div 
                        key={item.id}
                        onClick={() => item.unlocked && (user.frame = item.id)} // Simple mutation for mock
                        className={`relative group cursor-pointer rounded-2xl p-4 border-2 flex flex-col items-center justify-center gap-2 transition-all h-32 ${user.frame === item.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' : 'border-slate-100 dark:border-dark-700 hover:border-slate-300'}`}
                      >
                         <div className={`w-16 h-16 rounded-full border-4 ${item.preview} bg-slate-200 dark:bg-dark-600`}></div>
                         <span className="text-xs font-medium text-center">{item.name}</span>
                         
                         {!item.unlocked && (
                           <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-dark-800/80 rounded-xl backdrop-blur-[1px]">
                             <Lock size={20} className="text-slate-400 mb-1" />
                             <span className="text-[10px] text-slate-500">Lvl {item.requiredLevel}</span>
                           </div>
                         )}
                         {user.frame === item.id && (
                           <div className="absolute -top-2 -right-2 bg-primary-500 text-white p-1 rounded-full">
                             <Check size={12} />
                           </div>
                         )}
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};