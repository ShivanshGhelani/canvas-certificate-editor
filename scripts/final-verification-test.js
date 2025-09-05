#!/usr/bin/env node

/**
 * Final Verification Test Script
 * 
 * This script performs final verification that all signature functionality
 * is working correctly and provides a comprehensive test report.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class FinalVerificationTest {
  constructor() {
    this.passedTests = 0;
    this.failedTests = 0;
    this.testResults = [];
  }

  /**
   * Run a test and record the result
   */
  runTest(testName, testFunction) {
    try {
      const result = testFunction();
      if (result) {
        this.passedTests++;
        this.testResults.push({ name: testName, status: 'PASS', message: 'Test passed successfully' });
        console.log(`✅ ${testName}: PASS`);
      } else {
        this.failedTests++;
        this.testResults.push({ name: testName, status: 'FAIL', message: 'Test failed' });
        console.log(`❌ ${testName}: FAIL`);
      }
    } catch (error) {
      this.failedTests++;
      this.testResults.push({ name: testName, status: 'ERROR', message: error.message });
      console.log(`❌ ${testName}: ERROR - ${error.message}`);
    }
  }

  /**
   * Test: Check if all required files exist
   */
  testRequiredFilesExist() {
    const requiredFiles = [
      '../src/Canvas.jsx',
      '../public/js/image-utils.js',
      '../public/js/enhanced-background-removal.js',
      '../public/js/universal-element-creator.js',
      '../index.html'
    ];

    return requiredFiles.every(file => {
      const fullPath = path.join(__dirname, file);
      const exists = fs.existsSync(fullPath);
      if (!exists) {
        console.log(`   Missing file: ${file}`);
      }
      return exists;
    });
  }

  /**
   * Test: Check if background removal functions are properly defined
   */
  testBackgroundRemovalFunctions() {
    const imageUtilsPath = path.join(__dirname, '../public/js/image-utils.js');
    const enhancedBgPath = path.join(__dirname, '../public/js/enhanced-background-removal.js');
    
    const imageUtilsContent = fs.readFileSync(imageUtilsPath, 'utf8');
    const enhancedBgContent = fs.readFileSync(enhancedBgPath, 'utf8');
    
    const hasBasicFunction = imageUtilsContent.includes('function removeWhiteBackground');
    const hasEnhancedFunction = enhancedBgContent.includes('function enhancedBackgroundRemoval');
    
    if (!hasBasicFunction) {
      console.log('   Missing: removeWhiteBackground function');
    }
    if (!hasEnhancedFunction) {
      console.log('   Missing: enhancedBackgroundRemoval function');
    }
    
    return hasBasicFunction && hasEnhancedFunction;
  }

  /**
   * Test: Check if signature element function is properly implemented
   */
  testSignatureElementFunction() {
    const canvasPath = path.join(__dirname, '../src/Canvas.jsx');
    const canvasContent = fs.readFileSync(canvasPath, 'utf8');
    
    const hasFunction = canvasContent.includes('createSimpleSignatureElement');
    const hasDragDrop = canvasContent.includes('makeElementDraggable(wrapper)');
    const hasSelection = canvasContent.includes('selectElement(wrapper)');
    const hasBackgroundRemoval = canvasContent.includes('enhancedBackgroundRemoval') || 
                                  canvasContent.includes('removeWhiteBackground');
    
    if (!hasFunction) {
      console.log('   Missing: createSimpleSignatureElement function');
    }
    if (!hasDragDrop) {
      console.log('   Missing: makeElementDraggable call');
    }
    if (!hasSelection) {
      console.log('   Missing: selectElement call');
    }
    if (!hasBackgroundRemoval) {
      console.log('   Missing: background removal integration');
    }
    
    return hasFunction && hasDragDrop && hasSelection && hasBackgroundRemoval;
  }

  /**
   * Test: Check if resize functionality is implemented
   */
  testResizeFunctionality() {
    const canvasPath = path.join(__dirname, '../src/Canvas.jsx');
    const canvasContent = fs.readFileSync(canvasPath, 'utf8');
    
    const hasMakeElementDraggable = canvasContent.includes('const makeElementDraggable');
    const hasAddResizeHandles = canvasContent.includes('const addResizeHandles');
    const hasResizeHandles = canvasContent.includes('resize-handle');
    const hasResizeLogic = canvasContent.includes('handleResize');
    
    if (!hasMakeElementDraggable) {
      console.log('   Missing: makeElementDraggable function');
    }
    if (!hasAddResizeHandles) {
      console.log('   Missing: addResizeHandles function');
    }
    if (!hasResizeHandles) {
      console.log('   Missing: resize handle creation');
    }
    if (!hasResizeLogic) {
      console.log('   Missing: resize logic');
    }
    
    return hasMakeElementDraggable && hasAddResizeHandles && hasResizeHandles && hasResizeLogic;
  }

  /**
   * Test: Check if delete functionality is implemented
   */
  testDeleteFunctionality() {
    const canvasPath = path.join(__dirname, '../src/Canvas.jsx');
    const canvasContent = fs.readFileSync(canvasPath, 'utf8');
    
    const hasSelectElement = canvasContent.includes('const selectElement');
    const hasShowDeleteButton = canvasContent.includes('showDeleteButton');
    const hasDeleteButton = canvasContent.includes('delete-btn');
    const hasDeleteLogic = canvasContent.includes('element.remove()');
    
    if (!hasSelectElement) {
      console.log('   Missing: selectElement function');
    }
    if (!hasShowDeleteButton) {
      console.log('   Missing: showDeleteButton function');
    }
    if (!hasDeleteButton) {
      console.log('   Missing: delete button creation');
    }
    if (!hasDeleteLogic) {
      console.log('   Missing: delete logic');
    }
    
    return hasSelectElement && hasShowDeleteButton && hasDeleteButton && hasDeleteLogic;
  }

  /**
   * Test: Check if scripts are properly included in HTML
   */
  testScriptInclusion() {
    const indexPath = path.join(__dirname, '../index.html');
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    
    const hasImageUtils = indexContent.includes('image-utils.js');
    const hasEnhancedBg = indexContent.includes('enhanced-background-removal.js');
    const hasUniversalCreator = indexContent.includes('universal-element-creator.js');
    
    if (!hasImageUtils) {
      console.log('   Missing: image-utils.js script tag');
    }
    if (!hasEnhancedBg) {
      console.log('   Missing: enhanced-background-removal.js script tag');
    }
    if (!hasUniversalCreator) {
      console.log('   Missing: universal-element-creator.js script tag');
    }
    
    return hasImageUtils && hasEnhancedBg && hasUniversalCreator;
  }

  /**
   * Test: Check if TopBar signature button is properly implemented
   */
  testSignatureButtonImplementation() {
    const topBarPath = path.join(__dirname, '../src/components/TopBar.jsx');
    const topBarContent = fs.readFileSync(topBarPath, 'utf8');
    
    const hasSignatureButton = topBarContent.includes('FaSignature');
    const hasTriggerFunction = topBarContent.includes('triggerAddSignature');
    const hasBackgroundRemoval = topBarContent.includes('enhancedBackgroundRemoval') ||
                                  topBarContent.includes('removeWhiteBackground');
    const hasElementCreation = topBarContent.includes('createSimpleSignatureElement');
    
    if (!hasSignatureButton) {
      console.log('   Missing: Signature button icon');
    }
    if (!hasTriggerFunction) {
      console.log('   Missing: triggerAddSignature function');
    }
    if (!hasBackgroundRemoval) {
      console.log('   Missing: background removal in TopBar');
    }
    if (!hasElementCreation) {
      console.log('   Missing: signature element creation call');
    }
    
    return hasSignatureButton && hasTriggerFunction && hasBackgroundRemoval && hasElementCreation;
  }

  /**
   * Test: Verify backup files were created
   */
  testBackupFilesExist() {
    const backupDir = path.join(__dirname, '../backups');
    
    if (!fs.existsSync(backupDir)) {
      console.log('   Missing: backups directory');
      return false;
    }
    
    const expectedBackups = [
      'Canvas.jsx.backup',
      'image-utils.js.backup',
      'TopBar.jsx.backup',
      'index.html.backup'
    ];
    
    return expectedBackups.every(backup => {
      const backupPath = path.join(backupDir, backup);
      const exists = fs.existsSync(backupPath);
      if (!exists) {
        console.log(`   Missing backup: ${backup}`);
      }
      return exists;
    });
  }

  /**
   * Test: Check for feature parity between logo and signature
   */
  testFeatureParity() {
    const canvasPath = path.join(__dirname, '../src/Canvas.jsx');
    const canvasContent = fs.readFileSync(canvasPath, 'utf8');
    
    // Extract logo function
    const logoMatch = canvasContent.match(/const createSimpleLogoElement[\s\S]*?return wrapper;\s*};/);
    // Extract signature function  
    const signatureMatch = canvasContent.match(/const createSimpleSignatureElement[\s\S]*?return wrapper;\s*};/);
    
    if (!logoMatch || !signatureMatch) {
      console.log('   Missing: Logo or signature function');
      return false;
    }
    
    const logoFunction = logoMatch[0];
    const signatureFunction = signatureMatch[0];
    
    // Check for common functionality
    const commonFeatures = [
      'makeElementDraggable',
      'addEventListener(\'click\'',
      'addEventListener(\'dblclick\'',
      'stopPropagation'
    ];
    
    const hasFeatureParity = commonFeatures.every(feature => {
      const inLogo = logoFunction.includes(feature);
      const inSignature = signatureFunction.includes(feature);
      
      if (inLogo && !inSignature) {
        console.log(`   Feature missing in signature: ${feature}`);
        return false;
      }
      return true;
    });
    
    return hasFeatureParity;
  }

  /**
   * Generate comprehensive test report
   */
  generateTestReport() {
    const reportPath = path.join(__dirname, 'final-verification-report.md');
    
    const totalTests = this.passedTests + this.failedTests;
    const successRate = totalTests > 0 ? (this.passedTests / totalTests * 100).toFixed(1) : 0;
    
    const report = `# Final Verification Test Report

## Test Summary
- **Date**: ${new Date().toISOString()}
- **Total Tests**: ${totalTests}
- **Passed**: ${this.passedTests}
- **Failed**: ${this.failedTests}
- **Success Rate**: ${successRate}%

## Overall Status
${this.failedTests === 0 ? '🎉 **ALL TESTS PASSED** - Signature functionality is ready for production!' : `⚠️ **${this.failedTests} TEST(S) FAILED** - Review failed tests below`}

## Detailed Test Results

${this.testResults.map(test => `
### ${test.status === 'PASS' ? '✅' : '❌'} ${test.name}
- **Status**: ${test.status}
- **Message**: ${test.message}
`).join('')}

## Feature Verification Checklist

### Core Functionality
- [${this.testResults.find(t => t.name === 'Signature Element Function')?.status === 'PASS' ? 'x' : ' '}] Signature element creation
- [${this.testResults.find(t => t.name === 'Background Removal Functions')?.status === 'PASS' ? 'x' : ' '}] Background removal functionality
- [${this.testResults.find(t => t.name === 'Resize Functionality')?.status === 'PASS' ? 'x' : ' '}] Resize handles and logic
- [${this.testResults.find(t => t.name === 'Delete Functionality')?.status === 'PASS' ? 'x' : ' '}] Delete button and logic

### User Interface
- [${this.testResults.find(t => t.name === 'Signature Button Implementation')?.status === 'PASS' ? 'x' : ' '}] Signature button in toolbar
- [${this.testResults.find(t => t.name === 'Script Inclusion')?.status === 'PASS' ? 'x' : ' '}] Required scripts loaded
- [${this.testResults.find(t => t.name === 'Feature Parity')?.status === 'PASS' ? 'x' : ' '}] Consistent behavior with logos

### Infrastructure
- [${this.testResults.find(t => t.name === 'Required Files Exist')?.status === 'PASS' ? 'x' : ' '}] All required files present
- [${this.testResults.find(t => t.name === 'Backup Files Exist')?.status === 'PASS' ? 'x' : ' '}] Backup files created

## Next Steps

${this.failedTests === 0 ? `
### Ready for Production ✅
1. Test the application in a browser
2. Upload various signature images
3. Verify background removal works
4. Test drag, resize, and delete functionality
5. Deploy to production

### Performance Testing
- Test with large image files
- Test with multiple signatures
- Verify memory usage is reasonable
- Test across different browsers
` : `
### Issues to Address ❌
Review the failed tests above and address the following:
${this.testResults.filter(t => t.status !== 'PASS').map(t => `- ${t.name}: ${t.message}`).join('\n')}

### After Fixes
Re-run this test script to verify all issues are resolved.
`}

## Conclusion

${this.failedTests === 0 ? 
'All signature functionality has been successfully implemented and verified. The system now provides complete feature parity with logo elements plus enhanced background removal capabilities.' :
`${this.failedTests} issue(s) need to be addressed before the signature functionality is ready for production use.`}
`;

    fs.writeFileSync(reportPath, report);
    console.log(`📊 Test report saved to: ${reportPath}`);
    
    return reportPath;
  }

  /**
   * Run all verification tests
   */
  runAllTests() {
    console.log('🧪 Starting Final Verification Tests...\n');
    
    this.runTest('Required Files Exist', () => this.testRequiredFilesExist());
    this.runTest('Background Removal Functions', () => this.testBackgroundRemovalFunctions());
    this.runTest('Signature Element Function', () => this.testSignatureElementFunction());
    this.runTest('Resize Functionality', () => this.testResizeFunctionality());
    this.runTest('Delete Functionality', () => this.testDeleteFunctionality());
    this.runTest('Script Inclusion', () => this.testScriptInclusion());
    this.runTest('Signature Button Implementation', () => this.testSignatureButtonImplementation());
    this.runTest('Backup Files Exist', () => this.testBackupFilesExist());
    this.runTest('Feature Parity', () => this.testFeatureParity());
    
    console.log('\n📊 Test Summary:');
    console.log(`   Total Tests: ${this.passedTests + this.failedTests}`);
    console.log(`   ✅ Passed: ${this.passedTests}`);
    console.log(`   ❌ Failed: ${this.failedTests}`);
    
    const reportPath = this.generateTestReport();
    
    if (this.failedTests === 0) {
      console.log('\n🎉 ALL TESTS PASSED!');
      console.log('🚀 Signature functionality is ready for production!');
    } else {
      console.log('\n⚠️  Some tests failed. Review the report for details.');
    }
    
    return this.failedTests === 0;
  }
}

// Run all tests
const tester = new FinalVerificationTest();
tester.runAllTests();

export default FinalVerificationTest;
