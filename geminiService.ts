
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "./constants";
import { Role, Message } from "./types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Always use process.env.API_KEY directly for initialization
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async sendMessage(history: Message[], currentMessage: string) {
    // Create a fresh instance for the call to ensure the latest API key is used
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Map history to the format expected by the API
    const contents = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    // Fix: Use the Role.USER enum instead of the string literal 'user' to resolve type mismatch
    contents.push({
      role: Role.USER,
      parts: [{ text: currentMessage }]
    });

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      // Directly access .text property as it is a getter, not a method
      return response.text;
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  }

  async *sendMessageStream(history: Message[], currentMessage: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const contents = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    // Fix: Use the Role.USER enum instead of the string literal 'user' to resolve type mismatch
    contents.push({
      role: Role.USER,
      parts: [{ text: currentMessage }]
    });

    try {
      const result = await ai.models.generateContentStream({
        model: 'gemini-3-pro-preview',
        contents: contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      for await (const chunk of result) {
        // Access .text property directly from the stream chunk
        yield chunk.text || "";
      }
    } catch (error) {
      console.error("Gemini Streaming Error:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
