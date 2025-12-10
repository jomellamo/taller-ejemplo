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
    
    // Construct a context-aware prompt based on history
    // Note: In a production app using ai.chats.create is better for session management,
    // but here we construct the prompt statefully for simplicity.
    
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