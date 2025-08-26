import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";
import { getCurrentWeather, getLocation } from "./tools.js";

// Initialize Gemini client
const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY, // set in your environment
});

// Example: agent that gives activity ideas
async function main() {
  // get actual values
  const weather = await getCurrentWeather();
  const location = await getLocation();

  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash", // choose a Gemini model
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Give me a list of activity ideas based on my current location of ${location} and weather of ${weather}`,
          },
        ],
      },
    ],
  });

  // response.text is a shortcut for first text output
  console.log(response.text);
}

main();
