// --- PROPERTIES PANEL MANAGEMENT ---

// DOM element references for properties panel
const fontFamilySelect = document.getElementById('font-family');
const fontSizeInput = document.getElementById('font-size');
const fontColorInput = document.getElementById('font-color');
const alignLeftBtn = document.getElementById('align-left');
const alignCenterBtn = document.getElementById('align-center');
const alignRightBtn = document.getElementById('align-right');
const styleBoldBtn = document.getElementById('bold-btn');
const styleItalicBtn = document.getElementById('italic-btn');
const styleUnderlineBtn = document.getElementById('underline-btn');
const shadowXInput = document.getElementById('shadow-x');
const shadowYInput = document.getElementById('shadow-y');
const shadowBlurInput = document.getElementById('shadow-blur');
const shadowColorInput = document.getElementById('shadow-color');

function updatePropertiesPanel() {
    if (!selectedElement || selectedElement.dataset.type !== 'text') return;
    fontFamilySelect.value = selectedElement.style.fontFamily.replace(/"/g, '');
    fontSizeInput.value = parseInt(selectedElement.style.fontSize);
    fontColorInput.value = rgbToHex(selectedElement.style.color);
    styleBoldBtn.classList.toggle('active', selectedElement.style.fontWeight === 'bold');
    styleItalicBtn.classList.toggle('active', selectedElement.style.fontStyle === 'italic');
    styleUnderlineBtn.classList.toggle('active', selectedElement.style.textDecoration.includes('underline'));

    // Parse text shadow
    const shadow = selectedElement.style.textShadow;
    if (shadow && shadow !== 'none') {
        const parts = shadow.match(/(rgba?\(.+?\)|#?\w+)\s(-?\d+px)\s(-?\d+px)\s(\d+px)/);
        if (parts) {
            shadowColorInput.value = rgbToHex(parts[1]);
            shadowXInput.value = parseInt(parts[2]);
            shadowYInput.value = parseInt(parts[3]);
            shadowBlurInput.value = parseInt(parts[4]);
        }
    } else {
         shadowXInput.value = 0;
         shadowYInput.value = 0;
         shadowBlurInput.value = 0;
         shadowColorInput.value = '#000000';
    }
}

function applyTextShadow() {
    if (!selectedElement) return;
    const x = shadowXInput.value + 'px';
    const y = shadowYInput.value + 'px';
    const blur = shadowBlurInput.value + 'px';
    const color = shadowColorInput.value;
    if (shadowXInput.value == 0 && shadowYInput.value == 0 && shadowBlurInput.value == 0) {
         selectedElement.style.textShadow = 'none';
    } else {
         selectedElement.style.textShadow = `${x} ${y} ${blur} ${color}`;
    }
}

function rgbToHex(rgb) {
    if (!rgb || !rgb.includes('rgb')) return '#000000';
     if (rgb.startsWith('#')) return rgb;
    let [r, g, b] = rgb.match(/\d+/g).map(Number);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

// Event listeners for properties panel controls
fontFamilySelect.addEventListener('input', (e) => { if (selectedElement) selectedElement.style.fontFamily = e.target.value; });
fontSizeInput.addEventListener('input', (e) => { if (selectedElement) selectedElement.style.fontSize = e.target.value + 'px'; });
fontColorInput.addEventListener('input', (e) => { if (selectedElement) selectedElement.style.color = e.target.value; });
alignLeftBtn.addEventListener('click', () => { if (selectedElement) selectedElement.style.textAlign = 'left'; });
alignCenterBtn.addEventListener('click', () => { if (selectedElement) selectedElement.style.textAlign = 'center'; });
alignRightBtn.addEventListener('click', () => { if (selectedElement) selectedElement.style.textAlign = 'right'; });
styleBoldBtn.addEventListener('click', () => { if (selectedElement) { selectedElement.style.fontWeight = selectedElement.style.fontWeight === 'bold' ? 'normal' : 'bold'; updatePropertiesPanel(); } });
styleItalicBtn.addEventListener('click', () => { if (selectedElement) { selectedElement.style.fontStyle = selectedElement.style.fontStyle === 'italic' ? 'normal' : 'italic'; updatePropertiesPanel(); } });
styleUnderlineBtn.addEventListener('click', () => { if (selectedElement) { selectedElement.style.textDecoration = selectedElement.style.textDecoration.includes('underline') ? 'none' : 'underline'; updatePropertiesPanel(); } });
shadowXInput.addEventListener('input', applyTextShadow);
shadowYInput.addEventListener('input', applyTextShadow);
shadowBlurInput.addEventListener('input', applyTextShadow);
shadowColorInput.addEventListener('input', applyTextShadow);
