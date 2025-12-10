import React from 'react';
import { Terminal, GraduationCap, School, ArrowRight } from 'lucide-react';

interface LandingProps {
  onLogin: (role: 'student' | 'teacher') => void;
}

export const Landing: React.FC<LandingProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px]"></div>
      
      {/* Header */}
      <header className="relative z-10 px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="text-primary-500" size={32} />
          <span className="text-xl font-bold tracking-tight">TELOPROGRAMO</span>
        </div>
        <button className="text-sm text-slate-400 hover:text-white transition-colors">
          Ayuda
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Domina el código.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-emerald-400">
              A tu propio ritmo.
            </span>
          </h1>
          <p className="text-lg text-slate-400 mb-8">
            La plataforma interactiva para estudiantes universitarios con asistencia de IA 24/7.
            Resuelve ejercicios, compite en el ranking y desbloquea logros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {/* Student Card */}
          <button 
            onClick={() => onLogin('student')}
            className="group relative bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-primary-500/50 p-8 rounded-3xl text-left transition-all duration-300 hover:shadow-2xl hover:shadow-primary-900/20 flex flex-col gap-4"
          >
            <div className="w-14 h-14 bg-primary-900/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
               <GraduationCap className="text-primary-400" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                Soy Estudiante
                <ArrowRight className="opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all text-primary-400" size={20} />
              </h2>
              <p className="text-slate-400 text-sm">
                Accede a mis cursos, ejercicios y ranking.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center gap-2 text-xs text-slate-500">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
               Sistema Online
            </div>
          </button>

          {/* Teacher Card */}
          <button 
            onClick={() => onLogin('teacher')}
            className="group relative bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/50 p-8 rounded-3xl text-left transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-900/20 flex flex-col gap-4"
          >
            <div className="w-14 h-14 bg-emerald-900/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
               <School className="text-emerald-400" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                Soy Docente
                <ArrowRight className="opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all text-emerald-400" size={20} />
              </h2>
              <p className="text-slate-400 text-sm">
                Gestionar cursos, ver analíticas y progreso.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center gap-2 text-xs text-slate-500">
               <span className="w-2 h-2 rounded-full bg-slate-600"></span>
               Acceso Restringido
            </div>
          </button>
        </div>
      </main>

      <footer className="relative z-10 py-6 text-center text-slate-600 text-sm">
        © 2024 TELOPROGRAMO University. Todos los derechos reservados.
      </footer>
    </div>
  );
};