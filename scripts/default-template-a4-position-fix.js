/**
 * Default Template A4 Position Fix
 * 
 * The default template positions in element-manager.js are designed for old dimensions.
 * This script calculates the correct positions for A4 landscape (3508×2480px).
 */

console.log('🔧 Default Template A4 Position Analysis');
console.log('========================================');

// Original dimensions (approximate, based on old positioning)
const OLD_DIMENSIONS = { width: 1123, height: 794 };
const NEW_DIMENSIONS = { width: 3508, height: 2480 }; // A4 landscape 300 DPI

// Scale factors
const SCALE_X = NEW_DIMENSIONS.width / OLD_DIMENSIONS.width;  // ~3.12
const SCALE_Y = NEW_DIMENSIONS.height / OLD_DIMENSIONS.height; // ~3.12

console.log(`📐 Scale factors: X=${SCALE_X.toFixed(2)}, Y=${SCALE_Y.toFixed(2)}`);

// Original default template positions from element-manager.js
const originalPositions = [
    { element: 'Certificate of', top: 150, left: 371, width: 380 },
    { element: 'Participation', top: 180, left: 321, width: 480 },
    { element: 'This certificate...', top: 300, left: 271, width: 580 },
    { element: "{{ Recipient's Name }}", top: 350, left: 271, width: 580 },
    { element: 'in recognition...', top: 430, left: 271, width: 580 },
    { element: 'Workshop or Event Name', top: 460, left: 271, width: 580 },
    { element: 'held on {{ Date...', top: 490, left: 271, width: 580 },
    { element: 'Logo', top: 50, left: 50, width: 100, height: 100 }
];

// Calculate scaled positions
const scaledPositions = originalPositions.map(item => ({
    element: item.element,
    top: Math.round(item.top * SCALE_Y),
    left: Math.round(item.left * SCALE_X),
    width: Math.round(item.width * SCALE_X),
    height: item.height ? Math.round(item.height * SCALE_Y) : 'auto'
}));

console.log('\n📊 Position Scaling Results:');
console.log('=============================');

originalPositions.forEach((orig, index) => {
    const scaled = scaledPositions[index];
    console.log(`\n${orig.element}:`);
    console.log(`  Original: top=${orig.top}px, left=${orig.left}px, width=${orig.width}px`);
    console.log(`  Scaled:   top=${scaled.top}px, left=${scaled.left}px, width=${scaled.width}px`);
});

// Generate the corrected loadDefaultTemplate function
function generateCorrectedFunction() {
    console.log('\n🔧 Corrected loadDefaultTemplate Function:');
    console.log('==========================================');
    
    const functionCode = `
function loadDefaultTemplate() {
    // Positions scaled for A4 landscape (3508×2480px at 300 DPI)
    createDynamicElement('text', { 
        text: 'Certificate of', 
        top: '${scaledPositions[0].top}px', 
        left: '${scaledPositions[0].left}px', 
        width: '${scaledPositions[0].width}px', 
        height: 'auto', 
        fontFamily: 'Roboto', 
        fontSize: '${Math.round(20 * SCALE_Y)}px', 
        color: 'var(--modern-blue)' 
    });
    
    createDynamicElement('text', { 
        text: 'Participation', 
        top: '${scaledPositions[1].top}px', 
        left: '${scaledPositions[1].left}px', 
        width: '${scaledPositions[1].width}px', 
        height: 'auto', 
        fontFamily: 'Montserrat', 
        fontSize: '${Math.round(56 * SCALE_Y)}px', 
        color: 'var(--modern-dark)', 
        fontWeight: 'bold' 
    });
    
    createDynamicElement('text', { 
        text: 'This certificate is hereby presented to', 
        top: '${scaledPositions[2].top}px', 
        left: '${scaledPositions[2].left}px', 
        width: '${scaledPositions[2].width}px', 
        height: 'auto', 
        fontFamily: 'Roboto', 
        fontSize: '${Math.round(18 * SCALE_Y)}px' 
    });
    
    createDynamicElement('text', { 
        text: "{{ Recipient's Name }}", 
        top: '${scaledPositions[3].top}px', 
        left: '${scaledPositions[3].left}px', 
        width: '${scaledPositions[3].width}px', 
        height: 'auto', 
        fontFamily: 'Montserrat', 
        fontSize: '${Math.round(48 * SCALE_Y)}px', 
        color: 'var(--modern-dark)', 
        fontWeight: 'bold' 
    });
    
    createDynamicElement('text', { 
        text: 'in recognition of their valuable participation in the', 
        top: '${scaledPositions[4].top}px', 
        left: '${scaledPositions[4].left}px', 
        width: '${scaledPositions[4].width}px', 
        height: 'auto', 
        fontFamily: 'Roboto', 
        fontSize: '${Math.round(18 * SCALE_Y)}px' 
    });
    
    createDynamicElement('text', { 
        text: 'Workshop or Event Name', 
        top: '${scaledPositions[5].top}px', 
        left: '${scaledPositions[5].left}px', 
        width: '${scaledPositions[5].width}px', 
        height: 'auto', 
        fontFamily: 'Roboto', 
        fontSize: '${Math.round(22 * SCALE_Y)}px', 
        fontWeight: 'bold' 
    });
    
    createDynamicElement('text', { 
        text: 'held on {{ Date of Event }}', 
        top: '${scaledPositions[6].top}px', 
        left: '${scaledPositions[6].left}px', 
        width: '${scaledPositions[6].width}px', 
        height: 'auto', 
        fontFamily: 'Roboto', 
        fontSize: '${Math.round(18 * SCALE_Y)}px' 
    });
    
    createDynamicElement('logo', { 
        text: 'Logo', 
        top: '${scaledPositions[7].top}px', 
        left: '${scaledPositions[7].left}px', 
        width: '${scaledPositions[7].width}px', 
        height: '${scaledPositions[7].height}px' 
    });
}`;
    
    console.log(functionCode);
    return functionCode;
}

// Export data for use in fix script
const fixData = {
    originalPositions,
    scaledPositions,
    scaleFactor: { x: SCALE_X, y: SCALE_Y },
    correctedFunction: generateCorrectedFunction()
};

export { fixData, generateCorrectedFunction };
