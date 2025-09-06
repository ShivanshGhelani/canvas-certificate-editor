import React, { useState, useEffect } from 'react';
import { 
  FaFileExport, FaFilePdf, FaFileImage, FaFont, FaImage, FaSignature, FaPalette, FaMagic, FaChevronDown, FaCertificate, FaUpload, FaTrash, FaThLarge 
} from 'react-icons/fa';

const TopBar = ({ onAddText, onTemplateReset }) => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showBackgroundMenu, setShowBackgroundMenu] = useState(false);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.relative')) {
        setShowExportMenu(false);
        setShowBackgroundMenu(false);
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
    if (window.triggerBackgroundUpload) {
      window.triggerBackgroundUpload();
    }
  };

  const resetBackground = () => {
    if (window.resetBackground) {
      window.resetBackground();
    }
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
          onClick={openTemplateSelector}
        >
          <FaThLarge />
          <span>Templates</span>
        </button>

        <button 
          className="px-3 py-2 rounded-md flex items-center gap-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
          onClick={() => {
            if (onTemplateReset) onTemplateReset();
            if (window.templateManager?.resetBackground) {
              window.templateManager.resetBackground();
            }
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
            <span>Background</span>
            <FaChevronDown className={`transition-transform duration-200 ${showBackgroundMenu ? 'rotate-180' : ''}`} />
          </button>

          {showBackgroundMenu && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl min-w-48 z-50 animate-fade-in-down">
              <button
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 first:rounded-t-lg"
                onClick={() => {
                  openTemplateSelector();
                  setShowBackgroundMenu(false);
                }}
              >
                <FaThLarge className="text-purple-600" />
                <span>Choose Template</span>
              </button>
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
              onClick={downloadJPG}
            >
              <FaFileImage className="text-green-500" />
              <span>Download JPG</span>
            </button>
            <button
              className="w-full px-4 py-3 text-sm text-gray-700 flex items-center gap-3 hover:bg-gray-100"
              onClick={downloadPDF}
            >
              <FaFilePdf className="text-red-500" />
              <span>Download PDF</span>
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
