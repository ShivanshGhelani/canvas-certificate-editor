import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import Canvas from '../Canvas';
import ElementProperties from './ElementProperties';
import ImageProperties from './ImageProperties';

const Layout = () => {
  const [selectedElement, setSelectedElement] = useState(null);
  const canvasRef = useRef(null);

  const handleAddText = () => {
    if (canvasRef.current && canvasRef.current.addTextElement) {
      canvasRef.current.addTextElement();
    }
  };

  useEffect(() => {
    const handleElementSelection = (event) => {
      console.log('Element selected event received:', event.detail);
      setSelectedElement(event.detail);
    };

    const handleElementDeselection = (event) => {
      console.log('Element deselected event received');
      setSelectedElement(null);
    };

    // Listen on window for the events dispatched by element-selection.js
    window.addEventListener('elementSelected', handleElementSelection);
    window.addEventListener('elementDeselected', handleElementDeselection);

    return () => {
      window.removeEventListener('elementSelected', handleElementSelection);
      window.removeEventListener('elementDeselected', handleElementDeselection);
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar onAddText={handleAddText} />
        {selectedElement && selectedElement.tagName === 'IMG' ? (
          <ImageProperties selectedElement={selectedElement} />
        ) : selectedElement && selectedElement.dataset?.type === 'text' ? (
          <ElementProperties selectedElement={selectedElement} />
        ) : null}
        <div className='flex-1 flex items-center justify-center overflow-auto  p-4 bg-gray-200'>
          <Canvas onTextElementsChange={canvasRef} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
