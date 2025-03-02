const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Initialize Gemini AI
const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

/**
 * Queries Gemini AI for legal advice.
 * @param {string} userQuery - The legal question from the user.
 * @returns {Promise<string>} - Returns Gemini AI's structured response.
 */
async function askGemini(userQuery) {
  try {
    const structuredPrompt = `
    You are an expert legal assistant providing guidance to someone in need of legal assistance. 

    Respond in the first person and directly address the user with "you" instead of referring to them in the third person. Do not use markdown formatting such as **bold** or \n for new lines—format your response as a single cohesive paragraph.
    
    The user is seeking legal help regarding: "${userQuery}"
    
    Provide a structured but concise response covering:
    1. The legal actions they can take.
    2. Where they should report the issue.
    3. The steps they need to follow after reporting.
    4. Available NGOs, support groups, and government resources that can assist them.
    5. Information on pro bono lawyers or legal aid services they can access.
    
    Ensure that the response is legally accurate, easy to understand, and provßides clear next steps in a professional yet empathetic tone.    
    `;

    const result = await model.generateContent(structuredPrompt);
    const response = await result.response.text();

    console.log("Gemini AI Response:", response);
    return response;
  } catch (error) {
    console.error("Error querying Gemini AI:", error);
    return "Sorry, we couldn't process your request at this moment. Please try again later.";
  }
}

module.exports = { askGemini };