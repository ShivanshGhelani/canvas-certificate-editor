import React, { useState, useEffect } from 'react';
import { 
  FaFileExport, FaFilePdf, FaFileImage, FaFont, FaImage, FaSignature, FaPalette, FaMagic, FaChevronDown, FaCertificate, FaUpload, FaTrash, FaThLarge, FaFileCode, FaTimes, FaCheck, FaSync 
} from 'react-icons/fa';
import { getBackgroundTemplates, refreshTemplateCache } from '../lib/supabase';

const TopBar = ({ onAddText, onTemplateReset }) => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showBackgroundModal, setShowBackgroundModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [backgroundTemplates, setBackgroundTemplates] = useState({
    landscape: [],
    portrait: []
  });
  const [templatesLoading, setTemplatesLoading] = useState(false);
  const [templatesLoaded, setTemplatesLoaded] = useState(false);

  // Lazy load background templates only when modal is opened
  const loadBackgroundTemplates = async () => {
    if (templatesLoaded) return; // Don't reload if already loaded
    
    try {
      setTemplatesLoading(true);
      const templates = await getBackgroundTemplates();
      
      // Organize templates into categories for backward compatibility
      const organizedTemplates = {
        landscape: templates.landscape || [],
        // Group all portrait templates under different categories for UI purposes
        seminar: templates.portrait.slice(0, 8) || [],
        sports: templates.portrait.slice(8, 14) || [],
        techEvent: templates.portrait.slice(14, 21) || [],
        workshop: templates.portrait.slice(21, 26) || [],
        nonTechEvent: templates.portrait.slice(26) || []
      };
      
      setBackgroundTemplates(organizedTemplates);
      setTemplatesLoaded(true);
      console.log('🎨 Background templates loaded from Supabase:', organizedTemplates);
    } catch (error) {
      console.error('❌ Failed to load background templates:', error);
      // Set empty templates as fallback
      setBackgroundTemplates({
        landscape: [],
        seminar: [],
        sports: [],
        techEvent: [],
        workshop: [],
        nonTechEvent: []
      });
    } finally {
      setTemplatesLoading(false);
    }
  };

  // Handle opening background modal with lazy loading
  const handleOpenBackgroundModal = () => {
    setShowBackgroundModal(true);
    loadBackgroundTemplates(); // Load templates only when modal opens
  };

  // Handle refreshing templates (force cache refresh)
  const handleRefreshTemplates = async () => {
    try {
      setTemplatesLoading(true);
      setTemplatesLoaded(false);
      const templates = await refreshTemplateCache();
      
      const organizedTemplates = {
        landscape: templates.landscape || [],
        seminar: templates.portrait.slice(0, 8) || [],
        sports: templates.portrait.slice(8, 14) || [],
        techEvent: templates.portrait.slice(14, 21) || [],
        workshop: templates.portrait.slice(21, 26) || [],
        nonTechEvent: templates.portrait.slice(26) || []
      };
      
      setBackgroundTemplates(organizedTemplates);
      setTemplatesLoaded(true);
      console.log('🔄 Background templates refreshed from Supabase');
    } catch (error) {
      console.error('❌ Failed to refresh background templates:', error);
    } finally {
      setTemplatesLoading(false);
    }
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
    landscape: 'Landscape',
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
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close modal with Escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setShowBackgroundModal(false);
        setSelectedTemplate(null);
      }
    };

    if (showBackgroundModal) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [showBackgroundModal]);

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
    
    console.log('🔍 Export Debug - Starting HTML export...');
    console.log('📋 Certificate wrapper found:', !!certificateWrapper);
    console.log('🎨 Background canvas found:', !!backgroundCanvas);
    console.log('🖼️ Current background image:', window.currentBackgroundImage);
    
    if (!certificateWrapper) {
      console.error('❌ Certificate wrapper not found!');
      return;
    }
    
    // Get background image data with comprehensive capture
    let backgroundDataURL = '';
    
    try {
      // Method 1: Direct canvas capture (most reliable for drawn backgrounds)
      if (backgroundCanvas) {
        console.log('📏 Canvas dimensions:', backgroundCanvas.width, 'x', backgroundCanvas.height);
        
        try {
          // First try to capture the canvas directly
          backgroundDataURL = backgroundCanvas.toDataURL('image/jpeg', 0.8);
          console.log('✅ Canvas captured successfully (no CORS issues)');
        } catch (corsError) {
          console.warn('⚠️ Canvas tainted by CORS, using fallback method:', corsError.message);
          
          // Canvas is tainted, so we'll use the stored background image instead
          if (window.currentBackgroundImage) {
            console.log('🔄 Using stored background image due to CORS taint...');
            // Fall through to Method 2
          }
        }
      }
      
      // Method 2: Direct background image processing (fallback for CORS issues)
      if (!backgroundDataURL && window.currentBackgroundImage) {
        console.log('🔄 Method 2: Processing stored background image directly...');
        
        try {
          let imageSrc = window.currentBackgroundImage;
          
          // Handle Supabase URLs - fetch and convert to blob first
          if (imageSrc.includes('supabase.co') || imageSrc.startsWith('https://')) {
            console.log('🌐 Fetching Supabase/external image...');
            const response = await fetch(imageSrc, { 
              mode: 'cors',
              credentials: 'omit'
            });
            
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const blob = await response.blob();
            console.log('📦 Blob created, size:', blob.size, 'bytes');
            
            // Convert blob to data URL
            imageSrc = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            });
          }
          
          // Create optimized version
          const tempCanvas = document.createElement('canvas');
          const tempCtx = tempCanvas.getContext('2d');
          
          await new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
              console.log('🖼️ Original image size:', img.width, 'x', img.height);
              
              // Optimize dimensions (max 1200x1600 for web)
              const maxWidth = 1200;
              const maxHeight = 1600;
              let { width, height } = img;
              
              if (width > maxWidth || height > maxHeight) {
                const ratio = Math.min(maxWidth / width, maxHeight / height);
                width *= ratio;
                height *= ratio;
                console.log('📐 Resizing to:', width, 'x', height);
              }
              
              tempCanvas.width = width;
              tempCanvas.height = height;
              tempCtx.drawImage(img, 0, 0, width, height);
              
              backgroundDataURL = tempCanvas.toDataURL('image/jpeg', 0.7);
              console.log('✅ Method 2 successful:', backgroundDataURL.substring(0, 50) + '...');
              resolve();
            };
            img.onerror = (error) => {
              console.error('❌ Failed to load image:', error);
              reject(error);
            };
            // Don't set crossOrigin for data URLs to avoid CORS issues
            if (!imageSrc.startsWith('data:')) {
              img.crossOrigin = 'anonymous';
            }
            img.src = imageSrc;
          });
          
        } catch (error) {
          console.error('❌ Method 2 failed:', error);
        }
      }
      
      // Method 3: CSS background-image extraction (final fallback)
      if (!backgroundDataURL) {
        console.log('🔄 Method 3: Checking CSS background-image...');
        const wrapperStyles = window.getComputedStyle(certificateWrapper);
        const backgroundImage = wrapperStyles.backgroundImage;
        
        if (backgroundImage && backgroundImage !== 'none') {
          console.log('🎨 Found CSS background:', backgroundImage);
          const urlMatch = backgroundImage.match(/url\(["']?([^"']*)["']?\)/);
          
          if (urlMatch && urlMatch[1]) {
            console.log('🔗 Extracted URL:', urlMatch[1]);
            // Process this URL similar to Method 2
            // (Implementation similar to above but from CSS URL)
          }
        }
      }
      
    } catch (error) {
      console.error('❌ Background capture failed:', error);
    }
    
    // Log final result
    if (backgroundDataURL) {
      console.log('🎉 Background successfully captured! Size:', backgroundDataURL.length, 'characters');
    } else {
      console.warn('⚠️ No background captured - export will have no background image');
    }
    
    // Get computed styles for the certificate wrapper
    const computedStyles = window.getComputedStyle(certificateWrapper);
    const wrapperStyles = Array.from(computedStyles).reduce((acc, property) => {
      acc[property] = computedStyles.getPropertyValue(property);
      return acc;
    }, {});
    
    // Create inline styles string (remove background-image from wrapper styles to avoid conflicts)
    const filteredStyles = Object.entries(wrapperStyles)
      .filter(([property]) => property !== 'background-image')
      .map(([property, value]) => `${property}: ${value}`)
      .join('; ');
    
    // Clone the certificate content and optimize images
    const clonedContent = certificateWrapper.cloneNode(true);
    
    // Compress any images in the cloned content
    const images = clonedContent.querySelectorAll('img');
    for (const img of images) {
      if (img.src && img.src.startsWith('data:')) {
        try {
          // Compress inline images
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const tempImg = new Image();
          
          await new Promise((resolve) => {
            tempImg.onload = () => {
              const maxSize = 600; // Reduced size for signatures/logos
              let { width, height } = tempImg;
              
              if (width > maxSize || height > maxSize) {
                const ratio = Math.min(maxSize / width, maxSize / height);
                width *= ratio;
                height *= ratio;
              }
              
              canvas.width = width;
              canvas.height = height;
              ctx.drawImage(tempImg, 0, 0, width, height);
              img.src = canvas.toDataURL('image/jpeg', 0.7);
              resolve();
            };
            tempImg.src = img.src;
          });
        } catch (error) {
          console.warn('Failed to compress image:', error);
        }
      }
    }
    
    // Create a complete HTML document with optimized styling
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
            padding: 0;
            font-family: Arial, sans-serif;
            background: transparent;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        
        .certificate-display {
            background: transparent;
            padding: 0;
            position: relative;
            width: fit-content;
            height: fit-content;
        }
        
        .certificate-wrapper {
            ${filteredStyles};
            position: relative;
            ${backgroundDataURL ? `background-image: url('${backgroundDataURL}');` : ''}
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
        
        .signature-element {
            position: absolute;
            z-index: 10;
        }
        
        .signature-line {
            background-color: #000000;
        }
        
        /* Remove interactive elements from export */
        .resize-handle,
        .remove-btn,
        .delete-btn,
        .toggle-line-btn {
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
        
        /* Image optimization */
        img {
            max-width: 100%;
            height: auto;
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
    // Show a modal to choose signature options
    const modalHTML = `
      <div id="signature-options-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div class="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Add Signature</h3>
          <p class="text-sm text-gray-600 mb-4">Choose your signature options:</p>
          
          <div class="space-y-4">
            <label class="flex items-center space-x-3">
              <input type="checkbox" id="include-signature-line" checked class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
              <span class="text-sm text-gray-700">Include signature line</span>
            </label>
            
            <div class="text-xs text-gray-500 bg-gray-50 p-3 rounded">
              <strong>Note:</strong> Background removal will be automatically applied to make signatures transparent.
              You can toggle the signature line later using the toggle button when the signature is selected.
            </div>
          </div>
          
          <div class="flex justify-end space-x-3 mt-6">
            <button id="cancel-signature" class="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button id="upload-signature" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Upload Signature
            </button>
          </div>
        </div>
      </div>
    `;
    
    // Add modal to DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('signature-options-modal');
    const cancelBtn = document.getElementById('cancel-signature');
    const uploadBtn = document.getElementById('upload-signature');
    const includeLineCheckbox = document.getElementById('include-signature-line');
    
    // Handle cancel
    cancelBtn.addEventListener('click', () => {
      modal.remove();
    });
    
    // Handle click outside modal
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
    
    // Handle upload
    uploadBtn.addEventListener('click', () => {
      const includeSignatureLine = includeLineCheckbox.checked;
      modal.remove();
      
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
            
            // Create signature element using Canvas function with line parameter
            if (window.createSimpleSignatureElement) {
              const element = window.createSimpleSignatureElement(imageSrc, includeSignatureLine);
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
    });
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
    // Auto-switch dimensions based on template category
    const isLandscapeTemplate = templatePath.includes('/landscape/') || 
                                backgroundTemplates.landscape.includes(templatePath);
    const isPortraitTemplate = !isLandscapeTemplate;
    
    let targetDimension = null;
    
    if (isLandscapeTemplate) {
      // Switch to landscape dimension
      targetDimension = {
        id: 'landscape',
        name: 'Landscape', 
        description: 'A4 Landscape (297mm × 210mm)',
        canvas: { width: 3508, height: 2480 }, // 300 DPI
        display: { width: 1052, height: 744 }, // 30% scale for display
        physical: { width: '297mm', height: '210mm' },
        orientation: 'landscape'
      };
    } else if (isPortraitTemplate) {
      // Switch to portrait dimension
      targetDimension = {
        id: 'portrait',
        name: 'Portrait',
        description: 'A4 Portrait (210mm × 297mm)',
        canvas: { width: 2480, height: 3508 }, // 300 DPI
        display: { width: 744, height: 1052 }, // 30% scale for display
        physical: { width: '210mm', height: '297mm' },
        orientation: 'portrait'
      };
    }
    
    if (targetDimension) {
      // Apply dimension changes directly
      const canvas = document.getElementById('background-canvas');
      const wrapper = document.getElementById('certificate-wrapper');
      
      if (canvas && wrapper) {
        // Set canvas dimensions (300 DPI for print quality)
        canvas.width = targetDimension.canvas.width;
        canvas.height = targetDimension.canvas.height;
        
        // Set wrapper display dimensions (30% scale for viewing)
        wrapper.style.width = `${targetDimension.display.width}px`;
        wrapper.style.height = `${targetDimension.display.height}px`;
        
        // Add orientation classes
        wrapper.classList.remove('portrait-mode', 'landscape-mode');
        wrapper.classList.add(`${targetDimension.orientation}-mode`);
        
        console.log(`✅ Auto-switched to ${targetDimension.orientation} for template`);
        console.log(`Canvas: ${canvas.width}x${canvas.height}, Wrapper: ${wrapper.style.width}x${wrapper.style.height}`);
      }
      
      // Dispatch global event for DimensionSelector to update
      const dimensionChangeEvent = new CustomEvent('dimensionChanged', { 
        detail: targetDimension 
      });
      window.dispatchEvent(dimensionChangeEvent);
      
      // Also trigger the dimension selector state update
      const selectorUpdateEvent = new CustomEvent('updateDimensionSelector', { 
        detail: { selectedDimension: targetDimension.id } 
      });
      window.dispatchEvent(selectorUpdateEvent);
    }
    
    // Use the global setBackgroundImage function from Canvas.jsx
    if (window.setBackgroundImage) {
      window.setBackgroundImage(templatePath);
    }
    
    setShowBackgroundModal(false);
    setSelectedTemplate(null);
  };

  const loadCertificateTemplate = (template) => {
    // Use the Layout component's template loading function
    const event = new CustomEvent('loadTemplate', { detail: template });
    window.dispatchEvent(event);
    setShowBackgroundModal(false);
    setSelectedTemplate(null);
  };

  const triggerBackgroundUploadFromModal = () => {
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
          setShowBackgroundModal(false);
          setSelectedTemplate(null);
        };
        reader.readAsDataURL(file);
      }
    });
    
    // Trigger file selection
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
  };

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-sm">
      <div className="flex items-center gap-3">
        <FaCertificate className="text-2xl text-blue-600" />
        <span className="text-lg font-semibold text-gray-800">Certificate Designer</span>
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
            onClick={handleOpenBackgroundModal}
          >
            <FaPalette />
            <span>Background Template</span>
          </button>
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

      {/* Background Templates Modal */}
      {showBackgroundModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm bg-opacity-50">
          <div className="bg-white rounded-lg shadow-2xl max-w-6xl max-h-[90vh] w-full mx-4 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Background Templates</h2>
                <p className="text-sm text-gray-600 mt-1">Choose a template or upload your own background</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleRefreshTemplates}
                  disabled={templatesLoading}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
                  title="Refresh templates"
                >
                  <FaSync className={`text-gray-500 ${templatesLoading ? 'animate-spin' : ''}`} size={16} />
                </button>
                <button
                  onClick={() => {
                    setShowBackgroundModal(false);
                    setSelectedTemplate(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaTimes className="text-gray-500" size={20} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* Upload Section */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <button
                    onClick={triggerBackgroundUploadFromModal}
                    className="flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <FaUpload />
                    <span>Upload Custom Background</span>
                  </button>
                  <button
                    onClick={() => {
                      resetBackground();
                      setShowBackgroundModal(false);
                      setSelectedTemplate(null);
                    }}
                    className="flex items-center gap-3 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                  >
                    <FaTrash />
                    <span>Reset to Default</span>
                  </button>
                </div>
                <hr className="border-gray-200" />
              </div>

              {/* Templates Grid */}
              {templatesLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="text-gray-600">Loading templates from Supabase...</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {Object.entries(backgroundTemplates).map(([category, templates]) => (
                    templates.length > 0 && (
                      <div key={category}>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <div className="w-4 h-4 bg-blue-600 rounded"></div>
                          {categoryNames[category]} Templates
                          {category === 'landscape' && (
                            <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                              Auto-switches to Landscape
                            </span>
                          )}
                          {category !== 'landscape' && (
                            <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-medium">
                              Auto-switches to Portrait
                            </span>
                          )}
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                          {templates.map((template, index) => (
                            <div key={index} className="relative group">
                              <button
                                className={`relative w-full aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                                  selectedTemplate === template
                                    ? 'border-blue-500 shadow-lg scale-105'
                                    : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                                }`}
                                onClick={() => setSelectedTemplate(template)}
                              >
                                <img
                                  src={template}
                                  alt={`${categoryNames[category]} template ${index + 1}`}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                  loading="lazy"
                                  onError={(e) => {
                                    console.warn('Failed to load template image:', template);
                                    e.target.style.display = 'none';
                                  }}
                                />
                                {selectedTemplate === template && (
                                  <div className="absolute inset-0 bg-blue-600 bg-opacity-20 flex items-center justify-center">
                                    <div className="bg-blue-600 text-white rounded-full p-2">
                                      <FaCheck size={16} />
                                    </div>
                                  </div>
                                )}
                              </button>
                              <p className="text-xs text-gray-600 mt-2 text-center">
                                {categoryNames[category]} {index + 1}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  ))}
                  
                  {/* Show message if no templates loaded */}
                  {Object.values(backgroundTemplates).every(templates => templates.length === 0) && !templatesLoading && (
                    <div className="text-center py-12">
                      <div className="text-gray-400 mb-4">
                        <FaPalette size={48} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">No Templates Found</h3>
                      <p className="text-gray-500 mb-4">
                        No background templates were found in Supabase storage.
                      </p>
                      <button
                        onClick={triggerBackgroundUploadFromModal}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Upload Your First Template
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
              <div className="text-sm text-gray-600">
                {selectedTemplate ? (
                  <span className="font-medium">Template selected. Click "Use Template" to apply.</span>
                ) : (
                  <span>Select a template to preview and apply it to your certificate.</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setShowBackgroundModal(false);
                    setSelectedTemplate(null);
                  }}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (selectedTemplate) {
                      loadBackgroundTemplate(selectedTemplate);
                    }
                  }}
                  disabled={!selectedTemplate}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    selectedTemplate
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Use Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;
