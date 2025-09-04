import React, { useState, useRef, useEffect } from 'react';

const TextElement = ({
  id,
  text: initialText = "Enter Text",
  position = { x: 100, y: 100 },
  fontSize = 24,
  fontFamily = "Arial",
  color = "#000000",
  fontWeight = "normal",
  fontStyle = "normal",
  textAlign = "left",
  textShadow = "",
  background = "",
  onSelect,
  onUpdate,
  onDelete,
  isSelected = false
}) => {
  const [text, setText] = useState(initialText);
  const [isEditing, setIsEditing] = useState(false);
  const [elementPosition, setElementPosition] = useState(position);
  const [elementSize, setElementSize] = useState({ width: 200, height: 50 });
  
  const textRef = useRef(null);
  const elementRef = useRef(null);

  // Handle text editing
  const handleDoubleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isEditing) {
      setIsEditing(true);
      setTimeout(() => {
        if (textRef.current) {
          textRef.current.focus();
          textRef.current.select();
        }
      }, 0);
    }
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    if (onUpdate) {
      onUpdate(id, { text: newText });
    }
  };

  const handleTextBlur = () => {
    setIsEditing(false);
    if (text.trim() === '') {
      setText('Enter Text');
      if (onUpdate) {
        onUpdate(id, { text: 'Enter Text' });
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTextBlur();
    }
    if (e.key === 'Escape') {
      setText(initialText);
      setIsEditing(false);
    }
  };

  // Add logo-style drag and resize functionality
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    let isDragging = false;
    let isResizing = false;
    let resizeType = '';
    let startX, startY, startLeft, startTop, startWidth, startHeight;
    let mutationObserver = null;
    
    // Add Canva-style resize handles for all elements
    const addResizeHandles = () => {
      // Remove existing handles safely
      const existingHandles = element.querySelectorAll('.resize-handle');
      existingHandles.forEach(handle => {
        try {
          if (handle.parentNode === element) {
            element.removeChild(handle);
          }
        } catch (e) {
          // Handle already removed, ignore error
        }
      });
      
      // Define all resize handles (corners and sides)
      const handles = [
        { class: 'resize-nw', cursor: 'nw-resize', position: 'top: -5px; left: -5px;' },
        { class: 'resize-n', cursor: 'n-resize', position: 'top: -5px; left: 50%; transform: translateX(-50%);' },
        { class: 'resize-ne', cursor: 'ne-resize', position: 'top: -5px; right: -5px;' },
        { class: 'resize-e', cursor: 'e-resize', position: 'top: 50%; right: -5px; transform: translateY(-50%);' },
        { class: 'resize-se', cursor: 'se-resize', position: 'bottom: -5px; right: -5px;' },
        { class: 'resize-s', cursor: 's-resize', position: 'bottom: -5px; left: 50%; transform: translateX(-50%);' },
        { class: 'resize-sw', cursor: 'sw-resize', position: 'bottom: -5px; left: -5px;' },
        { class: 'resize-w', cursor: 'w-resize', position: 'top: 50%; left: -5px; transform: translateY(-50%);' }
      ];
      
      handles.forEach(handleInfo => {
        const handle = document.createElement('div');
        handle.className = `resize-handle ${handleInfo.class}`;
        handle.style.cssText = `
          position: absolute;
          width: 10px;
          height: 10px;
          background: #007bff;
          border: 2px solid white;
          border-radius: 2px;
          cursor: ${handleInfo.cursor};
          z-index: 1002;
          display: none;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
          pointer-events: auto;
          ${handleInfo.position}
        `;
        
        // Add resize functionality to each handle
        const handleMouseDown = (e) => {
          e.stopPropagation();
          e.preventDefault();
          
          isResizing = true;
          resizeType = handleInfo.class.replace('resize-', '');
          startX = e.clientX;
          startY = e.clientY;
          
          const rect = element.getBoundingClientRect();
          const container = document.getElementById('certificate-wrapper');
          const containerRect = container.getBoundingClientRect();
          
          startLeft = rect.left - containerRect.left;
          startTop = rect.top - containerRect.top;
          startWidth = rect.width;
          startHeight = rect.height;
          
          document.addEventListener('mousemove', handleResize);
          document.addEventListener('mouseup', stopResize);
        };
        
        handle.addEventListener('mousedown', handleMouseDown);
        
        try {
          element.appendChild(handle);
        } catch (e) {
          // Element might be unmounting, ignore error
        }
      });
    };
    
    const handleResize = (e) => {
      if (!isResizing) return;
      
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      let newWidth = startWidth;
      let newHeight = startHeight;
      let newLeft = startLeft;
      let newTop = startTop;
      
      // Calculate new dimensions based on resize direction
      switch (resizeType) {
        case 'se': // Southeast (bottom-right)
          newWidth = startWidth + deltaX;
          newHeight = startHeight + deltaY;
          break;
        case 'sw': // Southwest (bottom-left)
          newWidth = startWidth - deltaX;
          newHeight = startHeight + deltaY;
          newLeft = startLeft + deltaX;
          break;
        case 'ne': // Northeast (top-right)
          newWidth = startWidth + deltaX;
          newHeight = startHeight - deltaY;
          newTop = startTop + deltaY;
          break;
        case 'nw': // Northwest (top-left)
          newWidth = startWidth - deltaX;
          newHeight = startHeight - deltaY;
          newLeft = startLeft + deltaX;
          newTop = startTop + deltaY;
          break;
        case 'n': // North (top)
          newHeight = startHeight - deltaY;
          newTop = startTop + deltaY;
          break;
        case 's': // South (bottom)
          newHeight = startHeight + deltaY;
          break;
        case 'e': // East (right)
          newWidth = startWidth + deltaX;
          break;
        case 'w': // West (left)
          newWidth = startWidth - deltaX;
          newLeft = startLeft + deltaX;
          break;
      }
      
      // Apply minimum size constraints
      const minSize = 20;
      if (newWidth < minSize) {
        newWidth = minSize;
        if (resizeType.includes('w')) newLeft = startLeft + startWidth - minSize;
      }
      if (newHeight < minSize) {
        newHeight = minSize;
        if (resizeType.includes('n')) newTop = startTop + startHeight - minSize;
      }
      
      // Apply the new dimensions and position
      element.style.width = newWidth + 'px';
      element.style.height = newHeight + 'px';
      element.style.left = newLeft + 'px';
      element.style.top = newTop + 'px';
      
      // Update React state
      setElementSize({ width: newWidth, height: newHeight });
      setElementPosition({ x: newLeft, y: newTop });
      
      if (onUpdate) {
        onUpdate(id, { 
          position: { x: newLeft, y: newTop },
          size: { width: newWidth, height: newHeight }
        });
      }
    };
    
    const stopResize = () => {
      isResizing = false;
      resizeType = '';
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', stopResize);
    };
    
    // Add resize handles to the element
    addResizeHandles();
    
    // Store the function on the element for later use
    element.addResizeHandles = addResizeHandles;
    
    // Show/hide resize handles when element is selected/deselected
    mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const handles = element.querySelectorAll('.resize-handle');
          if (element.classList.contains('selected')) {
            // If no handles exist, recreate them
            if (handles.length === 0) {
              addResizeHandles();
            }
            // Force show all handles
            element.querySelectorAll('.resize-handle').forEach(handle => {
              handle.style.display = 'block';
            });
          } else {
            handles.forEach(handle => handle.style.display = 'none');
          }
        }
      });
    });
    
    mutationObserver.observe(element, { attributes: true, childList: true, subtree: true });
    
    // Drag functionality
    const handleMouseDown = (e) => {
      // Don't drag if clicking on resize handles or delete button
      if (e.target.classList.contains('resize-handle') || 
          e.target.classList.contains('delete-btn')) {
        return;
      }
      
      // For text elements, only allow dragging when not in edit mode
      if (isEditing) {
        return;
      }
      
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      
      // Get current position
      const computedStyle = getComputedStyle(element);
      startLeft = parseInt(computedStyle.left) || 0;
      startTop = parseInt(computedStyle.top) || 0;
      
      // Remove transform if it exists for proper positioning
      element.style.transform = 'none';
      element.style.left = startLeft + 'px';
      element.style.top = startTop + 'px';
      
      element.style.cursor = 'grabbing';
      
      const handleDragMove = (e) => {
        if (!isDragging) return;
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        const newLeft = startLeft + deltaX;
        const newTop = startTop + deltaY;
        
        // Constrain to certificate boundaries
        const container = document.getElementById('certificate-wrapper');
        const containerRect = container.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        
        const maxLeft = containerRect.width - elementRect.width;
        const maxTop = containerRect.height - elementRect.height;
        
        const constrainedLeft = Math.max(0, Math.min(maxLeft, newLeft));
        const constrainedTop = Math.max(0, Math.min(maxTop, newTop));
        
        element.style.left = constrainedLeft + 'px';
        element.style.top = constrainedTop + 'px';
        
        // Update React state
        setElementPosition({ x: constrainedLeft, y: constrainedTop });
        
        if (onUpdate) {
          onUpdate(id, { position: { x: constrainedLeft, y: constrainedTop } });
        }
      };
      
      const handleDragUp = () => {
        isDragging = false;
        element.style.cursor = 'grab';
        document.removeEventListener('mousemove', handleDragMove);
        document.removeEventListener('mouseup', handleDragUp);
      };
      
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('mouseup', handleDragUp);
      
      e.preventDefault();
      e.stopPropagation();
      
      if (onSelect) {
        onSelect(id);
      }
    };
    
    element.addEventListener('mousedown', handleMouseDown);
    
    // Clean up event listeners and DOM modifications
    return () => {
      try {
        if (element) {
          element.removeEventListener('mousedown', handleMouseDown);
          
          // Clean up resize handles safely
          const handles = element.querySelectorAll('.resize-handle');
          handles.forEach(handle => {
            try {
              if (handle.parentNode === element) {
                element.removeChild(handle);
              }
            } catch (e) {
              // Handle already removed, ignore error
            }
          });
        }
        
        if (mutationObserver) {
          mutationObserver.disconnect();
        }
        
        // Clean up any remaining event listeners
        document.removeEventListener('mousemove', handleResize);
        document.removeEventListener('mouseup', stopResize);
      } catch (e) {
        // Ignore cleanup errors during unmount
      }
    };
  }, [id, isEditing, onSelect, onUpdate]);

  // Handle selection
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onSelect) {
      onSelect(id);
    }
  };

  // Delete handler
  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  // Prevent context menu
  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  const textStyles = {
    fontSize: `${fontSize}px`,
    fontFamily,
    fontWeight,
    fontStyle,
    textAlign,
    textShadow,
    lineHeight: '1.2',
    outline: 'none',
    border: 'none',
    resize: 'none',
    overflow: 'hidden',
    whiteSpace: isEditing ? 'normal' : 'pre-wrap',
    cursor: isEditing ? 'text' : 'move',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    ...(background ? {
      background,
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent'
    } : {
      color,
      background: 'transparent'
    })
  };

  return (
    <div
      ref={elementRef}
      className={`absolute select-none transition-all duration-200 ${
        isSelected ? 'ring-2 ring-blue-500 ring-opacity-50 selected' : ''
      } z-10`}
      style={{
        left: `${elementPosition.x}px`,
        top: `${elementPosition.y}px`,
        width: `${elementSize.width}px`,
        height: `${elementSize.height}px`,
        cursor: isEditing ? 'text' : 'grab'
      }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
    >
      {/* Main text element */}
      {isEditing ? (
        <textarea
          ref={textRef}
          value={text}
          onChange={handleTextChange}
          onBlur={handleTextBlur}
          onKeyDown={handleKeyDown}
          style={textStyles}
          className="p-2 resize-none"
          autoFocus
        />
      ) : (
        <div
          style={textStyles}
          className="p-2 flex items-center justify-center word-wrap break-words"
        >
          {text}
        </div>
      )}

      {/* Delete button */}
      {isSelected && !isEditing && (
        <button
          className="delete-btn absolute -top-8 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors flex items-center justify-center shadow-lg"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          title="Delete"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default TextElement;
