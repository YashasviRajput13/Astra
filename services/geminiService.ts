
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSafetyAdvice = async (locationContext: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide 3 concise, highly actionable safety tips for a woman in this context: ${locationContext}. Focus on awareness and immediate actions. Keep it empathetic but serious.`,
    });
    return response.text ?? "Stay in well-lit areas, keep your phone accessible, and trust your intuition.";
  } catch (error) {
    console.error("Gemini failed:", error);
    return "Stay in well-lit areas, keep your phone accessible, and trust your intuition.";
  }
};

export const analyzeSituationForEmergencyContacts = async (transcriptionSnippet: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on this snippet of background audio during an SOS alert: "${transcriptionSnippet}", summarize the potential danger level and situational context for emergency contacts. Be direct and objective.`,
    });
    return response.text ?? "Situation analysis unavailable. Proceed with emergency protocol.";
  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return "Situation analysis unavailable. Proceed with emergency protocol.";
  }
};

export const analyzeCrowdDensity = async (signals: { audioDesc: string; btDeviceCount: number; motionIntensity: string }) => {
  try {
    const prompt = `Analyze environmental signals to estimate crowd density for an SOS safety event.
    Signals:
    - Ambient Sound: ${signals.audioDesc}
    - Bluetooth Proximity Devices: ${signals.btDeviceCount}
    - Motion Profile: ${signals.motionIntensity}

    Strict Rules:
    1. Classify density as exactly one of: LOW, MEDIUM, HIGH.
    2. Do NOT identify individuals.
    3. Focus on speed and privacy.
    4. Provide a 1-sentence reasoning for emergency contacts.

    Return JSON format: { "density": "LOW" | "MEDIUM" | "HIGH", "reasoning": "string" }`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const result = JSON.parse(response.text || '{"density": "UNKNOWN", "reasoning": "Processing signals..."}');
    return result;
  } catch (error) {
    console.error("Crowd analysis failed:", error);
    return { density: 'UNKNOWN', reasoning: 'Signal processing error' };
  }
};
