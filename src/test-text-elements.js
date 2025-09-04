// Test the Text Element functionality
// Open browser console and run these commands to test:

// Add a new text element
const testAddText = () => {
  const layout = document.querySelector('[data-testid="layout"]');
  if (layout) {
    // Simulate clicking the Text button
    const textButton = document.querySelector('button[title="Add text element"]');
    if (textButton) {
      textButton.click();
      console.log('Text element added!');
    }
  }
};

// Test text element interaction
const testTextElement = () => {
  const textElements = document.querySelectorAll('[data-testid="text-element"]');
  console.log(`Found ${textElements.length} text elements`);
  
  if (textElements.length > 0) {
    const firstElement = textElements[0];
    
    // Test selection
    firstElement.click();
    console.log('Text element selected');
    
    // Test double-click editing
    setTimeout(() => {
      const event = new MouseEvent('dblclick', {
        view: window,
        bubbles: true,
        cancelable: true
      });
      firstElement.dispatchEvent(event);
      console.log('Text element should now be in edit mode');
    }, 1000);
  }
};

// Export for console testing
window.testTextFunctions = {
  testAddText,
  testTextElement
};

console.log('Text element tests loaded. Use window.testTextFunctions.testAddText() and window.testTextFunctions.testTextElement() to test');
