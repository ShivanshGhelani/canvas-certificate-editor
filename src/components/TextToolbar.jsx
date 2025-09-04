import React, { useState } from 'react';
import { 
  FaBold, FaItalic, FaUnderline, FaAlignLeft, FaAlignCenter, 
  FaAlignRight, FaFont, FaPalette, FaSun, FaPaintBrush 
} from 'react-icons/fa';

const TextToolbar = ({ selectedElement, onUpdate }) => {
  const [showGradientPicker, setShowGradientPicker] = useState(false);
  const [showShadowControls, setShowShadowControls] = useState(false);

  if (!selectedElement) return null;

  const handleFontSizeChange = (delta) => {
    const newSize = Math.max(8, Math.min(120, selectedElement.fontSize + delta));
    onUpdate({ fontSize: newSize });
  };

  const handleFontFamilyChange = (fontFamily) => {
    onUpdate({ fontFamily });
  };

  const handleColorChange = (color) => {
    onUpdate({ color });
  };

  const handleWeightToggle = () => {
    const newWeight = selectedElement.fontWeight === 'bold' ? 'normal' : 'bold';
    onUpdate({ fontWeight: newWeight });
  };

  const handleStyleToggle = () => {
    const newStyle = selectedElement.fontStyle === 'italic' ? 'normal' : 'italic';
    onUpdate({ fontStyle: newStyle });
  };

  const handleAlignmentChange = (textAlign) => {
    onUpdate({ textAlign });
  };

  const handleGradientChange = (gradient) => {
    onUpdate({ background: gradient, color: 'transparent' });
    setShowGradientPicker(false);
  };

  const handleShadowChange = (shadow) => {
    onUpdate({ textShadow: shadow });
  };

  const clearGradient = () => {
    onUpdate({ background: '', color: selectedElement.color || '#000000' });
    setShowGradientPicker(false);
  };

  const clearShadow = () => {
    onUpdate({ textShadow: '' });
    setShowShadowControls(false);
  };

  const fontFamilies = [
    'Arial', 'Helvetica', 'Times New Roman', 'Georgia', 
    'Verdana', 'Tahoma', 'Impact', 'Comic Sans MS',
    'Courier New', 'Lucida Console'
  ];

  const gradientPresets = [
    'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
    'linear-gradient(45deg, #667eea, #764ba2)',
    'linear-gradient(45deg, #f093fb, #f5576c)',
    'linear-gradient(45deg, #4facfe, #00f2fe)',
    'linear-gradient(45deg, #43e97b, #38f9d7)',
    'linear-gradient(45deg, #fa709a, #fee140)',
    'linear-gradient(45deg, #a8edea, #fed6e3)',
    'linear-gradient(45deg, #ff9a9e, #fecfef)'
  ];

  const shadowPresets = [
    '2px 2px 4px rgba(0,0,0,0.3)',
    '3px 3px 6px rgba(0,0,0,0.5)',
    '1px 1px 2px rgba(0,0,0,0.8)',
    '4px 4px 8px rgba(0,0,0,0.4)',
    '2px 2px 4px rgba(255,255,255,0.8)',
    '0 0 10px rgba(0,0,0,0.5)',
    '0 0 20px rgba(255,255,255,0.8)'
  ];

  return (
    <>
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg border border-gray-200 p-3 z-50 flex items-center gap-3">
        {/* Font Family */}
        <div className="flex items-center gap-2">
          <FaFont className="text-gray-600" />
          <select
            value={selectedElement.fontFamily}
            onChange={(e) => handleFontFamilyChange(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {fontFamilies.map(font => (
              <option key={font} value={font} style={{ fontFamily: font }}>
                {font}
              </option>
            ))}
          </select>
        </div>

        {/* Font Size */}
        <div className="flex items-center gap-1 border border-gray-300 rounded">
          <button
            onClick={() => handleFontSizeChange(-2)}
            className="px-2 py-1 hover:bg-gray-100 text-sm"
          >
            −
          </button>
          <span className="px-3 py-1 text-sm min-w-[3rem] text-center border-x border-gray-300">
            {selectedElement.fontSize}
          </span>
          <button
            onClick={() => handleFontSizeChange(2)}
            className="px-2 py-1 hover:bg-gray-100 text-sm"
          >
            +
          </button>
        </div>

        {/* Color */}
        <div className="flex items-center gap-2">
          <FaPalette className="text-gray-600" />
          <input
            type="color"
            value={selectedElement.color}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            disabled={selectedElement.background}
          />
        </div>

        {/* Gradient */}
        <div className="relative">
          <button
            onClick={() => setShowGradientPicker(!showGradientPicker)}
            className={`p-2 rounded hover:bg-gray-100 ${
              selectedElement.background ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
            }`}
            title="Gradient"
          >
            <FaPaintBrush />
          </button>
          
          {showGradientPicker && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-50 w-64">
              <h4 className="text-sm font-medium mb-2">Gradient Presets</h4>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {gradientPresets.map((gradient, index) => (
                  <button
                    key={index}
                    className="w-12 h-8 rounded border border-gray-300 hover:scale-105 transition-transform"
                    style={{ background: gradient }}
                    onClick={() => handleGradientChange(gradient)}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={clearGradient}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
                >
                  Clear
                </button>
                <button
                  onClick={() => setShowGradientPicker(false)}
                  className="px-3 py-1 text-sm bg-blue-500 text-white hover:bg-blue-600 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Shadow */}
        <div className="relative">
          <button
            onClick={() => setShowShadowControls(!showShadowControls)}
            className={`p-2 rounded hover:bg-gray-100 ${
              selectedElement.textShadow ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
            }`}
            title="Text Shadow"
          >
            <FaSun />
          </button>
          
          {showShadowControls && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-50 w-64">
              <h4 className="text-sm font-medium mb-2">Shadow Presets</h4>
              <div className="space-y-2 mb-3">
                {shadowPresets.map((shadow, index) => (
                  <button
                    key={index}
                    className="w-full p-2 text-left border border-gray-200 rounded hover:bg-gray-50 text-sm"
                    style={{ textShadow: shadow }}
                    onClick={() => handleShadowChange(shadow)}
                  >
                    Sample Text
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={clearShadow}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
                >
                  Clear
                </button>
                <button
                  onClick={() => setShowShadowControls(false)}
                  className="px-3 py-1 text-sm bg-blue-500 text-white hover:bg-blue-600 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-gray-300"></div>

        {/* Bold */}
        <button
          onClick={handleWeightToggle}
          className={`p-2 rounded hover:bg-gray-100 ${
            selectedElement.fontWeight === 'bold' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
          }`}
          title="Bold"
        >
          <FaBold />
        </button>

        {/* Italic */}
        <button
          onClick={handleStyleToggle}
          className={`p-2 rounded hover:bg-gray-100 ${
            selectedElement.fontStyle === 'italic' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
          }`}
          title="Italic"
        >
          <FaItalic />
        </button>

        <div className="w-px h-6 bg-gray-300"></div>

        {/* Text Alignment */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleAlignmentChange('left')}
            className={`p-2 rounded hover:bg-gray-100 ${
              selectedElement.textAlign === 'left' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
            }`}
            title="Align Left"
          >
            <FaAlignLeft />
          </button>
          <button
            onClick={() => handleAlignmentChange('center')}
            className={`p-2 rounded hover:bg-gray-100 ${
              selectedElement.textAlign === 'center' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
            }`}
            title="Align Center"
          >
            <FaAlignCenter />
          </button>
          <button
            onClick={() => handleAlignmentChange('right')}
            className={`p-2 rounded hover:bg-gray-100 ${
              selectedElement.textAlign === 'right' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
            }`}
            title="Align Right"
          >
            <FaAlignRight />
          </button>
        </div>
      </div>
      
      {/* Click outside to close dropdowns */}
      {(showGradientPicker || showShadowControls) && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowGradientPicker(false);
            setShowShadowControls(false);
          }}
        />
      )}
    </>
  );
};

export default TextToolbar;
