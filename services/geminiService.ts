
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available in the environment variables
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a client-side check. In a real app, the key would be set in the deployment environment.
  console.warn("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

/**
 * Generates a concise summary of a news article using the Gemini API.
 * @param articleContent The full text content of the news article.
 * @returns An HTML string with the summarized content.
 */
export const summarizeArticle = async (articleContent: string): Promise<string> => {
  if (!API_KEY) {
    // Return a mock summary if API key is not available
    return new Promise(resolve => setTimeout(() => {
        resolve(`
            <ul>
                <li><strong>Major Finding:</strong> A significant discovery has been made, challenging previous assumptions.</li>
                <li><strong>Key Implications:</strong> This development is expected to have wide-ranging effects across multiple sectors.</li>
                <li><strong>Expert Opinion:</strong> Specialists in the field have expressed cautious optimism about the future potential.</li>
                <li><strong>Next Steps:</strong> Further research is required to fully understand and harness the new findings.</li>
            </ul>
        `);
    }, 1500));
  }

  try {
    const prompt = `
      Summarize the following news article into 3-5 key bullet points. 
      Format the output as an HTML unordered list (<ul><li>...</li></ul>).
      Each list item should be concise and impactful. Use <strong> tags for the main point of each bullet.
      
      Article:
      ---
      ${articleContent}
      ---
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const summaryText = response.text;
    
    // Basic validation to ensure we have list items
    if (summaryText && summaryText.includes('<li>')) {
      return summaryText;
    } else {
        // Fallback for unexpected format
        return `<p>${summaryText}</p>`;
    }

  } catch (error) {
    console.error("Error summarizing article with Gemini:", error);
    throw new Error("Failed to connect to the summarization service.");
  }
};
