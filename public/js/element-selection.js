// --- ELEMENT SELECTION MANAGEMENT ---

// Selection state management (using global variable from React)
// let selectedElement = null; // This is now initialized globally

// Selection API
const ElementSelection = {
    /**
     * Select an element and show its properties
     * @param {HTMLElement} element - The element to select
     */
    select(element) {
        // Deselect current element if any
        this.deselect();
        
        // Select new element
        selectedElement = element;
        selectedElement.classList.add('selected');

        // Show appropriate properties panel
        this._showPropertiesPanel(element);
        
        // Trigger selection events
        this._triggerSelectionEvent('elementSelected', element);
    },

    /**
     * Deselect current element
     */
    deselect() {
        if (selectedElement) {
            selectedElement.classList.remove('selected');
            
            // If element is being edited, stop editing
            if (selectedElement.getAttribute('contenteditable') === 'true') {
                selectedElement.setAttribute('contenteditable', 'false');
            }
            
            const previousElement = selectedElement;
            selectedElement = null;
            
            // Hide properties panel
            propertiesPanel.style.display = 'none';
            
            // Trigger deselection event for React
            const windowEvent = new CustomEvent('elementDeselected', {
                detail: null  // No element selected
            });
            window.dispatchEvent(windowEvent);
            
            // Trigger legacy event
            this._triggerSelectionEvent('elementDeselected', previousElement);
        }
    },

    /**
     * Get currently selected element
     * @returns {HTMLElement|null} - The selected element or null
     */
    getSelected() {
        return selectedElement;
    },

    /**
     * Check if an element is selected
     * @param {HTMLElement} element - Element to check
     * @returns {boolean} - True if element is selected
     */
    isSelected(element) {
        return selectedElement === element;
    },

    /**
     * Show properties panel for selected element
     * @private
     */
    _showPropertiesPanel(element) {
        propertiesPanel.style.display = 'flex';
        
        // Show/hide relevant property sections
        const textPropsSection = document.getElementById('text-props');
        if (textPropsSection) {
            textPropsSection.style.display = element.dataset.type === 'text' ? 'block' : 'none';
        }
        
        // Update properties panel content
        if (element.dataset.type === 'text' && window.FontProperties) {
            window.FontProperties.updateFromElement(element);
        }
        
        // Position the panel
        this._positionPropertiesPanel();
    },

    /**
     * Position the properties panel relative to selected element
     * @private
     */
    _positionPropertiesPanel() {
        if (!selectedElement) return;
        
        const elRect = selectedElement.getBoundingClientRect();
        const panel = propertiesPanel;
        const panelRect = panel.getBoundingClientRect();
        const spaceBelow = window.innerHeight - elRect.bottom;
        
        let top, left;

        // Position Vertically
        if (spaceBelow < panelRect.height && elRect.top > panelRect.height) {
            // Flip to top if not enough space below
            top = elRect.top - panelRect.height - 10;
        } else {
            // Position below element
            top = elRect.bottom + 10;
        }

        // Position Horizontally
        left = elRect.left;
        if (left + panelRect.width > window.innerWidth) {
            left = window.innerWidth - panelRect.width - 10;
        }

        // Ensure panel doesn't go off-screen
        top = Math.max(10, Math.min(top, window.innerHeight - panelRect.height - 10));
        left = Math.max(10, left);

        panel.style.top = `${top}px`;
        panel.style.left = `${left}px`;
    },

    /**
     * Update properties panel position (useful when element moves)
     */
    updatePanelPosition() {
        if (selectedElement) {
            this._positionPropertiesPanel();
        }
    },

    /**
     * Trigger custom selection events
     * @private
     */
    _triggerSelectionEvent(eventType, element) {
        // Trigger event for React components
        const windowEvent = new CustomEvent(eventType, {
            detail: element  // Send element directly, not wrapped in object
        });
        window.dispatchEvent(windowEvent);
        
        // Keep legacy document event for other scripts
        const docEvent = new CustomEvent(eventType, {
            detail: { element, selectionManager: this }
        });
        document.dispatchEvent(docEvent);
    }
};

// Global click handler for deselection
document.addEventListener('mousedown', (e) => {
    const clickedElement = e.target.closest('.dynamic-element');
    const clickedPanel = e.target.closest('#properties-panel');
    
    // If clicked outside elements and panel, deselect
    if (!clickedElement && !clickedPanel) {
        ElementSelection.deselect();
    }
});

// Handle window resize to reposition panel
window.addEventListener('resize', () => {
    ElementSelection.updatePanelPosition();
});

// Expose selection API globally
window.ElementSelection = ElementSelection;

// Legacy support for existing code
window.selectElement = ElementSelection.select.bind(ElementSelection);
window.updatePropertiesPanelPosition = ElementSelection.updatePanelPosition.bind(ElementSelection);
