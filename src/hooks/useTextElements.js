import { useState, useCallback } from 'react';

// Custom hook for managing text elements
const useTextElements = () => {
  const [textElements, setTextElements] = useState([]);
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [elementCounter, setElementCounter] = useState(0);

  // Add new text element
  const addTextElement = useCallback((initialProps = {}) => {
    const newId = `text-${elementCounter + 1}`;
    const newElement = {
      id: newId,
      text: "Enter Text",
      position: { x: 150, y: 150 },
      size: { width: 200, height: 50 },
      fontSize: 24,
      fontFamily: "Arial",
      color: "#000000",
      fontWeight: "normal",
      fontStyle: "normal",
      textAlign: "left",
      textShadow: "",
      background: "",
      ...initialProps
    };

    setTextElements(prev => [...prev, newElement]);
    setSelectedElementId(newId);
    setElementCounter(prev => prev + 1);
    
    return newId;
  }, [elementCounter]);

  // Update text element
  const updateTextElement = useCallback((id, updates) => {
    setTextElements(prev => 
      prev.map(element => 
        element.id === id 
          ? { ...element, ...updates }
          : element
      )
    );
  }, []);

  // Delete text element
  const deleteTextElement = useCallback((id) => {
    setTextElements(prev => prev.filter(element => element.id !== id));
    if (selectedElementId === id) {
      setSelectedElementId(null);
    }
  }, [selectedElementId]);

  // Select text element
  const selectTextElement = useCallback((id) => {
    setSelectedElementId(id);
  }, []);

  // Deselect all elements
  const deselectAll = useCallback(() => {
    setSelectedElementId(null);
  }, []);

  // Get selected element
  const getSelectedElement = useCallback(() => {
    return textElements.find(element => element.id === selectedElementId) || null;
  }, [textElements, selectedElementId]);

  // Update selected element
  const updateSelectedElement = useCallback((updates) => {
    if (selectedElementId) {
      updateTextElement(selectedElementId, updates);
    }
  }, [selectedElementId, updateTextElement]);

  return {
    textElements,
    selectedElementId,
    addTextElement,
    updateTextElement,
    deleteTextElement,
    selectTextElement,
    deselectAll,
    getSelectedElement,
    updateSelectedElement
  };
};

export default useTextElements;
