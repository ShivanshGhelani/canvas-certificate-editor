/**
 * BUG ANALYSIS: Default Background Canvas Dimensions Issue
 * 
 * Issue Description:
 * The user reports that the default background template was changed and made worse,
 * while the other templates are working perfectly. They want the default template
 * to be reverted back to its original state.
 * 
 * Root Cause Analysis:
 * =====================
 * 
 * 1. CANVAS DIMENSIONS CHANGE:
 *    - BEFORE (backup): width="1123" height="794" (landscape orientation)
 *    - AFTER (current): width="2480" height="3508" (portrait orientation)
 *    
 * 2. CSS DIMENSIONS CHANGE:
 *    - BEFORE: width: 297mm; height: 210mm; (A4 landscape)
 *    - AFTER: width: 210mm; height: 297mm; (A4 portrait)
 * 
 * 3. IMPACT:
 *    - The default background is now drawn in portrait instead of landscape
 *    - The background drawing function in core.js still uses the old logic
 *    - This creates a mismatch between canvas size and drawing area
 * 
 * Files Affected:
 * ===============
 * - src/Canvas.jsx (canvas dimensions changed)
 * - public/js/core.js (drawBackground function unchanged)
 * - Certificate wrapper CSS dimensions changed
 * 
 * Solution:
 * =========
 * 1. Revert canvas dimensions to original landscape format for default
 * 2. Keep the new template system working for other templates
 * 3. Ensure backward compatibility with existing core.js
 */

// Test function to verify canvas dimensions
function testCanvasDimensions() {
  const canvas = document.getElementById('background-canvas');
  if (!canvas) {
    console.error('Canvas not found');
    return;
  }
  
  console.log('Current canvas dimensions:');
  console.log('Width:', canvas.width);
  console.log('Height:', canvas.height);
  console.log('Expected for landscape:', { width: 1123, height: 794 });
  console.log('Current (portrait):', { width: 2480, height: 3508 });
  
  // Check if dimensions match landscape format
  const isLandscape = canvas.width > canvas.height;
  console.log('Is landscape orientation:', isLandscape);
  
  return {
    current: { width: canvas.width, height: canvas.height },
    expected: { width: 1123, height: 794 },
    isCorrect: canvas.width === 1123 && canvas.height === 794
  };
}

// Test function to verify CSS dimensions
function testCSSWrapperDimensions() {
  const wrapper = document.getElementById('certificate-wrapper');
  if (!wrapper) {
    console.error('Certificate wrapper not found');
    return;
  }
  
  const computedStyle = getComputedStyle(wrapper);
  console.log('Current wrapper CSS dimensions:');
  console.log('Width:', computedStyle.width);
  console.log('Height:', computedStyle.height);
  
  return {
    width: computedStyle.width,
    height: computedStyle.height
  };
}

// Fix function to restore default background
function restoreDefaultBackground() {
  console.log('Restoring default background to original landscape format...');
  
  const canvas = document.getElementById('background-canvas');
  const wrapper = document.getElementById('certificate-wrapper');
  
  if (canvas) {
    // Restore original landscape dimensions
    canvas.width = 1123;
    canvas.height = 794;
    console.log('✅ Canvas dimensions restored to landscape');
  }
  
  if (wrapper) {
    // Restore original landscape CSS
    wrapper.style.width = '297mm';
    wrapper.style.height = '210mm';
    console.log('✅ Wrapper dimensions restored to landscape');
  }
  
  // Redraw background with original function
  if (window.drawBackground && typeof window.drawBackground === 'function') {
    window.drawBackground();
    console.log('✅ Background redrawn with original function');
  }
}

// Export functions for testing
if (typeof module !== 'undefined') {
  module.exports = {
    testCanvasDimensions,
    testCSSWrapperDimensions,
    restoreDefaultBackground
  };
}

// Auto-run analysis when script is loaded
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    console.log('🔍 Running default background analysis...');
    setTimeout(() => {
      testCanvasDimensions();
      testCSSWrapperDimensions();
    }, 1000);
  });
}
