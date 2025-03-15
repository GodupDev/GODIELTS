const API_KEY = "AIzaSyCo7XfhyVTmaWm0b3PtFNMKP8lpTz7JRAw";

import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  getPromptTypeOfInput,
  getPromptWordData,
  getPromptSentenceData,
} from "./prompt";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const askAI = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    if (result && result.response && result.response.text) {
      return result.response.text();
    } else {
      console.error("Unexpected response structure:", result);
      return "Error: Could not extract text from response.";
    }
  } catch (error) {
    console.error("Error generating content:", error);
    return `Error: ${error.message}`;
  }
};

const getTypeOfInput = async (input) => {
  const result = await askAI(getPromptTypeOfInput(input));
  return result.replace(/\n/g, "");
};

const getWordData = async (word) => {
  try {
    let result = await askAI(getPromptWordData(word));
    result = result
      .trim()
      .replace(/```json|```/g, "")
      .replace(/\n/g, " ");
    return JSON.parse(result);
  } catch (error) {
    console.error("Error parsing AI response:", error);
    return null;
  }
};

const getSentenceData = async (sentence) => {
  try {
    let result = await askAI(getPromptSentenceData(sentence));
    result = result
      .trim()
      .replace(/```json|```/g, "")
      .replace(/\n/g, " ");
    return JSON.parse(result);
  } catch (error) {
    console.error("Error parsing AI response:", error);
    return null;
  }
};

export { askAI, getTypeOfInput, getWordData, getSentenceData };
