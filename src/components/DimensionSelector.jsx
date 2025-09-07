import React, { useState, useEffect } from 'react';
import { FaArrowsAltV, FaArrowsAltH } from 'react-icons/fa';

const DimensionSelector = ({ onDimensionChange, initialDimension = 'portrait' }) => {
  const [selectedDimension, setSelectedDimension] = useState(initialDimension);

  const dimensions = [
    {
      id: 'portrait',
      name: 'Portrait',
      description: 'A4 Portrait (210mm × 297mm)',
      icon: FaArrowsAltV,
      canvas: { width: 2480, height: 3508 }, // 300 DPI
      display: { width: 744, height: 1052 }, // 30% scale for display
      physical: { width: '210mm', height: '297mm' },
      orientation: 'portrait'
    },
    {
      id: 'landscape',
      name: 'Landscape', 
      description: 'A4 Landscape (297mm × 210mm)',
      icon: FaArrowsAltH,
      canvas: { width: 3508, height: 2480 }, // 300 DPI
      display: { width: 1052, height: 744 }, // 30% scale for display
      physical: { width: '297mm', height: '210mm' },
      orientation: 'landscape'
    }
  ];

  const handleDimensionSelect = (dimension) => {
    console.log('Dimension selected:', dimension.name);
    setSelectedDimension(dimension.id);
    
    // Apply dimension changes to canvas and wrapper
    const canvas = document.getElementById('background-canvas');
    const wrapper = document.getElementById('certificate-wrapper');
    
    if (canvas && wrapper) {
      // Set canvas dimensions (300 DPI for print quality)
      canvas.width = dimension.canvas.width;
      canvas.height = dimension.canvas.height;
      
      // Set wrapper display dimensions (30% scale for viewing)
      wrapper.style.width = `${dimension.display.width}px`;
      wrapper.style.height = `${dimension.display.height}px`;
      
      // Add orientation classes
      wrapper.classList.remove('portrait-mode', 'landscape-mode');
      wrapper.classList.add(`${dimension.orientation}-mode`);
      
      console.log(`✅ Canvas set to ${dimension.orientation}:`, canvas.width, '×', canvas.height);
      console.log(`✅ Wrapper set to ${dimension.orientation} display:`, wrapper.style.width, '×', wrapper.style.height);
      
      // Redraw background
      if (window.drawBackground && typeof window.drawBackground === 'function') {
        window.drawBackground();
      }
    }
    
    // Notify parent component
    if (onDimensionChange) {
      onDimensionChange(dimension);
    }
    
    // Dispatch global event for other components to listen
    const event = new CustomEvent('dimensionChanged', { 
      detail: dimension 
    });
    window.dispatchEvent(event);
  };

  useEffect(() => {
    // Set initial dimension on mount
    const initialDim = dimensions.find(d => d.id === initialDimension);
    if (initialDim) {
      handleDimensionSelect(initialDim);
    }
  }, []);

  return (
    <div className="p-4 border-b border-gray-200">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        📐 Canvas Dimensions
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Choose your certificate orientation. Both options use A4 dimensions at 300 DPI for high-quality printing.
      </p>
      
      <div className="space-y-3">
        {dimensions.map(dimension => {
          const IconComponent = dimension.icon;
          return (
            <div 
              key={dimension.id}
              className={`border rounded-lg p-3 cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedDimension === dimension.id 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => handleDimensionSelect(dimension)}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <IconComponent className={`text-xl ${
                    selectedDimension === dimension.id ? 'text-blue-600' : 'text-gray-500'
                  }`} />
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium text-sm leading-tight ${
                    selectedDimension === dimension.id ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    {dimension.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {dimension.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      300 DPI
                    </span>
                    <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                      {dimension.canvas.width}×{dimension.canvas.height}px
                    </span>
                    <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                      {dimension.physical.width} × {dimension.physical.height}
                    </span>
                  </div>
                </div>
                {selectedDimension === dimension.id && (
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {selectedDimension && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <p className="text-sm text-green-800 font-medium">
              {dimensions.find(d => d.id === selectedDimension)?.name} dimension selected
            </p>
          </div>
          <p className="text-xs text-green-600 mt-1">
            Canvas ready for {selectedDimension} certificates at print quality (300 DPI)
          </p>
        </div>
      )}
    </div>
  );
};

export default DimensionSelector;
