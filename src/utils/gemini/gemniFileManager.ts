import { GoogleAIFileManager } from "@google/generative-ai/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";

export const geminiFileManager = new GoogleAIFileManager(process.env.NEXT_GEMINI_API_KEY!);