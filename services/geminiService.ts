
import { GoogleGenAI } from "@google/genai";
import type { LatLng, GeminiResponse, GroundingChunk } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDisasterPlan = async (prompt: string, location: LatLng): Promise<GeminiResponse> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                tools: [{ googleMaps: {} }],
            },
            toolConfig: {
                retrievalConfig: {
                    latLng: {
                        latitude: location.latitude,
                        longitude: location.longitude,
                    }
                }
            }
        });

        const text = response.text;
        const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

        // Filter for chunks that are specifically from Google Maps
        const sources: GroundingChunk[] = rawChunks
            .filter((chunk: any) => chunk.maps && chunk.maps.uri && chunk.maps.title)
            .map((chunk: any) => ({
                maps: {
                    uri: chunk.maps.uri,
                    title: chunk.maps.title,
                }
            }));
        
        return { text, sources };
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to fetch data from Gemini API.");
    }
};
