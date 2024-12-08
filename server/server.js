const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const vision = require("@google-cloud/vision");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Debugging middleware to log request size
app.use((req, res, next) => {
  console.log(`Request size: ${req.headers['content-length']} bytes`);
  next();
});

const geminiApiKey = "INSERT HERE";
const googleAI = new GoogleGenerativeAI(geminiApiKey);

const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-pro",
  temperature: 0.7,
  topP: 0.9,
  maxOutputTokens: 2000,
});

const visionClient = new vision.ImageAnnotatorClient({
  keyFilename: "../tadkaai-a6e2a028acd4.json",
});

app.get("/recipestream", (req, res) => {
  const { ingredients, mealType, cuisine, cookingTime, complexity } = req.query;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const sendEvent = (chunk) => {
    if (!chunk || !chunk.data) {
      console.error("Invalid chunk received:", chunk);
      res.write(
        `data: ${JSON.stringify({
          action: "error",
          message: "Invalid response from Gemini",
        })}\n\n`
      );
      return;
    }

    const recipeText =
      chunk.data.parts?.map((part) => part.text).join("\n") || chunk.data;

    res.write(
      `data: ${JSON.stringify({ action: "chunk", chunk: recipeText })}\n\n`
    );
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

    const candidates = response?.response?.candidates || [];
    if (candidates.length === 0) {
      console.error("No candidates received from Gemini.");
      sendEvent({
        action: "error",
        message: "No valid response from Gemini AI.",
      });
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

app.post("/identify-ingredient", async (req, res) => {
  const { imageBase64 } = req.body;

  if (!imageBase64) {
    console.error("No image data received.");
    return res.status(400).json({ error: "Image data is required." });
  }

  try {
    // Debugging the image data
    console.log("Received image data size:", imageBase64.length);
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Buffer.from(base64Data, "base64");
    console.log("Buffer size after conversion:", imageBuffer.length);

    // Vision API Call
    const [result] = await visionClient.labelDetection({
      image: { content: imageBuffer },
    });

    // Logging Vision API result
    console.log("Vision API Result:", JSON.stringify(result, null, 2));

    if (result.error) {
      console.error("Vision API Error:", result.error);
      return res.status(500).json({ error: result.error.message });
    }

    // Processing labels
    const labels = result.labelAnnotations || [];
    if (labels.length === 0) {
      console.warn("No identifiable ingredients found.");
      return res
        .status(200)
        .json({ message: "No identifiable ingredient found." });
    }

    // Sort labels by confidence score
    const sortedLabels = labels.sort((a, b) => b.score - a.score);

    // Extract the top one or two results
    const topIngredients = sortedLabels.slice(0, 2).map((label) => ({
      name: label.description,
      confidence: label.score,
    }));

    // Return the top results
    res.status(200).json({
      ingredients: topIngredients.map((ingredient) => ingredient.name),
    });
  } catch (error) {
    console.error("Error identifying ingredient:", error.message);
    res.status(500).json({ error: "Failed to identify ingredient." });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
