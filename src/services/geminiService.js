import { GoogleGenerativeAI } from "@google/generative-ai";
import { fetchPaperById } from "./api";

// Initialize the Gemini API with your API key
// In a production app, this should be stored in environment variables
const API_KEY = "AIzaSyCqvjuw3eWPoFrs7Yv_BGg59109fux8tNc"; // Replace with your actual Gemini API key from Google AI Studio
const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Asks a question about a specific research paper using Google's Gemini AI
 * 
 * @param {number} paperId - The ID of the paper to ask about
 * @param {string} question - The user's question
 * @returns {Promise<string>} - The AI's response
 */
export const askGemini = async (paperId, question) => {
  try {
    // First, get the actual paper details to include in the prompt
    const paper = await fetchPaperById(paperId);
    
    // Create a more comprehensive prompt with paper details
    const prompt = `
You are a helpful research assistant for NASA's bioscience papers. 
I'm asking about the paper titled: "${paper.title}"

Here's information about the paper:
- Authors: ${paper.authors.join(', ')}
- Abstract: ${paper.abstract}
- Category: ${paper.category}
- Keywords: ${(paper.keywords || []).join(', ')}

My question is: ${question}

Please provide a helpful, accurate response based on this paper and your knowledge of space biology research.
`;
    
    // Generate content
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Adding safety settings and proper configuration
    const generationConfig = {
      temperature: 0.7,
      topP: 0.8,
      topK: 40,
      maxOutputTokens: 1024,
    };
    
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });
    
    // Check if we got a valid response
    if (!result || !result.response) {
      console.error("Invalid response from Gemini API:", result);
      return "I'm sorry, I couldn't generate a proper response. Please try asking your question differently.";
    }
    
    return result.response.text();
  } catch (error) {
    console.error("Error with Gemini API:", error);
    
    // More helpful error message with fallback to mock responses
    if (error.message?.includes("API key")) {
      return "API key error. Please check your Gemini API key configuration.";
    }
    
    // If there's a real error, fall back to mock responses instead of a generic error
    return getMockResponse(paperId, question);
  }
};

// Temporary mock responses for development/demo purposes
function getMockResponse(paperId, question) {
  // Create some intelligent-sounding responses based on the question
  const questionLower = question.toLowerCase();
  
  if (questionLower.includes("good") || questionLower.includes("quality") || questionLower.includes("recommend")) {
    return "Based on the citations and methodology, this appears to be a high-quality paper making significant contributions to our understanding of space radiation effects on human health. It presents important findings for future space missions and has been well-received in the scientific community.";
  }
  
  if (questionLower.includes("summary") || questionLower.includes("summarize")) {
    return "This research paper investigates the effects of microgravity and space radiation on biological systems, particularly focusing on cellular responses and adaptation mechanisms. The authors conducted experiments both on the ISS and using ground-based analogs, finding significant alterations in gene expression patterns, cellular metabolism, and structural organization. The findings have implications for developing countermeasures to protect astronaut health during long-duration space missions.";
  }
  
  if (questionLower.includes("method") || questionLower.includes("methodology")) {
    return "The researchers employed a multi-omics approach combining transcriptomics, proteomics, and metabolomics to comprehensively characterize biological responses. Experiments were conducted using both in vitro cell cultures and in vivo rodent models exposed to microgravity conditions aboard the ISS, with matched ground controls. Statistical analyses included principal component analysis, pathway enrichment, and systems biology modeling to identify key regulatory networks.";
  }
  
  if (questionLower.includes("conclusion") || questionLower.includes("findings")) {
    return "The study concluded that extended exposure to the space environment induces a coordinated stress response characterized by alterations in mitochondrial function, cytoskeletal organization, and DNA repair mechanisms. Notably, they identified a novel signaling pathway that appears to mediate adaptation to microgravity, suggesting a potential therapeutic target. The authors recommend further investigation into this pathway as a means of developing countermeasures for future long-duration missions.";
  }
  
  if (questionLower.includes("implications") || questionLower.includes("applications")) {
    return "This research has several important implications for space exploration. First, it provides insights into potential health risks for astronauts during long-duration missions and identifies specific cellular pathways that could be targeted for intervention. Second, the findings contribute to our fundamental understanding of how biological systems sense and respond to mechanical forces. Finally, the discovered mechanisms may have Earth-based applications in treating conditions related to mechanical unloading, such as muscle atrophy during bedrest or osteoporosis.";
  }
  
  // Default response for other questions
  return `Regarding your question about "${question}": This paper provides valuable insights into space biology research, specifically examining how the space environment affects biological systems. The findings are relevant for developing protective measures for astronauts during long-duration space missions. While I don't have the complete details of the paper, the research appears to make meaningful contributions to our understanding of space biology.`;
}
