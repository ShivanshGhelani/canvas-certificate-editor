// --- CORE INITIALIZATION AND GLOBAL VARIABLES ---
// jsPDF is already available globally from React component
// Global variables are initialized from React component

let drawBackground = function() {
    const canvas = document.getElementById('background-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const wrapper = document.getElementById('certificate-wrapper');
    canvas.width = wrapper.offsetWidth;
    canvas.height = wrapper.offsetHeight;
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.fillStyle = 'rgba(42, 109, 244, 0.05)';
    ctx.beginPath();
    ctx.moveTo(0, canvas.height * 0.7);
    ctx.lineTo(canvas.width * 0.25, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'rgba(44, 62, 80, 0.05)';
    ctx.beginPath();
    ctx.moveTo(canvas.width, 0);
    ctx.lineTo(canvas.width, canvas.height * 0.25);
    ctx.lineTo(canvas.width * 0.75, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    const padding = 20;
    ctx.strokeStyle = '#dee2e6';
    ctx.lineWidth = 1;
    ctx.strokeRect(padding, padding, canvas.width - padding * 2, canvas.height - padding * 2);
}

// DOM element references
const addLogoBtn = document.getElementById('add-logo-btn');
const addTextBtn = document.getElementById('add-text-btn');
const dynamicLogoInput = document.getElementById('upload-logo-dynamic');
const dynamicElementsContainer = document.getElementById('dynamic-elements-container');
const propertiesPanel = document.getElementById('properties-panel');

// Initialize the application
function initializeApp() {
    drawBackground();
    document.body.appendChild(propertiesPanel); // Move panel to body for absolute positioning
    loadDefaultTemplate();
    handleImageUpload('upload-sig-1', 'sig-line-1');
    handleImageUpload('upload-sig-2', 'sig-line-2');
    handleImageUpload('upload-sig-3', 'sig-line-3');
}

// Event listeners for initialization
window.addEventListener('load', initializeApp);
window.addEventListener('resize', drawBackground);
