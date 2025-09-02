// --- TEXT ALIGNMENT AND LAYOUT CONTROLS ---

const TextAlignment = {
    /**
     * Initialize text alignment controls
     */
    init() {
        this._attachEventListeners();
    },

    /**
     * Attach event listeners to alignment controls
     * @private
     */
    _attachEventListeners() {
        // Text alignment buttons
        const alignLeftBtn = document.getElementById('align-left');
        const alignCenterBtn = document.getElementById('align-center');
        const alignRightBtn = document.getElementById('align-right');

        if (alignLeftBtn) {
            alignLeftBtn.addEventListener('click', () => {
                this.setAlignment('left');
            });
        }

        if (alignCenterBtn) {
            alignCenterBtn.addEventListener('click', () => {
                this.setAlignment('center');
            });
        }

        if (alignRightBtn) {
            alignRightBtn.addEventListener('click', () => {
                this.setAlignment('right');
            });
        }

        // Line height control
        const lineHeightInput = document.getElementById('line-height');
        if (lineHeightInput) {
            lineHeightInput.addEventListener('input', (e) => {
                this.setLineHeight(e.target.value);
            });
        }

        // Letter spacing control
        const letterSpacingInput = document.getElementById('letter-spacing');
        if (letterSpacingInput) {
            letterSpacingInput.addEventListener('input', (e) => {
                this.setLetterSpacing(e.target.value);
            });
        }
    },

    /**
     * Set text alignment
     * @param {string} alignment - 'left', 'center', or 'right'
     */
    setAlignment(alignment) {
        const selectedElement = window.ElementSelection?.getSelected();
        if (!selectedElement || selectedElement.dataset.type !== 'text') return;

        selectedElement.style.textAlign = alignment;
        this._updateAlignmentButtons(alignment);
        this._triggerPropertyChange('textAlign', alignment);
    },

    /**
     * Set line height
     * @param {string|number} lineHeight - Line height value
     */
    setLineHeight(lineHeight) {
        const selectedElement = window.ElementSelection?.getSelected();
        if (!selectedElement || selectedElement.dataset.type !== 'text') return;

        selectedElement.style.lineHeight = lineHeight;
        this._triggerPropertyChange('lineHeight', lineHeight);
    },

    /**
     * Set letter spacing
     * @param {string|number} letterSpacing - Letter spacing value
     */
    setLetterSpacing(letterSpacing) {
        const selectedElement = window.ElementSelection?.getSelected();
        if (!selectedElement || selectedElement.dataset.type !== 'text') return;

        const spacing = `${letterSpacing}px`;
        selectedElement.style.letterSpacing = spacing;
        this._triggerPropertyChange('letterSpacing', spacing);
    },

    /**
     * Update alignment button states
     * @private
     */
    _updateAlignmentButtons(activeAlignment) {
        const buttons = ['align-left', 'align-center', 'align-right'];
        
        buttons.forEach(buttonId => {
            const button = document.getElementById(buttonId);
            if (button) {
                const alignment = buttonId.replace('align-', '');
                button.classList.toggle('active', alignment === activeAlignment);
            }
        });
    },

    /**
     * Update controls from selected element
     * @param {HTMLElement} element - Element to read properties from
     */
    updateFromElement(element) {
        if (!element || element.dataset.type !== 'text') return;

        const computedStyle = window.getComputedStyle(element);

        // Update alignment buttons
        const textAlign = computedStyle.textAlign || 'left';
        this._updateAlignmentButtons(textAlign);

        // Update line height
        const lineHeightInput = document.getElementById('line-height');
        if (lineHeightInput) {
            const lineHeight = computedStyle.lineHeight;
            lineHeightInput.value = lineHeight === 'normal' ? '1.2' : parseFloat(lineHeight);
        }

        // Update letter spacing
        const letterSpacingInput = document.getElementById('letter-spacing');
        if (letterSpacingInput) {
            const letterSpacing = computedStyle.letterSpacing;
            letterSpacingInput.value = letterSpacing === 'normal' ? '0' : parseFloat(letterSpacing);
        }
    },

    /**
     * Get current alignment properties
     */
    getCurrentProperties() {
        const selectedElement = window.ElementSelection?.getSelected();
        if (!selectedElement || selectedElement.dataset.type !== 'text') return null;

        const computedStyle = window.getComputedStyle(selectedElement);
        
        return {
            textAlign: computedStyle.textAlign || 'left',
            lineHeight: computedStyle.lineHeight,
            letterSpacing: computedStyle.letterSpacing
        };
    },

    /**
     * Apply multiple alignment properties at once
     * @param {Object} properties - Alignment properties to apply
     */
    applyProperties(properties) {
        const selectedElement = window.ElementSelection?.getSelected();
        if (!selectedElement || selectedElement.dataset.type !== 'text') return;

        Object.entries(properties).forEach(([property, value]) => {
            switch (property) {
                case 'textAlign':
                    this.setAlignment(value);
                    break;
                case 'lineHeight':
                    this.setLineHeight(value);
                    break;
                case 'letterSpacing':
                    this.setLetterSpacing(value);
                    break;
            }
        });

        // Update UI controls
        this.updateFromElement(selectedElement);
    },

    /**
     * Trigger property change event
     * @private
     */
    _triggerPropertyChange(property, value) {
        const event = new CustomEvent('textAlignmentChanged', {
            detail: { property, value, alignmentManager: this }
        });
        document.dispatchEvent(event);
    }
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    TextAlignment.init();
});

// Listen for element selection to update controls
document.addEventListener('elementSelected', (e) => {
    TextAlignment.updateFromElement(e.detail.element);
});

// Expose text alignment API globally
window.TextAlignment = TextAlignment;
