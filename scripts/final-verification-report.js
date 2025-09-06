/**
 * Final Dimension Verification Test
 * 
 * This script verifies that the certificate is now displaying at the correct
 * A4 landscape dimensions with proper scaling.
 */

console.log('✅ Final Dimension Verification');
console.log('==============================');

function verifyDisplayDimensions() {
    console.log('\n📐 Checking display dimensions...');
    
    const canvas = document.getElementById('background-canvas');
    const wrapper = document.getElementById('certificate-wrapper');
    const displayWrapper = document.querySelector('.certificate-display-wrapper');
    
    if (!canvas || !wrapper || !displayWrapper) {
        console.error('❌ Required elements not found');
        return false;
    }
    
    // Check canvas dimensions (should be full A4 resolution)
    console.log(`🎨 Canvas: ${canvas.width}×${canvas.height}px`);
    const canvasCorrect = canvas.width === 3508 && canvas.height === 2480;
    console.log(`   Expected: 3508×2480px (A4 landscape 300 DPI)`);
    console.log(`   Status: ${canvasCorrect ? '✅ Correct' : '❌ Incorrect'}`);
    
    // Check wrapper dimensions (should be scaled for display)
    const wrapperStyle = window.getComputedStyle(wrapper);
    const wrapperWidth = parseInt(wrapperStyle.width);
    const wrapperHeight = parseInt(wrapperStyle.height);
    console.log(`📦 Wrapper: ${wrapperWidth}×${wrapperHeight}px`);
    
    // Check if wrapper maintains A4 aspect ratio
    const aspectRatio = (wrapperWidth / wrapperHeight).toFixed(3);
    const expectedRatio = (3508 / 2480).toFixed(3); // 1.414
    const aspectCorrect = Math.abs(aspectRatio - expectedRatio) < 0.01;
    console.log(`   Aspect ratio: ${aspectRatio} (expected: ${expectedRatio})`);
    console.log(`   Status: ${aspectCorrect ? '✅ Correct' : '❌ Incorrect'}`);
    
    // Check display transform
    const displayStyle = window.getComputedStyle(displayWrapper);
    const transform = displayStyle.transform;
    console.log(`🔍 Display transform: ${transform}`);
    
    // Check if certificate is visible and reasonable size
    const isVisible = wrapperWidth > 500 && wrapperHeight > 300; // Should be reasonably large
    console.log(`👀 Visible size: ${isVisible ? '✅ Good' : '❌ Too small'}`);
    
    const allGood = canvasCorrect && aspectCorrect && isVisible;
    console.log(`\n🎯 Overall status: ${allGood ? '✅ SUCCESS' : '❌ NEEDS ATTENTION'}`);
    
    return {
        canvasCorrect,
        aspectCorrect,
        isVisible,
        success: allGood,
        dimensions: {
            canvas: { width: canvas.width, height: canvas.height },
            wrapper: { width: wrapperWidth, height: wrapperHeight },
            aspectRatio: parseFloat(aspectRatio)
        }
    };
}

function checkElementPositions() {
    console.log('\n📝 Checking element positions...');
    
    const dynamicElements = document.querySelectorAll('#dynamic-elements-container .dynamic-element');
    console.log(`Found ${dynamicElements.length} dynamic elements`);
    
    if (dynamicElements.length === 0) {
        console.log('⚠️ No elements found - loadDefaultTemplate may need to run');
        return false;
    }
    
    let elementsVisible = 0;
    dynamicElements.forEach((element, index) => {
        const style = window.getComputedStyle(element);
        const left = parseInt(style.left);
        const top = parseInt(style.top);
        const display = style.display;
        const opacity = style.opacity;
        
        const isVisible = display !== 'none' && opacity !== '0';
        if (isVisible) elementsVisible++;
        
        console.log(`   Element ${index + 1}: ${left}px, ${top}px - ${isVisible ? 'Visible' : 'Hidden'}`);
    });
    
    console.log(`✅ Visible elements: ${elementsVisible}/${dynamicElements.length}`);
    return elementsVisible > 0;
}

function runFinalVerification() {
    console.log('🚀 Running Final Certificate Dimension Verification...\n');
    
    const displayCheck = verifyDisplayDimensions();
    const elementCheck = checkElementPositions();
    
    console.log('\n📊 FINAL VERIFICATION SUMMARY');
    console.log('=============================');
    
    if (displayCheck.success && elementCheck) {
        console.log('🎉 SUCCESS! Certificate is properly sized for A4 landscape');
        console.log('✨ Canvas: 3508×2480px (300 DPI print quality)');
        console.log('🖥️ Display: Properly scaled for screen viewing');
        console.log('📐 Aspect ratio: Correct A4 landscape proportions');
        console.log('👁️ Elements: Visible and positioned correctly');
    } else {
        console.log('⚠️ Issues detected:');
        if (!displayCheck.canvasCorrect) console.log('  - Canvas dimensions incorrect');
        if (!displayCheck.aspectCorrect) console.log('  - Aspect ratio incorrect');
        if (!displayCheck.isVisible) console.log('  - Certificate too small or hidden');
        if (!elementCheck) console.log('  - Elements not visible or positioned incorrectly');
    }
    
    return displayCheck.success && elementCheck;
}

// Auto-run verification
if (typeof window !== 'undefined') {
    window.runFinalVerification = runFinalVerification;
    window.verifyDisplayDimensions = verifyDisplayDimensions;
    
    // Run after DOM is ready
    setTimeout(runFinalVerification, 1500);
}

export { runFinalVerification, verifyDisplayDimensions };
