/**
 * Quick Canvas Dimension Validation
 * 
 * This script provides immediate validation of canvas dimensions
 * and can be run in browser console for quick testing.
 */

(function() {
    'use strict';
    
    console.log('🔍 Quick Canvas Dimension Check');
    console.log('===============================');
    
    const canvas = document.getElementById('background-canvas');
    if (!canvas) {
        console.error('❌ Canvas element not found');
        return;
    }
    
    const width = canvas.width;
    const height = canvas.height;
    const aspectRatio = (width / height).toFixed(3);
    
    console.log(`📐 Current Canvas Dimensions: ${width} × ${height}`);
    console.log(`📊 Aspect Ratio: ${aspectRatio}`);
    
    // A4 landscape: 3508 × 2480 = 1.414 aspect ratio
    // A4 portrait: 2480 × 3508 = 0.707 aspect ratio
    const A4_LANDSCAPE_RATIO = (3508 / 2480).toFixed(3); // 1.414
    const A4_PORTRAIT_RATIO = (2480 / 3508).toFixed(3);  // 0.707
    
    console.log(`🎯 Expected A4 Landscape: 3508 × 2480 (ratio: ${A4_LANDSCAPE_RATIO})`);
    console.log(`🎯 Expected A4 Portrait: 2480 × 3508 (ratio: ${A4_PORTRAIT_RATIO})`);
    
    // Determine current orientation
    let orientation = 'unknown';
    let isCorrect = false;
    
    if (Math.abs(aspectRatio - A4_LANDSCAPE_RATIO) < 0.001) {
        orientation = 'A4 Landscape';
        isCorrect = width === 3508 && height === 2480;
    } else if (Math.abs(aspectRatio - A4_PORTRAIT_RATIO) < 0.001) {
        orientation = 'A4 Portrait';
        isCorrect = width === 2480 && height === 3508;
    } else {
        orientation = 'Non-A4';
        isCorrect = false;
    }
    
    console.log(`📋 Detected Orientation: ${orientation}`);
    console.log(`✅ Correct A4 Dimensions: ${isCorrect ? 'YES' : 'NO'}`);
    
    if (isCorrect) {
        console.log('🎉 SUCCESS: Canvas has correct A4 dimensions at 300 DPI!');
    } else {
        console.log('⚠️  ISSUE: Canvas dimensions need correction');
        console.log('💡 Expected for A4 landscape: 3508 × 2480');
        console.log('💡 Expected for A4 portrait: 2480 × 3508');
    }
    
    // Check if template is active
    const wrapper = document.getElementById('certificate-wrapper');
    const isTemplateActive = wrapper?.classList.contains('template-active');
    console.log(`🎨 Template Active: ${isTemplateActive ? 'YES' : 'NO'}`);
    
    return {
        width,
        height,
        aspectRatio: parseFloat(aspectRatio),
        orientation,
        isCorrect,
        isTemplateActive
    };
})();
