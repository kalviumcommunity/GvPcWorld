const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// PC Components data structure for AI context
const PC_COMPONENTS_CONTEXT = {
  categories: ['CPU', 'GPU', 'RAM', 'Storage', 'Motherboard', 'PSU', 'Case', 'Cooler'],
  purposes: ['Gaming', 'AI/ML', 'Animation', 'Office Work'],
  budgetRanges: {
    budget: '₹30,000 - ₹60,000',
    midRange: '₹60,000 - ₹1,50,000',
    highEnd: '₹1,50,000 - ₹3,00,000',
    enthusiast: '₹3,00,000+'
  }
};

// Analyze PC build and provide recommendations
const analyzeBuild = async (req, res) => {
  try {
    const { selectedComponents, buildName, budget, purpose } = req.body;

    if (!selectedComponents || !budget || !purpose) {
      return res.status(400).json({ 
        error: 'Missing required fields: selectedComponents, budget, purpose' 
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Create detailed prompt for build analysis
    const prompt = `
    As a PC building expert, analyze this custom PC build and provide detailed recommendations:

    BUILD DETAILS:
    - Build Name: ${buildName}
    - Budget: ₹${budget.toLocaleString()}
    - Purpose: ${purpose}
    - Components: ${JSON.stringify(selectedComponents, null, 2)}

    Please provide:
    1. PERFORMANCE ANALYSIS: Rate the build's performance for the intended purpose (1-10 scale)
    2. COMPATIBILITY CHECK: Identify any compatibility issues
    3. BOTTLENECK ANALYSIS: Identify potential bottlenecks
    4. BUDGET OPTIMIZATION: Suggest better value alternatives within budget
    5. UPGRADE RECOMMENDATIONS: Suggest future upgrade paths
    6. OVERALL RATING: Give an overall rating (1-10) with explanation

    Format your response as a structured analysis with clear sections and actionable recommendations.
    `;

    const result = await model.generateContent(prompt);
    const analysis = result.response.text();

    res.json({
      success: true,
      analysis,
      buildDetails: {
        buildName,
        budget,
        purpose,
        totalComponents: Object.keys(selectedComponents).length
      }
    });

  } catch (error) {
    console.error('AI Analysis Error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze build',
      details: error.message 
    });
  }
};

// Generate PC build recommendations based on budget and purpose
const generateRecommendations = async (req, res) => {
  try {
    const { budget, purpose, preferences = {} } = req.body;

    if (!budget || !purpose) {
      return res.status(400).json({ 
        error: 'Missing required fields: budget, purpose' 
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
    As a PC building expert, recommend 3 different PC builds for the following requirements:

    REQUIREMENTS:
    - Budget: ₹${budget.toLocaleString()}
    - Purpose: ${purpose}
    - Preferences: ${JSON.stringify(preferences)}

    For each build, provide:
    1. BUILD NAME: Creative name for the build
    2. COMPONENT LIST: Specific component recommendations with approximate prices
    3. TOTAL COST: Estimated total cost
    4. PERFORMANCE EXPECTATIONS: What to expect for the intended purpose
    5. WHY THIS BUILD: Explanation of component choices

    Provide 3 builds:
    - BALANCED BUILD: Best overall value
    - PERFORMANCE BUILD: Maximum performance within budget
    - FUTURE-PROOF BUILD: Best for long-term use

    Format as JSON with this structure:
    {
      "builds": [
        {
          "name": "Build Name",
          "type": "balanced|performance|future-proof",
          "components": {
            "CPU": {"name": "Component Name", "price": 0},
            "GPU": {"name": "Component Name", "price": 0},
            // ... other components
          },
          "totalCost": 0,
          "performance": "Performance description",
          "reasoning": "Why this build explanation"
        }
      ]
    }
    `;

    const result = await model.generateContent(prompt);
    let recommendations = result.response.text();

    // Try to parse JSON response
    try {
      // Extract JSON from response if it's wrapped in markdown
      const jsonMatch = recommendations.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        recommendations = JSON.parse(jsonMatch[1]);
      } else {
        recommendations = JSON.parse(recommendations);
      }
    } catch (parseError) {
      // If JSON parsing fails, return raw text
      recommendations = { rawResponse: recommendations };
    }

    res.json({
      success: true,
      recommendations,
      requestDetails: { budget, purpose, preferences }
    });

  } catch (error) {
    console.error('AI Recommendations Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate recommendations',
      details: error.message 
    });
  }
};

// AI Ask feature for real-time queries
const aiAsk = async (req, res) => {
  try {
    const { question, context = {} } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const model = genAI.getGenerativeAI({ model: 'gemini-1.5-flash' });

    const prompt = `
    As a PC building expert, answer this question about PC building:

    QUESTION: ${question}

    CONTEXT: ${JSON.stringify(context)}

    Provide a helpful, accurate, and concise answer. If the question is about specific components, include:
    - Technical specifications
    - Performance implications
    - Compatibility considerations
    - Price-to-performance analysis
    - Alternative suggestions if applicable

    Keep the response informative but easy to understand.
    `;

    const result = await model.generateContent(prompt);
    const answer = result.response.text();

    res.json({
      success: true,
      question,
      answer,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI Ask Error:', error);
    res.status(500).json({ 
      error: 'Failed to process question',
      details: error.message 
    });
  }
};

// Generate PC templates based on popular configurations
const generateTemplates = async (req, res) => {
  try {
    const { category = 'popular' } = req.query;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
    Generate 5 popular PC build templates for different use cases and budgets:

    Categories to include:
    1. Budget Gaming (₹40,000 - ₹60,000)
    2. Mid-range Gaming (₹80,000 - ₹1,20,000)
    3. High-end Gaming (₹1,50,000 - ₹2,50,000)
    4. Content Creation (₹1,00,000 - ₹2,00,000)
    5. AI/ML Workstation (₹1,50,000 - ₹3,00,000)

    For each template, provide:
    - Template name
    - Target budget range
    - Use case description
    - Key component highlights
    - Expected performance

    Format as JSON array of templates.
    `;

    const result = await model.generateContent(prompt);
    let templates = result.response.text();

    try {
      const jsonMatch = templates.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        templates = JSON.parse(jsonMatch[1]);
      } else {
        templates = JSON.parse(templates);
      }
    } catch (parseError) {
      templates = { rawResponse: templates };
    }

    res.json({
      success: true,
      templates,
      category
    });

  } catch (error) {
    console.error('Template Generation Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate templates',
      details: error.message 
    });
  }
};

module.exports = {
  analyzeBuild,
  generateRecommendations,
  aiAsk,
  generateTemplates
};
