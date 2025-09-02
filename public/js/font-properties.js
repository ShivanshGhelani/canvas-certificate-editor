// --- FONT PROPERTIES MANAGEMENT ---

const FontProperties = {
    /**
     * Initialize font property controls
     */
    init() {
        this._attachEventListeners();
    },

    /**
     * Attach event listeners to font controls
     * @private
     */
    _attachEventListeners() {
        // Font family control
        const fontFamilySelect = document.getElementById('font-family');
        if (fontFamilySelect) {
            fontFamilySelect.addEventListener('change', (e) => {
                this.applyFontFamily(e.target.value);
            });
        }

        // Font size control
        const fontSizeInput = document.getElementById('font-size');
        if (fontSizeInput) {
            fontSizeInput.addEventListener('input', (e) => {
                this.applyFontSize(e.target.value);
            });
        }

        // Font color control
        const fontColorInput = document.getElementById('font-color');
        if (fontColorInput) {
            fontColorInput.addEventListener('input', (e) => {
                this.applyFontColor(e.target.value);
            });
        }

        // Font weight controls
        const boldBtn = document.getElementById('bold-btn');
        if (boldBtn) {
            boldBtn.addEventListener('click', () => {
                this.toggleBold();
            });
        }

        const italicBtn = document.getElementById('italic-btn');
        if (italicBtn) {
            italicBtn.addEventListener('click', () => {
                this.toggleItalic();
            });
        }

        const underlineBtn = document.getElementById('underline-btn');
        if (underlineBtn) {
            underlineBtn.addEventListener('click', () => {
                this.toggleUnderline();
            });
        }
    },

    /**
     * Apply font family to selected element
     * @param {string} fontFamily - Font family to apply
     */
    applyFontFamily(fontFamily) {
        const selectedElement = window.ElementSelection?.getSelected();
        if (!selectedElement) return;

        selectedElement.style.fontFamily = fontFamily;
        this._triggerPropertyChange('fontFamily', fontFamily);
    },

    /**
     * Apply font size to selected element
     * @param {string|number} fontSize - Font size to apply
     */
    applyFontSize(fontSize) {
        const selectedElement = window.ElementSelection?.getSelected();
        if (!selectedElement) return;

        const size = typeof fontSize === 'number' ? `${fontSize}px` : fontSize;
        selectedElement.style.fontSize = size;
        this._triggerPropertyChange('fontSize', size);
    },

    /**
     * Apply font color to selected element
     * @param {string} color - Color to apply
     */
    applyFontColor(color) {
        const selectedElement = window.ElementSelection?.getSelected();
        if (!selectedElement) return;

        selectedElement.style.color = color;
        this._triggerPropertyChange('fontColor', color);
    },

    /**
     * Toggle bold formatting
     */
    toggleBold() {
        const selectedElement = window.ElementSelection?.getSelected();
        if (!selectedElement) return;

        const currentWeight = window.getComputedStyle(selectedElement).fontWeight;
        const isBold = currentWeight === 'bold' || currentWeight === '700';
        
        selectedElement.style.fontWeight = isBold ? 'normal' : 'bold';
        
        // Update button state
        const boldBtn = document.getElementById('bold-btn');
        if (boldBtn) {
            boldBtn.classList.toggle('active', !isBold);
        }

        this._triggerPropertyChange('fontWeight', isBold ? 'normal' : 'bold');
    },

    /**
     * Toggle italic formatting
     */
    toggleItalic() {
        const selectedElement = window.ElementSelection?.getSelected();
        if (!selectedElement) return;

        const currentStyle = window.getComputedStyle(selectedElement).fontStyle;
        const isItalic = currentStyle === 'italic';
        
        selectedElement.style.fontStyle = isItalic ? 'normal' : 'italic';
        
        // Update button state
        const italicBtn = document.getElementById('italic-btn');
        if (italicBtn) {
            italicBtn.classList.toggle('active', !isItalic);
        }

        this._triggerPropertyChange('fontStyle', isItalic ? 'normal' : 'italic');
    },

    /**
     * Toggle underline formatting
     */
    toggleUnderline() {
        const selectedElement = window.ElementSelection?.getSelected();
        if (!selectedElement) return;

        const currentDecoration = window.getComputedStyle(selectedElement).textDecoration;
        const isUnderlined = currentDecoration.includes('underline');
        
        selectedElement.style.textDecoration = isUnderlined ? 'none' : 'underline';
        
        // Update button state
        const underlineBtn = document.getElementById('underline-btn');
        if (underlineBtn) {
            underlineBtn.classList.toggle('active', !isUnderlined);
        }

        this._triggerPropertyChange('textDecoration', isUnderlined ? 'none' : 'underline');
    },

    /**
     * Update font controls from selected element
     * @param {HTMLElement} element - Element to read properties from
     */
    updateFromElement(element) {
        if (!element || element.dataset.type !== 'text') return;

        const computedStyle = window.getComputedStyle(element);

        // Update font family
        const fontFamilySelect = document.getElementById('font-family');
        if (fontFamilySelect) {
            fontFamilySelect.value = this._extractFontFamily(computedStyle.fontFamily);
        }

        // Update font size
        const fontSizeInput = document.getElementById('font-size');
        if (fontSizeInput) {
            fontSizeInput.value = parseInt(computedStyle.fontSize);
        }

        // Update font color
        const fontColorInput = document.getElementById('font-color');
        if (fontColorInput) {
            fontColorInput.value = this._rgbToHex(computedStyle.color);
        }

        // Update formatting buttons
        this._updateFormattingButtons(computedStyle);
    },

    /**
     * Extract font family name from computed style
     * @private
     */
    _extractFontFamily(fontFamily) {
        // Remove quotes and get first font family
        return fontFamily.split(',')[0].replace(/['"]/g, '').trim();
    },

    /**
     * Convert RGB color to hex
     * @private
     */
    _rgbToHex(rgb) {
        if (rgb.startsWith('#')) return rgb;
        
        const match = rgb.match(/\d+/g);
        if (!match) return '#000000';
        
        const r = parseInt(match[0]);
        const g = parseInt(match[1]);
        const b = parseInt(match[2]);
        
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    },

    /**
     * Update formatting button states
     * @private
     */
    _updateFormattingButtons(computedStyle) {
        // Bold button
        const boldBtn = document.getElementById('bold-btn');
        if (boldBtn) {
            const isBold = computedStyle.fontWeight === 'bold' || computedStyle.fontWeight === '700';
            boldBtn.classList.toggle('active', isBold);
        }

        // Italic button
        const italicBtn = document.getElementById('italic-btn');
        if (italicBtn) {
            const isItalic = computedStyle.fontStyle === 'italic';
            italicBtn.classList.toggle('active', isItalic);
        }

        // Underline button
        const underlineBtn = document.getElementById('underline-btn');
        if (underlineBtn) {
            const isUnderlined = computedStyle.textDecoration.includes('underline');
            underlineBtn.classList.toggle('active', isUnderlined);
        }
    },

    /**
     * Get current font properties of selected element
     */
    getCurrentProperties() {
        const selectedElement = window.ElementSelection?.getSelected();
        if (!selectedElement) return null;

        const computedStyle = window.getComputedStyle(selectedElement);
        
        return {
            fontFamily: this._extractFontFamily(computedStyle.fontFamily),
            fontSize: computedStyle.fontSize,
            fontColor: this._rgbToHex(computedStyle.color),
            fontWeight: computedStyle.fontWeight,
            fontStyle: computedStyle.fontStyle,
            textDecoration: computedStyle.textDecoration
        };
    },

    /**
     * Apply multiple font properties at once
     * @param {Object} properties - Font properties to apply
     */
    applyProperties(properties) {
        const selectedElement = window.ElementSelection?.getSelected();
        if (!selectedElement) return;

        Object.entries(properties).forEach(([property, value]) => {
            switch (property) {
                case 'fontFamily':
                    this.applyFontFamily(value);
                    break;
                case 'fontSize':
                    this.applyFontSize(value);
                    break;
                case 'fontColor':
                    this.applyFontColor(value);
                    break;
                case 'fontWeight':
                    selectedElement.style.fontWeight = value;
                    break;
                case 'fontStyle':
                    selectedElement.style.fontStyle = value;
                    break;
                case 'textDecoration':
                    selectedElement.style.textDecoration = value;
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
        const event = new CustomEvent('fontPropertyChanged', {
            detail: { property, value, fontManager: this }
        });
        document.dispatchEvent(event);
    }
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    FontProperties.init();
});

// Listen for element selection to update controls
document.addEventListener('elementSelected', (e) => {
    FontProperties.updateFromElement(e.detail.element);
});

// Expose font properties API globally
window.FontProperties = FontProperties;
