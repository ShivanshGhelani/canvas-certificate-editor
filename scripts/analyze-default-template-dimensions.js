/**
 * Default Template Dimension Analysis
 * 
 * This script analyzes why the default template dimensions might not be
 * showing as the expected A4 landscape (3508×2480px at 300 DPI).
 */

console.log('🔍 Default Template Dimension Analysis');
console.log('=====================================');

function analyzeDefaultState() {
    console.log('\n📋 Analyzing Default Template State...');
    
    const canvas = document.getElementById('background-canvas');
    const wrapper = document.getElementById('certificate-wrapper');
    
    if (!canvas || !wrapper) {
        console.error('❌ Required elements not found');
        return;
    }
    
    // Check canvas dimensions
    console.log(`🎨 Canvas Element Dimensions: ${canvas.width}×${canvas.height}`);
    console.log(`📐 Canvas Attribute Dimensions: ${canvas.getAttribute('width')}×${canvas.getAttribute('height')}`);
    
    // Check wrapper dimensions
    const wrapperStyle = window.getComputedStyle(wrapper);
    console.log(`📦 Wrapper CSS Dimensions: ${wrapperStyle.width} × ${wrapperStyle.height}`);
    console.log(`📊 Wrapper Offset Dimensions: ${wrapper.offsetWidth}×${wrapper.offsetHeight}`);
    
    // Check if template is active
    const isTemplateActive = wrapper.classList.contains('template-active');
    console.log(`🎭 Template Active: ${isTemplateActive}`);
    
    // Expected A4 landscape dimensions
    const expectedWidth = 3508;
    const expectedHeight = 2480;
    
    console.log(`🎯 Expected Default: ${expectedWidth}×${expectedHeight}`);
    
    // Check if dimensions match
    const dimensionsCorrect = canvas.width === expectedWidth && canvas.height === expectedHeight;
    console.log(`✅ Dimensions Correct: ${dimensionsCorrect}`);
    
    if (!dimensionsCorrect) {
        console.log('🔧 ISSUE: Default dimensions not matching A4 landscape');
        console.log(`   Current: ${canvas.width}×${canvas.height}`);
        console.log(`   Expected: ${expectedWidth}×${expectedHeight}`);
        
        // Try to fix dimensions
        console.log('🛠️ Attempting to fix dimensions...');
        canvas.width = expectedWidth;
        canvas.height = expectedHeight;
        
        // Redraw background if available
        if (typeof window.drawBackground === 'function') {
            window.drawBackground();
            console.log('🎨 Background redrawn with correct dimensions');
        }
        
        console.log(`✅ Fixed dimensions: ${canvas.width}×${canvas.height}`);
    }
    
    // Check CSS wrapper orientation
    const wrapperWidth = parseFloat(wrapperStyle.width);
    const wrapperHeight = parseFloat(wrapperStyle.height);
    const isLandscape = wrapperWidth > wrapperHeight;
    
    console.log(`📐 Wrapper Orientation: ${isLandscape ? 'Landscape' : 'Portrait'}`);
    
    return {
        canvasWidth: canvas.width,
        canvasHeight: canvas.height,
        wrapperWidth,
        wrapperHeight,
        isTemplateActive,
        dimensionsCorrect,
        isLandscape
    };
}

function checkInitialLoad() {
    console.log('\n🚀 Checking Initial Load State...');
    
    // Wait for initial render
    setTimeout(() => {
        const result = analyzeDefaultState();
        
        if (!result.dimensionsCorrect) {
            console.log('⚠️ Default template dimensions need correction');
            console.log('💡 This might be due to initialization order');
            
            // Try to trigger the correct default setup
            const canvas = document.getElementById('background-canvas');
            if (canvas) {
                canvas.width = 3508;
                canvas.height = 2480;
                
                if (typeof window.drawBackground === 'function') {
                    window.drawBackground();
                }
                
                console.log('🔄 Attempted to restore A4 landscape dimensions');
            }
        }
    }, 500);
}

// Function to manually fix default dimensions
function fixDefaultDimensions() {
    console.log('🔧 Manually Fixing Default Dimensions...');
    
    const canvas = document.getElementById('background-canvas');
    const wrapper = document.getElementById('certificate-wrapper');
    
    if (!canvas || !wrapper) {
        console.error('❌ Elements not found');
        return false;
    }
    
    // Ensure we're in default state (not template-active)
    wrapper.classList.remove('template-active');
    
    // Set A4 landscape dimensions
    canvas.width = 3508;  // A4 landscape width at 300 DPI
    canvas.height = 2480; // A4 landscape height at 300 DPI
    
    console.log(`✅ Set canvas to: ${canvas.width}×${canvas.height}`);
    
    // Redraw background
    if (typeof window.drawBackground === 'function') {
        window.drawBackground();
        console.log('🎨 Background redrawn');
    }
    
    // Verify the fix
    const isCorrect = canvas.width === 3508 && canvas.height === 2480;
    console.log(`🎯 Fix successful: ${isCorrect}`);
    
    return isCorrect;
}

// Auto-run analysis
if (typeof window !== 'undefined') {
    window.analyzeDefaultState = analyzeDefaultState;
    window.fixDefaultDimensions = fixDefaultDimensions;
    
    // Run initial check
    checkInitialLoad();
}

export { analyzeDefaultState, fixDefaultDimensions };
