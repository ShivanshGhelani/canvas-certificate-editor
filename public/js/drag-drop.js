// --- DRAG AND DROP FUNCTIONALITY ---

const DragAndDrop = {
    // Drag state
    isDragging: false,
    dragData: null,

    /**
     * Make an element draggable
     * @param {HTMLElement} element - Element to make draggable
     */
    makeElementDraggable(element) {
        let isDragging = false;
        let startX, startY, startLeft, startTop;

        element.addEventListener('mousedown', (e) => {
            // Only drag on left click, and if not clicking controls
            if (e.button !== 0 || e.target.classList.contains('element-control')) {
                return;
            }

            isDragging = true;
            this.isDragging = true;
            
            // Prevent text selection during drag
            e.preventDefault();
            
            // Select the element
            if (window.ElementSelection) {
                window.ElementSelection.select(element);
            }

            // Calculate initial positions
            const rect = element.getBoundingClientRect();
            const canvas = document.getElementById('certificate-wrapper');
            const canvasRect = canvas.getBoundingClientRect();
            
            startX = e.clientX;
            startY = e.clientY;
            startLeft = rect.left - canvasRect.left;
            startTop = rect.top - canvasRect.top;

            // Store drag data
            this.dragData = {
                element,
                startX,
                startY,
                startLeft,
                startTop
            };

            // Add dragging cursor
            element.style.cursor = 'grabbing';
            canvas.style.cursor = 'grabbing';

            // Trigger drag start event
            this._triggerDragEvent('dragStart', element, { startX, startY });
        });

        // Global mouse move handler
        document.addEventListener('mousemove', (e) => {
            if (!isDragging || !this.dragData) return;

            const { element, startX, startY, startLeft, startTop } = this.dragData;
            
            // Calculate new position
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            const newLeft = startLeft + deltaX;
            const newTop = startTop + deltaY;

            // Apply constraints to keep element within canvas
            const constrainedPosition = this._constrainToCanvas(element, newLeft, newTop);
            
            // Update element position
            element.style.left = `${constrainedPosition.left}px`;
            element.style.top = `${constrainedPosition.top}px`;

            // Update properties panel position
            if (window.ElementSelection) {
                window.ElementSelection.updatePanelPosition();
            }

            // Trigger drag move event
            this._triggerDragEvent('dragMove', element, constrainedPosition);
        });

        // Global mouse up handler
        document.addEventListener('mouseup', () => {
            if (!isDragging) return;

            isDragging = false;
            this.isDragging = false;

            // Reset cursors
            element.style.cursor = 'grab';
            const canvas = document.getElementById('certificate-wrapper');
            canvas.style.cursor = 'default';

            // Trigger drag end event
            if (this.dragData) {
                this._triggerDragEvent('dragEnd', this.dragData.element);
                this.dragData = null;
            }
        });
    },

    /**
     * Constrain element position to canvas boundaries
     * @private
     */
    _constrainToCanvas(element, left, top) {
        const canvas = document.getElementById('certificate-wrapper');
        const canvasRect = canvas.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        
        // Calculate constraints
        const minLeft = 0;
        const minTop = 0;
        const maxLeft = canvasRect.width - elementRect.width;
        const maxTop = canvasRect.height - elementRect.height;

        return {
            left: Math.max(minLeft, Math.min(left, maxLeft)),
            top: Math.max(minTop, Math.min(top, maxTop))
        };
    },

    /**
     * Trigger custom drag events
     * @private
     */
    _triggerDragEvent(eventType, element, data = {}) {
        const event = new CustomEvent(eventType, {
            detail: { element, dragData: data, dragManager: this }
        });
        document.dispatchEvent(event);
    },

    /**
     * Get current drag state
     */
    getDragState() {
        return {
            isDragging: this.isDragging,
            dragData: this.dragData
        };
    }
};

// Expose drag API globally
window.DragAndDrop = DragAndDrop;
