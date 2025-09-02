// --- ELEMENT RESIZE FUNCTIONALITY ---

c    _getHandleStyles(position) {
        const baseStyles = `
            position: absolute;
            background: #007bff;
            border: 2px solid #fff;
            border-radius: 50%;
            width: 8px;
            height: 8px;
            cursor: ${this._getCursorForPosition(position)};
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.2s;
            pointer-events: auto;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        `;esize = {
    // Resize state
    isResizing: false,
    resizeData: null,

    /**
     * Add resize handles to an element
     * @param {HTMLElement} element - Element to make resizable
     */
    makeElementResizable(element) {
        // Create resize handles
        const handles = this._createResizeHandles();
        
        // Append handles to element
        handles.forEach(handle => {
            element.appendChild(handle);
        });

        // Add resize functionality
        this._attachResizeHandlers(element, handles);
    },

    /**
     * Create resize handle elements
     * @private
     */
    _createResizeHandles() {
        const positions = ['nw', 'ne', 'sw', 'se', 'n', 's', 'e', 'w'];
        
        return positions.map(position => {
            const handle = document.createElement('div');
            handle.className = `resize-handle resize-${position} element-control`;
            handle.style.cssText = this._getHandleStyles(position);
            handle.dataset.direction = position;
            return handle;
        });
    },

    /**
     * Get CSS styles for resize handles
     * @private
     */
    _getHandleStyles(position) {
        const baseStyles = `
            position: absolute;
            background: #007bff;
            border: 1px solid #fff;
            border-radius: 50%;
            width: 8px;
            height: 8px;
            cursor: ${this._getCursorForPosition(position)};
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.2s;
        `;

        const positionStyles = {
            'nw': 'top: -4px; left: -4px;',
            'ne': 'top: -4px; right: -4px;',
            'sw': 'bottom: -4px; left: -4px;',
            'se': 'bottom: -4px; right: -4px;',
            'n': 'top: -4px; left: 50%; transform: translateX(-50%);',
            's': 'bottom: -4px; left: 50%; transform: translateX(-50%);',
            'e': 'right: -4px; top: 50%; transform: translateY(-50%);',
            'w': 'left: -4px; top: 50%; transform: translateY(-50%);'
        };

        return baseStyles + positionStyles[position];
    },

    /**
     * Get cursor style for resize direction
     * @private
     */
    _getCursorForPosition(position) {
        const cursors = {
            'nw': 'nw-resize',
            'ne': 'ne-resize',
            'sw': 'sw-resize',
            'se': 'se-resize',
            'n': 'n-resize',
            's': 's-resize',
            'e': 'e-resize',
            'w': 'w-resize'
        };
        return cursors[position];
    },

    /**
     * Attach resize event handlers
     * @private
     */
    _attachResizeHandlers(element, handles) {
        // Show handles when element is selected
        element.addEventListener('mouseenter', () => {
            if (window.ElementSelection && window.ElementSelection.isSelected(element)) {
                this._showHandles(handles);
            }
        });

        element.addEventListener('mouseleave', () => {
            if (!this.isResizing) {
                this._hideHandles(handles);
            }
        });

        // Add resize functionality to each handle
        handles.forEach(handle => {
            this._attachHandleEvents(handle, element);
        });
    },

    /**
     * Show resize handles
     * @private
     */
    _showHandles(handles) {
        handles.forEach(handle => {
            handle.style.opacity = '1';
        });
    },

    /**
     * Hide resize handles
     * @private
     */
    _hideHandles(handles) {
        handles.forEach(handle => {
            handle.style.opacity = '0';
        });
    },

    /**
     * Attach events to individual resize handle
     * @private
     */
    _attachHandleEvents(handle, element) {
        let startX, startY, startWidth, startHeight, startLeft, startTop;

        handle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();

            this.isResizing = true;
            const direction = handle.dataset.direction;

            // Get initial values
            const rect = element.getBoundingClientRect();
            const canvas = document.getElementById('certificate-wrapper');
            const canvasRect = canvas.getBoundingClientRect();
            
            startX = e.clientX;
            startY = e.clientY;
            startWidth = rect.width;
            startHeight = rect.height;
            startLeft = rect.left - canvasRect.left;
            startTop = rect.top - canvasRect.top;

            this.resizeData = {
                element,
                direction,
                startX,
                startY,
                startWidth,
                startHeight,
                startLeft,
                startTop
            };

            // Trigger resize start event
            this._triggerResizeEvent('resizeStart', element, { direction });
        });

        // Global mouse move for resizing
        document.addEventListener('mousemove', (e) => {
            if (!this.isResizing || !this.resizeData) return;

            const {
                element,
                direction,
                startX,
                startY,
                startWidth,
                startHeight,
                startLeft,
                startTop
            } = this.resizeData;

            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            const newDimensions = this._calculateNewDimensions(
                direction,
                startWidth,
                startHeight,
                startLeft,
                startTop,
                deltaX,
                deltaY
            );

            // Apply new dimensions with constraints
            const constrainedDimensions = this._constrainDimensions(element, newDimensions);
            this._applyDimensions(element, constrainedDimensions);

            // Update properties panel
            if (window.ElementSelection) {
                window.ElementSelection.updatePanelPosition();
            }

            // Trigger resize event
            this._triggerResizeEvent('resizeMove', element, constrainedDimensions);
        });

        // Global mouse up for resize end
        document.addEventListener('mouseup', () => {
            if (!this.isResizing) return;

            this.isResizing = false;

            if (this.resizeData) {
                this._triggerResizeEvent('resizeEnd', this.resizeData.element);
                this.resizeData = null;
            }
        });
    },

    /**
     * Calculate new dimensions based on resize direction
     * @private
     */
    _calculateNewDimensions(direction, startWidth, startHeight, startLeft, startTop, deltaX, deltaY) {
        let width = startWidth;
        let height = startHeight;
        let left = startLeft;
        let top = startTop;

        switch (direction) {
            case 'se': // Southeast
                width = startWidth + deltaX;
                height = startHeight + deltaY;
                break;
            case 'sw': // Southwest
                width = startWidth - deltaX;
                height = startHeight + deltaY;
                left = startLeft + deltaX;
                break;
            case 'ne': // Northeast
                width = startWidth + deltaX;
                height = startHeight - deltaY;
                top = startTop + deltaY;
                break;
            case 'nw': // Northwest
                width = startWidth - deltaX;
                height = startHeight - deltaY;
                left = startLeft + deltaX;
                top = startTop + deltaY;
                break;
            case 'n': // North
                height = startHeight - deltaY;
                top = startTop + deltaY;
                break;
            case 's': // South
                height = startHeight + deltaY;
                break;
            case 'e': // East
                width = startWidth + deltaX;
                break;
            case 'w': // West
                width = startWidth - deltaX;
                left = startLeft + deltaX;
                break;
        }

        return { width, height, left, top };
    },

    /**
     * Constrain dimensions to minimum values and canvas boundaries
     * @private
     */
    _constrainDimensions(element, dimensions) {
        const minWidth = 20;
        const minHeight = 20;
        const canvas = document.getElementById('certificate-wrapper');
        const canvasRect = canvas.getBoundingClientRect();

        let { width, height, left, top } = dimensions;

        // Enforce minimum dimensions
        width = Math.max(minWidth, width);
        height = Math.max(minHeight, height);

        // Ensure element stays within canvas
        left = Math.max(0, Math.min(left, canvasRect.width - width));
        top = Math.max(0, Math.min(top, canvasRect.height - height));

        return { width, height, left, top };
    },

    /**
     * Apply dimensions to element
     * @private
     */
    _applyDimensions(element, dimensions) {
        const { width, height, left, top } = dimensions;
        
        element.style.width = `${width}px`;
        element.style.height = `${height}px`;
        element.style.left = `${left}px`;
        element.style.top = `${top}px`;

        // Update font size proportionally for text elements
        if (element.dataset.type === 'text') {
            this._adjustFontSize(element, width, height);
        }
    },

    /**
     * Adjust font size based on element size
     * @private
     */
    _adjustFontSize(element, width, height) {
        const currentFontSize = parseFloat(window.getComputedStyle(element).fontSize);
        const baseFontSize = 16; // Base font size
        const scaleFactor = Math.min(width / 200, height / 50); // Adjust scaling as needed
        const newFontSize = Math.max(10, baseFontSize * scaleFactor);
        
        element.style.fontSize = `${newFontSize}px`;
    },

    /**
     * Trigger resize events
     * @private
     */
    _triggerResizeEvent(eventType, element, data = {}) {
        const event = new CustomEvent(eventType, {
            detail: { element, resizeData: data, resizeManager: this }
        });
        document.dispatchEvent(event);
    },

    /**
     * Get current resize state
     */
    getResizeState() {
        return {
            isResizing: this.isResizing,
            resizeData: this.resizeData
        };
    }
};

// Listen for element selection to show/hide handles
document.addEventListener('elementSelected', (e) => {
    const element = e.detail.element;
    const handles = element.querySelectorAll('.resize-handle');
    if (handles.length > 0) {
        ElementResize._showHandles(Array.from(handles));
    }
});

document.addEventListener('elementDeselected', (e) => {
    const element = e.detail.element;
    const handles = element.querySelectorAll('.resize-handle');
    if (handles.length > 0) {
        ElementResize._hideHandles(Array.from(handles));
    }
});

// Expose resize API globally
window.ElementResize = ElementResize;
