/**
 * Test Script: Placeholder Text Visibility
 * 
 * Tests that placeholder text is hidden by default and only shows when templates are loaded
 */

class PlaceholderVisibilityTester {
  constructor() {
    this.testResults = [];
    this.startTime = Date.now();
  }

  // Test that placeholders are hidden by default
  async testDefaultState() {
    console.log('🧪 Testing default state (no placeholders)...');
    
    const wrapper = document.getElementById('certificate-wrapper');
    const footerContent = document.querySelector('.footer-content');
    const signatureBlocks = document.querySelectorAll('.signature-block');
    const signatureNames = document.querySelectorAll('.signature-block .name');
    const defaultMessage = document.querySelector('.default-message');
    
    if (!wrapper || !footerContent) {
      this.addResult('default-state', false, 'Required elements not found');
      return false;
    }
    
    // Check that wrapper doesn't have template-active class
    const hasTemplateClass = wrapper.classList.contains('template-active');
    
    // Check footer visibility
    const footerStyle = getComputedStyle(footerContent);
    const footerHidden = footerStyle.opacity === '0' || footerStyle.visibility === 'hidden';
    
    // Check signature blocks visibility
    const signatureBlocksHidden = Array.from(signatureBlocks).every(block => {
      const style = getComputedStyle(block);
      return style.opacity === '0' || style.visibility === 'hidden';
    });
    
    // Check that signature text is empty
    const signatureTextsEmpty = Array.from(signatureNames).every(name => {
      return name.textContent.trim() === '';
    });
    
    // Check default message visibility
    const defaultMessageStyle = defaultMessage ? getComputedStyle(defaultMessage) : null;
    const defaultMessageVisible = defaultMessageStyle && 
      defaultMessageStyle.opacity !== '0' && 
      defaultMessageStyle.visibility !== 'hidden';
    
    const success = !hasTemplateClass && footerHidden && signatureBlocksHidden && 
                   signatureTextsEmpty && defaultMessageVisible;
    
    this.addResult('default-state', success, {
      hasTemplateClass,
      footerHidden,
      signatureBlocksHidden,
      signatureTextsEmpty,
      defaultMessageVisible,
      footerOpacity: footerStyle.opacity,
      footerVisibility: footerStyle.visibility
    });
    
    return success;
  }

  // Test template loading shows placeholders
  async testTemplateLoaded() {
    console.log('🧪 Testing template loaded state (placeholders visible)...');
    
    const wrapper = document.getElementById('certificate-wrapper');
    const footerContent = document.querySelector('.footer-content');
    const signatureBlocks = document.querySelectorAll('.signature-block');
    const defaultMessage = document.querySelector('.default-message');
    
    if (!wrapper || !footerContent) {
      this.addResult('template-loaded', false, 'Required elements not found');
      return false;
    }
    
    // Simulate template loading
    wrapper.classList.add('template-active');
    
    // Simulate populating placeholders
    const signatureNames = document.querySelectorAll('.signature-block .name');
    const signatureTitles = document.querySelectorAll('.signature-block .title');
    
    const defaultNames = ['{{ Organizer\'s Name }}', '{{ HOD\'s Name }}', '{{ Principal\'s Name }}'];
    const defaultTitles = ['Organizer', 'Head of Department', 'Principal'];
    
    signatureNames.forEach((nameEl, index) => {
      if (index < defaultNames.length) {
        nameEl.textContent = defaultNames[index];
      }
    });
    
    signatureTitles.forEach((titleEl, index) => {
      if (index < defaultTitles.length) {
        titleEl.textContent = defaultTitles[index];
      }
    });
    
    // Wait for CSS transitions
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check footer visibility
    const footerStyle = getComputedStyle(footerContent);
    const footerVisible = footerStyle.opacity === '1' && footerStyle.visibility === 'visible';
    
    // Check signature blocks visibility
    const signatureBlocksVisible = Array.from(signatureBlocks).every(block => {
      const style = getComputedStyle(block);
      return style.opacity === '1' && style.visibility === 'visible';
    });
    
    // Check that signature text is populated
    const signatureTextsPopulated = Array.from(signatureNames).every((name, index) => {
      return name.textContent.trim() === defaultNames[index];
    });
    
    // Check default message hidden
    const defaultMessageStyle = defaultMessage ? getComputedStyle(defaultMessage) : null;
    const defaultMessageHidden = !defaultMessageStyle || 
      defaultMessageStyle.opacity === '0' || 
      defaultMessageStyle.visibility === 'hidden';
    
    const success = footerVisible && signatureBlocksVisible && 
                   signatureTextsPopulated && defaultMessageHidden;
    
    // Clean up
    wrapper.classList.remove('template-active');
    signatureNames.forEach(nameEl => nameEl.textContent = '');
    signatureTitles.forEach(titleEl => titleEl.textContent = '');
    
    this.addResult('template-loaded', success, {
      footerVisible,
      signatureBlocksVisible,
      signatureTextsPopulated,
      defaultMessageHidden,
      footerOpacity: footerStyle.opacity,
      footerVisibility: footerStyle.visibility
    });
    
    return success;
  }

  // Test template reset clears placeholders
  async testTemplateReset() {
    console.log('🧪 Testing template reset (placeholders hidden again)...');
    
    const wrapper = document.getElementById('certificate-wrapper');
    const signatureNames = document.querySelectorAll('.signature-block .name');
    const signatureTitles = document.querySelectorAll('.signature-block .title');
    
    if (!wrapper) {
      this.addResult('template-reset', false, 'Wrapper not found');
      return false;
    }
    
    // Set up template state
    wrapper.classList.add('template-active');
    signatureNames.forEach((nameEl, index) => {
      nameEl.textContent = `Test Name ${index + 1}`;
    });
    signatureTitles.forEach((titleEl, index) => {
      titleEl.textContent = `Test Title ${index + 1}`;
    });
    
    // Simulate reset
    wrapper.classList.remove('template-active');
    signatureNames.forEach(nameEl => nameEl.textContent = '');
    signatureTitles.forEach(titleEl => titleEl.textContent = '');
    
    // Wait for CSS transitions
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check state
    const hasTemplateClass = wrapper.classList.contains('template-active');
    const signatureTextsEmpty = Array.from(signatureNames).every(name => {
      return name.textContent.trim() === '';
    });
    
    const success = !hasTemplateClass && signatureTextsEmpty;
    
    this.addResult('template-reset', success, {
      hasTemplateClass,
      signatureTextsEmpty
    });
    
    return success;
  }

  // Test canvas dimensions
  async testCanvasDimensions() {
    console.log('🧪 Testing canvas dimensions...');
    
    const canvas = document.getElementById('background-canvas');
    if (!canvas) {
      this.addResult('canvas-dimensions', false, 'Canvas not found');
      return false;
    }
    
    // Should be landscape by default
    const isLandscape = canvas.width > canvas.height;
    const expectedDimensions = { width: 1123, height: 794 };
    const actualDimensions = { width: canvas.width, height: canvas.height };
    
    const dimensionsCorrect = canvas.width === expectedDimensions.width && 
                             canvas.height === expectedDimensions.height;
    
    const success = isLandscape && dimensionsCorrect;
    
    this.addResult('canvas-dimensions', success, {
      isLandscape,
      dimensionsCorrect,
      expected: expectedDimensions,
      actual: actualDimensions
    });
    
    return success;
  }

  // Add test result
  addResult(testName, success, details) {
    this.testResults.push({
      test: testName,
      success,
      details,
      timestamp: Date.now() - this.startTime
    });
    
    const emoji = success ? '✅' : '❌';
    console.log(`${emoji} Test: ${testName} - ${success ? 'PASSED' : 'FAILED'}`);
    if (!success || (details && typeof details === 'object')) {
      console.log('📋 Details:', details);
    }
  }

  // Run all tests
  async runAllTests() {
    console.log('🚀 Starting placeholder visibility tests...');
    
    const tests = [
      this.testCanvasDimensions(),
      this.testDefaultState(),
      this.testTemplateLoaded(),
      this.testTemplateReset()
    ];
    
    for (const test of tests) {
      await test;
      await new Promise(resolve => setTimeout(resolve, 200)); // Small delay between tests
    }
    
    this.generateReport();
  }

  // Generate test report
  generateReport() {
    const totalTests = this.testResults.length;
    const passedTests = this.testResults.filter(r => r.success).length;
    const failedTests = totalTests - passedTests;
    
    console.log('\n📊 PLACEHOLDER VISIBILITY TEST REPORT');
    console.log('======================================');
    console.log(`Total Tests: ${totalTests}`);
    console.log(`Passed: ${passedTests}`);
    console.log(`Failed: ${failedTests}`);
    console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
    console.log(`Duration: ${Date.now() - this.startTime}ms`);
    
    if (failedTests > 0) {
      console.log('\n❌ FAILED TESTS:');
      this.testResults
        .filter(r => !r.success)
        .forEach(result => {
          console.log(`- ${result.test}: ${JSON.stringify(result.details)}`);
        });
    }
    
    return {
      totalTests,
      passedTests,
      failedTests,
      successRate: (passedTests / totalTests) * 100,
      results: this.testResults
    };
  }
}

// Auto-run tests when DOM is ready
if (typeof window !== 'undefined') {
  window.PlaceholderVisibilityTester = PlaceholderVisibilityTester;
  
  function runTests() {
    const tester = new PlaceholderVisibilityTester();
    
    // Wait for elements to be available
    setTimeout(() => {
      tester.runAllTests();
    }, 2000);
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runTests);
  } else {
    runTests();
  }
}

// Export for Node.js testing
if (typeof module !== 'undefined') {
  module.exports = PlaceholderVisibilityTester;
}
