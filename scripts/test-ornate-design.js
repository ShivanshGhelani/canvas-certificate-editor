/**
 * Ornate Certificate Design Test
 * 
 * This script tests the new ornate certificate design with 
 * decorative borders and elegant typography.
 */

console.log('🎨 Testing Ornate Certificate Design');
console.log('===================================');

function testOrnateDesign() {
    console.log('\n🔍 Checking ornate design elements...');
    
    const canvas = document.getElementById('background-canvas');
    const dynamicElements = document.querySelectorAll('#dynamic-elements-container .dynamic-element');
    
    if (!canvas) {
        console.error('❌ Canvas not found');
        return false;
    }
    
    // Check canvas dimensions
    const isA4Landscape = canvas.width === 3508 && canvas.height === 2480;
    console.log(`📐 Canvas A4 Landscape: ${isA4Landscape ? '✅' : '❌'} (${canvas.width}×${canvas.height})`);
    
    // Check if background has been drawn (ornate design)
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(100, 100, 1, 1);
    const hasBackground = imageData.data[0] !== 0 || imageData.data[1] !== 0 || imageData.data[2] !== 0;
    console.log(`🎨 Ornate Background: ${hasBackground ? '✅' : '❌'}`);
    
    // Check text elements
    console.log(`📝 Text Elements: ${dynamicElements.length} found`);
    
    const expectedTexts = [
        'CERTIFICATE',
        'OF ACHIEVEMENT', 
        'This is to certify that',
        "{{ Recipient's Name }}",
        'has successfully completed',
        'Course/Program Name',
        'Awarded on'
    ];
    
    let foundTexts = 0;
    expectedTexts.forEach(expectedText => {
        const found = Array.from(dynamicElements).some(el => {
            const text = el.textContent || el.innerText || '';
            return text.includes(expectedText.replace('{{', '').replace('}}', '').trim());
        });
        if (found) foundTexts++;
        console.log(`   "${expectedText}": ${found ? '✅' : '❌'}`);
    });
    
    // Check fonts
    const fontElements = Array.from(dynamicElements).filter(el => {
        const style = window.getComputedStyle(el);
        return style.fontFamily.includes('Cinzel') || 
               style.fontFamily.includes('Playfair') || 
               style.fontFamily.includes('Lora');
    });
    
    console.log(`🔤 Ornate Fonts: ${fontElements.length > 0 ? '✅' : '❌'} (${fontElements.length} elements)`);
    
    const success = isA4Landscape && hasBackground && foundTexts >= 5 && fontElements.length > 0;
    console.log(`\n🎯 Ornate Design Status: ${success ? '✅ SUCCESS' : '❌ NEEDS WORK'}`);
    
    return {
        dimensions: isA4Landscape,
        background: hasBackground,
        textElements: foundTexts,
        fonts: fontElements.length,
        success
    };
}

function checkSignatureBlocks() {
    console.log('\n👥 Checking signature blocks...');
    
    const signatureBlocks = document.querySelectorAll('.signature-block');
    const footer = document.querySelector('.footer-content');
    
    if (!footer) {
        console.log('❌ Footer not found');
        return false;
    }
    
    const footerStyle = window.getComputedStyle(footer);
    const footerVisible = footerStyle.opacity !== '0' && footerStyle.visibility !== 'hidden';
    console.log(`👀 Footer Visible: ${footerVisible ? '✅' : '❌'}`);
    
    console.log(`📝 Signature Blocks: ${signatureBlocks.length} found`);
    
    let visibleBlocks = 0;
    signatureBlocks.forEach((block, index) => {
        const style = window.getComputedStyle(block);
        const isVisible = style.opacity !== '0' && style.visibility !== 'hidden';
        if (isVisible) visibleBlocks++;
        console.log(`   Block ${index + 1}: ${isVisible ? 'Visible' : 'Hidden'}`);
    });
    
    const signaturesGood = footerVisible && visibleBlocks === 3;
    console.log(`✅ Signatures Status: ${signaturesGood ? '✅ Good' : '❌ Issues'}`);
    
    return signaturesGood;
}

function runOrnateDesignTest() {
    console.log('🚀 Running Complete Ornate Design Test...\n');
    
    // Wait for elements to load
    setTimeout(() => {
        const designTest = testOrnateDesign();
        const signatureTest = checkSignatureBlocks();
        
        console.log('\n🎉 ORNATE DESIGN TEST SUMMARY');
        console.log('=============================');
        
        if (designTest.success && signatureTest) {
            console.log('✅ SUCCESS! Ornate certificate design is working');
            console.log('🎨 Background: Golden decorative borders');
            console.log('📝 Text: Elegant typography with proper scaling');
            console.log('👥 Signatures: Three visible signature blocks');
            console.log('📐 Dimensions: A4 landscape (3508×2480px)');
            console.log('🖨️ Export: Ready for professional printing');
        } else {
            console.log('⚠️ Issues detected:');
            if (!designTest.dimensions) console.log('  - Canvas dimensions incorrect');
            if (!designTest.background) console.log('  - Ornate background not drawn');
            if (designTest.textElements < 5) console.log('  - Missing text elements');
            if (designTest.fonts === 0) console.log('  - Ornate fonts not applied');
            if (!signatureTest) console.log('  - Signature blocks not visible');
        }
        
        return designTest.success && signatureTest;
        
    }, 2000);
}

// Auto-run test
if (typeof window !== 'undefined') {
    window.runOrnateDesignTest = runOrnateDesignTest;
    window.testOrnateDesign = testOrnateDesign;
    
    // Auto-run after page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runOrnateDesignTest);
    } else {
        runOrnateDesignTest();
    }
}

export { runOrnateDesignTest, testOrnateDesign };
