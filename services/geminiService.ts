import { GoogleGenAI } from "@google/genai";
import { Exercise, ChatMessage } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getAIChatResponse = async (
  exercise: Exercise, 
  userCode: string, 
  history: ChatMessage[], 
  newMessage: string
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const conversationHistory = history.map(msg => 
      `${msg.role === 'user' ? 'Estudiante' : 'Tutor'}: ${msg.text}`
    ).join('\n');

    const prompt = `
      Actúa como un tutor experto de programación para estudiantes universitarios.
      
      CONTEXTO DEL EJERCICIO:
      Título: ${exercise.title}
      Descripción: ${exercise.fullDescription}
      
      CÓDIGO ACTUAL DEL ESTUDIANTE:
      \`\`\`python
      ${userCode}
      \`\`\`
      
      HISTORIAL DE CONVERSACIÓN:
      ${conversationHistory}
      
      NUEVO MENSAJE DEL ESTUDIANTE:
      ${newMessage}
      
      INSTRUCCIONES PARA EL TUTOR:
      1. Responde de manera conversacional, breve y alentadora.
      2. NO des la solución completa del ejercicio. Guía al estudiante.
      3. Si el estudiante pregunta algo fuera de tema, redirígelo al ejercicio amablemente.
      4. Usa formato Markdown para resaltar conceptos clave o código.
      5. Responde en Español.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Lo siento, no pude procesar tu mensaje en este momento.";
  } catch (error) {
    console.error("Error fetching AI help:", error);
    return "Hubo un error de conexión. Por favor intenta de nuevo.";
  }
};

export const getGeneralSupportResponse = async (
  history: ChatMessage[],
  newMessage: string
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const conversationHistory = history.map(msg => 
      `${msg.role === 'user' ? 'Usuario' : 'Soporte'}: ${msg.text}`
    ).join('\n');

    const prompt = `
      Actúa como "Soporte TELOPROGRAMO", un asistente de ayuda técnica y motivacional para una plataforma de aprendizaje de programación.
      
      HISTORIAL:
      ${conversationHistory}
      
      USUARIO:
      ${newMessage}
      
      INSTRUCCIONES:
      1. Tu objetivo es ayudar al usuario a navegar la app, resolver dudas técnicas sobre la plataforma, o motivarlo.
      2. La app tiene: Cursos, Ranking, Perfil (con logros y marcos desbloqueables), y Ejercicios.
      3. Sé amable, profesional y conciso.
      4. Si preguntan código específico, diles que entren a un curso y usen la ayuda del ejercicio.
      5. Responde en Español.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Disculpa, estoy teniendo problemas técnicos.";
  } catch (error) {
    console.error("Error support chat:", error);
    return "Error de conexión con el soporte.";
  }
};