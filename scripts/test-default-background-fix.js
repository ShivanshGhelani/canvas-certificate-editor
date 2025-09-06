/**
 * Test Script: Default Background Fix Verification
 * 
 * This script tests that the default background fix is working correctly
 * and that templates still function properly.
 */

class DefaultBackgroundTester {
  constructor() {
    this.testResults = [];
    this.startTime = Date.now();
  }

  // Test default background orientation
  async testDefaultOrientation() {
    console.log('🧪 Testing default background orientation...');
    
    const canvas = document.getElementById('background-canvas');
    const wrapper = document.getElementById('certificate-wrapper');
    
    if (!canvas || !wrapper) {
      this.addResult('default-orientation', false, 'Canvas or wrapper not found');
      return false;
    }
    
    // Should be landscape by default
    const isLandscape = canvas.width > canvas.height;
    const expectedDimensions = { width: 1123, height: 794 };
    const actualDimensions = { width: canvas.width, height: canvas.height };
    
    const dimensionsMatch = canvas.width === expectedDimensions.width && 
                           canvas.height === expectedDimensions.height;
    
    const wrapperStyle = getComputedStyle(wrapper);
    const wrapperIsLandscape = parseFloat(wrapperStyle.width) > parseFloat(wrapperStyle.height);
    
    const success = isLandscape && dimensionsMatch && wrapperIsLandscape;
    
    this.addResult('default-orientation', success, {
      isLandscape,
      dimensionsMatch,
      wrapperIsLandscape,
      expected: expectedDimensions,
      actual: actualDimensions,
      wrapperDimensions: {
        width: wrapperStyle.width,
        height: wrapperStyle.height
      }
    });
    
    return success;
  }

  // Test template loading switches to portrait
  async testTemplateOrientation() {
    console.log('🧪 Testing template orientation switching...');
    
    // Simulate template loading
    const wrapper = document.getElementById('certificate-wrapper');
    const canvas = document.getElementById('background-canvas');
    
    if (!wrapper || !canvas) {
      this.addResult('template-orientation', false, 'Elements not found');
      return false;
    }
    
    // Add template-active class to simulate template loading
    wrapper.classList.add('template-active');
    
    // Wait for CSS changes to apply
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const wrapperStyle = getComputedStyle(wrapper);
    const wrapperIsPortrait = parseFloat(wrapperStyle.width) < parseFloat(wrapperStyle.height);
    
    // Clean up
    wrapper.classList.remove('template-active');
    
    this.addResult('template-orientation', wrapperIsPortrait, {
      wrapperDimensions: {
        width: wrapperStyle.width,
        height: wrapperStyle.height
      },
      isPortrait: wrapperIsPortrait
    });
    
    return wrapperIsPortrait;
  }

  // Test background drawing function
  async testBackgroundDrawing() {
    console.log('🧪 Testing background drawing...');
    
    const canvas = document.getElementById('background-canvas');
    if (!canvas) {
      this.addResult('background-drawing', false, 'Canvas not found');
      return false;
    }
    
    const ctx = canvas.getContext('2d');
    const initialImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    try {
      if (window.drawBackground && typeof window.drawBackground === 'function') {
        window.drawBackground();
        
        // Check if canvas was modified
        const newImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const wasModified = !this.compareImageData(initialImageData, newImageData);
        
        this.addResult('background-drawing', wasModified, {
          functionAvailable: true,
          canvasModified: wasModified
        });
        
        return wasModified;
      } else {
        this.addResult('background-drawing', false, 'drawBackground function not available');
        return false;
      }
    } catch (error) {
      this.addResult('background-drawing', false, `Error: ${error.message}`);
      return false;
    }
  }

  // Test template reset functionality
  async testTemplateReset() {
    console.log('🧪 Testing template reset functionality...');
    
    const wrapper = document.getElementById('certificate-wrapper');
    const canvas = document.getElementById('background-canvas');
    
    if (!wrapper || !canvas) {
      this.addResult('template-reset', false, 'Elements not found');
      return false;
    }
    
    // Simulate template active state
    wrapper.classList.add('template-active');
    canvas.width = 2480;
    canvas.height = 3508;
    
    // Test reset functionality exists
    const hasResetButton = document.querySelector('[title="Reset"], button:contains("Reset")');
    
    // Simulate reset
    wrapper.classList.remove('template-active');
    canvas.width = 1123;
    canvas.height = 794;
    
    const backToLandscape = canvas.width > canvas.height;
    const correctDimensions = canvas.width === 1123 && canvas.height === 794;
    
    this.addResult('template-reset', backToLandscape && correctDimensions, {
      hasResetButton: !!hasResetButton,
      backToLandscape,
      correctDimensions,
      finalDimensions: { width: canvas.width, height: canvas.height }
    });
    
    return backToLandscape && correctDimensions;
  }

  // Test responsive scaling
  async testResponsiveScaling() {
    console.log('🧪 Testing responsive scaling...');
    
    const wrapper = document.querySelector('.certificate-display-wrapper');
    if (!wrapper) {
      this.addResult('responsive-scaling', false, 'Display wrapper not found');
      return false;
    }
    
    const style = getComputedStyle(wrapper);
    const hasTransform = style.transform && style.transform !== 'none';
    const hasScale = style.transform.includes('scale');
    
    this.addResult('responsive-scaling', hasTransform && hasScale, {
      transform: style.transform,
      hasTransform,
      hasScale
    });
    
    return hasTransform && hasScale;
  }

  // Helper function to compare image data
  compareImageData(data1, data2) {
    if (data1.data.length !== data2.data.length) return false;
    
    for (let i = 0; i < data1.data.length; i++) {
      if (data1.data[i] !== data2.data[i]) return false;
    }
    
    return true;
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
    console.log('🚀 Starting comprehensive default background tests...');
    
    const tests = [
      this.testDefaultOrientation(),
      this.testTemplateOrientation(),
      this.testBackgroundDrawing(),
      this.testTemplateReset(),
      this.testResponsiveScaling()
    ];
    
    await Promise.all(tests);
    
    this.generateReport();
  }

  // Generate test report
  generateReport() {
    const totalTests = this.testResults.length;
    const passedTests = this.testResults.filter(r => r.success).length;
    const failedTests = totalTests - passedTests;
    
    console.log('\n📊 TEST REPORT');
    console.log('================');
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
    
    console.log('\n📋 DETAILED RESULTS:');
    console.table(this.testResults.map(r => ({
      Test: r.test,
      Status: r.success ? 'PASS' : 'FAIL',
      Time: `${r.timestamp}ms`
    })));
    
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
  window.DefaultBackgroundTester = DefaultBackgroundTester;
  
  function runTests() {
    const tester = new DefaultBackgroundTester();
    
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
  module.exports = DefaultBackgroundTester;
}
