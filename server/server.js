const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const app = express();
const port = 8000;

app.use(cors());

app.get("/recipestream", (req, res) => {
    const ingredients = req.query.ingredients;
    const mealType = req.query.mealType;
    const cuisine = req.query.cuisine;
    const cookingTime = req.query.cookingTime;
    const complexity = req.query.complexity;

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const sendEvent = (chunk) => {
        let chunkResponse;
        if (chunk.choices[0].finish_reason === "stop") {
            res.write(`data: ${JSON.stringify({ action: "close" })}\n\n`);
        } else {
            if (
                chunk.choices[0].delta.role &&
                chunk.choices[0].delta.role === "assistant"
            ) {
                chunkResponse = {
                    action: "start",
                };
            } else {
                chunkResponse = {
                    action: "chunk",
                    chunk: chunk.choices[0].delta.content,
                };
            }
            res.write(`data: ${JSON.stringify(chunkResponse)}\n\n`);
        }
    };

    const prompt = [];
    prompt.push(`You are a helpful assistant that generates recipes based on the user's input.`);
    prompt.push(`Ingredients: ${ingredients}`);
    prompt.push(`Meal Type: ${mealType}`);
    prompt.push(`Cuisine Preference: ${cuisine}`);
    prompt.push(`Cooking Time: ${cookingTime}`);
    prompt.push(`Complexity: ${complexity}`);
    // prompt.push({"Ingredients: ${ingredients}, Meal Type: ${mealType}, Cuisine: ${cuisine}, Cooking Time: ${cookingTime}, Complexity: ${complexity}");
    // prompt.push({"Generate a south asian recipe based on the above information. The recipe should include steps for preparation and cooking."});
    prompt.push(`Generate a south asian recipe based on the above information. The recipe should include steps for preparation and cooking.`);
    const messages = [
        { role: "system", content: prompt.join("") },

    ]
    fetchOpenAIMessage(messages, sendEvent);
    req.on("close", () => {
        res.end();
    });
});



async function fetchOpenAIMessage(messages, callback) {
    const OpenAI_API_KEY = "INSERT HERE";
    const openai = new OpenAI({ apiKey: OpenAI_API_KEY });
    const aiModel = "gpt-4o-mini";
    try {
        const stream = await openai.chat.completions.create({
            model: aiModel,
            messages: messages,
            stream: true,
        })

        for await (const chunk of stream) {
            callback(chunk);
        }
    } catch (error) {
        console.error("Error fetching OpenAI message:", error);
        callback(error.message);
    }
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

