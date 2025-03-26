import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyCo7XfhyVTmaWm0b3PtFNMKP8lpTz7JRAw";

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
    if (
      error.message.includes("too many requests") ||
      error.message.includes("rate limit") ||
      error.message.includes("overloaded") ||
      error.message.includes("capacity exceeded")
    ) {
      return "The AI is currently experiencing high demand. Please try again later.";
    }
    return `Error: ${error.message}`;
  }
};

export default askAI;
