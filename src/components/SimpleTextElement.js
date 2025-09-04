// Simple DOM-based text element that matches logo implementation exactly

export const createSimpleTextElement = (
  text = 'Editable Text',
  options = {}
) => {
  const {
    fontSize = 24,
    fontFamily = 'Roboto',
    color = '#34495e',
    fontWeight = 'normal',
    fontStyle = 'normal',
    textAlign = 'center',
    position = { x: 100, y: 100 },
    size = { width: 200, height: 50 }
  } = options;

  window.elementCounter = (window.elementCounter || 0) + 1;
  const element = document.createElement('div');
  element.className = 'dynamic-element';
  element.dataset.type = 'text';
  element.contentEditable = 'true';
  element.textContent = text;
  
  // Simple styling with fixed dimensions for resizing
  element.style.cssText = `
    position: absolute;
    font-family: '${fontFamily}', sans-serif;
    font-size: ${fontSize}px;
    color: ${color};
    font-weight: ${fontWeight};
    font-style: ${fontStyle};
    text-align: ${textAlign};
    background: transparent;
    border: 2px solid transparent;
    outline: none;
    cursor: move;
    padding: 8px;
    z-index: 10;
    user-select: text;
    width: ${size.width}px;
    height: ${size.height}px;
    min-height: 40px;
    border-radius: 4px;
    box-sizing: border-box;
    overflow: hidden;
    word-wrap: break-word;
    display: flex;
    align-items: center;
    justify-content: center;
    left: ${position.x}px;
    top: ${position.y}px;
  `;
  
  return element;
};

// Function to make text element interactive (exactly like logo)
export const makeTextElementInteractive = (element) => {
  // Add selection on click
  element.addEventListener('click', (e) => {
    e.stopPropagation();
    // Use the same selectElement function as logo
    if (window.selectElement) {
      window.selectElement(element);
    }
  });
  
  // Handle focus/blur for editing vs dragging
  element.addEventListener('focus', () => {
    element.style.cursor = 'text';
  });
  
  element.addEventListener('blur', () => {
    element.style.cursor = 'move';
    // Force recreate and show resize handles after editing
    if (element.classList.contains('selected')) {
      setTimeout(() => {
        // Remove old handles first
        element.querySelectorAll('.resize-handle').forEach(handle => handle.remove());
        // Recreate handles using stored function
        if (element.addResizeHandles) {
          element.addResizeHandles();
        }
        // Force show them
        element.querySelectorAll('.resize-handle').forEach(handle => {
          handle.style.display = 'block';
        });
      }, 100);
    }
  });
  
  // Keep element selected and handles visible after editing
  element.addEventListener('input', () => {
    if (element.classList.contains('selected')) {
      setTimeout(() => {
        // Check if handles exist, if not recreate them
        const handles = element.querySelectorAll('.resize-handle');
        if (handles.length === 0) {
          if (element.addResizeHandles) {
            element.addResizeHandles();
          }
        }
        // Force show handles
        element.querySelectorAll('.resize-handle').forEach(handle => {
          handle.style.display = 'block';
        });
      }, 50);
    }
  });
  
  // Use the same makeElementDraggable function as logo
  if (window.makeElementDraggable) {
    window.makeElementDraggable(element);
  }
  
  return element;
};
