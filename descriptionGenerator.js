const axios = require("axios");
require("dotenv").config();

async function generateDescription(imagePath, prompt) {
    try {
        // Simulating AI description (Replace with OpenAI or Gemini API)
        return `This is a detailed AI-generated description for the landmark with the given prompt: "${prompt}".`;
        
        // For OpenAI (Replace 'YOUR_OPENAI_API_KEY' with your actual API key)
        /*
        const response = await axios.post("https://api.openai.com/v1/completions", {
            model: "gpt-4",
            prompt: `Describe this landmark: ${prompt}`,
            max_tokens: 200,
        }, {
            headers: { "Authorization": `Bearer ${process.env.OPENAI_API_KEY}` }
        });
        return response.data.choices[0].text.trim();
        */
    } catch (error) {
        console.error("AI API Error:", error);
        throw new Error("Failed to generate description");
    }
}

module.exports = { generateDescription };
