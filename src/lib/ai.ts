const API_URL = process.env.FREE_LLM_ENDPOINT!;
const API_KEY = process.env.FREE_LLM_API_KEY!;

// Our actual database of salons and stylists for the AI to recommend
const AVAILABLE_SALONS = [
  "Luxe Hair Studio (Mumbai) - Best for Haircuts, Coloring",
  "Beauty Bliss (Bangalore) - Best for Bridal, Makeup",
  "Glow Spa & Salon (Delhi) - Best for Facials, Spa",
  "Urban Cuts (Mumbai) - Best for Men's Haircuts, Beard"
];

const AVAILABLE_STYLISTS = [
  "Priya Sharma - Hair Coloring Expert",
  "Rahul Verma - Men's Haircuts & Fades",
  "Ananya Patel - Award-winning Bridal Makeup",
  "Karan Singh - Master Barber & Beard Styling"
];

export async function generateBeautyPlan(prompt: string, type: string) {
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  
  const systemPrompt = `
    You are an expert beauty consultant for BeautyOS. Today's date is ${today}.
    The user wants a ${type} plan based on this goal: "${prompt}".

    CRITICAL RULES FOR TIMELINE:
    1. Be realistic and concise. Do NOT drag out the timeline unnecessarily. 
    2. If tasks can be done on the same day, group them together. 
    3. For standard grooming, max 3-5 days. For bridal, max 30 days.
    4. Calculate dates logically starting from today.

    CRITICAL RULES FOR RECOMMENDATIONS:
    1. You MUST recommend specific salons and stylists from our database based on the user's need.
    2. Available Salons: ${AVAILABLE_SALONS.join(", ")}
    3. Available Stylists: ${AVAILABLE_STYLISTS.join(", ")}
    4. Include these names in your "recommendedServices" array (e.g., "Book Priya Sharma for Hair Coloring").

    You MUST return ONLY a valid JSON object with this exact structure. No markdown, no text outside the JSON:
    {
      "title": "Short catchy title for the plan",
      "totalEstimatedBudget": 1500,
      "timeline": [
        { "day": "Day 1 (Date)", "task": "Specific task 1. Specific task 2." },
        { "day": "Day 2 (Date)", "task": "Specific task." }
      ],
      "recommendedServices": ["Service 1", "Service 2", "Book [Stylist Name] for [Service]"]
    }
  `;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({ message: systemPrompt })
    });
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
}

export async function analyzeInspiration(description: string) {
  const systemPrompt = `
    You are an elite fashion and beauty analyst. 
    The user described this look: "${description}"

    CRITICAL RULES:
    1. Analyze the EXACT details provided. Do not give generic advice.
    2. If they mention a specific celebrity or movie, analyze that exact style.
    3. Provide highly specific style tags (e.g., "90s grunge", "Korean glass skin", "Wolf cut").
    4. Suggest highly specific salon services needed to achieve this exact look.

    You MUST return ONLY a valid JSON object with this exact structure. No markdown, no text outside the JSON:
    {
      "analysis": "Detailed, specific analysis of the look described.",
      "styleTags": ["tag1", "tag2", "tag3", "tag4"],
      "suggestedServices": ["Specific service 1", "Specific service 2", "Specific service 3"]
    }
  `;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({ message: systemPrompt })
    });
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("AI Inspiration Error:", error);
    throw error;
  }
}