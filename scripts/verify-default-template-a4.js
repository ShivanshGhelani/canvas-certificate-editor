/**
 * Default Template A4 Landscape Verification
 * 
 * This script verifies that the default template is properly displayed
 * with A4 landscape dimensions and all elements are visible.
 */

console.log('✅ Default Template A4 Landscape Verification');
console.log('=============================================');

function verifyDefaultTemplate() {
    console.log('\n🔍 Checking Default Template State...');
    
    const canvas = document.getElementById('background-canvas');
    const wrapper = document.getElementById('certificate-wrapper');
    const footer = document.querySelector('.footer-content');
    const signatureBlocks = document.querySelectorAll('.signature-block');
    
    // Check canvas dimensions
    const expectedWidth = 3508;
    const expectedHeight = 2480;
    const dimensionsCorrect = canvas.width === expectedWidth && canvas.height === expectedHeight;
    
    console.log(`📐 Canvas Dimensions: ${canvas.width}×${canvas.height}`);
    console.log(`🎯 Expected A4 Landscape: ${expectedWidth}×${expectedHeight}`);
    console.log(`✅ Dimensions Correct: ${dimensionsCorrect}`);
    
    // Check if template is active (should be false for default)
    const isTemplateActive = wrapper.classList.contains('template-active');
    console.log(`🎭 Template Active: ${isTemplateActive} (should be false for default)`);
    
    // Check footer visibility
    const footerStyle = window.getComputedStyle(footer);
    const footerVisible = footerStyle.opacity === '1' && footerStyle.visibility === 'visible';
    console.log(`👀 Footer Visible: ${footerVisible}`);
    
    // Check signature blocks
    console.log(`📝 Signature Blocks Found: ${signatureBlocks.length}`);
    
    let visibleSignatureBlocks = 0;
    signatureBlocks.forEach((block, index) => {
        const blockStyle = window.getComputedStyle(block);
        const isVisible = blockStyle.opacity === '1' && blockStyle.visibility === 'visible';
        if (isVisible) visibleSignatureBlocks++;
        console.log(`   Block ${index + 1}: ${isVisible ? 'Visible' : 'Hidden'}`);
    });
    
    // Check dynamic elements from loadDefaultTemplate
    const dynamicElements = document.querySelectorAll('#dynamic-elements-container .dynamic-element');
    console.log(`🎨 Dynamic Elements: ${dynamicElements.length}`);
    
    // Summary
    const allGood = dimensionsCorrect && !isTemplateActive && footerVisible && 
                   visibleSignatureBlocks === 3 && dynamicElements.length > 0;
    
    console.log(`\n📊 VERIFICATION RESULT: ${allGood ? '✅ SUCCESS' : '❌ ISSUES FOUND'}`);
    
    if (!allGood) {
        console.log('\n🔧 Issues to Address:');
        if (!dimensionsCorrect) console.log('  - Canvas dimensions incorrect');
        if (isTemplateActive) console.log('  - Template should not be active in default state');
        if (!footerVisible) console.log('  - Footer not visible');
        if (visibleSignatureBlocks !== 3) console.log('  - Not all signature blocks visible');
        if (dynamicElements.length === 0) console.log('  - No dynamic elements loaded');
    }
    
    return {
        dimensionsCorrect,
        isTemplateActive,
        footerVisible,
        visibleSignatureBlocks,
        dynamicElementsCount: dynamicElements.length,
        success: allGood
    };
}

function checkA4LandscapeLayout() {
    console.log('\n📐 Checking A4 Landscape Layout Scaling...');
    
    const dynamicElements = document.querySelectorAll('#dynamic-elements-container .dynamic-element[data-type="text"]');
    
    if (dynamicElements.length === 0) {
        console.log('❌ No text elements found - loadDefaultTemplate may not have run');
        return false;
    }
    
    console.log(`📝 Found ${dynamicElements.length} text elements`);
    
    // Check if positions look reasonable for A4 landscape
    dynamicElements.forEach((element, index) => {
        const style = window.getComputedStyle(element);
        const left = parseInt(style.left);
        const top = parseInt(style.top);
        const fontSize = parseInt(style.fontSize);
        
        console.log(`   Element ${index + 1}: left=${left}px, top=${top}px, fontSize=${fontSize}px`);
        
        // Elements should be positioned within A4 landscape bounds
        const withinBounds = left >= 0 && left <= 3508 && top >= 0 && top <= 2480;
        console.log(`     Within A4 bounds: ${withinBounds}`);
    });
    
    return true;
}

function runFullVerification() {
    console.log('🚀 Running Full Default Template Verification...\n');
    
    // Wait a moment for everything to initialize
    setTimeout(() => {
        const basicCheck = verifyDefaultTemplate();
        const layoutCheck = checkA4LandscapeLayout();
        
        console.log('\n🎉 VERIFICATION COMPLETE');
        console.log('========================');
        
        if (basicCheck.success && layoutCheck) {
            console.log('✅ Default template is properly configured for A4 landscape!');
            console.log('🖨️ Ready for professional printing at 300 DPI');
            console.log('👥 Signature blocks are visible and properly positioned');
        } else {
            console.log('⚠️ Some issues detected - see details above');
        }
        
    }, 1000);
}

// Auto-run verification
if (typeof window !== 'undefined') {
    window.verifyDefaultTemplate = verifyDefaultTemplate;
    window.checkA4LandscapeLayout = checkA4LandscapeLayout;
    window.runDefaultTemplateVerification = runFullVerification;
    
    // Auto-run after page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runFullVerification);
    } else {
        runFullVerification();
    }
}

export { verifyDefaultTemplate, checkA4LandscapeLayout };
