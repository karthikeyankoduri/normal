import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface BusinessIdea {
  description: string;
  targetAudience?: string;
  industry?: string;
  location?: string;
}

export interface ResearchResult {
  summary: string;
  marketInsights: string[];
  trends: string[];
  opportunities: string[];
}

export interface Competitor {
  name: string;
  website: string;
  strengths: string[];
  weaknesses: string[];
  gaps: string[];
}

export interface WebsiteContent {
  html: string;
  css: string; // embedded in HTML usually, but keeping separate if needed
}

export interface SocialPost {
  platform: 'Instagram' | 'LinkedIn' | 'Twitter';
  caption: string;
  hashtags: string[];
  imagePrompt: string;
}

export interface FundingOpportunity {
  name: string;
  type: 'Investor' | 'Funding Program' | 'Event';
  description: string;
  location: string;
  link: string;
  relevance: string;
}

const cleanJson = (text: string) => {
  if (!text) return "";
  // Remove markdown code blocks
  let cleaned = text.replace(/```json\n?|\n?```/g, "").trim();
  
  // Find the first '[' or '{'
  const firstBracket = cleaned.search(/\[|\{/);
  if (firstBracket !== -1) {
    cleaned = cleaned.substring(firstBracket);
  }
  
  // Find the last ']' or '}'
  const lastBracket = cleaned.search(/\]|\}(?!.*[\]\}])/); // Find last occurrence
  if (lastBracket !== -1) {
    // We need to find the index relative to the substring, but search returns index relative to start.
    // Actually, let's just use lastIndexOf which is simpler.
    const lastClose = Math.max(cleaned.lastIndexOf(']'), cleaned.lastIndexOf('}'));
    if (lastClose !== -1) {
      cleaned = cleaned.substring(0, lastClose + 1);
    }
  }
  
  return cleaned;
};

export const generateMarketingImage = async (idea: BusinessIdea): Promise<string | null> => {
  const prompt = `
    Generate a professional, high-quality marketing image for this business:
    ${idea.description}
    Target Audience: ${idea.targetAudience || 'General'}
    Industry: ${idea.industry || 'General'}
    
    The image should be suitable for social media (Instagram, LinkedIn, etc.).
    Style: Modern, clean, and engaging.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [
          { text: prompt }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
        }
      }
    });

    // Extract base64 image from response
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating marketing image:", error);
    return null;
  }
};

export const generateResearch = async (idea: BusinessIdea): Promise<ResearchResult> => {
  const prompt = `
    Analyze the following business idea:
    Description: ${idea.description}
    Target Audience: ${idea.targetAudience || 'General'}
    Industry: ${idea.industry || 'General'}
    Location: ${idea.location || 'Global'}

    Provide a JSON response with the following structure:
    {
      "summary": "Brief business summary",
      "marketInsights": ["Insight 1", "Insight 2", ...],
      "trends": ["Trend 1", "Trend 2", ...],
      "opportunities": ["Opportunity 1", "Opportunity 2", ...]
    }
    Ensure the insights are professional, data-driven, and actionable.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    return JSON.parse(cleanJson(response.text || "{}"));
  } catch (error) {
    console.error("Error generating research:", error);
    return {
      summary: "Failed to generate research.",
      marketInsights: [],
      trends: [],
      opportunities: []
    };
  }
};

export const generateCompetitors = async (idea: BusinessIdea): Promise<Competitor[]> => {
  const prompt = `
    Identify 5 potential competitors for this business idea:
    ${idea.description}
    Industry: ${idea.industry || 'General'}

    Provide a JSON response as an array of objects:
    [
      {
        "name": "Competitor Name",
        "website": "https://example.com",
        "strengths": ["Strength 1", ...],
        "weaknesses": ["Weakness 1", ...],
        "gaps": ["Gap 1", ...]
      },
      ...
    ]
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    return JSON.parse(cleanJson(response.text || "[]"));
  } catch (error) {
    console.error("Error generating competitors:", error);
    return [];
  }
};

export const generateWebsite = async (idea: BusinessIdea): Promise<WebsiteContent> => {
  const prompt = `
    Generate a single-file HTML landing page (with embedded Tailwind CSS via CDN) for this business:
    ${idea.description}
    
    The design should be modern, responsive, and professional.
    Include:
    - Hero section with a catchy headline
    - Features section
    - About section
    - Contact form (mockup)
    - Footer
    
    Use <script src="https://cdn.tailwindcss.com"></script> for styling.
    Ensure the color scheme matches the business vibe.
    
    Return JSON:
    {
      "html": "<!DOCTYPE html>..."
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    const data = JSON.parse(cleanJson(response.text || "{}"));
    return { html: data.html || "<h1>Failed to generate website</h1>", css: "" };
  } catch (error) {
    console.error("Error generating website:", error);
    return { html: "<h1>Error generating website</h1>", css: "" };
  }
};

export const generateMarketing = async (idea: BusinessIdea): Promise<SocialPost[]> => {
  const prompt = `
    Create social media content for this business:
    ${idea.description}

    Generate 1 post for each platform: Instagram, LinkedIn, Twitter.
    
    Return JSON array:
    [
      {
        "platform": "Instagram",
        "caption": "...",
        "hashtags": ["#tag1", ...],
        "imagePrompt": "Description of an image to generate..."
      },
      ...
    ]
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    return JSON.parse(cleanJson(response.text || "[]"));
  } catch (error) {
    console.error("Error generating marketing:", error);
    return [];
  }
};

export const generateFunding = async (idea: BusinessIdea): Promise<FundingOpportunity[]> => {
  const prompt = `
    Find real, current funding opportunities for the following business idea:
    Description: ${idea.description}
    Industry: ${idea.industry || 'General'}
    Location: ${idea.location || 'Global'}

    Search for:
    1. Venture Capital firms or Angel Investors interested in this industry/location.
    2. Government or private funding programs/grants.
    3. Startup pitch events or accelerators.

    Provide a JSON response as an array of objects:
    [
      {
        "name": "Name of the entity/program/event",
        "type": "Investor" | "Funding Program" | "Event",
        "description": "Short description of what they offer",
        "location": "Where they are based or operate",
        "link": "Direct URL to their website or application page",
        "relevance": "Why this is a good match for the user's business"
      },
      ...
    ]
    IMPORTANT: Provide REAL links and entities. Use Google Search to verify current information.
    
    CRITICAL: Return ONLY the JSON array. Do not include any conversational text, markdown formatting, or explanations outside the JSON array.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      }
    });
    return JSON.parse(cleanJson(response.text || "[]"));
  } catch (error) {
    console.error("Error generating funding:", error);
    return [];
  }
};

export const chatWithProject = async (
  message: string,
  context: {
    idea: BusinessIdea | null;
    research: ResearchResult | null;
    competitors: Competitor[];
    funding: FundingOpportunity[];
    marketing: SocialPost[];
  }
): Promise<string> => {
  const contextString = JSON.stringify(context, null, 2);
  
  const prompt = `
    You are an expert startup consultant and business analyst. 
    
    PROJECT CONTEXT:
    ${contextString}

    USER QUERY: "${message}"

    INSTRUCTIONS:
    1. Use the provided PROJECT CONTEXT as your primary source of truth for project-specific details.
    2. For questions about financials, market data, specific locations, regulations, or any information NOT in the context, use GOOGLE SEARCH to find real-time, accurate data.
    3. If the user provides a URL, use the URL CONTEXT tool to analyze it.
    4. Provide specific, data-driven answers. If you find financial benchmarks, growth rates, or specific competitors via search, include them.
    5. Be professional, encouraging, and highly detailed.
    6. If the user asks for something outside your capabilities, explain why and offer the best possible alternative advice.
    7. Format your response clearly. Use lists for readability if needed.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [
          { googleSearch: {} },
          { urlContext: {} }
        ],
      }
    });
    return response.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Error chatting with project:", error);
    return "Sorry, I encountered an error while processing your request.";
  }
};
