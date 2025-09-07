import React, { useState, useEffect } from 'react';
import { 
  FaFileExport, FaFilePdf, FaFileImage, FaFont, FaImage, FaSignature, FaPalette, FaMagic, FaChevronDown, FaCertificate, FaUpload, FaTrash, FaThLarge, FaFileCode 
} from 'react-icons/fa';

const TopBar = ({ onAddText, onTemplateReset }) => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showBackgroundMenu, setShowBackgroundMenu] = useState(false);
  const [showBackgroundTemplates, setShowBackgroundTemplates] = useState(false);

  // Background templates organized by category
  const backgroundTemplates = {
    seminar: [
      '/backgrounds/templates/seminar-professional-navy.png',
      '/backgrounds/templates/seminar-corporate-gray.png',
      '/backgrounds/templates/seminar-elegant-gold.png',
      '/backgrounds/templates/seminar-formal-green.png',
      '/backgrounds/templates/seminar-luxury-black.png',
      '/backgrounds/templates/seminar-modern-white.png',
      '/backgrounds/templates/seminar-premium-purple.png',
      '/backgrounds/templates/seminar-classic-blue.png'
    ],
    sports: [
      '/backgrounds/templates/sports-champion-gold.png',
      '/backgrounds/templates/sports-achievement-red.png',
      '/backgrounds/templates/sports-medal-silver.png',
      '/backgrounds/templates/sports-victory-blue.png',
      '/backgrounds/templates/sports-winner-green.png',
      '/backgrounds/templates/sports-competition-orange.png'
    ],
    techEvent: [
      '/backgrounds/templates/tech-innovation-blue.png',
      '/backgrounds/templates/tech-digital-excellence.png',
      '/backgrounds/templates/tech-coding-competition.png',
      '/backgrounds/templates/tech-conference-modern.png',
      '/backgrounds/templates/tech-ai-ml-event.png',
      '/backgrounds/templates/tech-cybersecurity-event.png',
      '/backgrounds/templates/tech-hackathon-event.png'
    ],
    workshop: [
      '/backgrounds/templates/workshop-skills-development.png',
      '/backgrounds/templates/workshop-creative-arts.png',
      '/backgrounds/templates/workshop-professional-training.png',
      '/backgrounds/templates/workshop-technical-skills.png',
      '/backgrounds/templates/workshop-leadership-development.png'
    ],
    nonTechEvent: [
      '/backgrounds/templates/event-cultural-celebration.png',
      '/backgrounds/templates/event-arts-festival.png',
      '/backgrounds/templates/event-community-service.png',
      '/backgrounds/templates/event-social-gathering.png',
      '/backgrounds/templates/event-volunteer-service.png',
      '/backgrounds/templates/event-literary-achievement.png',
      '/backgrounds/templates/event-general-achievement.png'
    ]
  };

  // Certificate templates with text elements
  const certificateTemplates = [
    {
      id: 'academic-achievement',
      name: 'Academic Achievement',
      description: 'Classic academic certificate design',
      elements: [
        {
          id: 'title',
          type: 'text',
          content: 'Certificate of Achievement',
          x: 400,
          y: 150,
          fontSize: 36,
          fontWeight: 'bold',
          fontFamily: 'Cinzel',
          color: '#2c3e50',
          textAlign: 'center'
        },
        {
          id: 'subtitle',
          type: 'text',
          content: 'This is to certify that',
          x: 400,
          y: 220,
          fontSize: 18,
          fontFamily: 'Lora',
          color: '#34495e',
          textAlign: 'center'
        },
        {
          id: 'recipient',
          type: 'text',
          content: 'Student Name',
          x: 400,
          y: 280,
          fontSize: 32,
          fontWeight: 'bold',
          fontFamily: 'Playfair Display',
          color: '#2a6df4',
          textAlign: 'center'
        },
        {
          id: 'description',
          type: 'text',
          content: 'has successfully completed the requirements and is awarded this certificate',
          x: 400,
          y: 350,
          fontSize: 16,
          fontFamily: 'Lora',
          color: '#34495e',
          textAlign: 'center'
        },
        {
          id: 'course',
          type: 'text',
          content: 'Course/Program Name',
          x: 400,
          y: 420,
          fontSize: 24,
          fontWeight: 'bold',
          fontFamily: 'Montserrat',
          color: '#2c3e50',
          textAlign: 'center'
        },
        {
          id: 'date',
          type: 'text',
          content: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          x: 200,
          y: 520,
          fontSize: 14,
          fontFamily: 'Roboto',
          color: '#34495e',
          textAlign: 'left'
        }
      ]
    },
    {
      id: 'professional-award',
      name: 'Professional Award',
      description: 'Modern professional certificate',
      elements: [
        {
          id: 'title',
          type: 'text',
          content: 'Professional Excellence Award',
          x: 400,
          y: 140,
          fontSize: 40,
          fontWeight: 'bold',
          fontFamily: 'Montserrat',
          color: '#1a237e',
          textAlign: 'center'
        },
        {
          id: 'subtitle',
          type: 'text',
          content: 'Presented to',
          x: 400,
          y: 200,
          fontSize: 20,
          fontFamily: 'Lato',
          color: '#424242',
          textAlign: 'center'
        },
        {
          id: 'recipient',
          type: 'text',
          content: 'Employee Name',
          x: 400,
          y: 260,
          fontSize: 36,
          fontWeight: 'bold',
          fontFamily: 'Raleway',
          color: '#e91e63',
          textAlign: 'center'
        },
        {
          id: 'description',
          type: 'text',
          content: 'For outstanding performance and dedication to excellence',
          x: 400,
          y: 330,
          fontSize: 18,
          fontFamily: 'Open Sans',
          color: '#424242',
          textAlign: 'center'
        },
        {
          id: 'department',
          type: 'text',
          content: 'Department/Division',
          x: 400,
          y: 390,
          fontSize: 20,
          fontWeight: '600',
          fontFamily: 'Poppins',
          color: '#1a237e',
          textAlign: 'center'
        }
      ]
    },
    {
      id: 'course-completion',
      name: 'Course Completion',
      description: 'Training course certificate',
      elements: [
        {
          id: 'title',
          type: 'text',
          content: 'Certificate of Completion',
          x: 400,
          y: 160,
          fontSize: 38,
          fontWeight: 'bold',
          fontFamily: 'Cormorant Garamond',
          color: '#2e7d32',
          textAlign: 'center'
        },
        {
          id: 'subtitle',
          type: 'text',
          content: 'This certifies that',
          x: 400,
          y: 220,
          fontSize: 16,
          fontFamily: 'Libre Baskerville',
          color: '#37474f',
          textAlign: 'center'
        },
        {
          id: 'recipient',
          type: 'text',
          content: 'Participant Name',
          x: 400,
          y: 280,
          fontSize: 30,
          fontWeight: 'bold',
          fontFamily: 'Dancing Script',
          color: '#d32f2f',
          textAlign: 'center'
        },
        {
          id: 'description',
          type: 'text',
          content: 'has successfully completed the training program',
          x: 400,
          y: 340,
          fontSize: 16,
          fontFamily: 'Merriweather',
          color: '#37474f',
          textAlign: 'center'
        },
        {
          id: 'course',
          type: 'text',
          content: 'Course Title',
          x: 400,
          y: 400,
          fontSize: 22,
          fontWeight: 'bold',
          fontFamily: 'Oswald',
          color: '#2e7d32',
          textAlign: 'center'
        },
        {
          id: 'duration',
          type: 'text',
          content: 'Duration: 40 Hours',
          x: 400,
          y: 450,
          fontSize: 14,
          fontFamily: 'Roboto',
          color: '#546e7a',
          textAlign: 'center'
        }
      ]
    },
    {
      id: 'appreciation',
      name: 'Appreciation Certificate',
      description: 'Certificate of appreciation',
      elements: [
        {
          id: 'title',
          type: 'text',
          content: 'Certificate of Appreciation',
          x: 400,
          y: 150,
          fontSize: 36,
          fontWeight: 'bold',
          fontFamily: 'Great Vibes',
          color: '#8e24aa',
          textAlign: 'center'
        },
        {
          id: 'subtitle',
          type: 'text',
          content: 'Gratefully presented to',
          x: 400,
          y: 210,
          fontSize: 18,
          fontFamily: 'Parisienne',
          color: '#4a148c',
          textAlign: 'center'
        },
        {
          id: 'recipient',
          type: 'text',
          content: 'Honoree Name',
          x: 400,
          y: 270,
          fontSize: 34,
          fontWeight: 'bold',
          fontFamily: 'Allura',
          color: '#d32f2f',
          textAlign: 'center'
        },
        {
          id: 'description',
          type: 'text',
          content: 'In recognition of outstanding service and valuable contributions',
          x: 400,
          y: 340,
          fontSize: 16,
          fontFamily: 'Lora',
          color: '#424242',
          textAlign: 'center'
        },
        {
          id: 'organization',
          type: 'text',
          content: 'Organization Name',
          x: 400,
          y: 400,
          fontSize: 20,
          fontWeight: '600',
          fontFamily: 'Cinzel',
          color: '#8e24aa',
          textAlign: 'center'
        }
      ]
    }
  ];

  const categoryNames = {
    seminar: 'Seminar',
    sports: 'Sports',
    techEvent: 'Tech Event',
    workshop: 'Workshop',
    nonTechEvent: 'Non-Tech Event'
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.relative')) {
        setShowExportMenu(false);
        setShowBackgroundMenu(false);
        setShowBackgroundTemplates(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const downloadPNG = () => {
    const certificateWrapper = document.getElementById('certificate-wrapper');
    if (!certificateWrapper || !window.html2canvas) return;
    
    window.html2canvas(certificateWrapper, { 
      scale: 2,
      useCORS: true,
      backgroundColor: 'white'
    }).then(canvas => {
      const link = document.createElement('a');
      link.download = 'certificate.png';
      link.href = canvas.toDataURL();
      link.click();
    });
    setShowExportMenu(false);
  };

  const downloadJPG = () => {
    const certificateWrapper = document.getElementById('certificate-wrapper');
    if (!certificateWrapper || !window.html2canvas) return;
    
    window.html2canvas(certificateWrapper, { 
      scale: 2,
      useCORS: true,
      backgroundColor: 'white'
    }).then(canvas => {
      const link = document.createElement('a');
      link.download = 'certificate.jpg';
      link.href = canvas.toDataURL('image/jpeg', 0.9);
      link.click();
    });
    setShowExportMenu(false);
  };

  const downloadPDF = () => {
    const downloadBtn = document.getElementById('download-pdf');
    if (downloadBtn) {
      downloadBtn.click();
    }
    setShowExportMenu(false);
  };

  const downloadHTML = async () => {
    const certificateWrapper = document.getElementById('certificate-wrapper');
    const backgroundCanvas = document.getElementById('background-canvas');
    if (!certificateWrapper) return;
    
    // Convert background canvas to base64 if it exists
    let backgroundDataURL = '';
    if (backgroundCanvas) {
      try {
        backgroundDataURL = backgroundCanvas.toDataURL('image/png');
      } catch (e) {
        console.warn('Could not capture background canvas:', e);
      }
    }
    
    // Get computed styles for the certificate wrapper
    const computedStyles = window.getComputedStyle(certificateWrapper);
    const wrapperStyles = Array.from(computedStyles).reduce((acc, property) => {
      acc[property] = computedStyles.getPropertyValue(property);
      return acc;
    }, {});
    
    // Create inline styles string
    const inlineStyles = Object.entries(wrapperStyles)
      .map(([property, value]) => `${property}: ${value}`)
      .join('; ');
    
    // Clone the certificate content
    const clonedContent = certificateWrapper.cloneNode(true);
    
    // Create a complete HTML document with proper styling
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificate</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        
        .certificate-display {
            background: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            padding: 20px;
            position: relative;
            width: fit-content;
            height: fit-content;
        }
        
        .certificate-wrapper {
            ${inlineStyles};
            position: relative;
            background-image: url('${backgroundDataURL}');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }
        
        .dynamic-element {
            position: absolute;
            font-family: inherit;
            z-index: 10;
        }
        
        .template-element {
            position: absolute;
            font-family: inherit;
            z-index: 10;
        }
        
        /* Remove interactive elements from export */
        .resize-handle,
        .remove-btn,
        .delete-btn {
            display: none !important;
        }
        
        /* Preserve text styling */
        span, div {
            color: inherit;
            font-size: inherit;
            font-family: inherit;
            font-weight: inherit;
            text-align: inherit;
        }
    </style>
</head>
<body>
    <div class="certificate-display">
        ${clonedContent.outerHTML}
    </div>
</body>
</html>`;

    // Create and download the HTML file
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'certificate.html';
    link.click();
    URL.revokeObjectURL(link.href);
    setShowExportMenu(false);
  };

  // Element actions
  const triggerAddText = () => {
    if (onAddText) {
      onAddText();
    }
  };

  const openTemplateSelector = () => {
    if (window.templateManager) {
      window.templateManager.showModal();
    }
  };

  const triggerAddLogo = () => {
    const logoInput = document.getElementById('upload-logo-dynamic');
    if (logoInput) {
      logoInput.click();
    }
  };

  const triggerAddSignature = () => {
    // Create a file input for signature upload
    const signatureInput = document.createElement('input');
    signatureInput.type = 'file';
    signatureInput.accept = 'image/*';
    signatureInput.style.display = 'none';
    
    signatureInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          let imageSrc = e.target.result;
          
          // Apply automatic background and shadow removal
          if (window.enhancedBackgroundRemoval) {
            try {
              imageSrc = await window.enhancedBackgroundRemoval(imageSrc, {
                tolerance: 30,
                shadowTolerance: 40,
                edgeSmoothing: true,
                removeWhite: true,
                removeShadows: true,
                shadowDetectionSensitivity: 0.7
              });
            } catch (error) {
              console.warn('Enhanced background removal failed, trying basic removal:', error);
              // Fallback to basic removal
              if (window.removeWhiteBackground) {
                try {
                  imageSrc = await window.removeWhiteBackground(imageSrc);
                } catch (fallbackError) {
                  console.warn('Basic background removal also failed:', fallbackError);
                }
              }
            }
          } else if (window.removeWhiteBackground) {
            try {
              imageSrc = await window.removeWhiteBackground(imageSrc);
            } catch (error) {
              console.warn('Background removal failed, using original image:', error);
            }
          }
          
          // Create signature element using Canvas function
          if (window.createSimpleSignatureElement) {
            const element = window.createSimpleSignatureElement(imageSrc);
            const container = document.getElementById('dynamic-elements-container');
            
            if (container) {
              // Position in center
              const containerRect = container.getBoundingClientRect();
              const centerX = containerRect.width / 2 - 75;
              const centerY = containerRect.height / 2 - 40;
              
              element.style.left = centerX + 'px';
              element.style.top = centerY + 'px';
              element.style.transform = 'none';
              
              container.appendChild(element);
              
              // Select the new element
              if (window.selectElement) {
                window.selectElement(element);
              }
            }
          }
        };
        reader.readAsDataURL(file);
      }
      
      // Clean up
      document.body.removeChild(signatureInput);
    });
    
    // Add to DOM and trigger click
    document.body.appendChild(signatureInput);
    signatureInput.click();
  };

  const generateAIBackground = () => {
    const prompt = document.getElementById('ai-prompt')?.value;
    const promptInput = document.getElementById('ai-prompt-input');
    if (prompt && promptInput) {
      promptInput.value = prompt;
      document.getElementById('ai-generate-btn')?.click();
    }
  };

  const triggerBackgroundUpload = () => {
    // Create file input for background upload
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    
    fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageSrc = e.target.result;
          // Use the global setBackgroundImage function from Canvas.jsx
          if (window.setBackgroundImage) {
            window.setBackgroundImage(imageSrc);
          }
        };
        reader.readAsDataURL(file);
      }
    });
    
    // Trigger file selection
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
  };

  const resetBackground = () => {
    // Use the global resetBackground function from Canvas.jsx
    if (window.resetBackground) {
      window.resetBackground();
    } else if (window.drawBackground && typeof window.drawBackground === 'function') {
      // Fallback to ornate background
      window.drawBackground();
    }
  };

  const loadBackgroundTemplate = (templatePath) => {
    // Use the global setBackgroundImage function from Canvas.jsx
    if (window.setBackgroundImage) {
      window.setBackgroundImage(templatePath);
    }
    
    // Automatically load a default certificate template with the background
    const defaultTemplate = certificateTemplates[0]; // Use Academic Achievement template
    const event = new CustomEvent('loadTemplate', { detail: defaultTemplate });
    window.dispatchEvent(event);
    
    setShowBackgroundTemplates(false);
    setShowBackgroundMenu(false);
  };

  const loadCertificateTemplate = (template) => {
    // Use the Layout component's template loading function
    const event = new CustomEvent('loadTemplate', { detail: template });
    window.dispatchEvent(event);
    setShowBackgroundTemplates(false);
    setShowBackgroundMenu(false);
  };

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white">
          <FaCertificate size={20} />
        </div>
        <h1 className="text-lg font-bold text-gray-800">Certificate Editor</h1>
      </div>

      {/* Elements Toolbar */}
      <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
        <button 
          className="px-3 py-2 rounded-md flex items-center gap-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
          onClick={triggerAddText}
        >
          <FaFont />
          <span>Text</span>
        </button>

        <button 
          className="px-3 py-2 rounded-md flex items-center gap-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
          onClick={() => {
            if (onTemplateReset) onTemplateReset();
            resetBackground();
          }}
        >
          <FaTrash />
          <span>Reset</span>
        </button>

        <button 
          className="px-3 py-2 rounded-md flex items-center gap-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
          onClick={triggerAddLogo}
        >
          <FaImage />
          <span>Logo</span>
        </button>

        <div className="relative">
          <button 
            className="px-3 py-2 rounded-md flex items-center gap-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
            onClick={() => setShowBackgroundMenu(!showBackgroundMenu)}
          >
            <FaPalette />
            <span>Background Template</span>
            <FaChevronDown className={`transition-transform duration-200 ${showBackgroundMenu ? 'rotate-180' : ''}`} />
          </button>

          {showBackgroundMenu && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl min-w-48 z-50 animate-fade-in-down">
              <button
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 first:rounded-t-lg"
                onClick={() => {
                  setShowBackgroundTemplates(!showBackgroundTemplates);
                }}
              >
                <FaThLarge className="text-purple-600" />
                <span>Choose Background Template</span>
                <FaChevronDown className={`ml-auto transition-transform duration-200 ${showBackgroundTemplates ? 'rotate-180' : ''}`} />
              </button>
              
              {showBackgroundTemplates && (
                <div className="border-t border-gray-100 max-h-80 overflow-y-auto">
                  {/* Background Image Templates Section */}
                  {Object.entries(backgroundTemplates).map(([category, templates]) => (
                    <div key={category} className="p-2">
                      <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 px-2">
                        {categoryNames[category]} Backgrounds
                      </h4>
                      <div className="grid grid-cols-3 gap-2">
                        {templates.map((template, index) => (
                          <button
                            key={index}
                            className="relative aspect-square rounded overflow-hidden border border-gray-200 hover:border-blue-500 transition-colors"
                            onClick={() => loadBackgroundTemplate(template)}
                          >
                            <img
                              src={template}
                              alt={`${categoryNames[category]} template ${index + 1}`}
                              className="w-full h-full object-cover hover:scale-110 transition-transform"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <button
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 border-t border-gray-100"
                onClick={() => {
                  triggerBackgroundUpload();
                  setShowBackgroundMenu(false);
                }}
              >
                <FaUpload className="text-blue-600" />
                <span>Upload Custom Background</span>
              </button>
              <button
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 last:rounded-b-lg border-t border-gray-100"
                onClick={() => {
                  resetBackground();
                  setShowBackgroundMenu(false);
                }}
              >
                <FaTrash className="text-red-600" />
                <span>Reset to Default</span>
              </button>
            </div>
          )}
        </div>

        <button 
          className="px-3 py-2 rounded-md flex items-center gap-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
          onClick={triggerAddSignature}
        >
          <FaSignature />
          <span>Signature</span>
        </button>

        <div className="w-px h-6 bg-gray-300 mx-2"></div>

        {/* AI Background Section */}
        <div className="flex items-center gap-2">
          <FaMagic className="text-gray-600" />
          <input 
            id="ai-prompt"
            className="px-2 py-1.5 border border-gray-300 rounded-md text-sm w-40 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="AI background..."
          />
          <button 
            className="px-3 py-1.5 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors"
            onClick={generateAIBackground}
          >
            Generate
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Cancel Button */}
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 transition-colors flex items-center gap-2"
        >
          <span>×</span>
          <span>Cancel</span>
        </button>
        
        {/* Export Button */}
        <div className="relative">
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors"
            onClick={() => setShowExportMenu(!showExportMenu)}
          >
            <FaFileExport />
            <span>Export</span>
            <FaChevronDown className={`transition-transform duration-200 ${showExportMenu ? 'rotate-180' : ''}`} />
          </button>

        {showExportMenu && (
          <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl min-w-48 z-50 animate-fade-in-down">
            <button
              className="w-full px-4 py-3 text-sm text-gray-700 flex items-center gap-3 hover:bg-gray-100"
              onClick={downloadPNG}
            >
              <FaFileImage className="text-blue-500" />
              <span>Download PNG</span>
            </button>
            <button
              className="w-full px-4 py-3 text-sm text-gray-700 flex items-center gap-3 hover:bg-gray-100"
              onClick={downloadPDF}
            >
              <FaFilePdf className="text-red-500" />
              <span>Download PDF</span>
            </button>
            <button
              className="w-full px-4 py-3 text-sm text-gray-700 flex items-center gap-3 hover:bg-gray-100"
              onClick={downloadHTML}
            >
              <FaFileCode className="text-orange-500" />
              <span>Download HTML</span>
            </button>
          </div>
          )}
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showExportMenu && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowExportMenu(false)}
        />
      )}
    </div>
  );
};export default TopBar;
