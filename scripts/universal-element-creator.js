/**
 * Universal Element Creator
 * 
 * This script provides a unified system for creating draggable, resizable elements
 * with consistent functionality across logos, signatures, and other element types.
 */

class UniversalElementCreator {
  constructor() {
    this.elementCounter = 0;
    this.selectedElement = null;
    this.defaultStyles = {
      logo: { width: 100, height: 100 },
      signature: { width: 150, height: 80 },
      text: { width: 200, height: 50 }
    };
  }

  /**
   * Create a universal element with all standard features
   * @param {Object} config - Element configuration
   * @returns {HTMLElement} - Created element
   */
  createElement(config) {
    const {
      type = 'generic',
      content = '',
      imageSrc = null,
      customStyles = {},
      enableBackgroundRemoval = false,
      autoRemoveBackground = false
    } = config;

    this.elementCounter++;
    
    // Create wrapper element
    const wrapper = document.createElement('div');
    wrapper.className = 'dynamic-element universal-element';
    wrapper.dataset.type = type;
    wrapper.dataset.elementId = `element-${this.elementCounter}`;
    
    // Apply base styles
    const defaultStyle = this.defaultStyles[type] || this.defaultStyles.logo;
    wrapper.style.cssText = `
      position: absolute;
      width: ${customStyles.width || defaultStyle.width}px;
      height: ${customStyles.height || defaultStyle.height}px;
      cursor: move;
      border: 2px solid transparent;
      z-index: 10;
      user-select: none;
      transition: border-color 0.2s ease;
    `;

    // Create content based on type
    if (imageSrc) {
      this.createImageContent(wrapper, imageSrc, type, enableBackgroundRemoval);
    } else if (content) {
      this.createTextContent(wrapper, content);
    }

    // Add universal functionality
    this.addInteractionHandlers(wrapper);
    this.addResizeHandles(wrapper);
    this.addContextMenu(wrapper);
    
    // Apply auto background removal if enabled
    if (autoRemoveBackground && imageSrc) {
      this.applyBackgroundRemoval(wrapper, imageSrc);
    }

    return wrapper;
  }

  /**
   * Create image content for the element
   */
  createImageContent(wrapper, imageSrc, type, enableBackgroundRemoval) {
    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.cssText = `
      width: 100%;
      height: 100%;
      object-fit: contain;
      pointer-events: none;
      user-select: none;
    `;
    
    img.draggable = false;
    wrapper.appendChild(img);

    // Add double-click replacement functionality
    if (enableBackgroundRemoval) {
      this.addImageReplacement(wrapper, true);
    } else {
      this.addImageReplacement(wrapper, false);
    }
  }

  /**
   * Create text content for the element
   */
  createTextContent(wrapper, content) {
    const textElement = document.createElement('div');
    textElement.contentEditable = false;
    textElement.textContent = content;
    textElement.style.cssText = `
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: Arial, sans-serif;
      font-size: 16px;
      color: #333;
      text-align: center;
      word-wrap: break-word;
      outline: none;
    `;
    
    wrapper.appendChild(textElement);
    
    // Add text editing functionality
    this.addTextEditing(wrapper, textElement);
  }

  /**
   * Add interaction handlers (click, double-click, selection)
   */
  addInteractionHandlers(wrapper) {
    // Click to select
    wrapper.addEventListener('click', (e) => {
      e.stopPropagation();
      this.selectElement(wrapper);
    });

    // Prevent default drag behavior
    wrapper.addEventListener('dragstart', (e) => {
      e.preventDefault();
    });

    // Add hover effects
    wrapper.addEventListener('mouseenter', () => {
      if (!wrapper.classList.contains('selected')) {
        wrapper.style.borderColor = 'rgba(59, 130, 246, 0.3)';
      }
    });

    wrapper.addEventListener('mouseleave', () => {
      if (!wrapper.classList.contains('selected')) {
        wrapper.style.borderColor = 'transparent';
      }
    });
  }

  /**
   * Add resize handles to the element
   */
  addResizeHandles(wrapper) {
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

      this.addResizeLogic(handle, wrapper, handleInfo.class.replace('resize-', ''));
      wrapper.appendChild(handle);
    });

    // Store resize function for later use
    wrapper.addResizeHandles = () => {
      wrapper.querySelectorAll('.resize-handle').forEach(handle => {
        handle.style.display = 'block';
      });
    };
  }

  /**
   * Add resize logic to a handle
   */
  addResizeLogic(handle, wrapper, direction) {
    let isResizing = false;
    let startX, startY, startLeft, startTop, startWidth, startHeight;

    handle.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      e.preventDefault();

      isResizing = true;
      startX = e.clientX;
      startY = e.clientY;

      const rect = wrapper.getBoundingClientRect();
      const container = document.getElementById('dynamic-elements-container') || document.body;
      const containerRect = container.getBoundingClientRect();

      startLeft = rect.left - containerRect.left;
      startTop = rect.top - containerRect.top;
      startWidth = rect.width;
      startHeight = rect.height;

      const handleResize = (e) => {
        if (!isResizing) return;

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        let newWidth = startWidth;
        let newHeight = startHeight;
        let newLeft = startLeft;
        let newTop = startTop;

        // Calculate new dimensions based on direction
        switch (direction) {
          case 'se':
            newWidth = startWidth + deltaX;
            newHeight = startHeight + deltaY;
            break;
          case 'sw':
            newWidth = startWidth - deltaX;
            newHeight = startHeight + deltaY;
            newLeft = startLeft + deltaX;
            break;
          case 'ne':
            newWidth = startWidth + deltaX;
            newHeight = startHeight - deltaY;
            newTop = startTop + deltaY;
            break;
          case 'nw':
            newWidth = startWidth - deltaX;
            newHeight = startHeight - deltaY;
            newLeft = startLeft + deltaX;
            newTop = startTop + deltaY;
            break;
          case 'n':
            newHeight = startHeight - deltaY;
            newTop = startTop + deltaY;
            break;
          case 's':
            newHeight = startHeight + deltaY;
            break;
          case 'e':
            newWidth = startWidth + deltaX;
            break;
          case 'w':
            newWidth = startWidth - deltaX;
            newLeft = startLeft + deltaX;
            break;
        }

        // Apply minimum size constraints
        const minSize = 20;
        if (newWidth < minSize) {
          newWidth = minSize;
          if (direction.includes('w')) newLeft = startLeft + startWidth - minSize;
        }
        if (newHeight < minSize) {
          newHeight = minSize;
          if (direction.includes('n')) newTop = startTop + startHeight - minSize;
        }

        // Apply new dimensions
        wrapper.style.width = newWidth + 'px';
        wrapper.style.height = newHeight + 'px';
        wrapper.style.left = newLeft + 'px';
        wrapper.style.top = newTop + 'px';
      };

      const stopResize = () => {
        isResizing = false;
        document.removeEventListener('mousemove', handleResize);
        document.removeEventListener('mouseup', stopResize);
      };

      document.addEventListener('mousemove', handleResize);
      document.addEventListener('mouseup', stopResize);
    });
  }

  /**
   * Add context menu with delete option
   */
  addContextMenu(wrapper) {
    wrapper.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.showContextMenu(e, wrapper);
    });
  }

  /**
   * Show context menu
   */
  showContextMenu(event, wrapper) {
    // Remove existing context menus
    document.querySelectorAll('.element-context-menu').forEach(menu => menu.remove());

    const menu = document.createElement('div');
    menu.className = 'element-context-menu';
    menu.style.cssText = `
      position: fixed;
      top: ${event.clientY}px;
      left: ${event.clientX}px;
      background: white;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      z-index: 10000;
      min-width: 120px;
    `;

    const deleteOption = document.createElement('div');
    deleteOption.textContent = 'Delete';
    deleteOption.style.cssText = `
      padding: 8px 12px;
      cursor: pointer;
      color: #dc3545;
      border-radius: 4px;
    `;

    deleteOption.addEventListener('mouseenter', () => {
      deleteOption.style.backgroundColor = '#f8f9fa';
    });

    deleteOption.addEventListener('mouseleave', () => {
      deleteOption.style.backgroundColor = 'transparent';
    });

    deleteOption.addEventListener('click', () => {
      this.deleteElement(wrapper);
      menu.remove();
    });

    menu.appendChild(deleteOption);
    document.body.appendChild(menu);

    // Close menu on outside click
    setTimeout(() => {
      document.addEventListener('click', () => {
        menu.remove();
      }, { once: true });
    }, 0);
  }

  /**
   * Add image replacement functionality
   */
  addImageReplacement(wrapper, enableBackgroundRemoval) {
    wrapper.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      e.preventDefault();

      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.style.display = 'none';

      fileInput.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = async (e) => {
            let imageSrc = e.target.result;

            // Apply background removal if enabled
            if (enableBackgroundRemoval && window.enhancedBackgroundRemoval) {
              try {
                imageSrc = await window.enhancedBackgroundRemoval(imageSrc);
              } catch (error) {
                console.warn('Background removal failed:', error);
              }
            }

            const img = wrapper.querySelector('img');
            if (img) {
              img.src = imageSrc;
            }
          };
          reader.readAsDataURL(file);
        }
        document.body.removeChild(fileInput);
      });

      document.body.appendChild(fileInput);
      fileInput.click();
    });
  }

  /**
   * Add text editing functionality
   */
  addTextEditing(wrapper, textElement) {
    wrapper.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      e.preventDefault();

      textElement.contentEditable = true;
      textElement.focus();

      // Select all text
      const range = document.createRange();
      range.selectNodeContents(textElement);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    });

    textElement.addEventListener('blur', () => {
      textElement.contentEditable = false;
    });

    textElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        textElement.blur();
      }
    });
  }

  /**
   * Apply background removal to an image
   */
  async applyBackgroundRemoval(wrapper, imageSrc) {
    if (window.enhancedBackgroundRemoval) {
      try {
        const processedSrc = await window.enhancedBackgroundRemoval(imageSrc, {
          tolerance: 30,
          edgeSmoothing: true,
          removeWhite: true
        });

        const img = wrapper.querySelector('img');
        if (img) {
          img.src = processedSrc;
        }
      } catch (error) {
        console.warn('Background removal failed:', error);
      }
    }
  }

  /**
   * Select an element
   */
  selectElement(wrapper) {
    // Clear previous selections
    document.querySelectorAll('.dynamic-element').forEach(el => {
      el.style.borderColor = 'transparent';
      el.classList.remove('selected');
      el.querySelectorAll('.resize-handle').forEach(handle => {
        handle.style.display = 'none';
      });
    });

    // Select current element
    wrapper.style.borderColor = '#3b82f6';
    wrapper.classList.add('selected');
    this.selectedElement = wrapper;

    // Show resize handles
    setTimeout(() => {
      wrapper.querySelectorAll('.resize-handle').forEach(handle => {
        handle.style.display = 'block';
      });
    }, 0);

    // Add delete button
    this.addDeleteButton(wrapper);

    // Dispatch selection event
    const event = new CustomEvent('elementSelected', { detail: wrapper });
    window.dispatchEvent(event);
  }

  /**
   * Add delete button to selected element
   */
  addDeleteButton(wrapper) {
    // Remove existing delete button
    const existingBtn = wrapper.querySelector('.delete-btn');
    if (existingBtn) existingBtn.remove();

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '×';
    deleteBtn.title = 'Delete element';
    deleteBtn.style.cssText = `
      position: absolute;
      top: -12px;
      right: -12px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #dc3545;
      color: white;
      border: 2px solid white;
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
      z-index: 1003;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      transition: all 0.2s ease;
    `;

    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.deleteElement(wrapper);
    });

    deleteBtn.addEventListener('mouseenter', () => {
      deleteBtn.style.background = '#c82333';
      deleteBtn.style.transform = 'scale(1.1)';
    });

    deleteBtn.addEventListener('mouseleave', () => {
      deleteBtn.style.background = '#dc3545';
      deleteBtn.style.transform = 'scale(1)';
    });

    wrapper.appendChild(deleteBtn);
  }

  /**
   * Delete an element
   */
  deleteElement(wrapper) {
    if (confirm('Are you sure you want to delete this element?')) {
      wrapper.remove();
      this.selectedElement = null;

      // Dispatch deletion event
      const event = new CustomEvent('elementDeleted', { detail: wrapper });
      window.dispatchEvent(event);
    }
  }

  /**
   * Make element draggable
   */
  makeDraggable(wrapper) {
    if (window.makeElementDraggable) {
      window.makeElementDraggable(wrapper);
    }
  }
}

// Export the class
if (typeof window !== 'undefined') {
  window.UniversalElementCreator = UniversalElementCreator;
  
  // Create global instance
  window.universalElementCreator = new UniversalElementCreator();
  
  console.log('✅ Universal Element Creator loaded');
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UniversalElementCreator;
}
