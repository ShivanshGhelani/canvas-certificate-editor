# Certificate Editor - Node.js Application

## � Modern Certificate Editor with AI-Powered Background Generation

A full-stack Node.js application for creating and customizing professional certificates with AI-generated backgrounds, drag-and-drop elements, and PDF export capabilities.

## ✨ Features

### 🎨 **Certificate Design**
- **Drag & Drop Interface** - Move and resize text and logo elements
- **Live Text Editing** - Double-click to edit text directly
- **Rich Typography** - Multiple font families and styling options
- **Text Effects** - Shadows, colors, and alignment controls
- **Logo Integration** - Upload and position logos with transparency

### 🤖 **AI-Powered Backgrounds**
- **Gemini AI Integration** - Generate custom backgrounds from text descriptions
- **Safe Code Execution** - Server-side validation and security
- **Rate Limiting** - Prevents API abuse

### 📄 **Export & Templates**
- **High-Quality PDF Export** - Print-ready A4 landscape format
- **Multiple Templates** - Pre-designed certificate layouts
- **Image Export** - Alternative PNG/JPEG formats

### � **Security & Performance**
- **Helmet.js Security** - Comprehensive security headers
- **Rate Limiting** - API and file upload protection
- **Input Validation** - Server-side validation for all inputs
- **File Upload Security** - Image validation and size limits

## 📁 Project Structure

```
certificate-editor/
├── server.js                 # Express server
├── package.json              # Dependencies and scripts
├── .env                      # Environment configuration
├── .gitignore               # Git ignore rules
├── scripts/
│   └── copy-vendors.js      # Vendor file setup
├── public/                  # Static files served by Express
│   ├── index.html          # Main application HTML
│   └── js/                 # Modular JavaScript files
│       ├── core.js         # Core initialization
│       ├── image-utils.js  # Image processing
│       ├── element-manager.js # Element creation
│       ├── interactions.js # Drag & drop interactions
│       ├── properties-panel.js # Text styling
│       ├── ai-generator.js # AI background generation
│       ├── download.js     # PDF export functionality
│       └── vendors/        # Local vendor libraries
│           ├── jspdf.umd.min.js
│           └── html2canvas.min.js
└── README.md               # This file
```

## �️ Installation & Setup

### Prerequisites
- **Node.js** (v14.0.0 or higher)
- **npm** (comes with Node.js)
- **Gemini AI API Key** (get from [Google AI Studio](https://makersuite.google.com/app/apikey))

### 1. Clone and Install
```bash
# Clone the repository
git clone <your-repo-url>
cd certificate-editor

# Install dependencies
npm install

# Copy vendor files
npm run postinstall
```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```env
NODE_ENV=development
PORT=3000
GEMINI_API_KEY=your-gemini-api-key-here
SESSION_SECRET=your-super-secret-session-key-change-this-in-production
MAX_REQUESTS_PER_WINDOW=100
AI_REQUESTS_PER_HOUR=10
MAX_FILE_SIZE=5242880
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### 3. Start the Application
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

Visit `http://localhost:3000` in your browser.

## 📚 API Endpoints

### `POST /api/generate-background`
Generate AI-powered certificate backgrounds.

**Request:**
```json
{
  "prompt": "professional blue waves design"
}
```

**Response:**
```json
{
  "success": true,
  "code": "// Generated JavaScript canvas code",
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

### `POST /api/upload-image`
Upload images for signatures and logos.

**Request:** Multipart form data with `image` field

**Response:**
```json
{
  "success": true,
  "imageData": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "originalName": "logo.png",
  "size": 12345
}
```

### `GET /api/templates`
Get available certificate templates.

**Response:**
```json
{
  "templates": [
    {
      "id": "participation",
      "name": "Certificate of Participation",
      "elements": [...]
    }
  ]
}
```

### `GET /health`
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-01-01T00:00:00.000Z",
  "uptime": 3600
}
```

## 🔧 Development

### Available Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with auto-restart
- `npm run build` - Prepare for production (currently just validates)
- `npm test` - Run tests (to be implemented)

### Adding New Features
1. **New API Endpoints** - Add to `server.js`
2. **Frontend Features** - Add to appropriate module in `public/js/`
3. **Templates** - Add to the templates endpoint
4. **Styling** - Modify CSS in `public/index.html`

## � Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=80
GEMINI_API_KEY=your-production-api-key
SESSION_SECRET=secure-random-string-for-production
ALLOWED_ORIGINS=https://yourdomain.com
```

### Docker Deployment (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run postinstall
EXPOSE 3000
CMD ["npm", "start"]
```

### Cloud Deployment
- **Heroku**: Ready to deploy with Procfile
- **Vercel**: Serverless-ready with minor modifications
- **AWS/Google Cloud**: Standard Node.js deployment

## 🔒 Security Features

- **Helmet.js** - Security headers
- **Rate Limiting** - API abuse prevention
- **Input Validation** - XSS and injection protection
- **File Upload Security** - Image validation
- **CORS Configuration** - Cross-origin protection
- **Content Security Policy** - XSS mitigation

## 🎯 Future Enhancements

- [ ] **User Authentication** - User accounts and saved certificates
- [ ] **Database Integration** - MongoDB/PostgreSQL for data persistence
- [ ] **Real-time Collaboration** - Multiple users editing simultaneously
- [ ] **Advanced Templates** - More certificate types and layouts
- [ ] **Batch Processing** - Generate multiple certificates at once
- [ ] **Analytics** - Usage tracking and insights
- [ ] **White-label Solution** - Customizable branding

## 📝 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Check the documentation
- Review the API endpoints

---

**Built with ❤️ using Node.js, Express, and AI**
