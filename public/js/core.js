// --- CORE INITIALIZATION AND GLOBAL VARIABLES ---
// jsPDF is already available globally from React component
// Global variables are initialized from React component

let drawBackground = function() {
    const canvas = document.getElementById('background-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // DO NOT override canvas dimensions - preserve A4 300 DPI settings
    // Canvas dimensions are managed by Layout.jsx for proper A4 sizing
    // canvas.width and canvas.height should maintain 2480×3508 (portrait) or 3508×2480 (landscape)
    
    // Draw ornate academic background optimized for portrait orientation
    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Ornate golden border system
    ctx.strokeStyle = '#d4af37'; // Gold color
    ctx.lineWidth = 20;
    
    // Outer decorative border
    ctx.strokeRect(100, 120, canvas.width - 200, canvas.height - 240);
    
    // Inner border
    ctx.strokeStyle = '#b8860b'; // Darker gold
    ctx.lineWidth = 8;
    ctx.strokeRect(140, 160, canvas.width - 280, canvas.height - 320);
    
    // Corner decorative elements positioned for portrait
    const cornerSize = 150;
    ctx.fillStyle = '#d4af37';
    
    // Four corners adjusted for portrait aspect ratio
    ctx.fillRect(80, 100, cornerSize, cornerSize);
    ctx.fillRect(canvas.width - 230, 100, cornerSize, cornerSize);
    ctx.fillRect(80, canvas.height - 250, cornerSize, cornerSize);
    ctx.fillRect(canvas.width - 230, canvas.height - 250, cornerSize, cornerSize);
    
    // Clear center of corners for ornate effect
    ctx.fillStyle = '#ffffff';
    const centerSize = 100;
    const centerOffset = 25;
    
    ctx.fillRect(80 + centerOffset, 100 + centerOffset, centerSize, centerSize);
    ctx.fillRect(canvas.width - 230 + centerOffset, 100 + centerOffset, centerSize, centerSize);
    ctx.fillRect(80 + centerOffset, canvas.height - 250 + centerOffset, centerSize, centerSize);
    ctx.fillRect(canvas.width - 230 + centerOffset, canvas.height - 250 + centerOffset, centerSize, centerSize);
    
    // Add subtle decorative lines positioned for portrait layout
    ctx.strokeStyle = '#f0e68c'; // Light gold
    ctx.lineWidth = 2;
    
    // Horizontal decorative lines positioned for better portrait balance
    ctx.beginPath();
    ctx.moveTo(200, 300);
    ctx.lineTo(canvas.width - 200, 300);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(200, canvas.height - 300);
    ctx.lineTo(canvas.width - 200, canvas.height - 300);
    ctx.stroke();
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
