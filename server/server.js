const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai"); 
const app = express();
const port = 8000;

app.use(cors());

const geminiApiKey = "Insert here"; 
const googleAI = new GoogleGenerativeAI(geminiApiKey);
const geminiModel = googleAI.getGenerativeModel({
    model: "gemini-pro", 
    temperature: 0.7,
    topP: 0.9,
    maxOutputTokens: 2000,
});

app.get("/recipestream", (req, res) => {
    const { ingredients, mealType, cuisine, cookingTime, complexity } = req.query;

    // SSE headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const sendEvent = (chunk) => {
        if (!chunk || !chunk.data) {
            console.error("Invalid chunk received:", chunk);
            res.write(`data: ${JSON.stringify({ action: "error", message: "Invalid response from Gemini" })}\n\n`);
            return;
        }
    
        const recipeText = chunk.data.parts?.map(part => part.text).join("\n") || chunk.data;
    
        res.write(`data: ${JSON.stringify({ action: "chunk", chunk: recipeText })}\n\n`);
    };
    

    const prompt = `
        You are a helpful assistant that generates recipes based on the user's input.
        Ingredients: ${ingredients}
        Meal Type: ${mealType}
        Cuisine Preference: ${cuisine}
        Cooking Time: ${cookingTime}
        Complexity: ${complexity}
        Generate a South Asian recipe based on the above information. Include steps for preparation and cooking.
    `;

    fetchGeminiMessage(prompt, sendEvent);

    req.on("close", () => res.end());
});

async function fetchGeminiMessage(prompt, sendEvent) {
    try {
        const response = await geminiModel.generateContent(prompt);
        console.log("[Server] Gemini Response:", JSON.stringify(response, null, 2));

        // Extract candidates
        const candidates = response?.response?.candidates || [];
        if (candidates.length === 0) {
            console.error("No candidates received from Gemini.");
            sendEvent({ action: "error", message: "No valid response from Gemini AI." });
            return;
        }

        candidates.forEach((candidate) => {
            const content = candidate?.content;
            if (content) {
                sendEvent({ action: "chunk", data: content });
            } else {
                console.warn("Candidate does not have content:", candidate);
            }
        });

        sendEvent({ action: "close" });
    } catch (error) {
        console.error("Error fetching Gemini message:", error.message);
        sendEvent({ action: "error", message: error.message });
    }
}


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
