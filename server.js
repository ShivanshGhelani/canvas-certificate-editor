import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:5000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Rate limiting store (in-memory for development)
const requestCounts = new Map();
const resetTime = new Map();

// Rate limiting middleware
const rateLimit = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = parseInt(process.env.AI_REQUESTS_PER_HOUR) || 10;

  // Reset if window expired
  if (resetTime.get(ip) && now > resetTime.get(ip)) {
    requestCounts.delete(ip);
    resetTime.delete(ip);
  }

  const current = requestCounts.get(ip) || 0;
  
  if (current >= maxRequests) {
    return res.status(429).json({
      success: false,
      error: 'Rate limit exceeded. Please try again later.',
      retryAfter: Math.ceil((resetTime.get(ip) - now) / 1000)
    });
  }

  requestCounts.set(ip, current + 1);
  if (!resetTime.has(ip)) {
    resetTime.set(ip, now + windowMs);
  }

  next();
};

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// AI Background Generation Endpoint
app.post('/api/generate-background', rateLimit, async (req, res) => {
  try {
    const { prompt } = req.body;

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

    // Get Gemini model
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
      /XMLHttpRequest/gi
    ];

    for (const pattern of dangerousPatterns) {
      if (pattern.test(generatedCode)) {
        throw new Error('Generated code contains potentially unsafe operations');
      }
    }

    res.json({
      success: true,
      code: generatedCode,
      timestamp: new Date().toISOString(),
      prompt: prompt
    });

  } catch (error) {
    console.error('AI Generation Error:', error);
    
    let errorMessage = 'Failed to generate background';
    if (error.message.includes('API key')) {
      errorMessage = 'AI service configuration error';
    } else if (error.message.includes('quota') || error.message.includes('limit')) {
      errorMessage = 'AI service quota exceeded';
    } else if (error.message.includes('unsafe')) {
      errorMessage = 'Generated content was filtered for safety';
    }

    res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    geminiConfigured: !!process.env.GEMINI_API_KEY
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AI Background Generator API running on port ${PORT}`);
  console.log(`🔑 Gemini API Key: ${process.env.GEMINI_API_KEY ? 'Configured' : 'Missing'}`);
});

export default app;
