import { GoogleGenAI } from "@google/genai";
import { CreatorProfile, BrandInput, OutreachPackResponse } from "@/types";
import { buildPitchPackPrompt } from "./prompts/pitch-pack-prompt";

const MODEL = "gemini-2.5-flash";

export async function generateFullPack(
  profile: CreatorProfile,
  brand: BrandInput,
  byokKey?: string | null
): Promise<OutreachPackResponse> {
  const ai = new GoogleGenAI(byokKey ? { apiKey: byokKey } : {});

  const prompt = buildPitchPackPrompt(profile, brand);



  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
    config: {
      systemInstruction: "You are an expert creator-economy pitch writer. Return valid JSON only.",
      temperature: 0.85,
      responseMimeType: "application/json",
    },
  });

  const raw = response.text ?? "";

  
  const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  return JSON.parse(cleaned) as OutreachPackResponse;
}
