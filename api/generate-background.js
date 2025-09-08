import { GoogleGenerativeAI } from '@google/generative-ai';

// Rate limiting store (using in-memory for serverless)
const requestCounts = new Map();
const resetTime = new Map();

// Rate limiting function
const checkRateLimit = (req) => {
  const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 10; // Adjust as needed

  // Reset if window expired
  if (resetTime.get(ip) && now > resetTime.get(ip)) {
    requestCounts.delete(ip);
    resetTime.delete(ip);
  }

  const current = requestCounts.get(ip) || 0;
  
  if (current >= maxRequests) {
    return {
      allowed: false,
      retryAfter: Math.ceil((resetTime.get(ip) - now) / 1000)
    };
  }

  requestCounts.set(ip, current + 1);
  if (!resetTime.has(ip)) {
    resetTime.set(ip, now + windowMs);
  }

  return { allowed: true };
};

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    // Rate limiting
    const rateLimitResult = checkRateLimit(req);
    if (!rateLimitResult.allowed) {
      return res.status(429).json({
        success: false,
        error: 'Rate limit exceeded. Please try again later.',
        retryAfter: rateLimitResult.retryAfter
      });
    }

    const { prompt } = req.body;

    // Validation
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Valid prompt is required'
      });
    }

    if (prompt.length > 500) {
      return res.status(400).json({
        success: false,
        error: 'Prompt must be less than 500 characters'
      });
    }

    // Check if Gemini API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        error: 'AI service not configured'
      });
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create a comprehensive prompt for certificate background generation
    const enhancedPrompt = `Generate JavaScript code that creates a beautiful certificate background using Canvas 2D context. The user wants: "${prompt}"

Requirements:
1. Return only executable JavaScript code that uses ctx (Canvas 2D context), width, and height parameters
2. Create a professional certificate background design
3. Use gradients, patterns, or geometric shapes
4. Ensure the design is elegant and suitable for certificates
5. Use appropriate colors that won't interfere with text readability
6. The code should be a function body that directly uses ctx commands
7. Do not include function declaration or explanatory text
8. Make the design fill the entire canvas (width x height)
9. Keep the code under 2000 characters for optimal performance

Example structure:
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, width, height);
// Add your design elements here using ctx commands

Generate code for: ${prompt}`;

    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    let generatedCode = response.text();

    // Clean up the response to extract only the JavaScript code
    generatedCode = generatedCode.replace(/```javascript/g, '').replace(/```/g, '').trim();
    
    // Validate that the generated code looks like valid JavaScript
    if (!generatedCode.includes('ctx.') || generatedCode.length < 50) {
      throw new Error('Generated code appears invalid');
    }

    // Security: Basic validation to prevent malicious code
    const dangerousPatterns = [
      /eval\(/gi,
      /Function\(/gi,
      /setTimeout\(/gi,
      /setInterval\(/gi,
      /document\./gi,
      /window\./gi,
      /global\./gi,
      /process\./gi,
      /require\(/gi,
      /import\s/gi,
      /fetch\(/gi,
      /XMLHttpRequest/gi,
      /location\./gi,
      /history\./gi
    ];

    for (const pattern of dangerousPatterns) {
      if (pattern.test(generatedCode)) {
        throw new Error('Generated code contains potentially unsafe operations');
      }
    }

    res.status(200).json({
      success: true,
      code: generatedCode,
      timestamp: new Date().toISOString(),
      prompt: prompt
    });

  } catch (error) {
    console.error('AI Generation Error:', error);
    
    let errorMessage = 'Failed to generate background';
    if (error.message && error.message.includes('API key')) {
      errorMessage = 'AI service configuration error';
    } else if (error.message && (error.message.includes('quota') || error.message.includes('limit'))) {
      errorMessage = 'AI service quota exceeded';
    } else if (error.message && error.message.includes('unsafe')) {
      errorMessage = 'Generated content was filtered for safety';
    }

    res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
}
