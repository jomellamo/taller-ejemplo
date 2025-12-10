import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, LifeBuoy } from 'lucide-react';
import { ChatMessage } from '../types';
import { getGeneralSupportResponse } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

export const SupportChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: 'welcome',
    role: 'model',
    text: '¡Hola! Soy el soporte 24/7 de TELOPROGRAMO. ¿En qué te puedo ayudar hoy? 🛠️',
    timestamp: Date.now()
  }]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    const reply = await getGeneralSupportResponse(messages, userMsg.text);

    setMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: reply,
      timestamp: Date.now()
    }]);
    setIsThinking(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* Chat Window */}
      <div 
        className={`bg-white dark:bg-dark-800 w-80 sm:w-96 rounded-2xl shadow-2xl border border-slate-200 dark:border-dark-700 overflow-hidden transition-all duration-300 pointer-events-auto mb-4 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0 h-0 w-0'
        }`}
        style={{ maxHeight: '500px' }}
      >
        {/* Header */}
        <div className="bg-primary-600 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <LifeBuoy size={20} />
            <span className="font-bold">Soporte 24/7</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-primary-700 p-1 rounded-full transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div 
          ref={scrollRef}
          className="p-4 h-80 overflow-y-auto bg-slate-50 dark:bg-dark-900/50 space-y-3 custom-scrollbar"
        >
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
               <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                 msg.role === 'user' 
                 ? 'bg-primary-600 text-white rounded-br-none' 
                 : 'bg-white dark:bg-dark-700 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-dark-600 rounded-bl-none'
               }`}>
                 <ReactMarkdown>{msg.text}</ReactMarkdown>
               </div>
            </div>
          ))}
          {isThinking && (
             <div className="flex justify-start">
               <div className="bg-white dark:bg-dark-700 px-3 py-2 rounded-2xl rounded-bl-none text-xs text-slate-400 border border-slate-100 dark:border-dark-600">
                 Escribiendo...
               </div>
             </div>
          )}
        </div>

        {/* Input */}
        <div className="p-3 bg-white dark:bg-dark-800 border-t border-slate-100 dark:border-dark-700 flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="¿Necesitas ayuda?"
            className="flex-1 text-sm bg-slate-100 dark:bg-dark-900 text-slate-900 dark:text-white rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-xl transition-colors disabled:opacity-50"
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-lg transition-all duration-300 pointer-events-auto flex items-center gap-2 font-medium ${
          isOpen 
            ? 'bg-slate-200 text-slate-600 rotate-90 scale-0' 
            : 'bg-primary-600 hover:bg-primary-700 text-white hover:scale-105'
        }`}
      >
        <MessageSquare size={24} />
      </button>
    </div>
  );
};