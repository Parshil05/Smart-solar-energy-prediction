
import { GoogleGenAI, Type } from "@google/genai";
import { PredictionInputData, PredictionOutputData } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        predictedOutput: {
            type: Type.OBJECT,
            properties: {
                daily: { type: Type.NUMBER, description: "Total predicted output for the next 24 hours in kWh." },
                weekly: { type: Type.NUMBER, description: "Total predicted output for the next 7 days in kWh." },
                monthly: { type: Type.NUMBER, description: "Total predicted output for the next 30 days in kWh." },
            },
            required: ['daily', 'weekly', 'monthly'],
        },
        timeSeries: {
            type: Type.ARRAY,
            description: "An array of predicted solar output for the next 24 hours, with one data point per hour.",
            items: {
                type: Type.OBJECT,
                properties: {
                    time: { type: Type.STRING, description: "The hour of the day in 'HH:00' format." },
                    output: { type: Type.NUMBER, description: "The predicted power output in Watts (W) for that hour." },
                },
                required: ['time', 'output'],
            },
        },
        recommendations: {
            type: Type.OBJECT,
            properties: {
                optimalTilt: { type: Type.NUMBER, description: "The optimal tilt angle in degrees for maximum solar energy capture." },
                optimalAzimuth: { type: Type.NUMBER, description: "The optimal azimuth angle in degrees (e.g., 180 for South in Northern Hemisphere)." },
                maximizedOutput: { type: Type.NUMBER, description: "The total predicted daily output in kWh at optimal angles." },
                improvementPercentage: { type: Type.NUMBER, description: "The percentage improvement over the current configuration." },
            },
            required: ['optimalTilt', 'optimalAzimuth', 'maximizedOutput', 'improvementPercentage'],
        },
        environmentalFactors: {
            type: Type.OBJECT,
            properties: {
                averageTemperature: { type: Type.NUMBER, description: "Average predicted temperature in Celsius for the next 24 hours." },
                cloudCover: { type: Type.NUMBER, description: "Average predicted cloud cover percentage for the next 24 hours." },
                humidity: { type: Type.NUMBER, description: "Average predicted humidity percentage for the next 24 hours." },
                windSpeed: { type: Type.NUMBER, description: "Average predicted wind speed in km/h for the next 24 hours." },
            },
            required: ['averageTemperature', 'cloudCover', 'humidity', 'windSpeed'],
        },
    },
    required: ['predictedOutput', 'timeSeries', 'recommendations', 'environmentalFactors'],
};


export const getSolarPrediction = async (input: PredictionInputData): Promise<PredictionOutputData> => {
    try {
        const prompt = `
            You are an expert AI model specializing in solar energy prediction. Based on the following user-provided data, generate a detailed solar power prediction and optimization report.

            User Data:
            - Location (City): ${input.city}
            - Panel Type: ${input.panelType}
            - Panel Surface Area: ${input.surfaceArea} square meters
            - Current Tilt Angle: ${input.tiltAngle} degrees
            - Current Azimuth Angle: ${input.azimuthAngle} degrees

            Please provide the output in a structured JSON format that strictly adheres to the provided schema.
            - The time series data must cover the next 24 hours, with exactly 24 hourly data points.
            - The environmental factors should be an average prediction for the next 24 hours.
            - The recommendations should provide the absolute optimal angles for this location and the current time of year to maximize energy generation.
            - Ensure all numerical values are returned as numbers, not strings.

            The response must be only the JSON object, with no additional text or markdown formatting.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedData = JSON.parse(jsonText);

        // Basic validation
        if (!parsedData.predictedOutput || !parsedData.timeSeries || !parsedData.recommendations) {
            throw new Error("Invalid data structure received from API.");
        }
        
        return parsedData as PredictionOutputData;

    } catch (error) {
        console.error("Error fetching solar prediction:", error);
        throw new Error("Failed to get solar prediction. Please check your inputs and try again.");
    }
};
