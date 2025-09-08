# Vercel Deployment Guide for Certificate Generator

This guide will help you deploy your Certificate Generator with AI background generation to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **API Keys**: 
   - Gemini API Key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Supabase URL and Anon Key from your Supabase project

## Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

## Step 2: Login to Vercel

```bash
vercel login
```

## Step 3: Set Up Environment Variables

You need to configure the following environment variables in Vercel:

### Required Environment Variables:

1. **GEMINI_API_KEY**: Your Google Gemini API key
2. **VITE_SUPABASE_URL**: Your Supabase project URL
3. **VITE_SUPABASE_ANON_KEY**: Your Supabase anonymous key

### Setting Environment Variables:

#### Option A: Via Vercel Dashboard
1. Go to your project in Vercel dashboard
2. Navigate to Settings > Environment Variables
3. Add each variable:
   - Name: `GEMINI_API_KEY`, Value: `your-gemini-api-key`
   - Name: `VITE_SUPABASE_URL`, Value: `your-supabase-url`
   - Name: `VITE_SUPABASE_ANON_KEY`, Value: `your-supabase-anon-key`

#### Option B: Via Vercel CLI
```bash
vercel env add GEMINI_API_KEY
# Enter your Gemini API key when prompted

vercel env add VITE_SUPABASE_URL
# Enter your Supabase URL when prompted

vercel env add VITE_SUPABASE_ANON_KEY
# Enter your Supabase anon key when prompted
```

## Step 4: Deploy to Vercel

### Option A: Auto-Deploy from GitHub
1. Connect your GitHub repository to Vercel
2. Vercel will automatically deploy on every push to main branch

### Option B: Manual Deploy via CLI
```bash
# Development deployment
npm run deploy:dev

# Production deployment
npm run deploy
```

## Step 5: Verify Deployment

After deployment, test the following:

1. **Main App**: Visit your Vercel URL
2. **Health Check**: Visit `https://your-app.vercel.app/api/health`
3. **AI Generation**: Test the "Generate AI Background" feature

## API Endpoints

Your deployed app will have these API endpoints:

- `GET /api/health` - Health check and configuration status
- `POST /api/generate-background` - AI background generation

## Troubleshooting

### Common Issues:

1. **API Key Not Found**
   - Ensure `GEMINI_API_KEY` is set in Vercel environment variables
   - Check the variable name spelling

2. **CORS Issues**
   - The API endpoints include CORS headers for cross-origin requests
   - If issues persist, check Vercel function logs

3. **Build Errors**
   - Check that all dependencies are in `package.json`
   - Ensure there are no import errors in your React components

4. **Large Bundle Size**
   - The build is optimized with code splitting
   - Large dependencies like `html2canvas` are chunked separately

### Debugging:

1. **Check Vercel Function Logs**:
   ```bash
   vercel logs
   ```

2. **Test API Endpoints Locally**:
   ```bash
   vercel dev
   ```

3. **Check Environment Variables**:
   ```bash
   vercel env ls
   ```

## Performance Optimizations

1. **Caching**: API responses are cached where appropriate
2. **Code Splitting**: Large libraries are split into separate chunks
3. **Image Optimization**: Vercel automatically optimizes images
4. **Edge Functions**: API calls run on Vercel's edge network

## Security Features

1. **Rate Limiting**: AI generation is rate-limited per IP
2. **Input Validation**: All inputs are validated and sanitized
3. **Code Sanitization**: Generated AI code is checked for security
4. **CORS Protection**: Proper CORS headers are set

## Monitoring

- Monitor your app performance in Vercel Dashboard
- Check API usage and errors in the Functions tab
- Set up alerts for high error rates or usage spikes

## Environment-Specific Configuration

The app automatically detects the environment:
- **Development**: Uses local server for API calls
- **Production**: Uses Vercel serverless functions

## Next Steps

1. Set up custom domain (optional)
2. Configure analytics
3. Set up monitoring alerts
4. Implement additional security measures if needed

## Support

If you encounter issues:
1. Check Vercel documentation
2. Review function logs
3. Test API endpoints individually
4. Verify environment variables are set correctly
