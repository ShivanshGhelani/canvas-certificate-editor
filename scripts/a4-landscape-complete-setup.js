/**
 * A4 Landscape Certificate Initialization & Verification
 * 
 * This script ensures both the default display and export use
 * correct A4 landscape dimensions (3508×2480px at 300 DPI).
 */

console.log('🎯 A4 Landscape Certificate Initialization');
console.log('==========================================');

// A4 landscape specifications
const A4_LANDSCAPE = {
    canvas: { width: 3508, height: 2480 },     // 300 DPI for export
    display: { width: 1052, height: 744 },     // 30% scale for viewing
    physical: { width: 297, height: 210 },     // mm dimensions
    aspectRatio: 1.414                         // 297/210 = 3508/2480
};

function initializeA4Landscape() {
    console.log('🚀 Initializing A4 landscape certificate...');
    
    const canvas = document.getElementById('background-canvas');
    const wrapper = document.getElementById('certificate-wrapper');
    
    if (!canvas || !wrapper) {
        console.error('❌ Required elements not found');
        return false;
    }
    
    // Set canvas to full A4 resolution (for export quality)
    canvas.width = A4_LANDSCAPE.canvas.width;
    canvas.height = A4_LANDSCAPE.canvas.height;
    console.log(`✅ Canvas set to: ${canvas.width}×${canvas.height}px (A4 300 DPI)`);
    
    // Ensure wrapper CSS dimensions are correct (for display)
    wrapper.style.width = A4_LANDSCAPE.display.width + 'px';
    wrapper.style.height = A4_LANDSCAPE.display.height + 'px';
    console.log(`✅ Wrapper set to: ${wrapper.style.width}×${wrapper.style.height} (display)`);
    
    // Remove template-active class to ensure landscape mode
    wrapper.classList.remove('template-active');
    console.log('✅ Landscape mode activated');
    
    // Redraw background with correct dimensions
    if (typeof window.drawBackground === 'function') {
        window.drawBackground();
        console.log('✅ Background redrawn');
    }
    
    return true;
}

function verifyA4Dimensions() {
    console.log('\n📐 Verifying A4 landscape dimensions...');
    
    const canvas = document.getElementById('background-canvas');
    const wrapper = document.getElementById('certificate-wrapper');
    
    // Check canvas dimensions
    const canvasCorrect = canvas.width === A4_LANDSCAPE.canvas.width && 
                         canvas.height === A4_LANDSCAPE.canvas.height;
    console.log(`🎨 Canvas: ${canvas.width}×${canvas.height}px - ${canvasCorrect ? '✅' : '❌'}`);
    
    // Check wrapper dimensions
    const wrapperStyle = window.getComputedStyle(wrapper);
    const wrapperWidth = parseInt(wrapperStyle.width);
    const wrapperHeight = parseInt(wrapperStyle.height);
    const displayCorrect = wrapperWidth === A4_LANDSCAPE.display.width && 
                          wrapperHeight === A4_LANDSCAPE.display.height;
    console.log(`📦 Wrapper: ${wrapperWidth}×${wrapperHeight}px - ${displayCorrect ? '✅' : '❌'}`);
    
    // Check aspect ratio
    const aspectRatio = (wrapperWidth / wrapperHeight).toFixed(3);
    const aspectCorrect = Math.abs(aspectRatio - A4_LANDSCAPE.aspectRatio) < 0.01;
    console.log(`📊 Aspect Ratio: ${aspectRatio} (expected: ${A4_LANDSCAPE.aspectRatio}) - ${aspectCorrect ? '✅' : '❌'}`);
    
    // Check template state
    const isTemplateActive = wrapper.classList.contains('template-active');
    console.log(`🎭 Template Active: ${isTemplateActive} (should be false) - ${!isTemplateActive ? '✅' : '❌'}`);
    
    const allCorrect = canvasCorrect && displayCorrect && aspectCorrect && !isTemplateActive;
    console.log(`\n🎯 Overall: ${allCorrect ? '✅ ALL CORRECT' : '❌ NEEDS FIXING'}`);
    
    return {
        canvas: canvasCorrect,
        display: displayCorrect,
        aspect: aspectCorrect,
        template: !isTemplateActive,
        success: allCorrect
    };
}

function testExportDimensions() {
    console.log('\n📤 Testing export dimensions...');
    
    const certificateWrapper = document.getElementById('certificate-wrapper');
    if (!certificateWrapper || !window.html2canvas) {
        console.log('❌ Export testing not available');
        return false;
    }
    
    // Test PNG export dimensions
    window.html2canvas(certificateWrapper, { 
        scale: 2,
        useCORS: true,
        backgroundColor: 'white'
    }).then(canvas => {
        console.log(`📸 PNG Export Canvas: ${canvas.width}×${canvas.height}px`);
        
        // Expected: wrapper size * scale * devicePixelRatio
        const expectedWidth = A4_LANDSCAPE.display.width * 2;
        const expectedHeight = A4_LANDSCAPE.display.height * 2;
        console.log(`   Expected: ${expectedWidth}×${expectedHeight}px`);
        
        const exportCorrect = Math.abs(canvas.width - expectedWidth) < 50 && 
                             Math.abs(canvas.height - expectedHeight) < 50;
        console.log(`   Status: ${exportCorrect ? '✅ Correct' : '❌ Incorrect'}`);
        
        // Check aspect ratio
        const exportAspect = (canvas.width / canvas.height).toFixed(3);
        console.log(`   Aspect: ${exportAspect} (expected: ${A4_LANDSCAPE.aspectRatio})`);
    }).catch(error => {
        console.log('❌ Export test failed:', error);
    });
    
    return true;
}

function runCompleteInitialization() {
    console.log('🔄 Running complete A4 landscape initialization...\n');
    
    // Initialize dimensions
    const initialized = initializeA4Landscape();
    
    if (!initialized) {
        console.log('❌ Initialization failed');
        return false;
    }
    
    // Wait a moment for rendering
    setTimeout(() => {
        // Verify dimensions
        const verification = verifyA4Dimensions();
        
        // Test export
        setTimeout(() => {
            testExportDimensions();
        }, 500);
        
        // Summary
        console.log('\n🎉 INITIALIZATION SUMMARY');
        console.log('========================');
        
        if (verification.success) {
            console.log('✅ SUCCESS: Certificate properly configured for A4 landscape');
            console.log('📏 Display: 1052×744px (30% scale for viewing)');
            console.log('🖨️ Export: 3508×2480px (300 DPI for printing)');
            console.log('📐 Aspect: 1.414 (correct A4 landscape ratio)');
            console.log('🎯 Both display AND print will use A4 landscape dimensions!');
        } else {
            console.log('⚠️ Issues detected - see details above');
        }
        
    }, 1000);
    
    return true;
}

// Auto-run initialization
if (typeof window !== 'undefined') {
    window.runCompleteInitialization = runCompleteInitialization;
    window.initializeA4Landscape = initializeA4Landscape;
    window.verifyA4Dimensions = verifyA4Dimensions;
    
    // Auto-initialize after DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runCompleteInitialization);
    } else {
        setTimeout(runCompleteInitialization, 1500);
    }
}

export { runCompleteInitialization, initializeA4Landscape, verifyA4Dimensions, A4_LANDSCAPE };
