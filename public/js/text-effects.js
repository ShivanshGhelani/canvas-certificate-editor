// --- TEXT EFFECTS MANAGEMENT ---

const TextEffects = {
    /**
     * Initialize text effects controls
     */
    init() {
        this._attachEventListeners();
    },

    /**
     * Attach event listeners to text effects controls
     * @private
     */
    _attachEventListeners() {
        // Text shadow controls
        const shadowColorInput = document.getElementById('shadow-color');
        const shadowXInput = document.getElementById('shadow-x');
        const shadowYInput = document.getElementById('shadow-y');
        const shadowBlurInput = document.getElementById('shadow-blur');
        const shadowToggle = document.getElementById('shadow-toggle');

        if (shadowColorInput) {
            shadowColorInput.addEventListener('input', () => {
                this._applyShadowFromInputs();
            });
        }

        if (shadowXInput) {
            shadowXInput.addEventListener('input', () => {
                this._applyShadowFromInputs();
            });
        }

        if (shadowYInput) {
            shadowYInput.addEventListener('input', () => {
                this._applyShadowFromInputs();
            });
        }

        if (shadowBlurInput) {
            shadowBlurInput.addEventListener('input', () => {
                this._applyShadowFromInputs();
            });
        }

        if (shadowToggle) {
            shadowToggle.addEventListener('change', (e) => {
                this.toggleShadow(e.target.checked);
            });
        }

        // Text outline controls
        const outlineToggle = document.getElementById('outline-toggle');
        const outlineColorInput = document.getElementById('outline-color');
        const outlineWidthInput = document.getElementById('outline-width');

        if (outlineToggle) {
            outlineToggle.addEventListener('change', (e) => {
                this.toggleOutline(e.target.checked);
            });
        }

        if (outlineColorInput) {
            outlineColorInput.addEventListener('input', () => {
                this._applyOutlineFromInputs();
            });
        }

        if (outlineWidthInput) {
            outlineWidthInput.addEventListener('input', () => {
                this._applyOutlineFromInputs();
            });
        }

        // Text transform controls
        const uppercaseBtn = document.getElementById('uppercase-btn');
        const lowercaseBtn = document.getElementById('lowercase-btn');
        const capitalizeBtn = document.getElementById('capitalize-btn');

        if (uppercaseBtn) {
            uppercaseBtn.addEventListener('click', () => {
                this.setTextTransform('uppercase');
            });
        }

        if (lowercaseBtn) {
            lowercaseBtn.addEventListener('click', () => {
                this.setTextTransform('lowercase');
            });
        }

        if (capitalizeBtn) {
            capitalizeBtn.addEventListener('click', () => {
                this.setTextTransform('capitalize');
            });
        }
    },

    /**
     * Apply text shadow from input controls
     * @private
     */
    _applyShadowFromInputs() {
        const shadowColor = document.getElementById('shadow-color')?.value || '#000000';
        const shadowX = document.getElementById('shadow-x')?.value || '2';
        const shadowY = document.getElementById('shadow-y')?.value || '2';
        const shadowBlur = document.getElementById('shadow-blur')?.value || '4';

        this.applyShadow(shadowX, shadowY, shadowBlur, shadowColor);
    },

    /**
     * Apply text shadow
     * @param {string|number} x - Horizontal offset
     * @param {string|number} y - Vertical offset
     * @param {string|number} blur - Blur radius
     * @param {string} color - Shadow color
     */
    applyShadow(x, y, blur, color) {
        const selectedElement = window.ElementSelection?.getSelected();
        if (!selectedElement || selectedElement.dataset.type !== 'text') return;

        const shadowValue = `${x}px ${y}px ${blur}px ${color}`;
        selectedElement.style.textShadow = shadowValue;
        
        // Enable shadow toggle
        const shadowToggle = document.getElementById('shadow-toggle');
        if (shadowToggle) {
            shadowToggle.checked = true;
        }

        this._triggerPropertyChange('textShadow', shadowValue);
    },

    /**
     * Toggle text shadow on/off
     * @param {boolean} enabled - Whether shadow is enabled
     */
    toggleShadow(enabled) {
        const selectedElement = window.ElementSelection?.getSelected();
        if (!selectedElement || selectedElement.dataset.type !== 'text') return;

        if (enabled) {
            this._applyShadowFromInputs();
        } else {
            selectedElement.style.textShadow = 'none';
            this._triggerPropertyChange('textShadow', 'none');
        }
    },

    /**
     * Apply text outline from input controls
     * @private
     */
    _applyOutlineFromInputs() {
        const outlineColor = document.getElementById('outline-color')?.value || '#000000';
        const outlineWidth = document.getElementById('outline-width')?.value || '1';

        this.applyOutline(outlineWidth, outlineColor);
    },

    /**
     * Apply text outline (using text-stroke)
     * @param {string|number} width - Outline width
     * @param {string} color - Outline color
     */
    applyOutline(width, color) {
        const selectedElement = window.ElementSelection?.getSelected();
        if (!selectedElement || selectedElement.dataset.type !== 'text') return;

        selectedElement.style.webkitTextStroke = `${width}px ${color}`;
        selectedElement.style.textStroke = `${width}px ${color}`; // Standard property
        
        // Enable outline toggle
        const outlineToggle = document.getElementById('outline-toggle');
        if (outlineToggle) {
            outlineToggle.checked = true;
        }

        this._triggerPropertyChange('textStroke', `${width}px ${color}`);
    },

    /**
     * Toggle text outline on/off
     * @param {boolean} enabled - Whether outline is enabled
     */
    toggleOutline(enabled) {
        const selectedElement = window.ElementSelection?.getSelected();
        if (!selectedElement || selectedElement.dataset.type !== 'text') return;

        if (enabled) {
            this._applyOutlineFromInputs();
        } else {
            selectedElement.style.webkitTextStroke = 'none';
            selectedElement.style.textStroke = 'none';
            this._triggerPropertyChange('textStroke', 'none');
        }
    },

    /**
     * Set text transform
     * @param {string} transform - 'uppercase', 'lowercase', 'capitalize', or 'none'
     */
    setTextTransform(transform) {
        const selectedElement = window.ElementSelection?.getSelected();
        if (!selectedElement || selectedElement.dataset.type !== 'text') return;

        selectedElement.style.textTransform = transform;
        this._updateTransformButtons(transform);
        this._triggerPropertyChange('textTransform', transform);
    },

    /**
     * Update transform button states
     * @private
     */
    _updateTransformButtons(activeTransform) {
        const buttons = ['uppercase-btn', 'lowercase-btn', 'capitalize-btn'];
        
        buttons.forEach(buttonId => {
            const button = document.getElementById(buttonId);
            if (button) {
                const transform = buttonId.replace('-btn', '');
                button.classList.toggle('active', transform === activeTransform);
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

        // Update shadow controls
        this._updateShadowControls(computedStyle.textShadow);

        // Update outline controls
        this._updateOutlineControls(computedStyle.webkitTextStroke || computedStyle.textStroke);

        // Update transform buttons
        const textTransform = computedStyle.textTransform || 'none';
        this._updateTransformButtons(textTransform);
    },

    /**
     * Update shadow controls from computed style
     * @private
     */
    _updateShadowControls(textShadow) {
        const shadowToggle = document.getElementById('shadow-toggle');
        
        if (textShadow === 'none' || !textShadow) {
            if (shadowToggle) shadowToggle.checked = false;
            return;
        }

        if (shadowToggle) shadowToggle.checked = true;

        // Parse shadow values (simplified parsing)
        const shadowMatch = textShadow.match(/(-?\d+\.?\d*)px\s+(-?\d+\.?\d*)px\s+(-?\d+\.?\d*)px\s+(.*)/);
        if (shadowMatch) {
            const [, x, y, blur, color] = shadowMatch;
            
            const shadowXInput = document.getElementById('shadow-x');
            const shadowYInput = document.getElementById('shadow-y');
            const shadowBlurInput = document.getElementById('shadow-blur');
            const shadowColorInput = document.getElementById('shadow-color');

            if (shadowXInput) shadowXInput.value = x;
            if (shadowYInput) shadowYInput.value = y;
            if (shadowBlurInput) shadowBlurInput.value = blur;
            if (shadowColorInput) shadowColorInput.value = this._parseColor(color);
        }
    },

    /**
     * Update outline controls from computed style
     * @private
     */
    _updateOutlineControls(textStroke) {
        const outlineToggle = document.getElementById('outline-toggle');
        
        if (textStroke === 'none' || !textStroke) {
            if (outlineToggle) outlineToggle.checked = false;
            return;
        }

        if (outlineToggle) outlineToggle.checked = true;

        // Parse stroke values
        const strokeMatch = textStroke.match(/(-?\d+\.?\d*)px\s+(.*)/);
        if (strokeMatch) {
            const [, width, color] = strokeMatch;
            
            const outlineWidthInput = document.getElementById('outline-width');
            const outlineColorInput = document.getElementById('outline-color');

            if (outlineWidthInput) outlineWidthInput.value = width;
            if (outlineColorInput) outlineColorInput.value = this._parseColor(color);
        }
    },

    /**
     * Parse color value to hex
     * @private
     */
    _parseColor(color) {
        if (color.startsWith('#')) return color;
        
        // Create a temporary element to get computed color
        const temp = document.createElement('div');
        temp.style.color = color;
        document.body.appendChild(temp);
        const computedColor = window.getComputedStyle(temp).color;
        document.body.removeChild(temp);
        
        return this._rgbToHex(computedColor);
    },

    /**
     * Convert RGB to hex
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
     * Get current effects properties
     */
    getCurrentProperties() {
        const selectedElement = window.ElementSelection?.getSelected();
        if (!selectedElement || selectedElement.dataset.type !== 'text') return null;

        const computedStyle = window.getComputedStyle(selectedElement);
        
        return {
            textShadow: computedStyle.textShadow,
            textStroke: computedStyle.webkitTextStroke || computedStyle.textStroke,
            textTransform: computedStyle.textTransform
        };
    },

    /**
     * Apply multiple effects properties at once
     * @param {Object} properties - Effects properties to apply
     */
    applyProperties(properties) {
        const selectedElement = window.ElementSelection?.getSelected();
        if (!selectedElement || selectedElement.dataset.type !== 'text') return;

        Object.entries(properties).forEach(([property, value]) => {
            switch (property) {
                case 'textShadow':
                    selectedElement.style.textShadow = value;
                    break;
                case 'textStroke':
                    selectedElement.style.webkitTextStroke = value;
                    selectedElement.style.textStroke = value;
                    break;
                case 'textTransform':
                    this.setTextTransform(value);
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
        const event = new CustomEvent('textEffectChanged', {
            detail: { property, value, effectsManager: this }
        });
        document.dispatchEvent(event);
    }
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    TextEffects.init();
});

// Listen for element selection to update controls
document.addEventListener('elementSelected', (e) => {
    TextEffects.updateFromElement(e.detail.element);
});

// Expose text effects API globally
window.TextEffects = TextEffects;
