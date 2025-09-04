# Canvas Certificate Editor

## ✨ Modern React Certificate Editor with Professional Export

A modern React application for creating and customizing professional certificates with drag-and-drop elements, rich typography controls, and high-quality PDF export capabilities.

## 🚀 Features

### 🎨 **Certificate Design**
- **Drag & Drop Interface** - Intuitive element positioning and resizing
- **Live Text Editing** - Rich typography controls with real-time preview
- **Font Management** - Multiple font families with size, weight, and style controls
- **Text Formatting** - Bold, italic, underline, text alignment, and color customization
- **Logo Integration** - Upload and position logos with precise controls
- **Element Properties** - Advanced styling with line height and letter spacing

### 📄 **Export & Templates**
- **High-Quality PDF Export** - Print-ready A4 landscape format using jsPDF
- **Image Export** - PNG and JPG export with html2canvas
- **Template System** - Pre-designed certificate layouts
- **Professional Output** - Clean, high-resolution exports suitable for printing

### 🎯 **Modern UI/UX**
- **React-Powered Interface** - Modern component-based architecture
- **TailwindCSS Styling** - Clean, responsive design
- **Icon Integration** - React Icons for consistent visual elements
- **Responsive Layout** - Sidebar, toolbar, and canvas layout

## 📁 Project Structure

```
canvas-certificate-editor/
├── package.json              # Dependencies and npm scripts
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # TailwindCSS configuration
├── eslint.config.js         # ESLint configuration
├── index.html               # Main HTML entry point
├── src/                     # React application source
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # Main app component
│   ├── App.css             # Global styles
│   ├── index.css           # Base CSS imports
│   ├── Canvas.jsx          # Certificate canvas component
│   ├── assets/             # Static assets
│   └── components/         # React components
│       ├── Layout.jsx      # Main layout wrapper
│       ├── TopBar.jsx      # Toolbar with export controls
│       ├── Sidebar.jsx     # Template selection sidebar
│       ├── ElementProperties.jsx  # Text formatting controls
│       └── ImageProperties.jsx    # Image element controls
├── public/                  # Static files
│   ├── logo/               # Branding assets
│   └── js/                 # Legacy JavaScript modules
│       ├── core.js         # Background rendering
│       ├── main.js         # Initialization and compatibility
│       ├── simplified-editor.js   # Element creation/manipulation
│       ├── download.js     # Export functionality
│       ├── element-manager.js     # Dynamic element management
│       ├── interactions.js # Drag & drop interactions
│       ├── ai-generator.js # AI background generation (legacy)
│       ├── properties-panel.js    # Element styling (legacy)
│       └── vendors/        # External libraries
│           ├── jspdf.umd.min.js
│           └── html2canvas.min.js
└── README.md               # This documentation
```

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** (v16.0.0 or higher)
- **npm** (comes with Node.js)

### 1. Clone and Install
```bash
# Clone the repository
git clone https://github.com/ShivanshGhelani/canvas-certificate-editor.git
cd canvas-certificate-editor

# Install dependencies
npm install
```

### 2. Development
```bash
# Start development server
npm run dev
```

### 3. Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:3000` (or the port shown in terminal) in your browser.

## 🎮 Usage

### Creating Certificates
1. **Add Text Elements** - Click "Text" in the toolbar to add editable text
2. **Add Logos** - Click "Logo" to upload and position image elements
3. **Format Text** - Select text elements to access rich formatting controls
4. **Drag & Drop** - Move elements by dragging them around the canvas
5. **Export** - Use the Export menu to download as PDF, PNG, or JPG

### Text Formatting
- **Font Family** - Choose from professional font options
- **Font Size** - Adjust with stepper controls or direct input
- **Text Style** - Bold, italic, underline, strikethrough
- **Alignment** - Left, center, right, justify
- **Color** - Visual color picker with live preview
- **Advanced** - Line height and letter spacing controls

### Export Options
- **PDF Export** - High-quality print-ready A4 landscape format
- **PNG Export** - Transparent background support for web use
- **JPG Export** - Compressed format for smaller file sizes

## 🔧 Tech Stack

### Frontend
- **React 19** - Modern component-based UI framework
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **React Icons** - Comprehensive icon library

### Export & Canvas
- **jsPDF** - PDF generation from HTML/Canvas
- **html2canvas** - HTML to canvas conversion
- **Canvas API** - Background rendering and graphics

### Development Tools
- **ESLint** - Code linting and formatting
- **Vite Plugin React** - React support for Vite
- **TailwindCSS Vite Plugin** - Integrated CSS processing

## � Development

### Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint code analysis

### Project Architecture
The application uses a hybrid architecture combining:

1. **React Components** - Modern UI and state management
2. **Vanilla JS Modules** - Certificate manipulation and legacy compatibility
3. **Component Communication** - React components interface with JS modules via global window objects

### Adding New Features

#### Adding New React Components
```jsx
// Create component in src/components/
import React from 'react';

const NewComponent = () => {
  return <div>New Feature</div>;
};

export default NewComponent;
```

#### Adding Certificate Elements
```javascript
// Add to public/js/element-manager.js
function createCustomElement(options) {
  // Element creation logic
}
```

#### Styling with TailwindCSS
```jsx
// Use Tailwind utility classes
<div className="bg-blue-500 text-white p-4 rounded-lg">
  Styled Component
</div>
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Build the project
npm run build

# Deploy dist/ folder to Netlify
```

### Traditional Hosting
```bash
# Build production bundle
npm run build

# Upload dist/ folder to your web server
```

## 🎯 Future Enhancements

- [ ] **Real-time Collaboration** - Multiple users editing simultaneously
- [ ] **Template Marketplace** - Community-driven certificate templates
- [ ] **Advanced Graphics** - Shapes, borders, and decorative elements
- [ ] **Database Integration** - Save and load certificate projects
- [ ] **User Authentication** - Personal certificate libraries
- [ ] **Batch Processing** - Generate multiple certificates with data import
- [ ] **Advanced Export** - Vector formats (SVG, EPS)
- [ ] **Mobile Responsive** - Touch-friendly mobile interface
- [ ] **Template Designer** - Visual template creation tool
- [ ] **Print Management** - Direct printer integration

## 📝 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow React best practices and hooks patterns
- Use TailwindCSS for styling
- Maintain component modularity
- Test features across different browsers
- Document new features and APIs

## 📞 Support

For issues and questions:
- Create an issue on [GitHub](https://github.com/ShivanshGhelani/canvas-certificate-editor/issues)
- Check the documentation above
- Review the component source code in `src/components/`

## 🏆 Credits

**Built with ❤️ using React, Vite, and TailwindCSS**

### Key Libraries
- [React](https://react.dev/) - UI Framework
- [Vite](https://vite.dev/) - Build Tool
- [TailwindCSS](https://tailwindcss.com/) - CSS Framework
- [jsPDF](https://github.com/parallax/jsPDF) - PDF Generation
- [html2canvas](https://html2canvas.hertzen.com/) - HTML to Canvas
- [React Icons](https://react-icons.github.io/react-icons/) - Icon Library
