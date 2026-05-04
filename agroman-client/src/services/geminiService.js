import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const MODELS = [
  "gemini-2.5-flash",   // fastest, but overloaded sometimes
  "gemini-1.5-flash",   // more stable fallback
];

const safeGenerateContent = async (contents) => {

  for (let i = 0; i < MODELS.length; i++) {

    try {

      console.log("Trying model:", MODELS[i]);

      const response =
        await ai.models.generateContent({
          model: MODELS[i],
          contents,
        });

      const text =
        typeof response.text === "string"
          ? response.text
          : "";

      if (text) return text;

    } catch (error) {

      console.log(
        `Model ${MODELS[i]} failed`,
        error?.message
      );

      if (
        error?.message?.includes("503") ||
        error?.status === "UNAVAILABLE"
      ) {
        continue; // try next model
      }

      throw error;
    }
  }

  throw new Error("All models failed");
};

const fileToBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const generateCropRecommendation = async (farmData) => {
  try {

    const prompt = `
You are an agriculture AI expert.

Analyze the following farm data and suggest the best crops.

Farm Data:
${JSON.stringify(farmData, null, 2)}

Return ONLY valid JSON array like this:

[
  {
    "crop": "",
    "reason": "",
    "profit": "",
    "risk": ""
  }
]

Give 3 crop recommendations.
`;

    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      });

    const text =
      typeof response.text === "string"
        ? response.text
        : "";

    // Extract JSON safely
    const start = text.indexOf("[");
    const end = text.lastIndexOf("]");

    if (start === -1 || end === -1) {
      throw new Error("Invalid AI response");
    }

    const jsonData =
      JSON.parse(
        text.substring(start, end + 1)
      );

    return jsonData;

  } catch (error) {

    console.log(
      "Gemini Error:",
      error
    );

    return [];
  }
};

export const generateCropGuide =
  async (
    cropName,
    recommendationInput
  ) => {

    try {

      const prompt = `
You are an expert Indian farming advisor.

Generate a COMPLETE farming guide for ${cropName}.

IMPORTANT RULES:
- Respond ONLY in valid JSON
- Do NOT write markdown
- Do NOT write explanation text
- All list fields MUST be arrays
- Return detailed farming information

Use EXACT structure below:

{
  "overview": "string",

  "seeds": [
    "seed 1",
    "seed 2"
  ],

  "fertilizers": [
    "fertilizer 1",
    "fertilizer 2"
  ],

  "irrigation": [
    "step 1",
    "step 2"
  ],

  "medicines": [
    "medicine 1",
    "medicine 2"
  ],

  "timeline": [
    "week 1 work",
    "week 2 work"
  ],

  "yield": "string",

  "profit": "string",

  "risks": [
    "risk 1",
    "risk 2"
  ]
}

Farmer Data:
${JSON.stringify(recommendationInput)}
`;

      const response =
        await ai.models.generateContent({
          model: "gemini-2.5-flash-lite",

          contents: [
            {
              role: "user",

              parts: [
                {
                  text: prompt
                }
              ],
            },
          ],
        });

      const text =
        typeof response.text === "string"
          ? response.text
          : "";

      // CLEAN MARKDOWN
      const cleanedText =
        text
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

      // PARSE JSON
      const parsedData =
        JSON.parse(cleanedText);

      return parsedData;

    } catch (error) {

      console.log(
        "Gemini Crop Guide Error:",
        error
      );

      return {
        overview:
          "Unable to generate crop overview.",

        seeds: [],

        fertilizers: [],

        irrigation: [],

        medicines: [],

        timeline: [],

        yield: "Not available",

        profit: "Not available",

        risks: [],
      };
    }
  };

  export const askFarmingQuestion =
  async (
    question,
    recommendationInput
  ) => {

    try {

      const prompt = `
You are AI Mitra, an expert Indian farming assistant.

IMPORTANT:
- Reply in simple Hindi-English mixed language.
- Keep answers practical and easy.
- Focus ONLY on farming/agriculture.
- Answer like talking to a rural farmer.

Farmer Context:
${JSON.stringify(recommendationInput)}

Farmer Question:
${question}
`;

      const response =
        await ai.models.generateContent({

          model: "gemini-2.5-flash-lite",

          contents: [
            {
              role: "user",

              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        });

      const text =
        typeof response.text === "string"
          ? response.text
          : "Sorry, no response.";

      return text;

    } catch (error) {

      console.log(
        "AI Chat Error:",
        error
      );

      return "Sorry, something went wrong.";
    }
  };

  export const generateFarmingJourney =
  async (
    cropName,
    recommendationInput
  ) => {

    try {

      const prompt = `
You are an expert Indian agriculture advisor.

Generate a detailed weekly farming execution plan for ${cropName}.

Farmer Data:
${JSON.stringify(recommendationInput)}

IMPORTANT:
Respond ONLY in valid JSON array format.

Each week should contain:
- week
- title
- tasks
- resources
- estimatedCost

Example:

[
  {
    "week": "Week 1",
    "title": "Soil Preparation",

    "tasks": [
      "Plough the land properly",
      "Add organic compost"
    ],

    "resources": [
      "50kg Organic Compost",
      "20kg DAP Fertilizer"
    ],

    "estimatedCost": "₹4000"
  }
]

Generate at least 6-8 weeks.
`;

      const response =
        await ai.models.generateContent({

          model: "gemini-2.5-flash-lite",

          contents: [
            {
              role: "user",

              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        });

      const text =
        typeof response.text === "string"
          ? response.text
          : "";

      // CLEAN RESPONSE
      const cleanedText =
        text
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

      // EXTRACT JSON ARRAY
      const start =
        cleanedText.indexOf("[");

      const end =
        cleanedText.lastIndexOf("]");

      const json =
        cleanedText.substring(
          start,
          end + 1
        );

      return JSON.parse(json);

    } catch (error) {

      console.log(
        "Journey Generation Error:",
        error
      );

      return [];
    }
  };

//   export const askFarmingQuestion =
//   async (question, recommendationInput) => {

//     try {

//       const prompt = `
// You are AI Mitra, a friendly Indian farming companion.

// STYLE:
// - Speak in simple Hindi (with light Hinglish if needed)
// - Talk like a helpful gaon ka expert
// - Be warm, practical, and human
// - Keep answers short but useful
// - Avoid robotic tone

// RULES:
// - Only talk about farming
// - Give actionable advice
// - Use natural conversational tone

// Farmer Context:
// ${JSON.stringify(recommendationInput)}

// Farmer Question:
// ${question}
// `;

//       const response =
//         await ai.models.generateContent({
//           model: "gemini-2.5-flash",
//           contents: [
//             {
//               role: "user",
//               parts: [{ text: prompt }],
//             },
//           ],
//         });

//       const text =
//         typeof response.text === "string"
//           ? response.text
//           : "Kuch problem ho gaya, dobara puchiye.";

//       return text;

//     } catch (error) {

//       console.log("AI Chat Error:", error);

//       return "Network issue hai, thoda baad mein try karein.";
//     }
//   };


export const detectCropDisease =
  async (imageFile) => {

    try {

      const base64 = await fileToBase64(imageFile);

      const prompt = `
You are an expert plant doctor.

Analyze this crop leaf image and provide:

1. Disease name
2. Cause
3. Treatment
4. Prevention
5. Medicines

Respond ONLY in JSON format:

{
  "disease": "",
  "cause": "",
  "treatment": "",
  "prevention": "",
  "medicines": []
}
`;

      const response =
        await ai.models.generateContent({

          model: "gemini-2.5-flash-lite",

          contents: [
            {
              role: "user",
              parts: [
                { text: prompt },
                {
                  inlineData: {
                    mimeType: imageFile.type,
                    data: base64.split(",")[1],
                  },
                },
              ],
            },
          ],
        });

      const text =
        typeof response.text === "string"
          ? response.text
          : "";

      const cleaned =
        text
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

      return JSON.parse(cleaned);

    } catch (error) {

      console.log("Disease Error:", error);

      return {
        disease: "Unknown",
        cause: "Unable to detect",
        treatment: "Try again",
        prevention: "",
        medicines: [],
      };
    }
  };