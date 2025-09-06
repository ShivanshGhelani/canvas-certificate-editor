/**
 * Canvas Dimension Bug Test
 * 
 * This script tests the canvas dimension override issue in core.js
 * and verifies the fix maintains A4 300 DPI dimensions.
 */

// Test configuration
const expectedDimensions = {
    landscape: { width: 3508, height: 2480 }, // A4 landscape 300 DPI
    portrait: { width: 2480, height: 3508 }   // A4 portrait 300 DPI
};

/**
 * Test 1: Check initial canvas dimensions
 */
function testInitialDimensions() {
    console.log('=== TEST 1: Initial Canvas Dimensions ===');
    
    const canvas = document.getElementById('background-canvas');
    if (!canvas) {
        console.error('❌ Canvas element not found');
        return false;
    }
    
    console.log(`Canvas dimensions: ${canvas.width}×${canvas.height}`);
    console.log(`Expected landscape: ${expectedDimensions.landscape.width}×${expectedDimensions.landscape.height}`);
    
    const isCorrect = canvas.width === expectedDimensions.landscape.width && 
                     canvas.height === expectedDimensions.landscape.height;
    
    console.log(isCorrect ? '✅ Initial dimensions correct' : '❌ Initial dimensions incorrect');
    return isCorrect;
}

/**
 * Test 2: Check dimensions after drawBackground() call
 */
function testAfterDrawBackground() {
    console.log('\n=== TEST 2: Dimensions After drawBackground() ===');
    
    const canvas = document.getElementById('background-canvas');
    const wrapper = document.getElementById('certificate-wrapper');
    
    if (!canvas || !wrapper) {
        console.error('❌ Required elements not found');
        return false;
    }
    
    console.log(`Before drawBackground: ${canvas.width}×${canvas.height}`);
    console.log(`Wrapper size: ${wrapper.offsetWidth}×${wrapper.offsetHeight}`);
    
    // Call drawBackground
    if (typeof window.drawBackground === 'function') {
        window.drawBackground();
    }
    
    console.log(`After drawBackground: ${canvas.width}×${canvas.height}`);
    
    const isCorrect = canvas.width === expectedDimensions.landscape.width && 
                     canvas.height === expectedDimensions.landscape.height;
    
    console.log(isCorrect ? '✅ Dimensions preserved' : '❌ Dimensions were overridden');
    return isCorrect;
}

/**
 * Test 3: Check template switching dimensions
 */
function testTemplateSwitching() {
    console.log('\n=== TEST 3: Template Switching Dimensions ===');
    
    const canvas = document.getElementById('background-canvas');
    if (!canvas) {
        console.error('❌ Canvas element not found');
        return false;
    }
    
    // Simulate template loading (portrait)
    canvas.width = expectedDimensions.portrait.width;
    canvas.height = expectedDimensions.portrait.height;
    console.log(`Set to portrait: ${canvas.width}×${canvas.height}`);
    
    // Call drawBackground
    if (typeof window.drawBackground === 'function') {
        window.drawBackground();
    }
    
    console.log(`After drawBackground: ${canvas.width}×${canvas.height}`);
    
    const isCorrect = canvas.width === expectedDimensions.portrait.width && 
                     canvas.height === expectedDimensions.portrait.height;
    
    console.log(isCorrect ? '✅ Portrait dimensions preserved' : '❌ Portrait dimensions were overridden');
    
    // Reset to landscape
    canvas.width = expectedDimensions.landscape.width;
    canvas.height = expectedDimensions.landscape.height;
    
    return isCorrect;
}

/**
 * Test 4: Check wrapper CSS vs canvas dimensions
 */
function testWrapperVsCanvas() {
    console.log('\n=== TEST 4: Wrapper CSS vs Canvas Dimensions ===');
    
    const canvas = document.getElementById('background-canvas');
    const wrapper = document.getElementById('certificate-wrapper');
    
    if (!canvas || !wrapper) {
        console.error('❌ Required elements not found');
        return false;
    }
    
    const wrapperStyle = window.getComputedStyle(wrapper);
    console.log(`Wrapper CSS: ${wrapperStyle.width} × ${wrapperStyle.height}`);
    console.log(`Wrapper offset: ${wrapper.offsetWidth}px × ${wrapper.offsetHeight}px`);
    console.log(`Canvas dimensions: ${canvas.width}px × ${canvas.height}px`);
    
    // Check if they match (which would indicate the bug)
    const dimensionsMatch = canvas.width === wrapper.offsetWidth && 
                           canvas.height === wrapper.offsetHeight;
    
    if (dimensionsMatch) {
        console.log('❌ BUG CONFIRMED: Canvas dimensions match wrapper size (should be independent)');
        return false;
    } else {
        console.log('✅ Canvas dimensions are independent of wrapper size');
        return true;
    }
}

/**
 * Run all tests
 */
function runAllTests() {
    console.log('🧪 Canvas Dimension Bug Test Suite');
    console.log('=====================================');
    
    const results = {
        test1: testInitialDimensions(),
        test2: testAfterDrawBackground(),
        test3: testTemplateSwitching(),
        test4: testWrapperVsCanvas()
    };
    
    console.log('\n📊 TEST SUMMARY');
    console.log('================');
    Object.entries(results).forEach(([test, passed]) => {
        console.log(`${test}: ${passed ? '✅ PASS' : '❌ FAIL'}`);
    });
    
    const allPassed = Object.values(results).every(Boolean);
    console.log(`\nOverall: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
    
    if (!allPassed) {
        console.log('\n🔧 RECOMMENDED ACTIONS:');
        console.log('1. Fix core.js drawBackground() function');
        console.log('2. Remove canvas dimension override');
        console.log('3. Preserve A4 300 DPI dimensions');
    }
    
    return results;
}

// Auto-run tests when script loads
if (typeof window !== 'undefined') {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runAllTests);
    } else {
        runAllTests();
    }
}

// Export for manual testing
window.testCanvasDimensions = runAllTests;
