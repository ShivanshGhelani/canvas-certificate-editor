/**
 * Canvas Dimension Fix Script
 * 
 * This script ensures the certificate displays at the correct A4 landscape dimensions
 * by properly setting both canvas and CSS wrapper dimensions.
 */

console.log('🔧 Applying Canvas Dimension Fix...');
console.log('===================================');

// A4 landscape dimensions at 300 DPI
const A4_LANDSCAPE = {
    width: 3508,    // pixels
    height: 2480,   // pixels
    widthMM: 297,   // millimeters  
    heightMM: 210   // millimeters
};

function fixCanvasDimensions() {
    console.log('📐 Setting correct canvas dimensions...');
    
    const canvas = document.getElementById('background-canvas');
    const wrapper = document.getElementById('certificate-wrapper');
    
    if (!canvas || !wrapper) {
        console.error('❌ Canvas or wrapper not found');
        return false;
    }
    
    // Set canvas pixel dimensions (for export quality)
    canvas.width = A4_LANDSCAPE.width;
    canvas.height = A4_LANDSCAPE.height;
    
    console.log(`✅ Canvas dimensions set: ${canvas.width}×${canvas.height}px`);
    
    // Set wrapper CSS dimensions using pixels instead of mm for consistency
    // Using pixels ensures exact control over display size
    const scale = 0.3; // Scale down for display
    const displayWidth = A4_LANDSCAPE.width * scale;
    const displayHeight = A4_LANDSCAPE.height * scale;
    
    wrapper.style.width = `${displayWidth}px`;
    wrapper.style.height = `${displayHeight}px`;
    
    console.log(`✅ Wrapper dimensions set: ${displayWidth}×${displayHeight}px`);
    
    // Redraw background
    if (typeof window.drawBackground === 'function') {
        window.drawBackground();
        console.log('🎨 Background redrawn');
    }
    
    return true;
}

function adjustDisplayScale() {
    console.log('🔍 Adjusting display scale...');
    
    const displayWrapper = document.querySelector('.certificate-display-wrapper');
    if (!displayWrapper) {
        console.error('❌ Display wrapper not found');
        return false;
    }
    
    // Remove any existing transform to use wrapper size directly
    displayWrapper.style.transform = 'scale(1)';
    displayWrapper.style.transformOrigin = 'center';
    
    console.log('✅ Display scale adjusted');
    return true;
}

function applyA4LandscapeFix() {
    console.log('🚀 Applying complete A4 landscape fix...');
    
    const canvasFixed = fixCanvasDimensions();
    const scaleFixed = adjustDisplayScale();
    
    if (canvasFixed && scaleFixed) {
        console.log('🎉 A4 landscape fix applied successfully!');
        console.log('📏 Certificate should now display at proper A4 landscape size');
        return true;
    } else {
        console.log('❌ Some issues occurred during fix');
        return false;
    }
}

// Auto-apply fix when script loads
if (typeof window !== 'undefined') {
    window.applyA4LandscapeFix = applyA4LandscapeFix;
    window.fixCanvasDimensions = fixCanvasDimensions;
    
    // Apply fix after a short delay to ensure DOM is ready
    setTimeout(() => {
        console.log('🔄 Auto-applying A4 landscape fix...');
        applyA4LandscapeFix();
    }, 1000);
}

export { applyA4LandscapeFix, fixCanvasDimensions, A4_LANDSCAPE };
