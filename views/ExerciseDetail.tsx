import React, { useState, useEffect, useRef } from 'react';
import { Exercise, ChatMessage } from '../types';
import { ArrowLeft, Play, Sparkles, Check, RotateCcw, AlertCircle, Send, FileText, MessageCircle, Star } from 'lucide-react';
import { getAIChatResponse } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface ExerciseDetailProps {
  exercise: Exercise;
  onBack: () => void;
  onComplete: (exerciseId: string) => void;
}

export const ExerciseDetail: React.FC<ExerciseDetailProps> = ({ exercise, onBack, onComplete }) => {
  const [code, setCode] = useState(exercise.initialCode);
  const [activeTab, setActiveTab] = useState<'description' | 'chat'>('description');
  const [executionResult, setExecutionResult] = useState<{status: 'success' | 'error' | 'idle', message: string}>({ status: 'idle', message: '' });
  
  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Rating State
  const [difficultyRating, setDifficultyRating] = useState<number>(0);
  const [isRatingSubmitted, setIsRatingSubmitted] = useState(false);

  // Reset state when exercise changes
  useEffect(() => {
    setCode(exercise.initialCode);
    setExecutionResult({ status: 'idle', message: '' });
    setMessages([{
      id: 'welcome',
      role: 'model',
      text: `¡Hola! Soy tu asistente de IA. Estoy aquí para ayudarte con el ejercicio "${exercise.title}". ¿En qué te has atascado?`,
      timestamp: Date.now()
    }]);
    setDifficultyRating(0);
    setIsRatingSubmitted(false);
    setActiveTab('description');
  }, [exercise]);

  // Auto-scroll chat
  useEffect(() => {
    if (activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeTab]);

  const handleRunCode = () => {
    setExecutionResult({ status: 'idle', message: 'Ejecutando...' });
    
    setTimeout(() => {
      // Simulate success
      setExecutionResult({ 
        status: 'success', 
        message: '¡Pruebas pasadas correctamente!\nOutput:\n> Test 1: Passed\n> Test 2: Passed' 
      });
      // Automatically prompt for rating if not done
      if (!isRatingSubmitted) {
        // Could open a modal or highlight rating area
      }
    }, 1500);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputMessage,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsAiThinking(true);

    const responseText = await getAIChatResponse(exercise, code, messages, userMsg.text);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsAiThinking(false);
  };

  const handleRating = (stars: number) => {
    setDifficultyRating(stars);
    setIsRatingSubmitted(true);
    // Here you would send the rating to the backend to update the "Ranking"
    console.log(`Rated difficulty: ${stars}/5 for exercise ${exercise.id}`);
  };

  const getDifficultyLabel = (stars: number) => {
    switch(stars) {
      case 1: return "Muy Fácil";
      case 2: return "Fácil";
      case 3: return "Intermedio";
      case 4: return "Difícil";
      case 5: return "Muy Difícil";
      default: return "Calificar";
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col md:flex-row gap-6 animate-fade-in pb-4">
      
      {/* LEFT PANEL: Tabs (Description / Chat) */}
      <div className="w-full md:w-1/3 flex flex-col gap-4">
        <button 
          onClick={onBack}
          className="flex items-center text-sm text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors w-fit"
        >
          <ArrowLeft size={16} className="mr-1" />
          Volver
        </button>

        {/* Tab Navigation */}
        <div className="bg-slate-200 dark:bg-dark-700 p-1 rounded-xl flex gap-1">
          <button
            onClick={() => setActiveTab('description')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all ${
              activeTab === 'description' 
                ? 'bg-white dark:bg-dark-800 text-slate-900 dark:text-white shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <FileText size={16} />
            Enunciado
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all ${
              activeTab === 'chat' 
                ? 'bg-white dark:bg-dark-800 text-emerald-600 dark:text-emerald-400 shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400'
            }`}
          >
            <MessageCircle size={16} />
            Asistente IA
          </button>
        </div>

        {/* Panel Content */}
        <div className="flex-1 bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-slate-100 dark:border-dark-700 overflow-hidden flex flex-col">
          
          {/* DESCRIPTION TAB */}
          {activeTab === 'description' && (
            <div className="p-6 h-full overflow-y-auto custom-scrollbar flex flex-col">
              <div className="flex items-start justify-between mb-4">
                 <h1 className="text-xl font-bold text-slate-900 dark:text-white">{exercise.title}</h1>
                 <span className={`text-xs px-2 py-1 rounded border ${
                    exercise.difficulty === 'Fácil' ? 'bg-green-50 text-green-700 border-green-200' :
                    'bg-yellow-50 text-yellow-700 border-yellow-200'
                  }`}>
                    {exercise.difficulty}
                 </span>
              </div>
              <div className="prose dark:prose-invert prose-sm text-slate-600 dark:text-slate-300 flex-1">
                <p>{exercise.fullDescription}</p>
                <div className="mt-6 p-4 bg-slate-50 dark:bg-dark-900/50 rounded-lg border border-slate-100 dark:border-dark-700">
                  <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Requisitos</h4>
                  <ul className="list-disc list-inside text-xs text-slate-500 dark:text-slate-400 space-y-1">
                    <li>Usar sintaxis correcta.</li>
                    <li>Manejar casos borde.</li>
                    <li>Retornar el tipo de dato esperado.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* CHAT TAB */}
          {activeTab === 'chat' && (
            <div className="flex flex-col h-full">
              <div className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-4 bg-slate-50 dark:bg-dark-900/30">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div 
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                        msg.role === 'user' 
                          ? 'bg-primary-600 text-white rounded-br-none' 
                          : 'bg-white dark:bg-dark-700 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-dark-600 rounded-bl-none'
                      }`}
                    >
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  </div>
                ))}
                {isAiThinking && (
                  <div className="flex justify-start">
                     <div className="bg-white dark:bg-dark-700 px-4 py-3 rounded-2xl rounded-bl-none border border-slate-100 dark:border-dark-600">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                        </div>
                     </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-3 bg-white dark:bg-dark-800 border-t border-slate-100 dark:border-dark-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Escribe tu duda aquí..."
                    className="flex-1 bg-slate-100 dark:bg-dark-900 text-slate-900 dark:text-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isAiThinking}
                    className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT PANEL: Editor */}
      <div className="w-full md:w-2/3 flex flex-col gap-4">
        {/* Editor Toolbar */}
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-2">
              <span className="text-sm font-mono text-slate-500 bg-slate-100 dark:bg-dark-800 px-3 py-1 rounded-md">main.py</span>
           </div>
           <div className="flex items-center gap-3">
              <button 
                onClick={() => setCode(exercise.initialCode)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                title="Resetear código"
              >
                <RotateCcw size={18} />
              </button>
           </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1 bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg border border-slate-800 relative group">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full bg-transparent text-slate-200 font-mono text-sm p-6 resize-none focus:outline-none leading-relaxed"
            spellCheck="false"
          />
          {/* Quick Chat Toggle Button (Floating) */}
          {activeTab !== 'chat' && (
             <button
              onClick={() => setActiveTab('chat')}
              className="absolute bottom-6 right-6 bg-emerald-600 hover:bg-emerald-500 text-white p-3 rounded-full shadow-lg shadow-emerald-900/20 transition-all transform hover:scale-105"
              title="Abrir Chat IA"
            >
              <Sparkles size={20} />
            </button>
          )}
        </div>

        {/* Action Bar & Feedback */}
        <div className="bg-white dark:bg-dark-800 rounded-xl p-4 border border-slate-100 dark:border-dark-700 shadow-sm flex flex-col gap-4">
           {/* Console Output */}
           {executionResult.status !== 'idle' && (
             <div className={`p-3 rounded-lg text-xs font-mono mb-2 flex items-start justify-between ${
               executionResult.status === 'success' ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300' : 'bg-red-50 text-red-800'
             }`}>
               <pre>{executionResult.message}</pre>
               
               {/* RATING SYSTEM - Visible on success */}
               {executionResult.status === 'success' && (
                 <div className="flex flex-col items-end gap-1 ml-4 animate-fade-in">
                    <span className="text-[10px] uppercase font-bold text-green-700 dark:text-green-400 opacity-70">
                      {isRatingSubmitted ? '¡Gracias por calificar!' : '¿Qué tan difícil fue?'}
                    </span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRating(star)}
                          onMouseEnter={() => !isRatingSubmitted && setDifficultyRating(star)}
                          className="focus:outline-none transition-transform hover:scale-110"
                          disabled={isRatingSubmitted}
                          title={getDifficultyLabel(star)}
                        >
                          <Star 
                            size={16} 
                            className={`${
                              star <= difficultyRating 
                                ? 'fill-amber-400 text-amber-400' 
                                : 'fill-transparent text-slate-300 dark:text-slate-600'
                            }`} 
                          />
                        </button>
                      ))}
                    </div>
                    {!isRatingSubmitted && difficultyRating > 0 && (
                      <span className="text-[10px] text-slate-500 font-medium">
                        {getDifficultyLabel(difficultyRating)}
                      </span>
                    )}
                 </div>
               )}
             </div>
           )}

           <div className="flex justify-end">
              <button
                onClick={handleRunCode}
                className="bg-primary-600 hover:bg-primary-500 text-white px-6 py-2.5 rounded-lg font-medium shadow-md shadow-primary-500/20 flex items-center gap-2 transition-all active:scale-95"
              >
                <Play size={18} fill="currentColor" />
                Ejecutar y Enviar
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};